# Hong Kong Machine Learning

A small, static Astro site for the HKML community. Episodes come from one Notion database at build time, are normalized into a framework-independent data model, and become static HTML. There is no CMS server, user database, authentication layer, or client-side content fetch.

## Architecture

```text
Notion database + page blocks
          │
          ▼
src/lib/notion.ts  ── fetch, parse, sanitize, pin expiring files
          │
          ▼
src/lib/episodes.ts ── validate, ignore drafts, sort newest first
          │
          ▼
normalized Episode / Speaker objects
          │
          ▼
Astro pages + small reusable components ── static HTML in dist/
```

When Notion credentials are absent, `src/data/sample-episodes.json` is used. It deliberately includes a draft, one- and three-speaker episodes, and missing optional fields so local development covers the important content cases.

## Local setup

Requirements: Node.js 22.16+ (or Node.js 24) and npm.

```sh
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, copy the environment file with:

```powershell
Copy-Item .env.example .env
```

Leaving both Notion values empty is supported and loads the sample data. Before a change is deployed, run:

```sh
npm run check
npm run build
```

The production-ready site is written to `dist/`.

## Connect Notion

1. In Notion, create an **internal integration** from **Settings → Connections → Develop or manage integrations**.
2. Copy its internal integration secret into `NOTION_TOKEN` in `.env` or the deployment platform’s encrypted environment settings.
3. Open the episodes database, choose **Connections**, and add the integration. The token cannot read the database until it is explicitly connected.
4. Copy the database ID from its URL into `NOTION_EPISODES_DATABASE_ID`.
5. Never prefix either variable with `PUBLIC_`; Astro only reads them while building, and they must not be exposed to browser code.

The site uses the stable Notion REST API during the build. It does not contact Notion in the browser.

## Episode database

Use one full-page database with one page per episode. Property names are exact.

| Property | Notion type | Required | Notes |
| --- | --- | --- | --- |
| `Name` | Title | Yes | Episode page title |
| `Slug` | Text | No | Generated from `Name` when empty |
| `Status` | Status or Select | Yes | Only the exact value `Published` is built |
| `Season` | Number | Yes | Used for archive filters and labels |
| `Episode` | Number | Yes | Used for archive filters and labels |
| `Event date` | Date | Yes | Add an end time when known |
| `Venue` | Text | Yes | Short venue name |
| `Address` | Text | No | Full address or access detail |
| `Meetup URL` | URL | No | Public registration/event link |
| `Organizer` | Text | No | Person or team |
| `Sponsor` | Text | No | Hidden cleanly when empty |
| `Cover` | Files & media | No | Falls back to the page cover; copied into the static build when Notion-hosted |
| `Excerpt` | Text | No | Card copy and meta description |
| `Introduction` | Text | No | Longer event-page introduction; falls back to `Excerpt` |
| `Tags` | Multi-select | No | Compact topic labels |
| `Source URL` | URL | For migrated episodes | Original permalink; used for deduplication and exact legacy redirects |

Published pages missing `Name`, `Season`, `Episode`, `Event date`, or `Venue` produce an actionable build warning and are skipped. Missing optional speaker fields also warn, but never fail the build.

## Speaker page template

Put speaker details in the episode page body. Each speaker starts with a heading whose text begins with `Speaker`; the heading level and number do not matter. There is no fixed speaker count.

```text
# Speaker 1

Name: Alex Hunsberger
Topic: MAVRAG: Multi-Agent Vectorless RAG
Bio: Alex works on...
Summary: Learn from trial and error...
Photo: [image or linked image URL]
Slide: [file or URL]

# Speaker 2

