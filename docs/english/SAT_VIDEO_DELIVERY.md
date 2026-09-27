# Sat pronunciation video — 27 September 2026

## Connected placement

Make and Read sat → blend → first reading try → **I tried it** → portrait beside sat → **Watch and say** → optional **Again** → second reading try. No video plays or downloads before its own play button is tapped. The target word remains visible beside the speaker. Tap the portrait to pause or resume; Again starts from the beginning. Playback never advances the lesson or counts as a reading try.

The app currently serves the optimized MP4 from `public/english/media/sat-pronunciation-v1.mp4`, not the larger source URL. This lets the working preview use the smaller file immediately. The original CDN object has not been changed or uploaded over. At is now connected as well; see AT_VIDEO_DELIVERY.md.

## Measured media

| Property | Supplied source | App copy |
| --- | --- | --- |
| File | https://aptyread-cdn.b-cdn.net/english/reading-writing/Sat.mp4 | public/english/media/sat-pronunciation-v1.mp4 |
| Bytes | 4,390,479 (4.39 MB) | 175,163 (175 KB) |
| Dimensions | 1080 × 1920 | 640 × 640 |
| Duration | 2.33 seconds | 2.35-second container; all 56 original video frames preserved |
| Frame rate | 24 fps | 24 fps |
| Video | H.264, approximately 14.69 Mbps | H.264 High level 3.0, yuv420p, approximately 540 kbps |
| Audio | AAC stereo, 48 kHz | AAC mono, 48 kHz, 64 kbps target |
| Starting playback | Original export | MP4 metadata moved before media (fast start) |

The copy is 96.0% smaller. The square crop is a 720 × 720 region at x=180, y=570 of the source, scaled to 640 × 640. It removes the ceiling and lower body while retaining the face, mouth, jaw and shoulders. Sampled frames across the full clip were visually checked. No speed change, artificial slow motion or word trimming was applied. Audio peaks were checked for clipping, but this is not a human approval of accent, phonetic quality or lip synchronization.

The portrait poster is a 320 × 320 WebP, 9,138 bytes. Its source is the cropped clip at approximately 0.3 seconds.

## CDN handover

1. Following the simplified convention in [CDN_MEDIA_STRUCTURE.md](CDN_MEDIA_STRUCTURE.md), upload `public/english/media/sat-pronunciation-v1.mp4` as `english/videos/shared-sat-pronunciation-square-640-v1.mp4`. Optionally upload its `.webp` thumbnail as `english/images/shared-sat-pronunciation-poster-320-v1.webp`. These destinations are recommendations, not confirmed live URLs.
2. Confirm the resulting public URL, then replace only `englishPronunciationVideos.sat.src` in `lib/english-curriculum.ts`. The poster can remain app-hosted. Keep `aspectRatio: '1 / 1'`.
3. Use a new filename when replacing the clip; the source CDN currently advertises a 30-day public cache lifetime. Avoid relying on an overwritten URL reaching every device immediately.
4. Check the installed app on Android and iPhone with sound enabled, including tap-to-play, replay, word-audio interruption and returning from the background.

The MP4 is not included in the app's offline installation package. The service worker passes local MP4 requests directly to the browser/server, preserving byte-range playback. A future CDN URL already falls outside service-worker interception. Offline video availability is not guaranteed; reading still works without watching it.

## Recommended format for the next clips

- Frame a stable face-and-shoulders close-up straight toward the camera. Keep the entire mouth and jaw visible throughout, with simple surroundings and even lighting.
- Keep a high-quality master. Deliver a square 640 × 640 H.264 MP4 at the original 24–30 fps, with clear AAC mono audio and fast start enabled.
- For one short word, roughly 2–4 seconds works well with this replayable interaction. Leave a little space before and after the word; do not cut off the final consonant.
- Aim for 150–500 KB when quality permits. Under 1 MB is a useful budget, not a playback requirement. Keep mouth detail and clear audio rather than forcing every file under an arbitrary limit.
- Use the existing CDN for these tiny clips. Bunny Stream is useful for longer lessons because it creates multiple resolutions and offers an adaptive player; it is not required for a 175 KB pronunciation clip.

References: [Bunny Stream](https://bunny.net/stream/), [Bunny video specifications](https://docs.bunny.net/docs/stream-best-practices), [MDN video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video).
