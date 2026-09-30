# Opening journey and embedded formation

Status: implementation refinement, 30 September 2026. This adds a visible invitation to make a newly introduced letter while preserving the authored reading route. Software checks are separate from a review with children and parents; no learning-effectiveness result is claimed.

## The child's route

The order remains SAT → PIN → Pat and Pip → the six later code groups → the Level 1 bridge. There are still 10 main lessons and 65 main activities. No new reading prerequisite, activity ID or required handwriting topic has been inserted. The 24 supplementary formation choices and their 54 existing topic entries remain separate.

SAT gives models of s/a/t, at/sat and their meanings. Its final integration gives a child-first known-word opportunity and spoken-word sat construction with help available. PIN retrieves earlier sounds, uses p in tap and i in sit immediately, then combines the six correspondences. Pat and Pip prepares names, capitals, spaces, full stops and its invitation before three short connected pages. Prepared reading is not an unseen transfer test.

The new formation invitation appears at these existing boundaries:

| Letter | After this activity |
|---|---|
| s | Practice the s sound (`practice-s`) |
| a, t | Their cumulative find activities (`find-a`, `find-t`) |
| p, i, n | Their find activities (`find-p`, `find-i`, `find-n`) |
| c/m/e, h/r/g, d/k/o, l/f/b, u/j/w, v/y/z | The existing activity that teaches each new correspondence |

There are 24 mapped invitations, one for each taught Level 1 letter. Formation is now encountered naturally beside learning a sound rather than relying only on discovering the supplementary area. The invitation can be postponed immediately. A drawing attempt, accurate shape, capital-letter attempt or all six old Explore topics is never required to continue reading.

## Completion, practice and resume

`formationOffers` stores a separate record keyed by the existing reading activity: `pending`, `later` or `practised`, plus the lowercase/uppercase forms actually reported tried. These are participation records, not handwriting scores.

- Opening an offer does not complete or unlock a reading activity. In normal player use, the reading activity can already be complete when its Next button opens the offer.
- The current player index stays on that activity while the invitation is open. Refreshing without a new activity request returns to the pending invitation.
- A real screen mark or explicit “I tried on paper” action saves its form immediately through `recordEnglishFormationTry`, while the invitation remains pending. Leaving for Home before pressing Done or Keep reading therefore preserves that participation. Repeated marks do not duplicate forms or advance the player.
- Choosing Keep reading records that choice and continues. Choosing the next reading activity from navigation may also bypass a pending offer, because the offer is optional; its record remains available on a later visit.
- Drawing participation does not mark a separate Explore topic complete, generate reading evidence or inflate the 65-activity count.
- Replay can reopen the invitation while keeping forms tried earlier. Choosing Keep reading during that replay does not erase previous practice. Parent totals use the retained forms, even while a replay invitation is pending.
- An explicit replay may reset that activity's completed interactive attempt. It keeps its completed activity ID, existing learning observations, other words and formation records.
- Invalid, unknown or locked invitation records are discarded when loading saved progress. A finish action requires an actual pending, reachable invitation; malformed responses do not create practice.
- Grown-up preview stays in its separate temporary record. It cannot write formation, completion or observations into the child's browser record. Preview access is never restored as child access.

## The parent's route

The grown-up overview retains the ordered main programme and separate formation area. Lesson summaries state the sounds, words, book and suggested revisit, so parents can understand how SAT prepares PIN and why connected reading begins early. Every authored activity can be previewed without unlocking it for the child.

Show main participation, supplementary-topic participation and embedded forms tried as separate descriptions. “With support” and “without in-app support” describe observed choices or tile construction; neither establishes spoken reading, handwriting accuracy or help given beside the screen. Returning to a familiar word on another day remains useful, but this change does not implement a scheduled assessment or mastery gate.

## What remains a teaching model

The formation UI starts on lowercase Draw here, offers Watch a hand and Use paper, and leaves uppercase as an optional second form. Keep reading remains available without a drawing attempt. Actual screen marks or an explicit paper self-report record the selected form. Merely choosing a form, watching a model, pressing Done on a blank drawing or continuing without trying records no new form and makes no accuracy claim.

The implementation's 30 September 2026 availability check returned HTTP 200, `video/mp4` and nonzero content length for all 48 uppercase/lowercase writing-video URLs, covering the 24 Level 1 letters. `lib/english-handwriting.ts` records the checked URLs, date and byte sizes. They use the existing CDN pattern `https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-writing-video-clips/draw-small-s.mp4` and `draw-big-s.mp4`, substituting the lowercase letter. This was a HEAD availability check, not verification of playback, stroke order, pronunciation, child comprehension or every frame. Confirm those separately and keep paper/trace participation available when a video cannot play.

Guided Make and Read sat deliberately shows the next tile and models left-to-right construction. That first encounter is not independent spelling. The later uncued sat construction provides a separate practice opportunity. Two “I tried” taps do not verify oral reading. The sentence activity in Lesson 1 is supported word finding within narrated sentences, not independent reading of all those sentences.

Do not introduce an unsuitable “fresh SAT word” solely to manufacture a transfer result: as needs an untaught pronunciation, and the tiny useful SAT word bank is limited. A later known-word attempt before its model, then an exposure-reviewed new six-letter word after PIN, is a better next review design. This document does not add such an item or alter the reserved-item register.

## Verification and manual review

`node scripts/check-english-learning-journey.cjs` passes all 24 mappings, the exact unchanged 65-ID reading order, pending refresh, immediate mark/paper-try persistence, skip/practise/replay behavior, preserved forms, malformed and locked input, preview isolation and the player-facing completed-topic/current-index transitions. It verifies that embedded practice does not inflate supplementary completion or auto-advance when a form is tried.

`node scripts/check-english-programme.cjs` and `node scripts/check-english-programme-progress.cjs` also pass after the state changes. These check content integrity and whole-route progression/resume. The production build, including type checking and linting, and the production offline integration check also pass. See [the verification record](LEVEL_ONE_VERIFICATION.md) for the browser checks and remaining learner review.

Use the following brief tasks with children aged 4–5 and 6–7 and their parents. Record what actually happens; there are no learner-trial results recorded here yet.

| Task | Observation to record |
|---|---|
| Finish the s sound and meet the writing invitation | Does the child understand that they can try it or continue learning? |
| Watch a writing model, then use screen or paper | Can the child find the starting point and choose a method without repeated adult explanation? |
| Choose Keep reading | Does the next reading activity open immediately, without a failure message or missing reward? |
| Leave while the invitation is pending, then refresh | Does the same invitation return without repeating or losing the completed reading task? |
| Make a mark, leave for Home before Done, then return | Is the form still recorded as tried, with the invitation pending and the reading position unchanged? |
| Practise lowercase, revisit, then choose Keep reading | Are earlier forms still shown as tried? Is capital practice clearly optional? |
| Complete SAT and begin PIN | Can the parent explain what was modelled, what the child tried and what remains unknown? |
| Try sat again on another day before the model | Note the response and support used; do not infer general decoding skill from this one rehearsed word. |
| Preview later lessons as a grown-up | Confirm the child's completion, word attempts and observations stay unchanged. |

Review fatigue, repeated taps, hesitation, misunderstood directions and whether an optional offer feels compulsory. Adjust the invitation and its timing from those observations rather than treating completion counts as proof that the experience works.
