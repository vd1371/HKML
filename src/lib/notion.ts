import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import sharp from 'sharp';
import type { Episode, Speaker } from './types';
import { safeExternalUrl, slugify } from './content';
import { createNotionClient, resolveDataSource, listPages } from '../../scripts/migration/notion-client.mjs';

type NotionText = { plain_text?: string; href?: string | null; text?: { link?: { url?: string } | null } };
type NotionProperty = Record<string, any>;
type NotionPage = { id: string; properties: Record<string, NotionProperty>; cover?: { external?: { url?: string }; file?: { url?: string } } | null };
type NotionBlock = Record<string, any> & { id: string; type: string; has_children?: boolean };

interface NotionContext {
  token: string;
  databaseId: string;
  request: ReturnType<typeof createNotionClient>;
}

async function queryEpisodePages(context: NotionContext): Promise<NotionPage[]> {
  const request = context.request;
  const source = await resolveDataSource(request, context.databaseId, process.env.NOTION_EPISODES_DATA_SOURCE_ID);
  return listPages(request, source.id);
}

async function getBlocks(context: NotionContext, blockId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const params = new URLSearchParams({ page_size: '100' });
    if (cursor) params.set('start_cursor', cursor);
    const result = await context.request(`/blocks/${blockId}/children?${params}`);
    blocks.push(...result.results);
    cursor = result.has_more ? result.next_cursor : undefined;
  } while (cursor);
  return blocks;
}

function richText(items?: NotionText[]): string {
  return (items ?? []).map((item) => item.plain_text ?? '').join('').trim();
}

function propertyText(property?: NotionProperty): string {
  if (!property) return '';
  if (property.type === 'title') return richText(property.title);
  if (property.type === 'rich_text') return richText(property.rich_text);
  return '';
}

function propertyNumber(property?: NotionProperty): number {
  return typeof property?.number === 'number' ? property.number : Number.NaN;
}

function propertyUrl(property?: NotionProperty): string | undefined {
  return safeExternalUrl(property?.url);
}

function propertyFile(property?: NotionProperty): string | undefined {
  const file = property?.files?.[0];
  return safeExternalUrl(file?.file?.url ?? file?.external?.url);
}

function propertyMultiSelect(property?: NotionProperty): string[] {
  return Array.isArray(property?.multi_select)
    ? property.multi_select.map((item: any) => item.name).filter(Boolean)
    : [];
}

function blockText(block: NotionBlock): string {
  return richText(block[block.type]?.rich_text);
}

function firstLinkedUrl(block: NotionBlock): string | undefined {
  const items: NotionText[] = block[block.type]?.rich_text ?? [];
  for (const item of items) {
    const url = item.href ?? item.text?.link?.url;
    const safe = safeExternalUrl(url ?? undefined);
    if (safe) return safe;
  }
  const text = richText(items);
  return safeExternalUrl(text.match(/https?:\/\/\S+/)?.[0]);
}

function fileUrlFromBlock(block: NotionBlock): string | undefined {
  const value = block[block.type];
  return safeExternalUrl(value?.file?.url ?? value?.external?.url);
}

function parseSpeakers(blocks: NotionBlock[]): Speaker[] {
  const speakers: Speaker[] = [];
  let current: Speaker | undefined;
  let activeField: keyof Speaker | undefined;

  const pushCurrent = () => {
    if (current) speakers.push(current);
    current = undefined;
    activeField = undefined;
  };

  for (const block of blocks) {
    const text = blockText(block);
    if (/^heading_[123]$/.test(block.type) && /^Original archive$/i.test(text)) break;
    if (/^heading_[123]$/.test(block.type) && /^speaker\b/i.test(text)) {
      pushCurrent();
      current = { name: '' };
      continue;
    }
    if (!current) continue;

    if (['image', 'file', 'pdf'].includes(block.type)) {
      const url = fileUrlFromBlock(block);
      if (url && block.type === 'image' && !current.photo) current.photo = url;
      if (url && block.type !== 'image' && !current.slides) current.slides = url;
      continue;
    }

    if (!text) continue;
    const match = text.match(/^(Name|Title|Topic|Bio|Summary|Abstract|Photo|Slide|Slides)\s*:\s*(.*)$/i);
    if (match) {
      const label = match[1].toLowerCase();
      const value = match[2].trim();
      if (label === 'name') activeField = 'name';
      if (label === 'title' || label === 'topic') activeField = 'talkTitle';
      if (label === 'bio') activeField = 'bio';
      if (label === 'summary' || label === 'abstract') activeField = 'summary';
      if (label === 'photo') activeField = 'photo';
      if (label === 'slide' || label === 'slides') activeField = 'slides';
      const linkedUrl = firstLinkedUrl(block);
      if (activeField === 'photo' || activeField === 'slides') {
        current[activeField] = linkedUrl ?? safeExternalUrl(value);
      } else if (activeField) {
        current[activeField] = value;
      }
      continue;
    }

    if (activeField && !['photo', 'slides'].includes(activeField)) {
      const existing = current[activeField] as string | undefined;
      current[activeField] = [existing, text].filter(Boolean).join('\n\n');
    }
  }
  pushCurrent();
  return speakers;
}

