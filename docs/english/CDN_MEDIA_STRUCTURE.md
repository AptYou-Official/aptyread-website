# AptyRead CDN media structure

## Shared activity video folders — 28 September 2026

The uploaded letter clips now use two shared folders under `english/level1/videos/`. The app connects s/a/t sound practice and all six S/s/A/a/T/t paper-writing models to these folders. Main teaching videos remain in Bunny Stream. Other uploaded letters will be connected when their lessons are authored.

This replaces the earlier per-topic video paths and the proposed general video folder for letter activities. Existing pronunciation clips are not relocated. Audio and image locations below remain recommendations for future uploads. No files were uploaded, moved or renamed by this app update.

## Current video folders and proposed audio/image folders

Base URL: `https://aptyread-cdn.b-cdn.net/`

```text
english/
  level1/
    videos/
      letter-sound-video-clips/
        sound-s.mp4
        sound-a.mp4
        sound-t.mp4
      letter-writing-video-clips/
        draw-big-s.mp4
        draw-small-s.mp4
        draw-big-a.mp4
        draw-small-a.mp4
        draw-big-t.mp4
        draw-small-t.mp4
  audio/   (proposed studio narration)
  images/  (proposed content illustrations)
```

The same convention can be used for future Malayalam uploads under `malayalam/`. Existing Malayalam media does not need to move.

Keep the lesson/topic relationships in the app's curriculum. Separate folders for every lesson and topic are unnecessary. Reuse each letter clip across lessons by its existing URL; the level1 folder does not restrict where the app can use it.

Use `sound-{letter}.mp4` for the familiar basic sound, and explicit names such as `sound-long-a.mp4` or `sound-soft-c.mp4` for additional correspondences. Paper models use `draw-big-{letter}.mp4` and `draw-small-{letter}.mp4`. Preserve these uploaded filenames. A replacement can use a `-v2` suffix rather than silently overwriting a published clip.

## Keep phonemes with the app

The supplied source folder `E:\aptyread_new\assets\audio\shared\phonemes` contains 33 files totaling 172,737 bytes (about 169 KiB). The complete pack is small enough to ship as app-hosted static assets and precache for use across lessons. It does not need a separate Bunny CDN upload.

Here, bundled means included in the web app's deployed files and saved by its service worker. They still download on the first successful online visit; cached files can then play without a network request. Offline availability depends on the cache remaining on the device. See [MDN PWA caching](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching).

Current implementation: only the three phonemes needed by the implemented curriculum are copied into the web app and explicitly precached:

| App cue | Current app file |
| --- | --- |
| `sound-s` | `public/english/media/s-sound.mp3` |
| `sound-a` | `public/english/media/a-sound.mp3` |
| `sound-t` | `public/english/media/t-sound.mp3` |

These three total 10,624 bytes. The other source recordings have not been copied or connected by this documentation change. As the remaining curriculum is added, include the complete approved pack in the app and its precache list, with a stable sound-ID mapping. Keep each phoneme independently playable; a ZIP archive or JavaScript-embedded audio is unnecessary.

Use actual speech-sound recordings, not TTS letter names. When changing a bundled recording, version its asset URL and update the app cache so the new recording is delivered predictably.

## Filename convention

For content specific to a lesson/topic:

`l01-lesson-id-topic-id-purpose-v1.extension`

For reusable content:

`shared-purpose-v1.extension`

Use lowercase letters, numbers and hyphens. Keep the app's stable IDs such as `first-words` and `build-sat`. Use a version suffix when a file changes. Add a size or orientation only where there are meaningful variants. Do not use sequence positions such as `topic-11` as permanent identities: the learning order can change independently of the asset.

