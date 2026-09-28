# Paper writing in Explore S, A and T

Each My Capital / My Lowercase topic for S, A and T keeps its existing ID and opens with Trace on screen and Write on paper. Tracing ends with an invitation to Try on paper or Next topic. Paper writing can also be selected directly. Neither mode adds a mandatory topic, so each Explore lesson remains six sequential topics and existing completion stays compatible.

## Paper sequence

1. Have paper and a pencil ready; tap Watch. A brief spoken Watch precedes one complete, muted clip. No automatic loop is used.
2. The clip ends on its final frame. Your turn. Write big / small followed by the current letter invites the child to write. I tried it records one self-reported try and fills one star.
3. One more opens a second quiet writing turn. Watch again is available without earning or losing stars.
4. One more opens the third turn with the model covered, inviting one letter independently. Show me reveals and replays the model. Help has no reward penalty. A previously watched replay can be stopped with My turn.
5. After the third explicit try, three gold stars celebrate effort. Next topic follows the existing sequence. No timers, photos, handwriting recognition or accuracy grading are used.

Practice choices returns to the two modes at any point. Short paper rounds are session-only and restart when reopened; completed curriculum topics remain saved. Paper practice is optional after tracing, and a complete paper sequence is itself an alternative way to finish the writing topic.

## Media

| Letter | CDN filename | Size | Video | Local picture guide |
| --- | --- | ---: | --- | --- |
| S | draw-big-s.mp4 | 121,889 bytes | H.264, 800×800, about 7.02 seconds | write-big-s-v1.webp, 3,858 bytes |
| s | draw-small-s.mp4 | 114,153 bytes | H.264, 800×800, about 7.42 seconds | write-small-s-v1.webp, 2,676 bytes |

All S, A and T clips now use the shared `english/level1/videos/letter-writing-video-clips/` folder, including both S clips updated on 28 September. A/T filenames, sizes and durations are recorded in [EXPLORE_A_T.md](EXPLORE_A_T.md). All clips retain their full square frame to show the hand and writing lines. Although the containers include low-bitrate AAC tracks, playback is explicitly muted to match the intended silent models. No extra MP4 compression is needed at these sizes. The CDN files have not been modified.

The local pictures are extracted near the completed-letter frame. They are included in the offline package. MP4s load only on entering the paper option and pressing Watch; preload is none, and videos are not precached. If video playback fails or stalls, Try video again and Use picture guide are offered. The picture alternative still requires an explicit writing try before earning a star.

## Narration

Stable IDs may be connected to studio URLs in englishMedia. Device TTS is the current fallback; an unavailable voice does not prevent the muted model or the writing controls.

| ID | Spoken text |
| --- | --- |
| paper-watch | Watch. |
| paper-watch-again | Watch again. |
| paper-write-big-s | Your turn. Write big S. |
| paper-write-small-s | Your turn. Write small s. |
| paper-write-big-a | Your turn. Write big A. |
| paper-write-small-a | Your turn. Write small a. |
| paper-write-big-t | Your turn. Write big T. |
| paper-write-small-t | Your turn. Write small t. |
| paper-one-more | Let’s try one more. |
| paper-own-turn | Try one on your own. |

Opening parent notes or the topic menu, hiding the page, changing modes and leaving the topic stop the model and narration. A paused writing turn resumes quietly; a paused model restarts on Continue. Stale callbacks cannot award a star or restart a paused/unmounted activity.

## Verification

The controller and rendered-entry checks are in scripts/check-english-paper-writing.cjs. They cover all six letters/cases, cue order, model versus try counting, duplicate taps, optional recall help, pause/resume, stale events, failed media, unavailable narration, real tracing paths with pen lifts and the unchanged six-topic lesson structure. Responsive browser findings are recorded in VERIFICATION.md.