function inferExtension(url: string, contentType?: string | null): string {
  const fromPath = extname(new URL(url).pathname).toLowerCase();
  if (/^\.[a-z0-9]{1,5}$/.test(fromPath)) return fromPath;
  const types: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'application/pdf': '.pdf',
  };
  return types[(contentType ?? '').split(';')[0]] ?? '.bin';
}

function isExpiringNotionAsset(url?: string): boolean {
  if (!url) return false;
  try {
    const hostname = new URL(url).hostname;
    return hostname.includes('notion') || hostname.includes('amazonaws.com');
  } catch {
    return false;
  }
}

async function pinAsset(url: string | undefined, key: string): Promise<string | undefined> {
  if (!url || !isExpiringNotionAsset(url)) return url;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const contentType = response.headers.get('content-type');
    const extension = inferExtension(url, contentType);
    const safeKey = key.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    const filename = `${safeKey}${extension}`;
    const outputDir = join(process.cwd(), 'public', 'notion');
    await mkdir(outputDir, { recursive: true });
    await writeFile(join(outputDir, filename), bytes);
    if (contentType && /^image\/(?:jpeg|png|webp)$/.test(contentType.split(';')[0])) {
      await Promise.all([
        sharp(bytes).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join(outputDir, `${safeKey}-640.webp`)),
        sharp(bytes).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 86 }).toFile(join(outputDir, `${safeKey}-1200.webp`)),
      ]);
      return `/notion/${safeKey}-1200.webp`;
    }
    return `/notion/${filename}`;
  } catch (error) {
    console.warn(`[HKML content] Could not copy Notion asset for ${key}: ${String(error)}`);
    return undefined;
  }
}

async function pageToEpisode(context: NotionContext, page: NotionPage): Promise<Episode> {
  const p = page.properties;
  const name = propertyText(p.Name);
  const rawSlug = propertyText(p.Slug);
  const date = p['Event date']?.date;
  const status = p.Status?.status?.name ?? p.Status?.select?.name ?? 'Draft';
  const blocks = await getBlocks(context, page.id);
  const speakers = parseSpeakers(blocks);
  const slug = slugify(rawSlug || name);

  const episode: Episode = {
    id: page.id,
    name,
    slug,
    sourceUrl: propertyUrl(p['Source URL']),
    status: status === 'Published' ? 'Published' : 'Draft',
    season: propertyNumber(p.Season),
    episode: propertyNumber(p.Episode),
    start: date?.start ?? '',
    end: date?.end ?? undefined,
    venue: propertyText(p.Venue),
    address: propertyText(p.Address) || undefined,
    meetupUrl: propertyUrl(p['Meetup URL']),
    organizer: propertyText(p.Organizer) || undefined,
    sponsor: propertyText(p.Sponsor) || undefined,
    cover: propertyFile(p.Cover) ?? safeExternalUrl(page.cover?.external?.url ?? page.cover?.file?.url),
    coverAlt: `${name} event cover`,
    excerpt: propertyText(p.Excerpt) || undefined,
    introduction: propertyText(p.Introduction) || undefined,
    tags: propertyMultiSelect(p.Tags),
    speakers,
  };

  episode.cover = await pinAsset(episode.cover, `${slug}-cover`);
  await Promise.all(
    episode.speakers.map(async (speaker, index) => {
      speaker.photo = await pinAsset(speaker.photo, `${slug}-speaker-${index + 1}`);
      speaker.slides = await pinAsset(speaker.slides, `${slug}-slides-${index + 1}`);
      speaker.photoAlt = speaker.photo ? `Portrait of ${speaker.name}` : undefined;
    }),
  );
  return episode;
}

export async function fetchNotionEpisodes(token: string, databaseId: string): Promise<Episode[]> {
  const context = { token, databaseId, request: createNotionClient(token) };
  const pages = await queryEpisodePages(context);
  const published = pages.filter((page) => {
    const status = page.properties.Status?.status?.name ?? page.properties.Status?.select?.name;
    return status === 'Published';
  });
  const episodes: Episode[] = [];
  for (const page of published) episodes.push(await pageToEpisode(context, page));
  return episodes;
}
