import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { ORIGIN, episodePattern, fetchPublic, sitemapUrls, readSource, normalizeSource, escapeHtml } from './archive.mjs';

const refresh = process.argv.includes('--refresh');
const cacheDir = 'work/migration-cache';
const outputDir = 'outputs/hkml-migration';
await mkdir(cacheDir, { recursive: true });
await mkdir(outputDir, { recursive: true });
async function cached(url) {
  const path = join(cacheDir, `${createHash('sha256').update(url).digest('hex')}.html`);
  if (!refresh) { try { return await readFile(path, 'utf8'); } catch {} }
  const html = await fetchPublic(url);
  await writeFile(path, html);
  return html;
}
const pending = [`${ORIGIN}/sitemap.xml`], visited = new Set(), discovered = new Set();
while (pending.length) {
  const url = pending.shift();
  if (visited.has(url)) continue;
  visited.add(url);
  const xml = await cached(url);
  for (const candidate of sitemapUrls(xml)) {
    const parsed = new URL(candidate);
    if (parsed.origin !== ORIGIN) continue;
    if (episodePattern.test(parsed.pathname)) discovered.add(candidate);
    else if (/<sitemapindex\b/.test(xml)) pending.push(candidate);
  }
}
if (!discovered.size) throw new Error('No episode URLs found. Nothing was overwritten.');
const episodes = [], failures = [];
for (const url of discovered) {
  try {
    const source = readSource(await cached(url), url);
    episodes.push(normalizeSource(source));
    console.log(`${episodes.length}/${discovered.size}: ${source.name}`);
  } catch (error) { failures.push({ sourceUrl: url, error: error.message }); }
}
const identities = new Map();
for (const ep of episodes) {
  const identity = `${ep.season}:${ep.episode}`;
  const same = identities.get(identity) || [];
  same.push(ep); identities.set(identity, same);
}
for (const group of identities.values()) if (group.length > 1) {
  for (const ep of group) {
    ep.warnings.push('Duplicate season/episode number in original archive; compare source pages before import');
    ep.slug = `${ep.slug}-${ep.legacyPath.split('/').slice(1, 3).join('-')}`;
  }
}
episodes.sort((a,b) => (b.start || b.publicationDate || '').localeCompare(a.start || a.publicationDate || ''));
const manifest = { formatVersion: 1, collectedAt: new Date().toISOString(), source: ORIGIN, discovered: discovered.size, episodes, failures };
await writeFile(join(outputDir, 'episodes.json'), JSON.stringify(manifest, null, 2));
await writeFile(join(outputDir, 'source-urls.json'), JSON.stringify([...discovered], null, 2));
await mkdir(join(outputDir, 'original-pages'), { recursive: true });
for (const ep of episodes) {
  const markdown = [`# ${ep.name}`, '', `Original: ${ep.sourceUrl}`, '', ...ep.sourceBlocks.flatMap(block => {
    if (block.type === 'image') return [`![${block.text}](${block.url})`, ''];
    return [`${block.type === 'heading' ? '## ' : ''}${block.text}`, ...(block.links || []).map(link => `[${link.text || link.url}](${link.url})`), ''];
  })].join('\n');
  await writeFile(join(outputDir, 'original-pages', `${ep.slug}.md`), markdown);
}
const reviewCount = episodes.filter(ep => ep.warnings.length).length;
const document = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>HKML archive import review</title><style>body{font:16px/1.65 system-ui;background:#f4f6f8;color:#132033;max-width:1040px;margin:40px auto;padding:0 20px}h1,h2{line-height:1.2}a{color:#00697b}article{padding:24px;margin:20px 0;background:white;border:1px solid #dce2e9;border-radius:12px}li{margin:6px 0}.flags{background:#fff5dc;padding:16px 32px}summary{cursor:pointer;font-weight:600;padding:12px 0}.source p{white-space:pre-wrap}.muted{color:#526075}</style><h1>HKML archive import review</h1><p>${episodes.length} pages collected from ${discovered.size} discovered episode URLs. ${reviewCount} pages have review flags; ${failures.length} fetch failures. This is a source-extraction snapshot, not a live Notion status report; see START-HERE.md for the import outcome.</p><p>All imports start unpublished (Draft or Not started). Missing facts stay blank. Original text and links are included below each entry and in the Markdown backup. Extracted names and field boundaries should be checked before publishing.</p>${failures.length ? `<pre>${escapeHtml(JSON.stringify(failures,null,2))}</pre>` : ''}${episodes.map(ep => `<article><h2>S${ep.season} E${ep.episode}: ${escapeHtml(ep.name)}</h2><p><a href="${escapeHtml(ep.sourceUrl)}">Original episode</a></p><p><strong>Date:</strong> ${escapeHtml(ep.start || 'Needs review')}<br><strong>Venue:</strong> ${escapeHtml(ep.venue || 'Needs review')}<br><strong>Speakers:</strong> ${ep.speakers.length}</p>${ep.warnings.length ? `<ul class="flags">${ep.warnings.map(w=>`<li>${escapeHtml(w)}</li>`).join('')}</ul>` : '<p>No automated flags. Please verify extracted details before publishing.</p>'}${ep.speakers.map((s,i)=>`<details><summary>${i+1}. ${escapeHtml(s.name || 'Name needs review')} — ${escapeHtml(s.talkTitle || 'Title needs review')}</summary><p>${escapeHtml(s.summary || '')}</p><p>${escapeHtml(s.bio || '')}</p>${s.slides?`<a href="${escapeHtml(s.slides)}">Slides</a>`:''}</details>`).join('')}<details class="source"><summary>Complete original text and links</summary>${ep.sourceBlocks.map(b=> b.type==='image'?`<p><a href="${escapeHtml(b.url)}">Original image: ${escapeHtml(b.text || 'image')}</a></p>`:`<p>${escapeHtml(b.text)}</p>${(b.links||[]).map(l=>`<p><a href="${escapeHtml(l.url)}">${escapeHtml(l.text || l.url)}</a></p>`).join('')}`).join('')}</details></article>`).join('')}</html>`;
await writeFile(join(outputDir, 'review.html'), document);
console.log(`Saved ${episodes.length} episodes; ${reviewCount} flagged; ${failures.length} failed. Open ${outputDir}/review.html.`);
if (failures.length) process.exitCode = 1;
