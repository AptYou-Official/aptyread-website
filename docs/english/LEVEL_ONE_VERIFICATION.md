# Level 1 prototype verification

30 September 2026. Companion to [the curriculum contract](LEVEL_ONE_PROGRAMME.md).

## Implemented scope

- Ten core lessons, 65 activities and nine prepared books/caption books.
- Twenty-four initial correspondences; 24 optional formation routes with 48 guides.
- Existing opening videos remain registered. New teaching media has usable interactive fallbacks; whole-word/instruction narration uses device speech until reviewed recordings are registered.
- Parent preview is an isolated in-memory sandbox. Saved child participation is separate from dated observations of sound choices, tile spelling and constrained meaning choices.
- The Level 2–5 curriculum boundaries are documented; those stages are not implemented by this release.

## Automated checks

The production build includes type checking and linting. Twenty `scripts/check-english*.cjs` suites cover existing sound/word/case/writing/application behaviour, navigation, the new programme, handwriting invitations, instruction playback, and integration.

The new checks traverse and restore every action across all 65 core activities, preserve legacy activity positions, verify independent formation access, bound retries, preserve replay history, validate corrupt saves, and reject stored preview privileges. They check all child-read words/preparation/pages against the authored correspondence and VC/CVC scope.

Renderer tests cover all 161 flattened steps. First reading opportunities have no answer illustration or video model, comprehension questions contain only the answer choices rather than a duplicate correct scene, explicit help produces a cue, and a first incorrect selection is not silently counted as an independent success. These checks also apply when a future video is registered.

Asset checks cover all 54 referenced scene IDs, 24 local MPEG recordings and 48 tracing guides. Real pointer handlers accept A's crossbar and T's second stroke. They check file identity/format and wiring, not phonetic quality by ear.

The formation refinements verify all 48 connected writing-film registrations and path-matched stroke cues. Invitation checks cover immediate persistence of an actual mark/paper self-report, pending refresh, skipping without practice credit, retained practice on replay, malformed data and preview isolation. Blank standalone drawing exits do not earn a writing completion. The recording export includes 48 connected handwriting films and 242 handwriting narration slots.

The production offline integration check saved 148 resources and verified document routes, bundled fonts/styles/scripts, audio byte ranges, unrelated-cache isolation and exclusion of React server-component responses. Third-party video and device-voice availability remain device/network dependent.

## Browser checks

The parent programme, a later sound activity and the first book were exercised in the local browser. The first book was completed through preparation, print-first pages, illustrations, a comprehension response, completion and the next activity. Returning from preview left the child's participation and observation counts unchanged.

Phone layouts were inspected at 320 and 390 pixels, with 76 × 88 pixel letter targets at the narrow width. Short landscape layouts retain scrolling and a non-overlapping action dock. The new comprehension page was checked without a duplicate answer scene. Desktop navigation retains the established visual style.

The opening refinement was exercised in grown-up preview: finishing s practice opened the embedded lowercase invitation; Keep reading continued to Meet a. The connected small-s handwriting film played with no media error. SAT's My turn showed an uncued sound choice, followed by print-first sat with help available. The parent view exposed the ordered lesson summaries and retained zero child participation after preview.

Formation was checked at 320 × 760, 390 × 844 and 844 × 390. On narrow portrait and short landscape screens, the drawing actions sit in normal page flow below the canvas and remain reachable by scrolling without covering it. A blank standalone Done left completion at 0/1; explicit paper confirmation or a real pointer mark followed by Done completed 1/1. Screen marks enabled Clear. These checks verify participation handling, not the correctness of a child's letter.

## ESL instructions and activity presentation refinement

Operational directions are now shown/spoken for the current action. For example, the first word-reading opportunity says “Try reading this word.” Help remains available without listing every future button aloud. Requested sound/spelling playback gives its brief direction before the target and leaves the target sound/word last; replay plays the target alone. Stories and meaning models are not subject to the same brevity rule.

Book covers no longer concatenate all conventions and names. They use 3–6 short teaching cards, with a saved `bookPrep` position and an explicit Next action between cards. Names, capitals, direction, spacing and punctuation have relevant models. Legacy saves that already heard the old complete preparation remain ready to open. Participation does not establish comprehension or reading accuracy.

The instruction review drew on [British Council guidance for setting up young-learner tasks](https://www.teachingenglish.org.uk/professional-development/teachers/managing-lesson/setting-young-learner-classroom) and [W3C guidance to separate instructions](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p09-separated-instructions/). These support demonstrations, visual references and manageable steps. They do not establish a universal word limit or validate this product's learning outcomes.

`check-english-instructions.cjs` exercises actual player callbacks: 64 print-first screens, one initial Listen action, current-action prompts, target-last audio, individual book-card playback, replay, cancelled/failed/hidden playback, legacy saves and absence of listening-based mastery credit. Existing renderer tests retain the no-answer-picture/model boundaries. The recording exporter shares the revised prompts and separate card IDs with the runtime.

The browser walkthrough verified Listen → Tap the letter → response → print-first sat → picture choices. All six first-book preparation cards were played individually and led to the first reading page. The capital, name, tracking and punctuation models matched their current narration. Narrow-phone review at 320 × 760 prompted two fixes: quiet Help controls now follow picture choices without covering their audio buttons, and the book's character name is visible above the main action bar. Guided word building progressed from Tap s to Tap a and retained usable scrolling in 844 × 390 landscape. The final production build was also checked at the normal desktop viewport: the word sits beside equal picture choices and Help follows below, with neither pictures nor their audio controls obscured. The final offline integration check passed with 148 resources. Grown-up preview was used throughout.

## Review still needed

This verifies a functioning prototype, not reading effectiveness. Review the device narration, all phonemes by ear, vocabulary/artwork familiarity and final media with the intended India/GCC audience. Observe children aged 4–7 using the complete route across more than one sitting before making independent-reading or fluency claims. Participation, prepared book reading and picture selections do not establish oral accuracy or transfer to unfamiliar print.

Use [the recording plan](media/README.md) for reviewed media replacements. Keep stable activity/task/media IDs when refining presentation.
