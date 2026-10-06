# HKML archive import completed

Verified on 2 October 2026.

- 56 unique episodes are present in your existing Notion database.
- 55 pages were imported; your existing Season 7 Episode 2 page was preserved. Its Season number was corrected from 6 to 7 and its source URL and slug were filled in.
- Every new page was created as Not started. At final verification, 26 pages were Published and 30 were Not started. Existing status changes were preserved.
- All 56 source pages were collected successfully. Original text and outgoing links are retained below the structured speaker sections.
- 56 HKML-hosted assets are saved at their original paths under public/.
- No repeat import is needed.

[Open your Notion database](https://app.notion.com/p/3edbda8464f680a3bb3ef8d6709d5a35?v=3edbda8464f680e1be3d000cfcc5ba4d)

## Review before publishing

Open review.html for the extraction review. 35 source pages have automated review flags; your existing page may already contain corrections not reflected in this source snapshot. Each newly imported flagged page also has an Import review section in Notion. Missing facts stay blank rather than being invented. In particular, Season 1 Episodes 1 and 2 need event dates and venues.

Check flagged dates, speaker names and talk titles. Expand Original archive inside an episode to consult the preserved source. Once a page is ready, change its status to Published and rebuild the website. Review flags can also affect already-published pages.

## Backups and verification

- episodes.json: extracted source data, not a live mirror of later Notion edits.
- original-pages/: a Markdown backup for each original episode.
- receipts/: individual page-creation confirmations and the final unfiltered database inventory.
- import-result.json: verified totals and source-to-Notion links.
- assets-report.json: locally preserved HKML-hosted media.

The existing page and source URLs were checked to avoid duplicates. Representative recent and older pages were fetched after creation to verify content, links and page covers.

## Connect the website build

The Notion app connection enabled this import, but does not supply a private token to the website build. Configure a read-access Notion internal integration connected to this database, then put these values in the project's local .env or your host's encrypted build settings. Never paste the token into chat.

```dotenv
NOTION_TOKEN=your_private_integration_token
NOTION_EPISODES_DATABASE_ID=3edbda8464f680a3bb3ef8d6709d5a35
```

The site reads only Published pages. Its Cover field falls back to the native Notion page cover used by this import. Missing required event details cause pages to be skipped with a warning. Without credentials, the site uses demonstration data, not this historical archive.

## Reusable importer

No further import is required for these 56 episodes. If needed later, follow the root README. The importer supports Draft or Not started, checks existing source URLs, slugs and episode identities, and skips matches. Do not regenerate the archive over an edited manifest without a backup.

## Verification limits

All 13 migration tests pass. Full production-build verification remains blocked by the environment's process-spawn restriction (spawn EPERM). This import did not deploy or change the public website.