| Content | Proposed CDN path |
| --- | --- |
| Spoken word at | `english/audio/shared-word-at-v1.mp3` |
| Spoken word sat | `english/audio/shared-word-sat-v1.mp3` |
| “Let’s make a word together.” | `english/audio/shared-lets-make-a-word-together-v1.mp3` |
| “Now tap” | `english/audio/shared-now-tap-v1.mp3` |
| “Put the sounds together.” | `english/audio/shared-put-the-sounds-together-v1.mp3` |
| “You found it!” | `english/audio/shared-you-found-it-v1.mp3` |
| “Sam is at the door.” | `english/audio/l01-first-words-build-at-story-v1.mp3` |
| “Sam sat on the mat.” | `english/audio/l01-first-words-build-sat-story-v1.mp3` |
| Mat picture question | `english/audio/l01-first-words-build-sat-question-mat-v1.mp3` |
| Bench picture question | `english/audio/l01-first-words-build-sat-question-bench-v1.mp3` |
| Review introduction | `english/audio/l01-first-words-our-first-words-intro-v1.mp3` |
| Topic-specific sitting picture | `english/images/l01-first-words-build-sat-sam-on-mat-v1.webp` |
| Sat mouth-movement clip | `english/videos/shared-sat-pronunciation-square-640-v1.mp4` |
| Poster for that clip | `english/images/shared-sat-pronunciation-poster-320-v1.webp` |

These are proposed destinations, not confirmed live URLs. If an illustration is designed for several lessons, use a `shared-` filename. If an existing topic-specific file becomes useful elsewhere, reuse its URL rather than uploading a duplicate.

The alphabetical `l01-lesson-id-topic-id` prefix helps find related files in Bunny's browser. It does not determine topic unlocking or lesson order. If a folder eventually becomes difficult to browse, future uploads can be divided by level; no need to create those subdivisions now or relocate published files.

## Which media lives where?

| Media | Location |
| --- | --- |
| Small, stable phoneme pack | Bundled with the app and precached |
| Core icons, font and mascot needed offline | Bundled with the app |
| Studio narration, word audio and feedback | Bunny CDN `english/audio/` |
| Content illustrations and video posters | Bunny CDN `english/images/` |
| Letter sound activity clips | Bunny CDN `english/level1/videos/letter-sound-video-clips/` |
| Letter writing activity clips | Bunny CDN `english/level1/videos/letter-writing-video-clips/` |
| Short word-pronunciation clips | Existing connected URLs; `english/videos/` remains a proposed destination |
| Main lesson videos | Bunny Stream |
| Studio WAV masters and editing projects | Separate production archive and backup |

CDN audio may be cached separately if lesson downloads are introduced later. The current worker does not cache third-party CDN media, so a CDN upload alone does not make it available offline.

## App connections and recording IDs

`englishMedia`, `englishSoundPracticeVideos`, `englishPaperWritingVideos`, `englishPronunciationVideos` and `englishVideos` in `lib/english-curriculum.ts` connect stable IDs to URLs or Bunny Stream IDs. The sound/writing maps each share one folder constant. File location does not affect the structured learning path. Scripts are in `lib/english-narration.ts`; confirm which cues are active before recording, because some earlier variants remain in that file.

Both `build-intro-at` and `build-intro-sat` can point to the same shared introduction recording. Both `build-tap` and `build-next-tap` can point to the same “Now tap” file. The app then plays the separate real phoneme. A future complete studio prompt must be connected deliberately so the phoneme is not repeated twice.

A media register can hold the stable ID, exact script or visual description, filename/URL, version and status. This preserves the level/lesson/topic relationship without duplicating it as many folders.

For Stream, keep the existing English library (`619329`) and existing video IDs. Suggested organizational titles remain `en-l01-first-words-meet-s-portrait-v1` and `en-l01-first-words-meet-s-landscape-v1`. Main videos need no duplicate CDN files.

## Publishing new files

1. Upload the approved, optimized copy with its versioned filename.
2. Verify the public URL and inspect playback or appearance on a phone.
3. Connect the verified URL to the matching app media ID, then release the update.
4. Keep older versions while supported app content references them.

Use a new `-v2` URL for a replacement instead of overwriting `-v1` and relying on every device refreshing its cached copy. See [MDN HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching#cache_busting).

The optimized sat MP4 already in `public/english/media/sat-pronunciation-v1.mp4` is approximately 175 KB and its WebP poster approximately 9 KB. Proposed upload destinations are listed above; see `SAT_VIDEO_DELIVERY.md` for the measured format and playback checks.
