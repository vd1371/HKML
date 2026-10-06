import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
const { episodes } = JSON.parse(await readFile('outputs/hkml-migration/episodes.json', 'utf8'));
const urls = new Set();
for (const ep of episodes) {
  for (const value of [ep.cover, ...ep.sourceBlocks.flatMap(b => [b.url, ...(b.links || []).map(l => l.url)])]) {
    if (!value) continue;
    const url = new URL(value);
    if (['www.hkml.ai','hkml.ai'].includes(url.hostname) && /\.(?:png|jpe?g|webp|gif|pdf|pptx?)$/i.test(url.pathname)) urls.add(url.href);
  }
}
const root = resolve('public'), copied = [], failed = [];
for (const url of urls) {
  try {
    const pathname = decodeURIComponent(new URL(url).pathname);
    const file = resolve(root, `.${pathname}`);
    const rel = relative(root, file);
    if (rel.startsWith('..') || isAbsolute(rel) || /[<>:"|?*]/.test(rel)) throw new Error('Unsafe asset path');
    try { await access(file); copied.push({url,path:pathname,status:'existing; preserved'});continue; } catch {}
    const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const type = response.headers.get('content-type') || '';
    if (/text\/html/i.test(type)) throw new Error('Expected an asset, received HTML');
    const data = new Uint8Array(await response.arrayBuffer());
    if (data.length > 40 * 1024 * 1024) throw new Error('Asset exceeds 40 MB limit');
    await mkdir(dirname(file), {recursive:true});
    await writeFile(file, data, {flag:'wx'});
    copied.push({url,path:pathname,bytes:data.length,status:'copied'});
  } catch(error) { failed.push({url,error:error.message}); }
  console.log(`Assets: ${copied.length} saved, ${failed.length} failed, ${urls.size} total`);
}
await writeFile('outputs/hkml-migration/assets-report.json', JSON.stringify({copied,failed},null,2));
if(failed.length)process.exitCode=1;
