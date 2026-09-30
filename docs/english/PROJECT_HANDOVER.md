# AptyRead English — project handover

**Current implementation (30 September 2026):** the complete Level 1 prototype is described in [LEVEL_ONE_PROGRAMME.md](LEVEL_ONE_PROGRAMME.md). It has 10 core lessons / 65 activities, 24 optional letter routes, an isolated grown-up preview, and a [replaceable media registry and recording plan](media/README.md). The [opening journey refinement](OPENING_JOURNEY_REFINEMENT.md) embeds optional formation invitations after new sounds, connects all 48 completed handwriting clips and distinguishes guided practice from My turn. These contracts supersede the scope, ordering and publication boundaries in the historical snapshot below. The original activity/media IDs and saved participation remain supported.

**Activity refinement:** directions now give the current action in short phrases; guided tile placement avoids repeating a full instruction queue after each tap. Programme screens use one primary Listen control and update the prompt after the model. Book preparation is paced across 3–6 small cards with saved position, relevant visual models and a read-together fallback. Twenty revised legacy cues use current TTS instead of stale v1 wording until exact replacements are explicitly registered. Stories, taught phonemes and independent first attempts retain their learning purpose. Activity surfaces use the established mint/cream palette, clearer letter contrast and restrained cues. See the [verification record](LEVEL_ONE_VERIFICATION.md) and recording plan for current checks and scripts.

Updated 28 September 2026, after adding Lesson 5 Topic 13. This preserves the important decisions from the long development conversation. Verify the current code and working tree before making changes; later user instructions supersede this snapshot.

## Purpose and audience

AptyRead aims to support children from their first sounds towards fluent, meaningful reading. “Every child reads” is the mission, not a guaranteed outcome. Target: children aged 4–10, especially ESL learners in India and GCC countries. Directions must be short, understandable, demonstrated and replayable. App support should work without routine adult intervention, while parents can pause, talk in their home language and join in.

The five proposed stages are Sounds into First Words; First Reading with Meaning; Letter Teams and Longer Words; Vowel Patterns and Sustained Reading; Independent Reading. The user supplied a detailed v0.3 curriculum map, but it is a revisable proposal, not an instruction to author all future blocks or migrate the app. Its older opening-topic counts differ from the current implementation. Do not silently restore those counts.

## Agreed learning and experience principles

- This is structured learning. Current navigation unlocks sequentially: level, lesson, then topic. Completed topics remain available to replay. Keep progress and support records distinct from verified learning.
- Teach sound–letter connections, blending, spelling and meaning cumulatively. Use only taught code/structures for assigned reading. Known letters alone do not establish that a word's structure has been taught.
- Richer sentences may be spoken and pictured while the child reads only the known target word. Pictures should not give away an intended first decoding opportunity.
- Earlier word builders give explicit ordered guidance. Later application gradually reduces help, with recoverable errors and optional modelling. Avoid simply adding every possible word as a compulsory topic.
- Reading attempts are self-reported and unassessed orally. There is no microphone recording, speech score or pronunciation assessment. Five reading stars appreciate effort. Sound-practice stars correspond to two tap-started turns; letter-finding rewards reflect actual rounds.
- Handwriting runs alongside reading. Tracing and optional paper writing are alternatives within the writing topic; paper writing is not a compulsory access gate.
- Child controls pace. No forced timed advancement. Minimise on-screen words and unnecessary narration. Clear replay/help, short prompts and resumable progress matter.

## Visual direction

Premium, elegant, lively PWA with a native-app feel. Off-white background, Apty in indigo and Read in cyan. Use the existing Apty mascot, soft dimensional tiles, restrained movement, clear feedback, large readable CTAs and fixed bottom actions on mobile. Current child-facing font is Andika, including its single-storey a. Avoid crowded instructional screens, long paragraphs, unnecessary introduction screens, random-game presentation, fake video placeholders inside reading turns and small CTA text.

The current activity screens and dashboard are established templates. Extend them consistently rather than redesigning everything by default. “You + Apty. Let’s do this!” is retained as motivating dashboard copy. Public topic wording uses “Meet s,” not unfamiliar phonetic notation.

## Implemented scope: eight lessons, 60 topics

| Lesson | Route ID | Topics | Contents |
|---|---|---:|---|
| S, A, T — Our First Words | first-words | 11 | Meet/practise s, a and t; find a/t; make/read at and sat; review both words |
| Explore S | explore-s | 6 | Big/small introduction; form/sound activity; capital writing video/practice; lowercase writing video/practice |
| Explore A | explore-a | 6 | Same Explore template |
| Explore T | explore-t | 6 | Same Explore template |
| P, I, N — More Little Words | more-words | 13 | Meet/practise/find p, i and n; make/read pin and sit; pin/sit review; More Words with Apty |
| Explore P | explore-p | 6 | Shared Explore format; main videos are temporary previews; P/p listening and writing |
| Explore I | explore-i | 6 | Shared Explore format; main videos are temporary previews; I/i listening and writing |
| Explore N | explore-n | 6 | Shared Explore format; main videos are temporary previews; N/n listening and writing |

