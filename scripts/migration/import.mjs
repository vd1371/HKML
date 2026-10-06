import { readFile, writeFile, mkdir, open } from 'node:fs/promises';
import { createNotionClient, loadEnvironment, notionId, resolveDataSource, listPages } from './notion-client.mjs';
import { propertyTypes, defaultSchema, makePayload, importPlan } from './notion-payload.mjs';

loadEnvironment();
const args = process.argv.slice(2);
function option(name, fallback) { const index = args.indexOf(name); return index < 0 ? fallback : args[index + 1]; }
const apply = args.includes('--apply'), setup = args.includes('--setup');
const filename = option('--file', 'outputs/hkml-migration/episodes.json');
const manifest = JSON.parse(await readFile(filename, 'utf8'));
if (manifest.formatVersion !== 1 || !Array.isArray(manifest.episodes) || !manifest.episodes.length) throw new Error('Invalid or empty migration manifest.');
const token = process.env.NOTION_TOKEN;
const databaseId = option('--database', process.env.NOTION_EPISODES_DATABASE_ID);
if (apply && (!token || !databaseId)) throw new Error('Import needs NOTION_TOKEN and NOTION_EPISODES_DATABASE_ID in .env. Run without --apply to prepare a local preview.');
const episodes = manifest.episodes;
for (const ep of episodes) {
  if (!ep.name || !ep.slug || !/^https:\/\/www\.hkml\.ai\//.test(ep.sourceUrl) || !Number.isFinite(ep.season) || !Number.isFinite(ep.episode)) throw new Error('Manifest contains an invalid episode identity.');
  makePayload(ep, 'preview'); // Check every payload before any remote mutation.
}
await mkdir('outputs/hkml-migration', { recursive: true });
let source, existing = [], request, draftStatus = 'Draft';
if (token && databaseId) {
  request = createNotionClient(token);
  source = await resolveDataSource(request, notionId(databaseId), process.env.NOTION_EPISODES_DATA_SOURCE_ID);
  const schema = source.properties, missing = {}, incorrect = [];
  for (const [name, expected] of Object.entries(propertyTypes)) {
    if (!schema[name]) missing[name] = defaultSchema()[name];
    else if (schema[name].type !== expected && !(name === 'Status' && schema[name].type === 'status')) incorrect.push(`${name}: expected ${expected}, found ${schema[name].type}`);
  }
  if (missing.Name && Object.values(schema).some(p => p.type === 'title')) throw new Error('Rename the existing title property to Name, then retry. No data was changed.');
  if (incorrect.length) throw new Error(`Property types need attention: ${incorrect.join('; ')}`);
  if (Object.keys(missing).length) {
    if (apply && setup) {
      source = await request(`/data_sources/${source.id}`, 'PATCH', { properties: missing });
      console.log(`Added missing properties: ${Object.keys(missing).join(', ')}`);
    } else if (apply) throw new Error(`Missing properties: ${Object.keys(missing).join(', ')}. Re-run with --setup --apply to add them.`);
    else console.log(`Would add missing properties with --setup --apply: ${Object.keys(missing).join(', ')}`);
  }
  const status = source.properties.Status;
  const statusOptions = status?.[status.type]?.options || [];
  draftStatus = statusOptions.some(o => o.name === 'Draft') ? 'Draft' : 'Not started';
  if (status && (!statusOptions.some(o => o.name === draftStatus) || !statusOptions.some(o => o.name === 'Published'))) throw new Error('Status needs Draft (or Not started) and Published options. Add these options in Notion and retry.');
  existing = await listPages(request, source.id);
} else console.log('Local preview only. Database access is not configured; existing Notion pages cannot be checked yet.');
const plan = importPlan(episodes, existing);
await writeFile('outputs/hkml-migration/import-plan.json', JSON.stringify({ checkedRemote: !!source, databaseId: databaseId ? notionId(databaseId) : undefined, entries: plan.map(({episode,action,reason})=>({name:episode.name,sourceUrl:episode.sourceUrl,action,reason,status:draftStatus})) }, null, 2));
const counts = Object.fromEntries(['create','skip','conflict'].map(action=>[action,plan.filter(p=>p.action===action).length]));
console.log(JSON.stringify(counts));
if (!apply) {
  console.log('No Notion pages changed. Use --apply after reviewing outputs/hkml-migration/review.html.');
} else {
  // An append-only journal records intent before every remote write. An unresolved
  // intent stops retries when a response is lost, avoiding silent duplicate pages.
  await mkdir('work', { recursive: true });
  const journalPath = `work/notion-import-${notionId(databaseId)}.jsonl`;
  let journalText = '';
  try { journalText = await readFile(journalPath, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const journal = journalText.trim() ? journalText.trim().split('\n').map(line=>JSON.parse(line)) : [];
  const state = new Map(journal.map(entry=>[entry.sourceUrl, entry]));
  const log = await open(journalPath, 'a');
  try {
    for (const item of plan) {
      if (item.action !== 'create') { console.log(`${item.action}: ${item.episode.name}`); continue; }
      const ep = item.episode, prior = state.get(ep.sourceUrl);
      if (prior) throw new Error(`Journal records an earlier attempt for ${ep.sourceUrl}, but the page was not found. Inspect Notion and ${journalPath} before retrying. No duplicate was created.`);
      await log.write(`${JSON.stringify({sourceUrl:ep.sourceUrl,state:'pending',at:new Date().toISOString()})}\n`); await log.sync();
      const page = await request('/pages', 'POST', makePayload(ep, source.id, source.properties.Status.type, draftStatus));
      await log.write(`${JSON.stringify({sourceUrl:ep.sourceUrl,state:'created',pageId:page.id,url:page.url,at:new Date().toISOString()})}\n`); await log.sync();
      console.log(`Created ${draftStatus}: ${ep.name}`);
    }
  } finally { await log.close(); }
  console.log(`Import complete. Existing pages were preserved; imported pages are ${draftStatus}. Review before publishing.`);
}
