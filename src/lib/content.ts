import type { Episode, EpisodeValidation } from './types';

const unsafeProtocol = /^(?:javascript|data|vbscript):/i;

export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'episode';
}

export function safeExternalUrl(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (unsafeProtocol.test(trimmed)) return undefined;
  try {
    const url = new URL(trimmed);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function validateEpisode(episode: Episode): EpisodeValidation {
  const warnings: string[] = [];
  if (!episode.name.trim()) warnings.push('Name is required.');
  if (!Number.isFinite(episode.season)) warnings.push('Season must be a number.');
  if (!Number.isFinite(episode.episode)) warnings.push('Episode must be a number.');
  if (!episode.start || Number.isNaN(Date.parse(episode.start))) warnings.push('Event date is required and must be valid.');
  if (!episode.venue.trim()) warnings.push('Venue is required.');
  if (!episode.speakers.length) warnings.push('No speaker sections were found. The episode will still be published.');
  episode.speakers.forEach((speaker, index) => {
    if (!speaker.name.trim()) warnings.push(`Speaker ${index + 1} is missing a name.`);
    if (!speaker.talkTitle) warnings.push(`Speaker ${index + 1} (${speaker.name || 'unnamed'}) is missing Title/Topic.`);
  });
  const requiredFailures = warnings.filter((warning) =>
    ['Name is required.', 'Season must be a number.', 'Episode must be a number.', 'Event date is required and must be valid.', 'Venue is required.'].includes(warning),
  );
  return { valid: requiredFailures.length === 0, warnings };
}

export function sortNewestFirst(episodes: Episode[]): Episode[] {
  return [...episodes].sort((a, b) => Date.parse(b.start) - Date.parse(a.start));
}

export function oldEpisodePath(episode: Episode): string {
  if (episode.sourceUrl) {
    const url = new URL(episode.sourceUrl);
    if (['www.hkml.ai', 'hkml.ai'].includes(url.hostname) && /^\/\d{4}\/\d{2}\/[^/]+\/$/.test(url.pathname)) return url.pathname;
  }
  const date = new Date(episode.start);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `/${year}/${month}/hong-kong-machine-learning-season-${episode.season}-episode-${episode.episode}/`;
}