Lesson 5 Topic 13 (`more-words-with-apty`) teaches **pan, then tap**. For each: first reading opportunity without a picture or automatic answer → spoken model and another try → meaning scene → hide answer, hear and build with four taught-letter tiles → read back. Optional real-phoneme help is available; repeated difficulty gives the next sound and a letter highlight. Wrong selections do not alter the built prefix. Undo, pause and resume work. After both words, five appreciation stars. Tap means tapping a table in this activity. These are teaching words, not reserved assessment items.

Topic 13 stores its state in `application`, separately from `words`, Lesson 1 `firstWords`, and Lesson 5 `moreWords` review. Existing 42-topic completion unlocks the new topic without deleting earlier progress. The former Lesson 1 `find-s` topic was removed because it duplicated Practice the s Sound; older saved progress is migrated past it. Word garden has at/sat/pin/sit and a paired pan/tap practice card.

## Media and recordings

- Main teaching videos use Bunny Stream library 619329, with portrait/landscape IDs stored in `lib/english-curriculum.ts`. Existing S/A/T and Explore lesson IDs are already connected; read code rather than asking the user to repeat them.
- Main Meet p/i/n videos are still pending. Their topics explicitly say Video coming soon and provide recorded-phoneme listen-and-try introductions. These record `audioIntroductions` provenance; do not imply a missing video was watched.
- Explore P/I/N main videos are still pending. Their explicitly labelled previews lead into the next guided activity and record `practicePreviews`, separate from a watched-video or audio-introduction record. Add approved IDs without changing the activity IDs; the real player will replace the preview automatically.
- Sound-practice mouth videos use `https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-sound-video-clips/sound-{letter}.mp4`.
- Paper-writing clips use the shared `english/level1/videos/letter-writing-video-clips/` folder, with `draw-big-{letter}.mp4` / `draw-small-{letter}.mp4`. Existing crop/poster/configuration lives in code.
- At and sat adult pronunciation clips are connected. **Pin and sit are the next priority. Pan and tap are useful optional clips to record in the same batch.** No URLs have been supplied for those four. Their video controls remain hidden until configured; whole-word TTS works now. Optional pronunciation video appears only after a first reading try.
- Isolated phonemes are real bundled recordings, not TTS letter names. Source supplied by user: `E:\aptyread_new\assets\audio\shared\phonemes`. Current used sounds are bundled in `public/english/media`.
- Short spoken instructions and whole words use TTS until approved studio recordings arrive. Prefer available neutral US female voice; browser TTS cannot guarantee an age or identical voice across devices.
- Stable narration IDs and exact lines live in `lib/english-narration.ts`; connect recordings via `englishMedia` in the curriculum file. First-four-lesson studio material is under `docs/english/studio/`. Lesson 5 additions and filenames are in `docs/english/LESSON_FIVE.md`.
- User also supplied tracing data in `E:\aptyread_new\assets\curriculum\letter-tracing-data.json` and SVGs under `E:\aptyread_new\assets\letter-paths`; existing S/A/T traces have been integrated.

## Workspace and implementation

- Project: `E:\aptyread-business`, Next.js 14.2 / React 18 / TypeScript, Windows PowerShell.
- Branch at handover: `codex/english-pwa-learning-experience-2026-09-27`. Keep work off main. This handover is included in the 28 September English save point; inspect Git status and the upstream before assuming later changes are committed or pushed. Unrelated Malayalam/doc/output files remain in the workspace. Preserve them.
- Local preview last running on port 3100. QA origin was `http://127.0.0.2:3100`; browser progress differs by origin. The QA origin completed all 43 topics through normal controls, then reopened Topic 13 for replay. Check whether the server is still running before starting another.
- Core files: `lib/english-curriculum.ts`, `english-progress.ts`, `english-narration.ts`, `english-application.ts`; `components/english/LessonPlayer.tsx`, `MoreWords.tsx`, `ApplicationScene.tsx`, `WordBuilder.tsx`, `FirstWordsReview.tsx`, `WordPronunciation.tsx`, `WordCelebration.tsx`; `app/english/english.css`.
- PWA worker: `public/english/sw.js`, version `apty-english-v34-explore-pin`; the offline package includes the three new lesson documents and six small writing guides. Remote videos still need connectivity; offline narration depends on available device voices.

## Verification and remaining work

Latest production build, TypeScript/lint and all English check scripts passed. The focused Explore P/I/N suite covers 43-to-61 topic migration, sequential access, honest placeholder provenance, replacement by future media, all six writing clips, and letter-specific tracing guides. Browser/child validation of the temporary previews and final media remains pending. See `docs/english/EXPLORE_P_I_N.md` and `docs/english/VERIFICATION.md`.

These are local software checks, not teacher/child trials or proof of learning efficacy. Further child/parent feedback, studio voice review, media review, and curriculum validation remain necessary. The first word book and later C/M/E work remain future curriculum tasks.

Read `docs/english/LESSON_FIVE.md` for the latest learning flow and recording addendum, `PWA_IMPLEMENTATION.md` for architecture, and relevant component-specific notes when needed. Preserve accepted learning/design decisions unless the user changes them or evidence warrants a clearly explained revision.
