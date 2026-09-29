# AptyRead English web app

The English learning space lives at `/english/dashboard` under the existing website. `/english` opens the dashboard. The main website has a **Learn online** link. Malayalam retains its own routes and installation scope.

## First release implemented

- Five named levels, with Levels 2–5 clearly marked as coming later.
- The four opening lessons plus Lesson 5 (P, I, N), containing 43 topics. See LESSON_FIVE.md for the 13 new topics and temporary main-video introductions.
- Structured sequential access: only Lesson 1, Topic 1 starts unlocked. Completing each topic unlocks the next; finishing a lesson unlocks the following lesson. Reached topics remain available for revision through the lesson cards, player menu and word garden. Locked direct URLs show a return to the next available topic. Unfinished words resume and completed words can be replayed without losing completion. Levels 2–5 remain unavailable until their curriculum is supplied.
- Bunny Stream introductions for s, a and t, choosing portrait on narrow portrait screens and landscape otherwise. Playback keeps the selected recording if the device rotates.
- Actual s, a, t, p, i and n phoneme recordings copied from the supplied native-app assets. Letter names are never synthesized as substitute phonemes.
- Sound practice, letter finding, uppercase/lowercase recognition, and finger/pointer writing practice with a paper alternative.
- Guided `at` and `sat` word building opens directly with ordered letters, a highlighted next letter and box, recorded sound prompts, a synchronized blending animation, two self-paced reading tries, optional parent prompts and five celebration stars. All attempts and replays use the same guided path. The `sat` story shows Sam moving from standing to sitting, followed by two meaning-picture choices.
- Minimal word-activity screens use off-white, indigo and cyan. On phones, the speaker and main action stay in a fixed bottom bar with safe-area padding; optional parent notes can scroll without covering the action. The current topic is named in the player header.
- Optional real-adult word videos can be configured in `englishPronunciationVideos`. A connected clip appears beside the word after the first reading try and only loads on request. There is no video placeholder, mandatory viewing gate, automatic next step, or automatic answer video in the final independent review.
- The `at` meaning scene shows Sam arriving at the door with the spoken sentence “Sam is at the door.” The child reads only `at`; a parent can open an optional conversation prompt.
- “Our First Words” revisits both words, then pairs spoken context and pictures with word choices. It finishes with one word at a time, no pictures and no automatic model of the answer. Both final attempts are required before Lesson 2 unlocks. Completed review topics remain replayable.
- Browser narration for words, directions, questions, and feedback. Approved studio clips override narration when their URLs are added.
- Local progress and partial word-activity resume; duplicate completion is not counted twice. No account, server-side child profile, cross-device sync, microphone recording, or reading assessment.
- Responsive navigation, focused lesson player, safe-area spacing, keyboard controls, reduced-motion support, and home-screen installation guidance.
- Consistent Andika learner typography, including single-storey a/g in lesson names, topic names, letter/word tiles and tracing guides. Regular and Bold are bundled locally from the native app; the homepage wordmark retains its brand typography. The font files and licence are available offline after installation.
- Marketing measurement is excluded from English pages. Entry from the marketing site uses a full page load so its previously loaded scripts do not carry into the learning app.

## Media connections

Edit `lib/english-curriculum.ts` to connect content. Bunny library `619329` is used. `englishVideos` maps an activity ID to its landscape and portrait video IDs; only public IDs belong here, never account/API keys.

All twelve teaching topics across the four opening lessons are connected, each with portrait and landscape recordings. Explore A and Explore T use the supplied Stream IDs and share the writing choices from Explore S. See [EXPLORE_A_T.md](EXPLORE_A_T.md) for the complete mapping and new pencil clips. Video topics now open the Bunny player directly, use its Player.js `ended` event for completion, and reveal a named Next topic CTA after playback. Full-screen playback remains native to the player; the CTA is available when the child returns to the lesson. Missing future videos remain unavailable and cannot be marked complete.

Add studio recordings to `englishMedia` using HTTPS URLs or `/english/media/...` files. Existing keys include `sound-s`, `sound-a`, `sound-t`, `word-at`, `word-sat`, `story-sat`, `question-mat`, and `question-bench`. The complete word-activity recording script and stable IDs are in `lib/english-narration.ts` and `docs/english/WORD_ACTIVITY_AUDIO.md`; `try-again` supports the earlier letter activities. Missing whole-word/instruction recordings fall back to device speech; missing phoneme recordings do not.

