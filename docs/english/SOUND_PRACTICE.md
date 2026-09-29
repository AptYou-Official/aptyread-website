# Practice the s, a and t sounds

The three sound-practice topics in Lesson 1 use their supplied mouth-model videos inside a circular frame. Each topic selects its own video, poster, letter and recorded phoneme. The introductory teaching videos remain separate.

## Child's sequence

1. On entry, “Watch.” finishes before the video starts. The video plays once.
2. The video pauses while “Now you try.” is spoken. Once the prompt finishes, the child sees a clear tap cue.
3. Tapping the main action starts a short, child-controlled practice turn. The model sound stops while the child tries; there is no pronunciation judgement.
4. After the first turn, one more audio cue plays automatically and the second tap action glows. The second tap completes the practice.
5. Two stars celebrate the child's participation. The star sound finishes before the celebration screen appears. The celebration stays visible until the child taps the two-line Next topic button, which names the actual next activity.

There is no introductory instructions page, microphone permission, voice recording, speech recognition, or accuracy score. Parent guidance is behind the family icon. The activity does not auto-advance between practice turns or after the celebration. Existing completed topics stay completed during replay; the two short turns restart when this activity is reopened.

## Controls and resilience

- A single tap starts a turn; there is no hold gesture for the child to manage. Assistive-technology click activation uses the same action.
- Pointer cancellation, lost focus, hidden page and navigation do not add a practice turn.
- Pause stops the repeating video. Continue resumes the model directly, without repeating the instruction. Repeated visibility/page-hide events preserve the resume stage. No model or narration plays while the child is trying or between practice turns.
- Opening the topic menu or parent guidance pauses practice. Closing it leaves playback paused until the child chooses Continue. Changing topics disposes the previous model and selects the new letter's media.
- The generation-guarded controller cancels stale narration/video continuations. Opening playback is deferred/cancellable for React Strict Mode and hidden-page entry.
- Autoplay rejection exposes Watch, which starts the video directly from a user gesture without depending on TTS. A failed or stalled video, including a blocked loop, offers Hear the sound instead, using the matching local recording. It never synthesizes the phoneme. This audio-only fallback plays the phoneme once per model turn and offers replay; it does not loop spoken instructions.
- Reduced-motion preferences remove the holding halo and decorative entrance animations. The real mouth video remains a child-controllable teaching resource.
- The main button stays in the fixed dock; no timer presses the child to speak. Two outlined stars fill one at a time when turns finish, and the same two stars appear at completion. Watching, replaying, pausing and cancelled taps do not earn or remove stars. Stars track participation, not audio analysis.

## Media and narration

The app uses `https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-sound-video-clips/sound-{letter}.mp4` for s, a and t, connected through the shared folder constant in `englishSoundPracticeVideos` in `lib/english-curriculum.ts`. These replace the earlier per-letter/topic URLs as of 28 September 2026. All three sources are square H.264/AAC MP4s. They fit the existing circular frame without additional zoom or source edits.

| Sound | Source size | Dimensions | Approx. duration | Local 320-square poster |
| --- | ---: | --- | ---: | ---: |
| s | 63,682 bytes | 512×512 | 1.69 s | 4,032 bytes |
| a | 134,202 bytes | 800×800 | 2.28 s | 4,842 bytes |
| t | 62,040 bytes | 800×800 | 1.28 s | 3,902 bytes |

These short clips do not need further compression or Stream conversion for this implementation. Each native video element loops the same resource rather than recreating a player per repetition. Posters (`public/english/media/{letter}-practice-v1.webp`) and approved phonemes are precached; MP4s remain outside service-worker precaching and load on demand. A network connection is needed for the mouth-model clips.

Studio recording IDs (currently TTS, resolved through the existing media map):

| ID | Spoken text |
| --- | --- |
| practice-watch | Watch. |
| practice-watch-again | Watch again. |
| practice-now-try | Now you try. |
| practice-your-turn | Your turn. |
| practice-listen | Listen. |

`scripts/check-english-sound-practice.cjs` checks single-play → narration → tap-started two-turn completion, cancellation, stale events, pause/resume, blocked loop recovery and recorded-sound fallback. This verifies software behaviour; pronunciation quality and finger comfort still need review on target devices.
