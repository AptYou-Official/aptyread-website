# English Level 1: child UX review and design standard

Review date: 30 September 2026. Audience: children aged 4–7 and their grown-ups.

Scope: dashboard, lesson topics, and activities in lessons 1–4: `first-words`, `explore-s`, `explore-a`, and `explore-t`.
The lesson sequence is defined in [english-curriculum.ts](../../lib/english-curriculum.ts).
This is a source-code review and proposed acceptance standard, informed by parent feedback and published guidance.
It does not establish usability with children, learning effectiveness, accessibility conformance, or completion of the proposed changes.
Observations below describe the review baseline; implementation and verification must be recorded separately.

## Design objective

A child should recognize the next action, touch it comfortably, see what happened, and recover or replay without needing to read the interface.
Keep the successful curriculum, recorded phonemes, letter forms, activity order, saved progress, and completion rules.
Use playful pictures and color to support attention to the learning task; preserve space around the letters and choices.

## Observed issues and priorities

| Priority | Baseline evidence | Required design response |
| --- | --- | --- |
| P0 | [ParentHelp.tsx](../../components/english/ParentHelp.tsx) uses `.en-word-support`; [english.css](../../app/english/english.css) positions this absolutely, then widens `.en-parent-help`. Tracing adds a separate absolute-position override. | Reserve space for a consistent grown-up control outside the child prompt. Open guidance as a distinct adult panel with a clear return action. Test long translated labels. |
| P1 | [WordBuilder.tsx](../../components/english/WordBuilder.tsx) already marks the next tile with `.is-hint`, a small hand, and a ghost destination. The hand is reduced to 15px by CSS. | Make the intended tap visible with a larger hand/contact cue and clear static outline; use brief gentle motion only as an additional cue. |
| P1 | `.en-guided-word` tiles shrink from 94px to 86px, then 70px on narrow/short screens and 62px in landscape. | Increase task scale where width permits. Allow short screens to scroll instead of making the task too small. Keep targets clear of the fixed bottom dock. |
| P1 | [Dashboard.tsx](../../components/english/Dashboard.tsx), [LessonCard.tsx](../../components/english/LessonCard.tsx), and [LessonTopics.tsx](../../components/english/LessonTopics.tsx) use several text/status layers and repeated locks. | Present one obvious continue action and recognizable letter/word/activity pictures. Make upcoming lessons quieter, and simplify status copy without changing access rules. |
| P1 | [LearningCompanion.tsx](../../components/english/LearningCompanion.tsx) supplies text prompts; replay is generally a sound icon in each activity dock. | Pair concise visible instructions with a consistent, recognizable replay control. Demonstrate the interaction visually when an audio instruction alone is insufficient. |
| P2 | [StoryScene.tsx](../../components/english/StoryScene.tsx) uses muted colors across the character and background. | Use cheerful, legible scene colors. Correct and incorrect choices must retain equivalent backgrounds, detail, size, and visual appeal. |
| P2 | Activity and navigation styling is distributed across many CSS overrides in [english.css](../../app/english/english.css) and [hub.css](../../app/english/hub.css). | Verify computed layouts across breakpoints after changes. Consolidate shared child-facing sizes and reserved help space when practical. |

## Evidence and the limits of a “global standard”

There is no single global specification defining the ideal preschool learning-app layout.
Use accessibility requirements, early-childhood guidance, and observation of this audience together.
Exact sizes, colors, animation timings, and release thresholds below are AptyRead design choices to validate.

