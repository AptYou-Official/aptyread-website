# Level 1 media replacements

The interactive programme already contains its spoken scripts. Approved recordings can replace the device voice one cue at a time without changing lessons, tasks, or progress. Optional teaching videos use a separate registration.

Run this after changing programme content, directions, or registrations:

```sh
node scripts/export-english-programme-media.cjs
```

This writes [the JSON manifest](level-1-recording-plan.json) and [the CSV recording plan](level-1-recording-plan.csv). Both are generated files; edit the source data or registry and regenerate them. The script reads local files only. It does not make recordings or upload, download, or test remote media.

## Record and register audio

1. Filter the CSV to `asset_kind = programme_audio` or `handwriting_audio`, and `status = recording_needed`.
2. Record the `exact_script` exactly as written. Keep a warm, unhurried voice with clear words and natural phrasing. The `use`, `step_kind`, and `scene` columns give context. Matching `shared_script_id` values identify identical scripts that can share one recording.
3. Listen to the recording in context before registering it. Whole words and page sentences should retain their natural pronunciation; punctuation is not spoken as a word. Short isolated phonemes keep their existing recordings.
4. Put the approved audio URL or public asset path against its exact `cue_id` in `programmeMedia` in [the registry](../../../lib/english-programme-media.ts). A cue remains absent until the actual file is available. `mediaFor` checks this registry before the existing registrations.
5. Regenerate the plan and preview that activity to check timing, pronunciation, and replay.

For example, the real cue ID `l1.sat-use-words.sat-use-read.word` speaks `sat`. Copy that full ID into the registry and assign the actual approved file location. Do not replace an entire lesson ID. If several cues share a script, give each cue ID the same approved URL.

Empty `recording_url` cells mean there is no replacement registered. Editing a CSV cell alone does not connect a recording to the app. The exact script includes punctuation and any space in the runtime fallback; the exporter does not normalize or rewrite it.

## Cue keys

Programme audio uses `l1.<activityId>.<stepId>.<name>`:

| Name | Spoken content |
| --- | --- |
| `directions-0`, `directions-1`, `directions-2` | Directions for a reachable phase, including the step success message |
| `directions-<phase>-heard` | The current action after listening; used instead of front-loading the next action |
| `directions-complete` | The activity completion message, on its last step |
| `word` | The complete build/read word |
| `meaning` | The word, then its authored meaning |
| `retry` | The first retry invitation |
| `story` | The listening story |
| `question` | The listening/page question or read-picture instruction |
| `choice-<choiceId>` | The picture label requested by the child |
| `convention-<index>` | One short print/language preparation card; replaces the old joined `conventions` cue |
| `prepare-<index>` | An individual character or vocabulary preparation script |
| `page` | The complete page text |
| `word-<index>` | One tapped page word, with its printed punctuation |

Book flattening is deliberate: a cover has step ID `<bookId>.cover`, and a page has `<bookId>.<pageId>`. For example, `l1.first-book-story.first-book-read.cover.convention-0` is the first book's first print-concept model. Indices are zero-based. Each preparation card plays separately, waits for Next, and saves its position. The old joined `conventions` cue is no longer played. Retain authored activity, step, page, and choice IDs when changing presentation so existing recordings stay connected. If a script changes, review and replace its recording too.

The player and exporter share `programmeInstruction`, so direction scripts come from one source. Semantic content comes from the authored programme. The exporter rejects duplicate IDs, unrecognized populated registrations, and missing local phoneme files.

## Optional teaching videos

Each flattened step has the model key `l1.<activityId>.<stepId>.model`. Add an object with `src` and optional `poster` to `programmeVideoModels` in the same registry. `src` must be an actual browser-playable video file URL or public asset path; an embedded player page is not an HTML video source.

The CSV's `programme_video_model` rows are available slots, not finished video scripts or required new productions. Their `notes` contain the activity objective. Choose suitable steps and storyboard the teaching model against the authored content before recording. A model appears during initial sound teaching, guided building, book preparation or listening, and after the child has finished a step. It stays hidden during child-first word/page reading and unresolved checks. Videos do not autoplay. Missing registrations leave the authored interactive activity available.

## Existing media stays in place

The completed uppercase and lowercase handwriting films for all 24 Level 1 letters are connected through `lib/english-handwriting.ts`. All 48 URLs returned HTTP 200 with `video/mp4` and nonzero lengths on 30 September 2026. They are offered alongside the formation animation and paper practice; they are not pending productions or required viewing before reading can continue. `handwriting_video_reference` rows inventory these recordings.

`handwriting_audio` rows contain the short spoken directions for each animated stroke and the three practice modes (242 cue slots in total, with repeated scripts identified for sharing). Register replacement audio in `programmeMedia` using the exact `handwriting.<form>.stroke.<number>` or `handwriting.<form>.<mode>.directions` cue ID. Uppercase and lowercase forms have different keys. Until registered, these directions use device narration. Review spoken directions, animated movements and the real-hand model together before publishing new media.

`phoneme_reference` rows list the existing `sound-<letter>` registrations and local paths. These short sounds do not use TTS, and the exporter verifies that registered local files exist.

`legacy_audio_reference` rows and `preservedLegacyPackage` in the JSON inventory the currently resolved media for the original `first-words`, `explore-s`, `explore-a`, and `explore-t` package. The legacy video snapshot includes the existing teaching IDs, sound practice, paper writing, and at/sat pronunciation models. Media files and the [historical recording brief](../studio/lessons-01-04-recordings-v1.json) are unchanged.

The 30 September instruction revision marks 20 legacy cues in `revisedNarrationIds` in `lib/english-narration.ts`. These use the shorter current device-voice script instead of silently playing the older v1 wording. To connect a reviewed replacement, register the exact cue ID in `englishMedia` in `lib/english-curriculum.ts`. Phoneme recordings, whole-word recordings and completed handwriting videos keep their existing bindings. The historical studio brief may contain superseded directions; use current `englishNarration` wording for these replacements.

The historical brief selects legacy cue IDs only; its proposed paths are not used as media URLs. These references are an inventory of registrations, not confirmation that remote files are available or match today's fallback script. Some legacy references have no current registered recording. This inventory does not claim to cover every cue introduced into legacy components since that historical brief.

No future recording URL or uploaded media is implied by the plan. The programme uses the device voice for unregistered narration and whole words; its optional video slots remain empty until reviewed models are ready.