Phonemes are short local MP3 files and remain available offline. Bunny videos stream online. Narration availability and voice quality depend on the browser and installed voices. The For grown-ups panel contains the guided activity script; the review retains its Spoken words captions. Opening a fresh word builder starts “Let’s make a word together,” then “Now tap” followed by the first approved phoneme. Browser autoplay rejection exposes Tap to listen in the existing dock and stops the queue instead of skipping the introduction. Partial builds prompt the next letter only. The entry effect cancels on interaction/unmount, waits for a visible page, and avoids duplicate speech during Strict Mode's effect rehearsal. Subsequent prompts say “Now tap” plus the next phoneme. Whole-word turns say “Say at/sat” and “Say at/sat one more time.” New interactions interrupt old audio queues; page hiding and navigation stop playback.

## Installation and offline operation

The manifest and worker are scoped to `/english/`. Installation works on localhost for development and HTTPS in production. The production build registers the worker; the development server deliberately does not cache hot-reload assets.

The worker saves the five app documents, their versioned scripts/styles/fonts, app icons, mascot and the three phoneme recordings during installation. Network-first document navigation falls back to saved pages. Offline internal links use document navigation, since Next.js server-component navigation responses are not interchangeable with HTML. APIs, admin/marketing routes, and third-party media are excluded. If caching or storage is blocked, online use still works.

For releases changing offline files, increment `CACHE` in `public/english/sw.js`. A replacement worker waits until the previous app closes; it does not refresh a child’s in-progress session. Progress has its own versioned key (`apty.english.progress.v1`) and survives app-cache replacement. Browser data removal clears both. Local progress is practice history, not evidence of mastery.

`scripts/create-english-icons.mjs` exports the existing mascot into installation icons; run it only if the source artwork changes. Keep the installation icons under version control.

## Build and checks