| Basis | Relevant guidance | Application and limit |
| --- | --- | --- |
| [W3C WCAG 2.2 target size, AA](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | The minimum is 24×24 CSS pixels, with defined spacing and other exceptions. | This is an accessibility minimum, not a recommended preschool target size. |
| [W3C target size, AAA](https://www.w3.org/WAI/WCAG21/Understanding/target-size) | Enhanced target size is 44×44 CSS pixels, with exceptions; larger targets reduce unintended activation. | Use larger child controls than this floor. Do not claim WCAG conformance based on target size alone. |
| [W3C cognitive accessibility patterns](https://www.w3.org/WAI/WCAG2/supplemental/) | Clear steps, consistent controls, visible feedback, reduced clutter, and control over changes. | Supplemental guidance supports the interaction approach; it is not itself a WCAG conformance requirement. |
| [Nielsen Norman Group: children's physical development](https://www.nngroup.com/articles/children-ux-physical-development/) | Research with ages 3–12 supports large, noticeable targets and simple interactions; recommends approximately 2cm targets for young children. | Supports generously sized tiles and tap-based construction. CSS pixels do not guarantee a physical size across all devices; verify on actual phones and tablets. |
| [NAEYC developmentally appropriate practice](https://www.naeyc.org/node/3796) | Effective technology use is active, gives children control, and supports progress at their own pace. | Support hands-on interaction, replay, and optional grown-up help. This does not prescribe specific screen dimensions. |
| [UNICEF RITEC](https://www.unicef.org/innocenti/projects/responsible-innovation-technology-children) | Design can support competence, autonomy, emotions, relationships, and inclusive access. | Use these wellbeing principles; broader digital-play research does not directly validate this phonics app for every age. |

## AptyRead interaction targets

- Give each activity one obvious next action. Use short, concrete instructions such as “Tap s,” “Tap a word,” and “Your turn.”
- Aim for 88–112px main letter tiles and approximately 60px primary action height; supporting child controls should generally be at least 48×48px.
- Aim for 12–16px separation between adjacent major choices. Adapt to available width without overlap or horizontal scrolling.
- Keep learning glyphs approximately 60–80px where feasible, in the established learning font; size the whole tap target, not only its visible letter.
- Pair sound icons with a visible “Listen” label where space allows. Keep replay location and behavior consistent across activities.
- Make the current action visible even before sound starts or when autoplay is blocked. Missing audio must have an understandable recovery path.
- Use a clear outline, hand/arrow, or shape in addition to color. A muted palette or reduced-motion setting must not remove the instruction.
- Keep demonstrations brief; motion must not obscure a letter, move a touch target unexpectedly, or compete with a spoken sound.
- Preserve a static cue when `prefers-reduced-motion` is enabled. Avoid flashes and unnecessary perpetual activity animation.
- Show immediate touch feedback and a calm retry response. Avoid speed scores, countdown pressure, penalties, or automatic advancement past a learning turn.
- Place grown-up information in a separate reserved area, with a clear close action and usable keyboard focus.
- Present completion as participation and practice. Do not imply that a tap proves pronunciation, comprehension, or handwriting mastery.

## Preserve teaching and independent-response boundaries

| Activity state | Helpful visual support | Do not add |
| --- | --- | --- |
| Guided word construction in `WordBuilder`, stage 0 | Highlight the requested next letter and its destination; demonstrate a tap. | A requirement for precise dragging when tapping already works. |
| Listening/exploration | Indicate which item is playing and how to replay it. | Competing speech or decorative sound that masks the phoneme. |
| Sound-to-letter or word/picture choice | Highlight the whole choice area or demonstrate the general tap action; keep alternatives equally prominent. | A pre-answer glow, character gaze, size difference, or color code revealing the correct choice. |
| Independent reading in [FirstWordsReview.tsx](../../components/english/FirstWordsReview.tsx) | Keep the word clear and optional help recognizable. | Automatic pronunciation or picture clues before the child tries. |
| Letter tracing | Show a start point and optional demonstration; keep a large finger canvas. | New claims that the existing interaction automatically verifies correct handwriting. |

## Delivery sequence

1. Resolve instruction/help overlap and bottom-dock obstruction across the first four lessons.
2. Improve guided tap cues, learning-letter scale, replay recognition, and touch feedback.
3. Simplify dashboard and topic navigation with distinctive visual activity identities and one continue action.
4. Improve scene color and success feedback while keeping answer alternatives equivalent.
5. Run technical checks, then observe children; revise the recurring problems before expanding these patterns into lesson 5.

## Technical acceptance checks

- Cover a narrow 320px phone, common 360–430px phones, a tablet, desktop, and short landscape viewports.
- At 200% browser zoom, all content and controls remain reachable; instructions, help, choices, and the dock do not overlap.
- Check fresh progress, mid-activity resume, completed-topic replay, and the next locked topic for all four lessons.
- Exercise audio blocked, interrupted, replayed, and unavailable states; navigation must not leave old audio running.
- Check keyboard activation, visible focus, meaningful control names, dialog/help closure, and focus return.
- Check reduced motion and that status is understandable without color; inspect text and control contrast.
- Confirm no answer-specific hints have reached independent response stages and no completion/unlock conditions changed.
- Record actual viewport screenshots and test results separately; source inspection is not a substitute for rendering.

## Formative child-testing protocol

Recruit approximately 10 children: five aged 4–5 and five aged 6–7, including varied English familiarity and device experience.
Use parent consent and child willingness; keep each visit short, allow breaks, and stop if the child wants to stop.
This small sample finds usability problems; it cannot establish learning efficacy or population-wide success rates.
Use a familiar touch device, a quiet room, and the same task wording. Let parents observe without pointing unless help is needed.
Give one neutral introduction to the app, then observe without explaining each control. Do not require continuous think-aloud from young children.

| Task | Observe and record |
| --- | --- |
| “Let’s start learning,” then return later to resume. | Whether the child identifies the main action and resumes without opening unrelated navigation. |
| Open lesson topics and return to the current activity. | Recognition of current versus finished/upcoming work; mistaken taps and adult prompts. |
| Replay an instruction after missing it. | Whether the child finds Listen and understands when the sound is playing. |
| Build `sat`, including the first requested `s`. | First intended target, time spent searching, accidental taps, and understanding of the visual cue. |
| Answer the sitting/standing picture question and a word-matching question. | Whether the response uses the learning task; ensure decoration does not disclose the answer. |
| Enter a big/small letter activity and try tracing. | Understanding of the starting action, comfortable touch area, and interference from help or the dock. |
| Pause, leave, and revisit completed work. | Whether progress and navigation behave as expected and the child feels able to stop. |
| With a grown-up, open help and return to the task. | Discoverability, readable guidance, closure, and whether the child loses their place. |

Repeat one familiar interface task with audio muted to test action visibility, not phoneme recognition or reading ability.
Log outcome as independent / neutral prompt / direct assistance / blocked, plus mis-taps and brief observed behavior.
Record task errors separately from reading errors. A wrong phonics answer is not automatically a usability failure.

## Readiness before lesson 5

These are proposed product gates, not external research thresholds or claims already achieved.

- No critical overlaps, unreachable controls, progress loss, or answer leakage in the technical checks.
- At least four of five children in each age band can start/resume, replay an instruction, and begin guided construction without direct adult pointing.
- At least four of five in each age band can identify the next action after one successful turn; assess navigation, not academic correctness.
- No control causes the same blocking misunderstanding or repeated accidental activation for two or more children in either age band.
- Grown-ups can open/close guidance without losing progress or obscuring the child's task after returning.
- Revise recurring problems and retest with children who have not learned the old interface; do not average blockers away.
- Have the curriculum owner check that updated cues preserve teaching versus independent-response boundaries.
- Save findings, screenshots, remaining issues, and the explicit proceed/revise decision before applying the patterns to lesson 5.

## Implementation and technical verification — 30 September 2026

- Dashboard and topic navigation now use larger Play actions, simpler child navigation, colorful lesson art, and recognizable activity pictures. Grown-up tools are separate.
- Guided word construction has larger tiles, a strong static outline and a hand cue with three gentle repetitions. The cue moves with the next letter and can be replayed with Listen. Its hand area also activates the tile.
- The activity header reserves room for grown-up help. Guidance opens in a native modal with an accessible title, close control, Escape support, focus containment, and focus return. Opening help stops narration in the changed reading/tracing flows.
- Story scenes use brighter colors and an expressive character; correct and incorrect pictures retain matching scenery and styling.
- Short landscape layouts allow scrolling and put the action dock in normal flow. Reduced-motion styling preserves static guidance. Existing curriculum, saved-progress format and completion gates remain unchanged.
- Fixed the overview's existing “Lesson 0” bug by matching serialized lesson props by ID; a regression check covers correct lesson and prerequisite numbers.
- TypeScript, production build, all 12 existing English check scripts, and the production offline-package integration check passed. The integration check covers cached fonts/styles/scripts, routes, cache isolation and audio ranges.
- Browser checks covered 320px and 390px phones, 768px tablet, 1280px desktop and 844×390 landscape; inspected dashboard/topic layouts, letter-tap progression, grown-up modal, translated guidance, and tracing. A long Malayalam heading found during review now wraps beside the close button.
- Temporary local test fixtures were removed and test progress was reset. Offline cache version advances to `v38-child-friendly-lessons` for installed-app updates.
- Existing build warning remains in `LessonVideo.tsx` about an effect dependency; no new lint errors. A full WCAG audit, physical-device testing, 200% zoom sweep and observation with children are still outstanding.
- Implementation verification above was performed locally. Testing with children and curriculum-owner review remain product review work before extending the design to further lessons.

## First-lesson journey prototype

The journey is limited to the `first-words` lesson overview. Four picture stops represent **s**, **a**, **t**, and **words**; the current group shows only its 2–3 activity cards.
Selecting a reached stop displays its cards without launching an activity or changing progress. The true current step remains marked while browsing completed groups.
The native **All activities** disclosure retains the full ordered topic list for comparison and replay; other lesson overviews keep that list.

- Navigation checks passed at every completion frontier, including missing media, sparse completion records, and loading progress. They verify group selection, exact access, replay, and unchanged progress.
- Browser checks found no horizontal overflow at 320×640, 390×844, 768×1024, and 1280×1000. Click and Enter selected groups; Enter operated the native disclosure. Completion, replay, and progress restoration were verified.
- Production build, TypeScript, navigation checks, and the production offline-package integration check passed for this prototype. Cache version is now `v40-first-lesson-journey`; a clean production reload showed no new browser errors. The existing `LessonVideo.tsx` effect-dependency lint warning remains.
- These are prototype behavior and layout checks, separate from the earlier implementation verification above. No child study has been conducted.
- Before expanding the journey, compare it with the list using independent next-activity discovery, completed-activity replay, adult prompts, and willingness to return. Alternate the first view shown to reduce familiarity effects; assess learning separately.
