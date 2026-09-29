# Studio recording order: English Lessons 1-4

Audited 28 September 2026 against the current working tree. This is an exact-wording inventory of reachable TTS, not a new script proposal or an audio release.

## Deliverables

- [Printable studio script](../../../output/pdf/AptyRead-English-Lessons-1-4-Studio-Script-v1.pdf): voice brief, exact lines, filenames and delivery notes.
- [Recording workbook](../../../outputs/english-studio-2026-09-28/AptyRead-English-Lessons-1-4-Recording-List-v1.xlsx): one row per unique recording and a map of all 30 topics.
- [Production manifest](lessons-01-04-recordings-v1.json): exact scripts, all current cue IDs, topic usage, proposed paths, exclusions and audited source hashes.

There are **59 unique recordings for 66 active TTS cue IDs**. All four lessons are included: Our First Words, Explore S, Explore A and Explore T. The 12 main video topics retain their embedded audio. Writing on paper is a mode within each writing topic, not an additional topic.

## Reuse

Record these phrases once even though each has two current cue IDs:

| Exact words | App cue IDs | Delivery filename |
| --- | --- | --- |
| Watch. | practice-watch, paper-watch | shared-watch-v1.mp3 |
| Watch again. | practice-watch-again, paper-watch-again | shared-watch-again-v1.mp3 |
| Listen. | link-listen, practice-listen | shared-listen-v1.mp3 |
| Your turn. | link-your-turn, practice-your-turn | shared-your-turn-v1.mp3 |
| Let’s make a word together. | build-intro-at, build-intro-sat | shared-lets-make-a-word-together-v1.mp3 |
| Now tap | build-tap, build-next-tap | shared-now-tap-v1.mp3 |
| Let’s see what it means. | read-done-at, read-done-sat | shared-lets-see-what-it-means-v1.mp3 |

Other reusable lines already share one cue ID across several activities. Similar but different sentences remain separate recordings. The proposed CDN folder is `english/audio/`, consistent with `CDN_MEDIA_STRUCTURE.md`. The `l01` prefix in the few topic-specific names means Level 1; lesson and topic relationships live in the manifest.

## Important recording distinctions

- `Now tap` contains no letter name or phoneme. The app queues the existing `sound-s`, `sound-a` or `sound-t` recording immediately afterward.
- Big/small and writing instructions use letter names: S = ess, A = ay, T = tee. Lowercase a in those instructions is also the letter name, not the article.
- Whole words `at` and `sat` need clear, consistent short-a pronunciation. Review against the existing phoneme and mouth-model recordings.
- The current at story is **Sam is at the door.** Older ball/mat copy is not used.
- Final review reading prompts must stay answer-free: **Your turn to read.** and **Read this word.**
- Sound matching confirms correct responses with the existing phoneme. The main list includes every currently spoken correct-answer, retry and help message. Visual-only praise and star counts are not extra TTS lines.
- The six tracing scripts are generated in `WritingPractice.tsx`, outside `englishNarration`. They are included, with `Start at the dot.` and their exact dynamic cue IDs.

## Coverage and exclusions

The manifest covers normal playback, replay, retry, help, audio-only video fallback, tracing, paper-writing instruction replay and the covered-model attempt. `LessonPlayer` routes all current topics to the dedicated components. Its old `LetterPractice` fallback is not reached by these four lessons.

Nine dictionary entries remain in code but are not used by the current route: `build-find`, `build-next`, `build-retry`, `build-hint`, `build-own-at`, `build-own-sat`, `read-turn`, `read-again`, `read-watch`. They are listed as exclusions in the manifest, not as recordings to commission.

Existing phonemes, teaching-video audio and pronunciation-video audio are not being rerecorded by this order. The app does not listen to the child or assess pronunciation; celebrations reward participation.

## Connecting approved recordings later

After recording, review the takes and verify each public upload URL. Map every `cue_ids` entry in the manifest to its item's MP3 URL in `englishMedia` in `lib/english-curriculum.ts`. Multiple IDs for identical wording should share one URL. Add the six dynamic `instruction-write-...` IDs explicitly; they are not in the narration dictionary's generated media slots.

No CDN URLs were connected by this handoff. Do not paste proposed URLs into the live app until the files exist and playback is checked. Preserve the bundled phoneme entries. Changing narration should trigger a new inventory audit before further recording.

## Validation

The builder reconciles every active dictionary cue plus all six dynamic tracing cues with the recording order, rejects duplicate scripts or filenames, and verifies 30 topics including 12 video topics. The exported PDF and workbook were checked against the manifest and visually reviewed. Source hashes identify the working-tree content audited; this is not an assertion about later app changes.
