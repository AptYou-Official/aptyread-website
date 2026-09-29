# Word activity narration and studio handover

**Current studio order (28 September 2026):** use the [four-lesson recording pack](studio/README.md) for deduplicated filenames and the complete current TTS list. The table below is the earlier word-activity cue reference, not an additional recording order.

The guided `at` and `sat` activities use recorded phonemes and device TTS for English instructions, whole words, questions and encouragement. All spoken copy is in `lib/english-narration.ts`. Keep each recording ID stable so progress and activity code do not need to change when recordings arrive.

## Connect a studio recording

Add or replace the matching entry in `englishMedia` in `lib/english-curriculum.ts`, after the generated narration slots. For example:

```ts
'build-intro-sat': 'https://YOUR-CDN/english/build-intro-sat.mp3',
'word-sat': 'https://YOUR-CDN/english/word-sat.mp3',
'story-sat': 'https://YOUR-CDN/english/story-sat.mp3',
```

Use public HTTPS media URLs, without account secrets or API keys. A connected recording takes priority over TTS. With no URL, the device speaks the script. A failed connected recording displays a retry message. Phonemes never use TTS.

Record each instruction as its own clip. `build-tap` and `build-next-tap` are followed by a separate approved phoneme recording; do not append a letter name or phoneme to those instruction clips. Trim excess silence around the phoneme files so the blend remains clear. The visual sound sweep follows actual clip completion, then the whole-word recording. No automatic next-topic timer is used.

## Recording list

| Recording ID / suggested filename | Spoken English |
| --- | --- |
| build-intro-at.mp3 | Let’s make a word together. |
| build-intro-sat.mp3 | Let’s make a word together. |
| build-tap.mp3 | Now tap |
| build-next-tap.mp3 | Now tap |
| build-ready.mp3 | Put the sounds together. |
| word-at.mp3 | at |
| word-sat.mp3 | sat |
| say-at.mp3 | Say at. |
| say-sat.mp3 | Say sat. |
| say-again-at.mp3 | Say at one more time. |
| say-again-sat.mp3 | Say sat one more time. |
| read-done-sat.mp3 | Let’s see what it means. |
| read-done-at.mp3 | Let’s see what it means. |
| story-at.mp3 | Sam is at the door. |
| story-sat.mp3 | Sam sat on the mat. |
| question-mat.mp3 | Sam sat on the mat. Tap the picture. |
| question-bench.mp3 | Sam sat on the bench. Tap the picture. |
| meaning-correct.mp3 | You found it! |
| meaning-retry.mp3 | Who sat down? |
| celebrate-sat.mp3 | You made sat. Well done! |
| celebrate-at.mp3 | You made at. Well done! |
| review-intro.mp3 | Let’s play with our first words. |
| review-listen.mp3 | Tap each word to listen. |
| review-find-at.mp3 | Sam is at the door. Find at. |
| review-find-sat.mp3 | Sam sat on the mat. Find sat. |
| review-correct-at.mp3 | You found at! |
| review-correct-sat.mp3 | You found sat! |
| review-retry.mp3 | Try again. |
| review-read.mp3 | Your turn to read. |
| review-read-next.mp3 | Read this word. |
| review-finish.mp3 | Two words. Well done! |

## Interaction and delivery notes

- Temporary narration requests US English and prefers an available Microsoft Aria, Jenny, Ava or Zira voice. The voice list is read for each cue, including after it loads asynchronously. Devices without one of these voices use their available US English voice or the browser's en-US fallback. Voice quality and availability vary by device; speaker age cannot be selected through Web Speech. Pitch stays natural, with a slightly slower speaking rate.
- Instructions and praise are deliberately brief. Real letter sounds, target words, meaning sentences, replay and child-controlled pauses stay available.

