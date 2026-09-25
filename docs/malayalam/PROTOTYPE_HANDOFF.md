# AptyMalayalam homepage and dashboard preview

Implemented 25 September 2026 in the existing AptyRead Next.js website. Prepared for the founder-approved release for team feedback. This is an interface prototype, not a completed literacy course.

## Routes

| Route | Experience |
| --- | --- |
| `/malayalam` | Parent-facing programme homepage using the current indigo, cyan and cream brand, existing Apty mascot, a first-word illustration, five planned levels, FAQs and dashboard entry buttons |
| `/malayalam/dashboard` | Child-facing start/continue card, three selectable word previews, word corner and an optional preview-information disclosure |
| `/malayalam/learn/first-word` | First reading lesson prototype: meaning, forms, choices, joining, explicit tile submission, picture meaning and exact resume |

Both routes carry `noindex, nofollow` during development and are intentionally absent from the public sitemap and existing website navigation. These settings do not provide access control: after deployment, anyone with a page URL can open the preview.

## Working interactions

The new first-reading-lesson entry on the dashboard opens a separate child-led route with ten states. It saves a versioned position, partial tile construction, displayed choice order, first response, one optional supported retry, help and actual audio start/end events under `apty.malayalam.CL1-E01.v1`. The recent event log is capped at 300 entries. It sends no learner events to a server. The previous preview key is retained separately and is never treated as completed lesson prerequisites.

`lib/malayalam-first-lesson.ts` declares the lesson states and record validation. `FirstWordLesson.tsx` supplies the reading activities. `LessonScenes.tsx` contains the new floor and whole-head illustrations for review. The form and word models are intentionally revealed during teaching. A18 must finish before the sound-to-print choice is enabled; W01 must finish before the listening-supported meaning choice is enabled. An unavailable recording does not become an incorrect response; children can replay or continue without a submitted answer. Wrong answers preserve the first response and offer a model plus one supported retry. Reaching the final screen is `reachedEnd`, not mastery.

The reading flow uses static printed forms and the recorded joining model; it does not claim to deliver a formation video or an approved handwriting movement. Writing and tracing are pending those assets. The revised delivery plan is in `LEVEL_1_REVISED_DELIVERY_PLAN.md`; it reconciles the old word inventory and flags new phrase candidates for educator review rather than bulk production.

The dashboard opens three lightweight previews for തറ, തല and മല. Letter slides show a static form with an explicit formation-video placeholder. The final slide offers a visible-model tile match, feedback, retry and an unrestricted return to the dashboard. These slides demonstrate interface behaviour; they do not implement the full three-episode curriculum specification.

Recorded Bunny audio is now connected to these previews. Opening a form plays its F01-F04 model followed by A16. The word slide plays A19, its J01-J03 joining model and U05. Instruction replay plays only U05; model replay intentionally reveals the model. Correct guided tile matching plays A06; an incorrect sequence plays A08 and the joining model. This remains visible-model practice, not an independent assessment. Writing narration is not played over a missing formation video.

`lib/malayalam-audio.ts` maps the exact uppercase uploaded names to `https://aptyread-cdn.b-cdn.net/malayalam/level1/` and `malayalam/shared/`. A25 is not used by the current preview and can be uploaded later. Public playback needs no API key. Existing v1-style filenames in the studio planning documents are superseded by these actual uploaded names for this preview.

One reusable media element plays each sequence. New actions cancel earlier playback; close, navigation away, mute and hidden tabs stop it. Unmuting does not automatically resume; use model replay. Loading stalls and playback failures expose a retry control, preserve the activity, and never trigger incorrect-answer feedback. Only the position is persisted; mute and playback state are per visit. The audio is online-only.

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

`scripts/check-malayalam-audio.cjs` exercises audio cancellation, queues, mute, feedback, blocked playback, missing-file retry and mobile layout with a controlled media double. A separate real-media pass verifies that Bunny recordings decode, play and advance in the browser. This does not validate pronunciation or playback on every physical device; review those with the actual child-facing experience.

`scripts/check-malayalam-first-lesson.cjs` checks the new route, first-response preservation, limited supported retries, explicit submission/undo, partial-build resume, audio-input readiness, skipping without credit, corrupted/blocked storage, responsive layouts and the measurement boundary. Set `PREVIEW_URL` to the active server; this script defaults to port 3101. Its controlled audio test checks activity logic; use the shared real-media suite and physical-device review for playback.

## Next implementation slice

Review the first reading flow and its exact pictures/audio; add its approved writing assets when available. Extend the activity and persistence patterns to E02 retrieval before replay, then E03, as specified in `CHILD_LED_OPENING_THREE_LESSONS.md`. The earlier small previews remain useful for quick audio checks. The current prototype does not include tracing, handwriting evaluation, independent-reading checks, payments or a full learner backend.

Review the parent-facing copy and dashboard with the founder first. Before evaluating children learning independently, supply the exact spoken guidance and teaching models for that slice. Keep help exposure and practice separate from observed performance, as defined in `CHILD_LED_LEARNING_SPEC.md`.