Name: ...
Title: ...
Bio: ...
Abstract: ...
```

`Topic` and `Title` are equivalent. `Summary` and `Abstract` are equivalent. Photos may be a Notion image block or a URL on the `Photo:` line; slides may be a Notion file/PDF block or a URL on the `Slide:`/`Slides:` line. Paragraphs after a field are appended to that field until another labelled field appears.

For the most reliable editing experience, keep the six labelled fields as separate paragraphs and use a heading for every speaker. A missing photo, bio, abstract, sponsor, or slide simply removes that part of the card.

## Publishing an episode

1. Add a page to the episodes database.
2. Complete the required event properties.
3. Add one or more `Speaker` sections to the page body.
4. Preview locally with `npm run dev` if desired.
5. Change `Status` to `Published`.
6. Trigger a deployment/build on the static host, or run `npm run build` and deploy `dist/`.

The repository supplied for this refactor contained no prior host configuration, so the site does not assume Netlify, Vercel, Cloudflare Pages, or GitHub Pages. On any of those platforms the build command is `npm run build`, the output directory is `dist`, and the two Notion values belong in encrypted build-time environment variables. The simplest manual trigger is the host’s **Redeploy** / **Deploy latest commit** button after publishing in Notion.

If automatic refreshes become necessary, add a scheduled build in the existing hosting platform or a small scheduled GitHub Action. A custom webhook server is intentionally not part of this project.

## Bulk-import the existing archive

The one-time migration into your supplied database is complete: 56 unique episodes are present, including your existing page. See `outputs/hkml-migration/START-HERE.md` for the verified outcome. No repeat import is needed. New pages were created with your database's `Not started` status; the reusable importer supports either `Draft` or `Not started`. Website builds still need their own private integration credentials; the connected Notion app does not populate the project's `.env`.

The `scripts/migration/` commands collect the public archive once and create Draft episode pages in the same Notion database. The prepared data and human-readable review are in `outputs/hkml-migration/`; start with its `START-HERE.md` and `review.html`. All original text and outgoing links are preserved in the Notion page body below the normalized speaker sections, even when extraction needs review.

The supplied database link resolves to `3edbda8464f680a3bb3ef8d6709d5a35`. Set that as `NOTION_EPISODES_DATABASE_ID` in the local `.env`, alongside a private `NOTION_TOKEN`. The integration needs Read, Insert and Update content access and must be connected to the database. Do not put a token in chat or commit `.env`. The scripts read `.env` automatically.

```sh
# Already done for the included archive; these replace generated data:
npm run archive:collect
npm run archive:assets

# Read-only remote duplicate/schema check once .env is configured:
npm run archive:preview

# Create missing properties and new Draft pages after reviewing the plan:
npm run archive:import -- --setup
```

The preview works without credentials, but cannot check remote duplicates until access is configured. Every imported page is a Draft regardless of its manifest status. Imports preserve existing pages and use Source URL, Slug, and Season/Episode to avoid duplicates. Ambiguous number collisions are not imported. All content for an episode is sent in one page-creation request; text is split within Notion limits. Rate limiting honors Retry-After. Lost write responses are not blindly retried. Keep the journal in `work/` when resuming and run only one importer at a time.

Review flagged facts, then change the completed rows to Published together and rebuild. Missing facts remain blank; the importer does not substitute post dates for event dates. `episodes.json` can be edited before importing, but running collection again regenerates it and replaces those edits. The cache is under `work/migration-cache/`; `--refresh` intentionally reloads the live site.

Both the importer and site reader use the [Notion 2025-09-03 data-source API](https://developers.notion.com/guides/get-started/upgrade-guide-2025-09-03). The data source is discovered from the database ID. For a database with multiple sources, set `NOTION_EPISODES_DATA_SOURCE_ID` explicitly. This still uses one database, not a separate speaker database.

`npm run archive:test` exercises date conflicts, missing fields, changing programme formats, source preservation, API size limits, duplicate detection, pagination, rate limiting and interrupted-write handling. Real database access still requires your connection credentials.

## Routes and compatibility

- `/` — introduction, latest episode, recent episodes
- `/episodes/` — all published episodes, newest first, with a small season filter
- `/episodes/[slug]/` — structured event and speaker page
- `/about/` — community introduction
- `/categories/` and `/tags/` — retained compatibility routes
- `/YYYY/MM/hong-kong-machine-learning-season-N-episode-N/` — generated redirects to the new episode pages (static HTML redirects on generic hosts; configure host-level 301s when available)

The site remains readable without JavaScript. Only archive filtering is enhanced by a tiny inline script; without it, every published episode stays visible.

## Content and implementation assumptions

- The supplied workspace was empty, so there was no generator, deployment configuration, or content repository to preserve. Astro static output was selected under the migration rule in the brief.
- The current public HKML logo, six recent public event covers, historical permalink convention, Meetup, LinkedIn, YouTube, and Facebook links were retained from the live site.
- The live archive has some inconsistent event/post dates (for example, Season 6 Episode 6 has an October post path and December event copy). Migrated pages retain their exact Source URL for legacy redirects regardless of event date. Non-migrated pages fall back to an Event date-derived path.
- Sample speaker descriptions are development fixtures, not an authoritative migration of the live archive. Replace them by connecting the real Notion database.
- Notion-hosted image and document URLs expire. The adapter copies those files into `public/notion/` during each build, creates 640 px and 1200 px responsive WebP variants for raster images, and renders local static URLs. External URLs remain external after protocol validation.
