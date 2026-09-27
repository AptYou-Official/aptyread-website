# Paper writing in Explore S

My Capital S and My Lowercase s keep their existing topic IDs. Each opens with Trace on screen and Write on paper. Tracing uses the supplied stroke paths and ends with an invitation to Try on paper or Next topic. Paper writing can also be selected directly. Neither mode adds a mandatory topic, so Explore S remains six sequential topics and existing completion remains compatible.

## Paper sequence

1. Have paper and a pencil ready; tap Watch. A brief spoken Watch precedes one complete, muted clip. No automatic loop is used.
2. The clip ends on its final frame. Your turn. Write big S / small s invites the child to write. I tried it records one self-reported try and fills one star.
3. One more opens a second quiet writing turn. Watch again is available without earning or losing stars.
4. One more opens the third turn with the model covered, inviting one letter independently. Show me reveals and replays the model. Help has no reward penalty. A previously watched replay can be stopped with My turn.
5. After the third explicit try, three gold stars celebrate effort. Next topic follows the existing sequence. No timers, photos, handwriting recognition or accuracy grading are used.

Practice choices returns to the two modes at any point. Short paper rounds are session-only and restart when reopened; completed curriculum topics remain saved. Paper practice is optional after tracing, and a complete paper sequence is itself an alternative way to finish the writing topic.

## Media

| Letter | Original CDN filename | Size | Video | Local picture guide |
| --- | --- | ---: | --- | --- |
| S | draw-big-s/video/draw-big-s.mp4 | 121,889 bytes | H.264, 800×800, about 7.02 seconds | write-big-s-v1.webp, 3,858 bytes |
| s | draw-little-s/video/draw-small-s.mp4 | 114,153 bytes | H.264, 800×800, about 7.42 seconds | write-small-s-v1.webp, 2,676 bytes |

Both clips are used from their supplied CDN addresses in englishPaperWritingVideos. Their full square frame is preserved to show the hand and writing lines. Although the containers include low-bitrate AAC tracks, playback is explicitly muted to match the intended silent models. No extra MP4 compression is needed at these sizes. The CDN files have not been modified.

The local pictures are extracted near the completed-letter frame. They are included in the offline package. MP4s load only on entering the paper option and pressing Watch; preload is none, and videos are not precached. If video playback fails or stalls, Try video again and Use picture guide are offered. The picture alternative still requires an explicit writing try before earning a star.

## Narration

Stable IDs may be connected to studio URLs in englishMedia. Device TTS is the current fallback; an unavailable voice does not prevent the muted model or the writing controls.

| ID | Spoken text |
| --- | --- |
| paper-watch | Watch. |
| paper-watch-again | Watch again. |
| paper-write-big-s | Your turn. Write big S. |
| paper-write-small-s | Your turn. Write small s. |
| paper-one-more | Let’s try one more. |
| paper-own-turn | Try one on your own. |

Opening parent notes or the topic menu, hiding the page, changing modes and leaving the topic stop the model and narration. A paused writing turn resumes quietly; a paused model restarts on Continue. Stale callbacks cannot award a star or restart a paused/unmounted activity.

## Verification

The controller and rendered-entry checks are in scripts/check-english-paper-writing.cjs. They cover both clips, cue order, model versus try counting, duplicate taps, optional recall help, pause/resume, stale events, failed media, unavailable narration and the unchanged six-topic structure. Responsive browser findings are recorded in VERIFICATION.md.
