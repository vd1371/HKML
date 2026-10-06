// Build/CLI only. Nothing in this module belongs in browser code.
export const NOTION_VERSION = '2025-09-03';
export function loadEnvironment() {
  try { process.loadEnvFile('.env'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
export function notionId(value) {
  const text = String(value || '').trim();
  const path = /^https?:/.test(text) ? new URL(text).pathname : text;
  const match = path.match(/[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}/i);
  if (!match) throw new Error('Supply the Notion database link or ID, not its view ID.');
  return match[0].replace(/-/g, '');
}
export function createNotionClient(token, { fetcher = fetch, pause = ms => new Promise(resolve => setTimeout(resolve, ms)) } = {}) {
  let lastRequest = 0;
  return async function request(path, method = 'GET', body) {
    if (!token) throw new Error('NOTION_TOKEN is missing. Add it to your local .env; never paste it in chat.');
    for (let attempt = 0; attempt < 5; attempt++) {
      await pause(Math.max(0, 360 - (Date.now() - lastRequest)));
      lastRequest = Date.now();
      let response;
      try {
        response = await fetcher(`https://api.notion.com/v1${path}`, {
          method, headers: { Authorization: `Bearer ${token}`, 'Notion-Version': NOTION_VERSION, 'Content-Type': 'application/json' },
          body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(45000),
        });
      } catch {
        // A create may have succeeded even if its response was lost. Do not retry blindly.
        throw new Error(`Notion ${method} ${path} did not return a response. Stop and rerun the import to check existing pages before retrying.`);
      }
      if (response.status === 429 && attempt < 4) {
        const seconds = Number(response.headers.get('retry-after') || 2);
        await pause(Math.min(60000, Math.max(1000, seconds * 1000))); continue;
      }
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        // Avoid logging arbitrary response text or headers containing sensitive values.
        throw new Error(`Notion ${method} ${path}: HTTP ${response.status} (${data.code || 'request_failed'}). Check database access, property types, and connection permissions.`);
      }
      return response.json();
    }
  };
}
export async function resolveDataSource(request, databaseId, explicitId) {
  const database = await request(`/databases/${notionId(databaseId)}`);
  const sources = database.data_sources || [];
  if (explicitId) {
    const match = sources.find(s => notionId(s.id) === notionId(explicitId));
    if (!match) throw new Error('NOTION_EPISODES_DATA_SOURCE_ID does not belong to the selected database.');
    return request(`/data_sources/${match.id}`);
  }
  if (sources.length !== 1) throw new Error('The database has multiple or no data sources. Set NOTION_EPISODES_DATA_SOURCE_ID to the episodes source.');
  return request(`/data_sources/${sources[0].id}`);
}
export async function listPages(request, sourceId) {
  const results = []; let cursor;
  do {
    const page = await request(`/data_sources/${sourceId}/query`, 'POST', { page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) });
    results.push(...page.results);
    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);
  return results;
}