Use `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Use `npm start -- -p 3100` to preview the production build, including its service worker. The focused checks in `scripts/check-english.cjs` validate curriculum, durable progress and worker cache boundaries against the production preview; run with `node scripts/check-english.cjs`. Run `node scripts/check-english-audio.cjs` for instruction/phoneme ordering, cancellation, CDN priority, missing voice handling and guidance-mode resume. Run `node scripts/check-english-review.cjs` for the at journey migration, every review transition and reload, incorrect-answer retries, both reading orders and Lesson 2 unlocking.

Before public launch, check the actual installed experience on iPhone/Safari and Android/Chrome, confirm Bunny’s allowed-domain configuration, review phoneme pronunciation and the connected letter-formation models, and conduct a supervised child usability review. Add authentication and server progress only when the intended parent/account flow is agreed. Do not treat five-star completion or self-reported reading tries as speech recognition or assessment.

## Next development steps

1. Review the working opening lessons on real phones and tablets, including video controls, sound clarity, writing size and one-handed navigation.
2. Replace device narration with reviewed studio clips and review the connected formation/case videos.
3. Agree the remaining Level 1 scope before adding subsequent lessons. Keep decoding vocabulary restricted to what has actually been taught, with spoken support for longer language.
4. Design parent accounts, optional cross-device progress and any subscription rules. Keep payment and account administration outside the child’s lesson flow.
5. Run a small family pilot, then publish the app under the main website once content and device checks are complete.

References: [MDN installation guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable), [MDN caching guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching), [Bunny embed/player documentation](https://bunny.net/blog/introducing-player-js-support-for-bunny-stream-advanced-player-control-and-monitoring-api/).

## First lesson objective and progress compatibility

With support as needed, the child connects lowercase s, a and t with their sounds, blends them to build and read at and sat, and begins understanding the words in simple spoken contexts. Reading attempts are practice, not verified speech assessment.

The extended at journey uses stages 0–3 and journeyVersion 2. The original completed stage 2 is restored as stage 3, preserving existing completion and unlocks; new stage-2 records resume the meaning scene. Explicitly reopening a completed at topic starts the new journey. The review stores its own validated substeps and card/reading orders under firstWords. Earlier review completions remain completed; revisiting offers the new experience without removing progress.
Run `node scripts/check-english-word.cjs` to check ordered building, real-phoneme prompts, old partial-build compatibility, two reading attempts, direct entry without a welcome screen, the main action dock and optional video visibility after the first try. The rendered-component tests use isolated in-memory fixtures and do not change browser progress.

## Word studio visual template

Make and Read at/sat share the Apty word studio in WordBuilder. The existing mascot presents a short prompt in a speech bubble; the four-icon journey marks building, reading, meaning and celebration. Raised tiles travel from their actual tapped position into the matching letter slot. Sound highlighting, the blend and a brief Apty nod respond to the child's actions. The drawing and content sequence remain unchanged.

The fixed speaker/action dock works on desktop and mobile. The family icon opens the For grown-ups disclosure, including the spoken script and Undo; Escape closes it. Guidance overlays the learning area instead of taking space from the child’s activity. Motion is brief, apart from the speaking indicator while audio is active. Reduced-motion settings show the placed letter immediately and suppress travel, transitions and celebration particles.

The visual states are transient and never enter learner progress. The existing ordered-letter rules, two reading tries, meaning questions, optional pronunciation model and sequential unlocks remain the same. The mascot is already included in the offline cache. The current cache version is apty-english-v21-letter-links. Sat now uses a cropped 640-square, 175 KB MP4, loaded only when tapped after the first reading try. Optional MP4 requests bypass the service worker so native byte ranges work; videos are not precached. See SAT_VIDEO_DELIVERY.md for the source and CDN handover.

Word completions use WordCelebration: a centered encouragement, a prominent word card, the existing Apty mascot and five rounded gold stars. AchievementStars supplies vector artwork shared with the final first-word review. The brief star entrances preserve the arch; reduced-motion settings show the complete reward immediately. Five stars celebrate participation rather than assessed reading accuracy. Child-facing primary CTAs use bold Andika at 18–22px instead of the former 12–15px, with Next topic receiving the strongest hierarchy. Short landscape layouts place the title/replay beside the reward illustration.

## Complete opening two lessons — 27 September 2026

The first 18 topics now have working activity or teaching-video content. Explore S has both orientations of its three supplied Bunny Stream videos. Letter practice and writing use the Apty companion, larger type and fixed action dock, with brief spoken entry prompts. Writing remains unscored free practice with a paper alternative.

Our First Words opens directly on tappable at/sat cards. Its short welcome plays on visible entry with tap-to-listen recovery if autoplay is blocked. Both cards must be explored before picture matching; both pictures must be matched before the separate reading turns. Correct and retry feedback stays in the companion bubble. The final two-word keepsake uses the same premium celebration artwork as the word builder. Progress migration and sequential unlocking are unchanged.

Make and Read at now includes the 135 KB cropped pronunciation clip after the first reading try and a refreshed doorway scene with tap-to-replay. Both at and sat videos remain optional and load only when requested. The new CDN folder convention is a recommendation; the optimized word clips are currently served from the app. Studio narration is still a future replacement for TTS.

Explore S now uses the supplied capital and lowercase single-stroke paths, a start dot and a replayable Show me demonstration. Tracing geometry is bundled with the app; no CDN is required. Free finger/pointer marks and paper practice remain unscored. See TRACING_ASSETS.md for provenance and behaviour.

Practice the s, a and t Sounds use their supplied CDN mouth-model clips, two child-controlled tap-started turns, and matching local phonemes as video-failure fallbacks. The first completed turn cues one more try; the second fills the final star, then the celebration screen remains until the child chooses the named Next topic. Parent notes and stable studio narration IDs are documented in SOUND_PRACTICE.md. The three small posters are precached; the video is loaded on demand. Partial practice turns are session-only; completed topic progress keeps its existing storage format.

The two letter-finding topics now use LetterSoundLink: three s/a listening choices, then four s/a/t choices. The former Touch and Say s topic was removed because it repeated Practice the s Sound. Brief help pairs the letter with its recorded phoneme and schedules a later unhighlighted revisit when needed. Only taught letters appear; a recorded sound must finish before the child can answer. See LETTER_SOUND_LINKS.md for the sequence, recording IDs and limits. Existing remaining activity IDs preserve completion and unlocks.

Practice rewards now use two, three or four stars tied to the main steps. Small outlined stars fill once as each step finishes; the same count appears at completion. Mouth-model practice uses two stars for two turns. Extra review does not change the goal or the earned count. Word building and Our First Words retain their five-star appreciation artwork. This changes presentation only; no reward totals are stored or used to unlock topics. Service-worker package: apty-english-v22-practice-stars.

My Capital S and My Lowercase s now offer on-screen tracing or paper writing within their existing topic IDs. After tracing, children can try the paper mode or continue. PaperWriting plays the supplied silent CDN demonstration, then offers three self-reported writing tries and three practice stars. The last turn gently covers the model, with Show me available throughout. The main CTA stays in the fixed dock. Model and narration stop on menu, page-hide, parent notes and mode changes. Two tiny local picture guides are precached for video-failure/offline use; MP4s remain on demand. See PAPER_WRITING.md. The final offline package uses apty-english-v24-paper-writing.

The learning home now features the next available topic, compact lesson cards and a separate five-level overview. Lesson cards open a dedicated lesson overview with a prominent continue action and explicit finished/current/locked states. Unpublished lessons stay out of the public learning path while their internal routes remain available during development. The shared topic sheet remains inside the lesson player for quick switching. Existing activity IDs, sequential access and saved progress remain unchanged. See LEARNING_HOME.md. The updated offline package is apty-english-v35-lesson-overview.
