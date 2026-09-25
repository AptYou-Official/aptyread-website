# AptyMalayalam homepage and dashboard preview

Implemented 25 September 2026 in the existing AptyRead Next.js website. Prepared for the founder-approved release for team feedback. This is an interface prototype, not a completed literacy course.

## Routes

| Route | Experience |
| --- | --- |
| `/malayalam` | Parent-facing programme homepage using the current indigo, cyan and cream brand, existing Apty mascot, a first-word illustration, five planned levels, FAQs and dashboard entry buttons |
| `/malayalam/dashboard` | Child-facing start/continue card, three selectable word previews, word corner and an optional preview-information disclosure |

Both routes carry `noindex, nofollow` during development and are intentionally absent from the public sitemap and existing website navigation. These settings do not provide access control: after deployment, anyone with a page URL can open the preview.

## Working interactions

The dashboard opens three lightweight previews for തറ, തല and മല. Letter slides show a static form with an explicit formation-video placeholder. The final slide offers a visible-model tile match, feedback, retry and an unrestricted return to the dashboard. These slides demonstrate interface behaviour; they do not implement the full three-episode curriculum specification.

The last preview and slide are stored under `apty.malayalam.preview.v1` in browser local storage. Closing, stopping and returning preserve that position. No account, name, recording, remote learner record or cross-device synchronization is implemented. A visit does not imply lesson completion or mastery. Tile attempts are transient and unscored; an interrupted tile construction restarts on return to its slide.

Installation support and Malayalam-specific sharing cards were added in a follow-up. See `SHARING_IMAGE_AND_INSTALLATION.md` for the manifest, platform guidance, scope, image provenance and verification boundaries. Installed launch goes directly to the dashboard; this remains an online preview without offline cold launch.

Missing or invalid storage returns to a fresh preview. If storage is blocked, the experience remains usable for the current visit and explains that it cannot retain the position. Future accounts and multiple learners on a shared device will require an explicit learner model; this prototype has one anonymous browser position.

The native preview dialog supports Escape, an explicit close button, focus containment and returning focus to its trigger. Mobile navigation sits at the bottom; desktop navigation is on the left. Malayalam text uses a locally served Next.js font asset generated from Noto Sans Malayalam during build. No browser request to Google Fonts is required.

## Marketing measurement boundary

`components/SiteMeasurement.tsx` contains the existing Google Ads and Vercel Analytics integration. It omits measurement on `/malayalam` and `/hindi` route trees. Other website routes retain their previous measurement behaviour.

All links into and out of the Malayalam area use full document navigation. Preserve this boundary when adding links from the existing public header: conditionally unmounting a script component alone does not stop JavaScript already loaded on a previous page. Do not replace programme entry anchors with client navigation without reviewing this requirement. A future independently deployed learner application could provide a stronger structural boundary.

## Validation

`scripts/check-malayalam-preview.cjs` checks homepage navigation, FAQs, all three previews, word-corner navigation, correct and incorrect tile matching, retry, Escape and focus restoration, position persistence, malformed storage, blocked storage and absence of marketing requests on the Malayalam pages. It checks widths of 320, 390 and 768 pixels in addition to the desktop capture. Screenshots and the JSON report are stored in `docs/malayalam/prototype-review`.

The browser check uses Playwright and a local Chromium-family browser. Set `PLAYWRIGHT_MODULE` to the available Playwright module, `EDGE_PATH` if needed, and `PREVIEW_URL` to the running preview (default `http://localhost:3100`). Then run `node scripts/check-malayalam-preview.cjs`. Existing `next lint`, TypeScript and `next build` checks cover compilation; browser checks do not validate pedagogical effectiveness.

## Next implementation slice

Replace these intentionally small previews with the reviewed activities in `CHILD_LED_OPENING_THREE_LESSONS.md`, using a reusable activity player and explicit content IDs. Add reviewed spoken guidance, illustrations, formation paths and video assets as they become ready. The current prototype does not include audio, tracing, handwriting evaluation, independent-reading checks, payments or a full learner backend.

Review the parent-facing copy and dashboard with the founder first. Before evaluating children learning independently, supply the exact spoken guidance and teaching models for that slice. Keep help exposure and practice separate from observed performance, as defined in `CHILD_LED_LEARNING_SPEC.md`.
