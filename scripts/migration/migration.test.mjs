import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { normalizeSource, parseSpeakers, safeUrl, readSource } from './archive.mjs';
import { makePayload, importPlan, richText } from './notion-payload.mjs';
import { createNotionClient, notionId, resolveDataSource, listPages } from './notion-client.mjs';

const base = { name: 'HKML S1E1', slug: 'hong-kong-machine-learning-season-1-episode-1', season: 1, episode: 1, sourceUrl: 'https://www.hkml.ai/2018/07/hong-kong-machine-learning-season-1-episode-1/', speakers: [], sourceBlocks: [] };
const p = text => ({ type: 'paragraph', text, links: [] });
const existing = ep => ({ properties: { 'Source URL': { url: ep.sourceUrl }, Slug: { rich_text: [{ plain_text: ep.slug }] }, Season: { number: ep.season }, Episode: { number: ep.episode } } });

test('missing event date stays blank instead of becoming the post date', () => {
  const e = normalizeSource({ ...base, publishedDate: '2018-07-18' });
  assert.equal(e.start, undefined); assert.ok(e.warnings.some(w=>w.includes('Event date')));
});
test('date conflicts and weekday mismatches are surfaced without altering original facts', () => {
  const e = normalizeSource({ ...base, publishedDate: '2019-06-19', sourceBlocks: [p('When?'),p('Wednesday, June 15, 2019 from 7:00 PM to 9:00 PM'),p('Where?'),p('The Hive')] });
  assert.equal(e.start, '2019-06-15T19:00:00+08:00');
  assert.ok(e.warnings.some(w=>w.includes('Saturday')));
  assert.ok(e.warnings.some(w=>w.includes('publication date')));
});
test('numbered talks support chair annotations and stop before video duplicates', () => {
  const result = parseSpeakers([p('Talk 1 (Chaired by Gautier): Real topic'),p('Speaker: Alex Smith'),p('Bio: A researcher'),p('Video Recording of the HKML Meetup on YouTube'),p('Talk 1: Duplicate')], []);
  assert.equal(result.length, 1); assert.equal(result[0].name, 'Alex Smith');
});
test('narrative bullet points do not become speaker names', () => {
  const warnings = [];
  const result = parseSpeakers([{...p('Higher-Level Abstraction — words generated from text'),tag:'p',list:'li'}], warnings);
  assert.equal(result.length, 0); assert.ok(warnings.length);
});
test('repeat runs skip existing sources; numbering collisions require review', () => {
  const result = importPlan([base, {...base, slug:'different',sourceUrl:base.sourceUrl.replace('/07/','/08/')}], [existing(base)]);
  assert.deepEqual(result.map(r=>r.action), ['skip','conflict']);
  assert.deepEqual(importPlan([base,base], []).map(r=>r.action), ['create','skip']);
});
test('imports are always Draft, preserve source URL and original content, and use status type', () => {
  const payload = makePayload({...base, status:'Published', sourceBlocks:[p('<script>alert(1)</script>')]}, 'abc', 'status');
  assert.deepEqual(payload.properties.Status, {status:{name:'Draft'}});
  assert.equal(payload.properties['Source URL'].url, base.sourceUrl);
  assert.equal(payload.properties['Event date'].date, null);
  assert.ok(JSON.stringify(payload.children).includes('<script>'));
  assert.equal(payload.children.at(-1).type, 'toggle');
});
test('rich text is chunked within API limits and dangerous links are excluded', () => {
  assert.ok(richText('x'.repeat(9500)).every(t=>t.text.content.length<=2000));
  assert.equal(safeUrl('javascript:alert(1)'), undefined);
  assert.equal(safeUrl('data:text/html,test'), undefined);
  assert.equal(safeUrl('https://user:password@example.org'), undefined);
});
test('database link is parsed without accidentally using the view ID', () => {
  assert.equal(notionId('https://app.notion.com/p/3edbda8464f680a3bb3ef8d6709d5a35?v=3edbda8464f680e1be3d000cfcc5ba4d'), '3edbda8464f680a3bb3ef8d6709d5a35');
});
test('multiple data sources need an explicit choice', async () => {
  await assert.rejects(resolveDataSource(async()=>({data_sources:[{id:'one'},{id:'two'}]}),'3edbda8464f680a3bb3ef8d6709d5a35'), /multiple/);
});
test('Notion pages are paginated', async () => {
  let calls=0;
  const result=await listPages(async(_path,_method,body)=>{
    calls++; if(calls===1)return{results:[1],has_more:true,next_cursor:'next'};
    assert.equal(body.start_cursor,'next');return{results:[2],has_more:false};
  },'source');
  assert.deepEqual(result,[1,2]);
});
test('rate limits are retried; ambiguous create responses are not', async () => {
  let calls=0;
  const client=createNotionClient('fake-test-token',{pause:async()=>{},fetcher:async()=>{
    calls++;return calls===1?new Response('{}',{status:429,headers:{'retry-after':'1'}}):Response.json({id:'ok'});
  }});
  assert.equal((await client('/pages','POST',{})).id,'ok'); assert.equal(calls,2);
  calls=0;
  const failing=createNotionClient('fake-test-token',{pause:async()=>{},fetcher:async()=>{calls++;throw new Error('timeout');}});
  await assert.rejects(failing('/pages','POST',{}),/Stop and rerun/);assert.equal(calls,1);
});
test('all collected pages fit one atomic Notion create with no truncated original blocks', async () => {
  const { episodes, discovered, failures } = JSON.parse(await readFile('outputs/hkml-migration/episodes.json','utf8'));
  assert.equal(episodes.length,discovered);assert.deepEqual(failures,[]);
  for(const ep of episodes) {
    const payload=makePayload(ep,'preview');
    assert.ok(payload.children.length<=100);
    const preserved=payload.children.filter(b=>b.type==='toggle').flatMap(b=>b.toggle.children);
    assert.equal(preserved.length,ep.sourceBlocks.reduce((n,b)=>n+1+(b.type==='image'?0:(b.links||[]).length),0));
  }
  const recent=episodes.find(e=>e.season===7&&e.episode===5);
  assert.equal(recent.speakers[0].name,'Sébastien Borget');
});
test('HTML extraction ignores navigation, scripts, and unsafe links', () => {
  const source=readSource('<nav>Ignore</nav><main><div class="card"><div class="card-body"><h1>Title</h1><p>Actual text <a href="javascript:alert(1)">bad link</a></p><script>evil()</script></div></div></main>',base.sourceUrl);
  assert.equal(source.sourceBlocks.length,1);assert.equal(source.sourceBlocks[0].links.length,0);
});