- A fresh word-building topic automatically begins with “Let’s make a word together,” then “Now tap” and the first recorded phoneme. If the browser blocks automatic playback, the existing action bar offers Tap to listen and retries the full prompt. No extra opening screen is added. A partial build prompts only its next letter; reading and meaning resumes do not replay the opening. Every subsequent task waits for the child's response, with replay and Stop listening controls.
- Each new interaction cancels the previous queue. Leaving the page or hiding the app stops speech and recordings.
- Without TTS, the recorded phonemes still play after an unavailable instruction. The For grown-ups panel includes the spoken script and a reading alternative for an adult.
- Every attempt opens directly into guided building, including replays. Letters stay in word order, with only the next letter active and its box highlighted. Old partial builds resume in guided mode without losing their letters. There is no separate welcome or mode-selection screen.
- Two reading tries are self-reported practice, not a speech assessment. Five stars celebrate completion; they do not measure accuracy.
- The at story shows Sam walking to the doorway; the sat story shows Sam sitting down. Each plays once per tap. Reduced-motion settings show the final still pose. Prompts in For grown-ups are optional and do not gate progress.
- The three local phoneme clips are cached offline. CDN recordings and device voices may require a connection. CDN voice delivery should be reviewed on the actual Android/iOS devices before release.

- Our First Words has a spoken welcome, two tappable word recordings, two narrated picture/word choices, and two final reading turns. Only the separate Hear this word button models an answer in the final turns. Keep review-read and review-read-next free of the words at and sat.
- Question card positions are chosen separately and saved for each attempt; the order of the final two reading turns also varies. Partial review progress survives a break.

## Adult pronunciation clips

Prepare separate clips for `at` and `sat`. The implemented placement is: the child first tries reading, chooses **Watch and say**, watches the adult model, tries again, then explores the meaning. Playback is optional and replayable, with no automatic advance. Do not automatically reveal the target word in the final independent reading turns. The supplied at and sat clips are both connected as optimized local copies (approximately 135 KB and 175 KB respectively). Empty entries stay hidden and never block reading progress. After the first reading try, a connected clip appears beside the word. Only its small portrait thumbnail loads at that point; the video loads when Watch and say is tapped. Tap the portrait to play/pause; the Again button restarts the clip. These controls keep the mouth visible on small screens. Bunny clips retain their embedded player controls. The clip closes when the child starts another audio action, continues, hides the app or leaves the page. See AT_VIDEO_DELIVERY.md and SAT_VIDEO_DELIVERY.md for measured file sizes and CDN handover.

Studio brief: an adult woman aged 18–24, with natural General American pronunciation and a warm, unhurried delivery. Frame the face clearly with the entire mouth and jaw visible, in good light against a simple background. Say the whole word naturally, pause for the child to repeat, and optionally say it once more. Avoid background music, extra explanation, artificial slow motion or an added vowel after the final /t/. Review the word recordings alongside the existing phoneme recordings for a consistent model.


## Connect the two word videos

In `lib/english-curriculum.ts`, set `englishPronunciationVideos.at` and `.sat` to either `{ kind: "bunny", id: "APPROVED-VIDEO-ID" }` (library 619329), or `{ kind: "file", src: "https://YOUR-CDN/at.mp4" }`. Use an approved full-word mouth-movement clip, not the letter-introduction videos. Check playback on actual phones when the clips arrive.

## Short guided script

“Let’s make a word together.” → “Now tap /s/.” → “Now tap /a/.” → “Now tap /t/.” → “Put the sounds together.” → /s/ /a/ /t/ → “sat” → “Say sat.” → child taps I tried it → “Say sat one more time.” → optional video model beside the word → child taps I tried again → meaning. The at version follows the same sequence with a and t. Slash notation means the approved sound, not the letter name.

Use a friendly, conversational voice, as though making the word together. Keep each line brief and leave the response time to the child. The final Our First Words review keeps its separate answer-free reading prompts. The older build-find/build-next/build-retry/build-hint/build-own/read-turn/read-again/read-watch IDs remain compatible but are not used in the new guided builder; no new studio files are required for those retired prompts.
