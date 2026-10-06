import { safeUrl } from './archive.mjs';

export const propertyTypes = {
  Name: 'title', Slug: 'rich_text', Status: 'select', Season: 'number', Episode: 'number',
  'Event date': 'date', Venue: 'rich_text', Address: 'rich_text', 'Meetup URL': 'url',
  Organizer: 'rich_text', Sponsor: 'rich_text', Cover: 'files', Excerpt: 'rich_text',
  Introduction: 'rich_text', Tags: 'multi_select', 'Source URL': 'url',
};
export const defaultSchema = () => Object.fromEntries(Object.entries(propertyTypes).map(([name, type]) => [name, { [type]: type === 'select' ? { options: [{ name: 'Draft', color: 'gray' }, { name: 'Published', color: 'green' }] } : {} }]));
export const textOf = property => (property?.rich_text || property?.title || []).map(r => r.plain_text ?? r.text?.content ?? '').join('');

export function richText(value = '', url) {
  const text = String(value); const result = [];
  for (let i = 0; i < text.length; i += 1800) result.push({ type: 'text', text: { content: text.slice(i, i + 1800), ...(url && safeUrl(url) ? { link: { url: safeUrl(url) } } : {}) } });
  if (result.length > 100) throw new Error('Text exceeds Notion rich-text array limits; split this field before import.');
  return result;
}
export const paragraph = text => ({ object: 'block', type: 'paragraph', paragraph: { rich_text: richText(text) } });
const heading = text => ({ object: 'block', type: 'heading_2', heading_2: { rich_text: richText(text) } });
function linkBlock(label, url) { return { object: 'block', type: 'paragraph', paragraph: { rich_text: richText(label, url) } }; }
export function pageBlocks(episode) {
  const blocks = [paragraph('Imported from the public HKML archive. Review extracted names, dates and programme boundaries before changing Status to Published.'), linkBlock('Original episode', episode.sourceUrl)];
  for (const warning of episode.warnings || []) blocks.push(paragraph(`Review: ${warning}`));
  if (episode.originalDateText) blocks.push(paragraph(`Original date wording: ${episode.originalDateText}`));
  episode.speakers.forEach((speaker, i) => {
    blocks.push(heading(`Speaker ${i + 1}`));
    blocks.push(paragraph(`Name: ${speaker.name || ''}`));
    if (speaker.talkTitle) blocks.push(paragraph(`Title: ${speaker.talkTitle}`));
    if (speaker.bio) blocks.push(paragraph(`Bio: ${speaker.bio}`));
    if (speaker.summary) blocks.push(paragraph(`Summary: ${speaker.summary}`));
    if (safeUrl(speaker.photo)) blocks.push(linkBlock(`Photo: ${speaker.photo}`, speaker.photo));
    if (safeUrl(speaker.slides)) blocks.push(linkBlock(`Slide: ${speaker.slides}`, speaker.slides));
  });
  blocks.push(heading('Original archive'));
  const original = episode.sourceBlocks.flatMap(block => {
    if (block.type === 'image') return [linkBlock(block.text || 'Original image', block.url)];
    return [block.type === 'heading' ? heading(block.text) : paragraph(block.text), ...(block.links || []).map(link => linkBlock(link.text || link.url, link.url))];
  });
  // One atomic page request, avoiding incomplete pages after interrupted append calls.
  for (let i = 0; i < original.length; i += 90) blocks.push({ object: 'block', type: 'toggle', toggle: { rich_text: richText(`Original text and links — part ${Math.floor(i / 90) + 1}`), children: original.slice(i, i + 90) } });
  if (blocks.length > 100 || blocks.length + original.length > 1000) throw new Error(`${episode.name}: too many blocks for one atomic create; split the source backup before importing.`);
  return blocks;
}
export function makePayload(episode, sourceId, statusType = 'select', draftStatus = 'Draft') {
  if (!['Draft', 'Not started'].includes(draftStatus)) throw new Error('Migration status must be unpublished.');
  const properties = {
    Name: { title: richText(episode.name) }, Slug: { rich_text: richText(episode.slug) },
    Status: { [statusType]: { name: draftStatus } }, Season: { number: episode.season }, Episode: { number: episode.episode },
    'Source URL': { url: safeUrl(episode.sourceUrl) },
    'Event date': { date: episode.start ? { start: episode.start, ...(episode.end ? { end: episode.end } : {}) } : null },
    'Meetup URL': { url: safeUrl(episode.meetupUrl) || null },
    Cover: { files: safeUrl(episode.cover) ? [{ name: 'Original event cover', type: 'external', external: { url: safeUrl(episode.cover) } }] : [] },
    Tags: { multi_select: (episode.tags || []).map(name => ({ name })) },
  };
  for (const [name, field] of Object.entries({ Venue: 'venue', Address: 'address', Organizer: 'organizer', Sponsor: 'sponsor', Excerpt: 'excerpt', Introduction: 'introduction' })) properties[name] = { rich_text: richText(episode[field]) };
  const payload = { parent: { type: 'data_source_id', data_source_id: sourceId }, properties, children: pageBlocks(episode) };
  if (Buffer.byteLength(JSON.stringify(payload)) > 480000) throw new Error(`${episode.name}: page payload is too large. No content was truncated.`);
  return payload;
}
export function canonicalSource(value) {
  if (!safeUrl(value)) return '';
  const url = new URL(value); url.protocol = 'https:'; url.hostname = url.hostname.replace(/^www\./, ''); url.hash = ''; url.search = '';
  return url.href.replace(/\/$/, '');
}
export function importPlan(episodes, existing) {
  const sources = new Set(), slugs = new Set(), identities = new Set();
  for (const page of existing) {
    sources.add(canonicalSource(page.properties?.['Source URL']?.url));
    slugs.add(textOf(page.properties?.Slug));
    const season = page.properties?.Season?.number, episode = page.properties?.Episode?.number;
    if (Number.isFinite(season) && Number.isFinite(episode)) identities.add(`${season}:${episode}`);
  }
  return episodes.map(episode => {
    const source = canonicalSource(episode.sourceUrl), identity = `${episode.season}:${episode.episode}`;
    let action = 'create', reason = 'New archive episode';
    if (sources.has(source) || slugs.has(episode.slug)) { action = 'skip'; reason = 'Source URL or slug already present'; }
    else if (identities.has(identity)) { action = 'conflict'; reason = 'Season and episode already exist with a different URL/slug; review before import'; }
    if (action === 'create') { sources.add(source); slugs.add(episode.slug); identities.add(identity); }
    return { episode, action, reason };
  });
}
