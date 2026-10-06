import { load } from 'cheerio';

export const ORIGIN = 'https://www.hkml.ai';
export const episodePattern = /\/\d{4}\/\d{2}\/[^/]*season-\d+-episode-\d+[^/]*\/?$/;
export const clean = (text = '') => text.replace(/\s+/g, ' ').trim();
export function safeUrl(value, base = ORIGIN) {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value, base);
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}
export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function fetchPublic(url, fetcher = fetch) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await fetcher(url, { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'HKML-Archive-Migration/1.0' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      if (attempt === 3) throw new Error(`Could not read ${url}: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
}

export function sitemapUrls(xml) {
  const $ = load(xml, { xmlMode: true });
  return [...new Set($('loc').map((_, el) => clean($(el).text())).get())];
}

export function readSource(html, sourceUrl) {
  const $ = load(html);
  const body = $('main .card-body').first();
  if (!body.length) throw new Error('Episode content (.card-body) was not found');
  const name = clean(body.find('h1').first().text());
  body.find('h1').first().remove();
  const cover = safeUrl($('main .card').first().find('img').first().attr('src'), sourceUrl);
  const publishedDate = $('meta[property="article:published_time"]').attr('content')?.slice(0, 10);
  body.find('script, style, iframe, .card-title, .card-subtitle, .card-footer').remove();
  const sourceBlocks = [];
  body.find('p, li, h1, h2, h3, h4, h5, blockquote, img').each((_, el) => {
    const node = $(el);
    // HTML parser repairs the site's nested paragraphs. Keep the leaves, in order.
    if (el.tagName !== 'img' && node.find('p,li,h1,h2,h3,h4,h5,blockquote').length) return;
    if (el.tagName === 'img') {
      const url = safeUrl(node.attr('src'), sourceUrl);
      if (url) sourceBlocks.push({ type: 'image', url, text: node.attr('alt') || '' });
      return;
    }
    const text = clean(node.text());
    const links = node.find('a[href]').map((_, link) => ({ text: clean($(link).text()), url: safeUrl($(link).attr('href'), sourceUrl) })).get().filter(link => link.url);
    if (text || links.length) sourceBlocks.push({ type: /^h\d/.test(el.tagName) ? 'heading' : 'paragraph', tag: el.tagName, list: node.parent()[0]?.tagName, text, links });
  });
  return { name, sourceUrl, cover, publishedDate, sourceBlocks };
}

const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
function eventDate(text, warnings) {
  const pattern = new RegExp(`(${months.join('|')})\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s+(\\d{4})`, 'i');
  const match = text.match(pattern);
  if (!match) return {};
  const month = months.indexOf(match[1].toLowerCase()) + 1;
  const date = `${match[3]}-${String(month).padStart(2, '0')}-${match[2].padStart(2, '0')}`;
  if (new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) !== date) { warnings.push('Invalid event date in source'); return {}; }
  const weekday = text.match(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i)?.[1];
  const actualDay = new Intl.DateTimeFormat('en', { weekday: 'long', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
  if (weekday && weekday.toLowerCase() !== actualDay.toLowerCase()) warnings.push(`Source weekday says ${weekday}; ${date} is ${actualDay}`);
  const timeMatch = text.match(/(?:from|at)\s+(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*(?:to|–|-)\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!timeMatch) { warnings.push('Event time needs review; date-only imported'); return { start: date }; }
  function time(hour, minute, period) {
    if (+hour < 1 || +hour > 12 || +(minute || 0) > 59) return undefined;
    return `${String(+hour % 12 + (period.toLowerCase() === 'pm' ? 12 : 0)).padStart(2, '0')}:${minute || '00'}:00+08:00`;
  }
  const startTime = time(...timeMatch.slice(1, 4));
  const endTime = time(...timeMatch.slice(4, 7));
  if (!startTime || !endTime) { warnings.push('Invalid event time; date-only imported'); return { start: date }; }
  const start = `${date}T${startTime}`, end = `${date}T${endTime}`;
  if (Date.parse(end) <= Date.parse(start)) { warnings.push('End time is not after start time; end omitted'); return { start }; }
  return { start, end };
}

function personName(text) {
  const name = text.replace(/^by\s+/i, '').replace(/\([^)]*(?:https?:|\d+min|MSc|PhD|from\b)[^)]*\)/gi, '').split(/\s+(?:is|was|has|holds|received|earned|leads|heads|works|joined|from|ML Lead|founder)\b|\s*[,–—]|\s+-\s+/i)[0].trim().replace(/[.:]$/, '');
  const words = name.split(/\s+/);
  if (words.length < 2 || words.length > 9 || /^(?:Former|The|Our|This|Short|Speaker|Talk|He|She|His|Her|HKML|First experiment|Higher-Level|Importance|Incorrect|A |An )/i.test(name)) return '';
  if (words.some(word => !/^(?:[\p{Lu}\d(][\p{L}\p{M}\d.'’()\-/]*|and|&|de|von|van)$/u.test(word))) return '';
  return name;
}

export function parseSpeakers(blocks, warnings) {
  const speakers = [];
  let current, field;
  const numbered = blocks.some(b => /^(?:Talk|Speaker)\s*\d+(?:\s*\([^)]*\))?\s*[:.\-–]/i.test(b.text));
  for (const block of blocks) {
    const { text = '' } = block;
    if (/^(?:Video Recording|YouTube videos|Networking|Personal takeaways|Closing Thoughts|Thanks to our patrons)/i.test(text)) break;
    const title = text.match(/^(?:(?:Talk|Speaker)\s*\d+(?:\s*\([^)]*\))?|Lightning talk)\s*[:.\-–]\s*(.*)/i);
    const legacy = !numbered && (block.tag === 'li' && block.list === 'ul' || block.type === 'heading') && text.length < 400 && text.match(/^(.{3,100}?)\s+(?:-|–|—)\s+(.+)$/);
    if (title || (legacy && personName(legacy[1]))) {
      current = { name: legacy ? personName(legacy[1]) : '', talkTitle: title ? title[1] : legacy[2] };
      speakers.push(current); field = undefined;
      continue;
    }
    const standaloneName = !numbered && block.tag === 'li' && block.list === 'ul' && text.length < 120 ? personName(text) : '';
    if (standaloneName) {
      current = { name: standaloneName }; speakers.push(current); field = 'summary'; continue;
    }
    const speakerLine = text.match(/^(?:Speaker|Name)\s*:\s*(.+)$/i);
    if (speakerLine) {
      if (!current) { current = { name: '' }; speakers.push(current); }
      current.name = personName(speakerLine[1]);
      if (speakerLine[1].length > current.name.length + 5) current.bio = speakerLine[1];
      field = 'bio';
      continue;
    }
    if (!current) continue;
    if (!current.name && !field && text.length < 200 && personName(text)) {
      current.name = personName(text); field = 'summary'; continue;
    }
    const value = text.match(/^(Abstract|Summary|Short bio|Bio|Title|Topic)\s*:\s*(.*)$/i);
    if (value) {
      field = /bio/i.test(value[1]) ? 'bio' : /Title|Topic/i.test(value[1]) ? 'talkTitle' : 'summary';
      current[field] = value[2];
      if (field === 'bio' && !current.name) current.name = personName(value[2]);
    } else if (text && !/^(?:slides?|his slides|her slides|notes|code is|paper|video)/i.test(text) && !(block.links?.length && text.length < 50)) {
      field ||= 'summary';
      current[field] = [current[field], text].filter(Boolean).join('\n\n');
    }
    if (block.type === 'image' && !current.photo) current.photo = block.url;
    const slide = block.links?.find(link => /slides?|presentation/i.test(link.text));
    if (slide && !current.slides) current.slides = slide.url;
  }
  if (!speakers.length) warnings.push('Speaker layout needs manual review; full original programme is preserved');
  speakers.forEach((speaker, i) => {
    if (!speaker.name) warnings.push(`Speaker ${i + 1}: name needs review`);
    if (!speaker.talkTitle) warnings.push(`Speaker ${i + 1}: talk title needs review`);
  });
  return speakers;
}

export function normalizeSource(source) {
  const { sourceUrl, sourceBlocks } = source;
  const path = new URL(sourceUrl).pathname;
  const identity = path.match(/season-(\d+)-episode-(\d+)/);
  if (!identity) throw new Error(`Not an episode URL: ${sourceUrl}`);
  const warnings = [];
  const blocks = sourceBlocks;
  const when = blocks.findIndex(b => /^When\s*\?/i.test(b.text));
  const where = blocks.findIndex(b => /^Where\s*\?/i.test(b.text));
  const dateText = when >= 0 ? blocks[when + 1]?.text || '' : '';
  const parsedDate = eventDate(dateText, warnings);
  if (!parsedDate.start) warnings.push('Event date not confidently extracted; publication date is recorded separately, not substituted');
  if (parsedDate.start && source.publishedDate && parsedDate.start.slice(0, 10) !== source.publishedDate) warnings.push(`Event date ${parsedDate.start.slice(0,10)} differs from publication date ${source.publishedDate}`);
  const venueBlock = where >= 0 ? blocks[where + 1] : undefined;
  const venueText = venueBlock?.text || '';
  const venue = clean(venueText.replace(/^(?:This\s+(?:HKML\s+)?meetup\s+(?:(?:was|is)\s+)?hosted\s+(?:in-person\s+)?(?:at|on)|At)\s*/i, ''));
  if (!venue) warnings.push('Venue needs review');
  const meetupUrl = blocks.flatMap(b => b.links || []).find(link => /(^|\.)meetup\.com$/.test(new URL(link.url).hostname) && /\/events\//.test(link.url))?.url;
  const organization = blocks.map(b => b.text).find(text => /(?:organised|organized) by/i.test(text)) || '';
  const organizer = organization.match(/(?:organised|organized) by\s+(.+?)(?:, with|\.$|$)/i)?.[1];
  const sponsor = organization.match(/with the support of\s+(.+?)(?:\.$|$)/i)?.[1];
  const programme = blocks.findIndex(b => /^Programme\s*:/i.test(b.text));
  const speakers = parseSpeakers(programme >= 0 ? blocks.slice(programme + 1) : blocks, warnings);
  const introduction = programme >= 0 && blocks[programme + 1]?.type === 'paragraph' && !/^(?:Talk|Speaker|Lightning|Abstract|Summary)\b/i.test(blocks[programme + 1].text) ? blocks[programme + 1].text : '';
  const slug = path.split('/').filter(Boolean).at(-1);
  return {
    id: `legacy-${slug}-${path.split('/')[1]}-${path.split('/')[2]}`,
    name: source.name, slug, status: 'Draft', season: +identity[1], episode: +identity[2],
    ...parsedDate, venue, address: '', meetupUrl, organizer, sponsor,
    cover: source.cover, coverAlt: `${source.name} — original event cover`,
    excerpt: introduction.slice(0, 280) || undefined, introduction: introduction || undefined,
    tags: ['machine learning'], speakers, sourceUrl, legacyPath: path,
    publicationDate: source.publishedDate, originalDateText: dateText,
    sourceBlocks, warnings, reviewed: false,
  };
}
