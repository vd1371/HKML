import { readFile, mkdir, writeFile } from 'node:fs/promises';

// The authenticated connector uses Notion-flavored Markdown and SQLite-style
// properties rather than the REST payload. Use only after checking the live schema.
const escape = (text = '') => String(text).replace(/[\\*~`$\[\]<>{}|^]/g, c => `\\${c}`);
const link = (label, url) => `[${escape(label)}](${url.replace(/\(/g,'%28').replace(/\)/g,'%29')})`;
export function connectorPage(ep, status = 'Not started') {
  if (!['Draft','Not started'].includes(status)) throw new Error('Migration pages must be unpublished.');
  const content = ['Imported from the public HKML archive. Review extracted facts before publishing.', link('Original episode', ep.sourceUrl)];
  if (ep.warnings.length) content.push('## Import review', ...ep.warnings.map(w=>escape(w)));
  if (ep.originalDateText) content.push(`Original date wording: ${escape(ep.originalDateText)}`);
  ep.speakers.forEach((s,i)=>{
    content.push(`## Speaker ${i+1}`,`Name: ${escape(s.name)}`);
    for(const [label,key] of [['Title','talkTitle'],['Bio','bio'],['Summary','summary']]) if(s[key]) content.push(`${label}: ${escape(s[key])}`);
    if(s.photo)content.push(`Photo: ${link('Photo',s.photo)}`);
    if(s.slides)content.push(`Slide: ${link('Slides',s.slides)}`);
  });
  content.push('## Original archive');
  const original = ep.sourceBlocks.flatMap(b=>b.type==='image'?[link(b.text||'Original image',b.url)]:[`${b.type==='heading'?'### ':''}${escape(b.text)}`,...(b.links||[]).map(l=>link(l.text||l.url,l.url))]);
  // Indented toggle content keeps the backup separate from speaker parsing.
  for(let i=0;i<original.length;i+=50)content.push(`<details>\n<summary>Original text and links — part ${Math.floor(i/50)+1}</summary>\n${original.slice(i,i+50).map(s=>'\t'+s.replace(/\n/g,'\n\t')).join('\n\n')}\n</details>`);
  const properties={Name:ep.name,Slug:ep.slug,Status:status,Season:ep.season,Episode:ep.episode,'Source URL':ep.sourceUrl};
  for(const [name,key] of Object.entries({Venue:'venue',Address:'address','Meetup URL':'meetupUrl',Organizer:'organizer',Sponsor:'sponsor',Excerpt:'excerpt',Introduction:'introduction'}))if(ep[key])properties[name]=ep[key];
  if(ep.start){properties['date:Event date:start']=ep.start;properties['date:Event date:is_datetime']=ep.start.includes('T')?1:0;if(ep.end)properties['date:Event date:end']=ep.end;}
  return {properties,content:content.join('\n\n'),...(ep.cover?{cover:ep.cover}:{})};
}

const manifest=JSON.parse(await readFile('outputs/hkml-migration/episodes.json','utf8'));
// This entry was fetched and identified in the destination on 2 October 2026.
const existingSource='https://www.hkml.ai/2025/04/hong-kong-machine-learning-season-7-episode-2/';
const pages=manifest.episodes.filter(ep=>ep.sourceUrl!==existingSource).map(ep=>connectorPage(ep));
await mkdir('work/notion-batches',{recursive:true});
await writeFile('work/notion-batches/first.json',JSON.stringify({parent:{data_source_id:'3edbda84-64f6-8028-89d2-000b8c9b0995'},pages:pages.slice(0,1)}));
for(let i=1;i<pages.length;i+=4)await writeFile(`work/notion-batches/batch-${Math.floor((i-1)/4)+1}.json`,JSON.stringify({parent:{data_source_id:'3edbda84-64f6-8028-89d2-000b8c9b0995'},pages:pages.slice(i,i+4)}));
console.log(`Prepared ${pages.length} connector pages: one verification page plus ${Math.ceil((pages.length-1)/4)} batches. Do not submit twice without rechecking existing pages.`);
