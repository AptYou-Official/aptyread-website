# Explore P, I and N

Implemented as the next Level 1 milestone after Lesson 5. These three lessons reuse the established six-topic Explore format and add 18 topics, taking the English learning path from 43 to 61 topics.

## Child route

Each lesson has the same sequence:

1. Big and small letter introduction
2. Find both forms through guided case practice and mixed listening
3. Capital writing model
4. Capital tracing or paper writing
5. Lowercase writing model
6. Lowercase tracing or paper writing

The case activity uses four listening turns and four practice stars. The reading/handwriting controls remain child-paced, and handwriting completion is participation evidence rather than a quality score.

## Temporary video treatment

The six main teaching videos for P, I and N are not available yet. Their topics therefore show an explicit **Video coming soon** preview with the relevant letter forms and a **Let’s practise** action. The next activity supplies the guided letter/sound model, and the writing topics provide the approved paper clips.

The preview is intentionally recorded as `practicePreviews`, separate from `audioIntroductions` and separate from watching a real video. When Bunny Stream IDs are added later, the real player automatically replaces the preview without invalidating saved completion.

## Writing media

The supplied CDN clips are connected from the shared folder:

- `english/level1/videos/letter-writing-video-clips/draw-big-p.mp4`
- `english/level1/videos/letter-writing-video-clips/draw-small-p.mp4`
- `english/level1/videos/letter-writing-video-clips/draw-big-i.mp4`
- `english/level1/videos/letter-writing-video-clips/draw-small-i.mp4`
- `english/level1/videos/letter-writing-video-clips/draw-big-n.mp4`
- `english/level1/videos/letter-writing-video-clips/draw-small-n.mp4`

Each clip is 800×800, muted in the player and under 150 KB. Small final-frame WebP guides are bundled for offline recovery. Tracing follows the supplied pencil demonstrations: capital N uses left stem, right stem, then diagonal; lowercase p extends below the baseline; lowercase i has a separate dot.

## Listening choices

P, I and N choices use only letters introduced by the end of Lesson 5. The new capital form is modelled first, then four listening turns mix the new sound with familiar sounds. Incorrect choices remain recoverable and help shows one bounded model before the child tries again.

## Main video handoff

When the approved Bunny Stream videos are ready, add IDs to `englishVideos` in `lib/english-curriculum.ts` using the existing portrait/landscape structure. Do not change activity IDs; saved progress and preview provenance should remain intact.

