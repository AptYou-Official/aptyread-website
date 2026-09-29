# Explore-letter listening practice

Find S and s, Find A and a, and Find T and t share the new `LetterCases` activity. Topic IDs, lesson order, and saved completion remain unchanged. The introductory videos are unchanged.

## Teaching sequence

1. Show the big and small form, without distractors. Cue the big form, then the small form. Each tap plays the bundled phoneme. A failed recording can be retried without advancing.
2. The child chooses **Let’s listen**. Remove the reference pair and ask four sound-to-letter questions. No answer appears in the question heading, no option is highlighted before a response, and only one option represents the requested sound.
3. Replay remains available. A correct choice waits for **Continue**. Positions are shuffled per turn, then remain stable while the child thinks or retries.
4. After four main turns, celebrate with four practice stars and **Next topic**. Five-star reading celebrations are unchanged.

| Lesson | Listening targets in order | Available forms |
| --- | --- | --- |
| Explore S | S, a, t, s | S and lowercase s/a/t |
| Explore A | a, S, t, A | S/A and lowercase s/a/t |
| Explore T | T, a, S, t | S/A/T and lowercase s/a/t |

All Explore lessons follow Our First Words, so the three lowercase letters are already familiar. Every new capital is modelled in the preceding video and in this activity’s guided pair. Capital/lowercase names are used only for the guided instructions; all listening questions use real recorded phonemes, never TTS letter names as substitutes.

## Recoverable support

- An incorrect choice replays the sound without removing a star. Two misses, or **Help me**, show a single matching letter with the recording.
- While help is visible, answer choices are hidden. **Try it** removes the model and replays the sound before choices become available.
- A helped form can return once after the four main turns. At most one extra turn keeps practice short; its completion does not increase the four-star reward.
- Missing TTS does not prevent real phoneme playback. An unheard/failed recording never enables a listening answer. Replay starts the recording directly from the child’s tap.
- Opening the topic menu, hiding the page or leaving the activity cancels narration and stale callbacks. Resuming uses an explicit replay; it does not restart sounds unexpectedly.
- The child advances each turn. There is no time limit, microphone use, pronunciation score or mastery claim. Fine-grained activity state is session-only; existing topic completion remains saved.

## Recording slots and verification

New narration IDs: `cases-big-s`, `cases-small-s`, `cases-big-a`, `cases-small-a`, `cases-big-t`, `cases-small-t`, `cases-same-sound`. Instructions currently use device TTS and accept future CDN recordings through the existing media map.

Run `node scripts/check-english-letter-cases.cjs` for taught-only options, both-case coverage, audio ordering/gating, retry and help, bounded revisits, four-star rewards and interrupted playback. See [VERIFICATION.md](VERIFICATION.md) for browser checks. Offline package: `apty-english-v31-shared-video-folders`.
