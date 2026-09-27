# Practice the s, a and t sounds

Topics 2, 5 and 8 of Lesson 1 use their supplied mouth-model videos inside a circular frame. Each topic selects its own video, poster, letter and recorded phoneme. The introductory teaching videos remain separate.

## Child's sequence

1. On entry, “Watch.” finishes before the video starts. The video plays once.
2. The video pauses while “Now you try.” is spoken. Once the prompt finishes, the video and its original sound repeat continuously, giving the child time to watch and imitate.
3. Hold and say stops all model audio/video immediately. Release records one practice turn, without a minimum duration or pronunciation judgement.
4. The child chooses Watch again for the next demonstration. The prompts are “Watch again.” and “Your turn.” The model again loops after the prompt until the child presses the button.
5. After three turns, three stars celebrate the child's participation. Next topic completes this sound practice and follows the existing sequential path to the matching letter-finding topic.

There is no introductory instructions page, microphone permission, voice recording, speech recognition, or accuracy score. Parent guidance is behind the family icon. The activity does not auto-advance between practice turns. Existing completed topics stay completed during replay; the three short turns restart when this activity is reopened.

## Controls and resilience

- Touch/pointer hold, Space/Enter hold, and a visible Tap instead start/finish mode are supported. Assistive-technology click activation can also toggle a turn.
- Pointer capture keeps the turn stable if a finger moves. Pointer cancellation, lost focus, hidden page and navigation do not add a practice turn.
- Pause stops the repeating video. Continue resumes the model directly, without repeating the instruction. Repeated visibility/page-hide events preserve the resume stage. No model or narration plays during a hold or between practice turns.
- Opening the topic menu or parent guidance pauses practice. Closing it leaves playback paused until the child chooses Continue. Changing topics disposes the previous model and selects the new letter's media.
- The generation-guarded controller cancels stale narration/video continuations. Opening playback is deferred/cancellable for React Strict Mode and hidden-page entry.
- Autoplay rejection exposes Watch, which starts the video directly from a user gesture without depending on TTS. A failed or stalled video, including a blocked loop, offers Hear the sound instead, using the matching local /s/, /a/ or /t/ recording. It never synthesizes the phoneme. This audio-only fallback plays the phoneme once per model turn and offers replay; it does not loop spoken instructions.
- Reduced-motion preferences remove the holding halo and decorative entrance animations. The real mouth video remains a child-controllable teaching resource.
- The main button stays in the fixed dock; no timer presses the child to speak. Three outlined stars fill one at a time when turns finish, and the same three stars appear at completion. Watching, replaying, pausing and cancelled holds do not earn or remove stars. Stars track participation, not audio analysis.

## Media and narration

The app uses the exact supplied CDN URLs in `englishSoundPracticeVideos` in `lib/english-curriculum.ts`. All three sources are square H.264/AAC MP4s. They fit the existing circular frame without additional zoom or source edits.

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

`scripts/check-english-sound-practice.cjs` checks single-play → narration → loop ordering, immediate stop on press, cancellation, three-turn completion, stale events, pause/resume, blocked loop recovery and recorded-sound fallback. This verifies software behaviour; pronunciation quality and finger comfort still need review on target devices.
