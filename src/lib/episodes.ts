import sampleEpisodes from '../data/sample-episodes.json';
import type { Episode } from './types';
import { sortNewestFirst, validateEpisode } from './content';
import { fetchNotionEpisodes } from './notion';
import { loadEnvironment } from '../../scripts/migration/notion-client.mjs';

let episodePromise: Promise<Episode[]> | undefined;

async function loadEpisodes(): Promise<Episode[]> {
  loadEnvironment();
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_EPISODES_DATABASE_ID;
  let source: Episode[];

  if (token && databaseId) {
    console.info('[HKML content] Loading published episodes from Notion.');
    source = await fetchNotionEpisodes(token, databaseId);
  } else {
    if (token || databaseId) {
      console.warn('[HKML content] Both NOTION_TOKEN and NOTION_EPISODES_DATABASE_ID are required. Using local sample data.');
    } else {
      console.info('[HKML content] Notion credentials are not set; using local sample data.');
    }
    source = sampleEpisodes as Episode[];
  }

  const published = source.filter((episode) => episode.status === 'Published');
  const valid: Episode[] = [];
  for (const episode of published) {
    const validation = validateEpisode(episode);
    validation.warnings.forEach((warning) => console.warn(`[HKML content] ${episode.name || episode.id}: ${warning}`));
    if (validation.valid) valid.push(episode);
    else console.warn(`[HKML content] Skipping invalid published episode: ${episode.name || episode.id}`);
  }
  return sortNewestFirst(valid);
}

export function getEpisodes(): Promise<Episode[]> {
  episodePromise ??= loadEpisodes();
  return episodePromise;
}
