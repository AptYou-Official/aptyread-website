# Letter–sound connections in Lesson 1

Lesson 1 keeps two letter–sound connection activities. The former single-letter `find-s` topic was retired because it repeated Practice the s Sound. The remaining activity IDs stay unchanged, so their saved completion and sequential unlocking remain compatible.

| Topic | ID | Title | Learning interaction |
| --- | --- | --- | --- |
| 5 | find-a | Listen and Find | Three listening choices: a, s, a. Only s and a are offered. |
| 8 | find-t | Our Three Sounds | Four listening choices: t, s, a, t. Only s, a and t are offered. |

## Child's experience

Practice the s Sound is participation practice, not a recognition test. It gives one model, then two tap-started child turns; no microphone is requested and pronunciation is not judged.

The two listening activities play a recorded phoneme before enabling the letter choices. Neither the title nor the question prints the target letter. Cards have the same style; their order is shuffled for each turn and remains stable during listening, help and retry. Shuffles are independent, so an order can occasionally repeat by chance. Capital forms are reserved for later Explore lessons.

When the sound is ready, the companion gives the short visual cue “Tap.” and the action dock shows a hand with “Tap one”. This keeps the next action obvious for a child who is not yet reading fluently. The dock replay control is only shown before the first sound; after that, replay remains available on the speaker beside the choices without competing with the choice action.

A correct choice pairs the letter with the sound again and shows a check. Continue starts the next turn; there is no automatic advance. Wrong choices do not flash red, lose points or move the cards. The first incorrect choice gives Listen again and repeats the sound. Two incorrect choices, or Help me, briefly highlight the matching letter while its sound plays. The highlight clears before the next choice.

A helped letter returns later without a highlight. If an already-scheduled later turn is completed without help, it satisfies that revisit. Otherwise an extra turn is appended. There is at most one extra revisit for each taught letter, so help never creates an endless sequence. This is practice, not a mastery gate or pronunciation assessment.

Stars fill as the main steps finish: three for Listen and Find, and four for Our Three Sounds. A helped match earns the same star. Listening again, incorrect choices and extra revisits neither add nor remove stars, and the goal never grows. The completion artwork shows the same three or four stars. Each mouth-model sound practice has two stars for its two completed turns. The reading activities at, sat and Our First Words retain a separate five-star celebration for finishing the journey, without a score or accuracy claim.

## Media and access

- Every isolated phoneme uses the bundled sound-s, sound-a or sound-t recording. These are available offline once the app's offline package is saved.
- Short instruction IDs below resolve through englishMedia and may be replaced by approved studio CDN URLs. TTS is only used for these instructions.
- A failed instruction still permits the real phoneme. A missing or blocked phoneme keeps the choice unavailable and exposes Listen to retry from a user gesture. Successful playback means the recording completed; it cannot prove that the device volume was audible to the child.
- Stopping playback, opening the parent notes/topic menu, hiding the page or leaving the activity cancels pending audio continuations. No delayed completion or prompt restarts after cancellation.
- Native buttons support touch, pointer and keyboard. The fixed action dock and brief visible prompts support small screens. Existing reduced-motion rules suppress decorative animation.
- Short activity rounds are session-only. Reopening starts a fresh practice sequence; completed topic progress remains saved as before.

| Studio ID | Spoken instruction |
| --- | --- |
| link-listen | Listen. |
| link-find | Listen. Find it. |
| link-find-it | Find it. (after a first manual listen) |
| link-retry | Listen again. |
| link-help | Let's listen together. |

## Implementation and checks

- State/media controller: lib/english-letter-link.ts
- Reusable activity: components/english/LetterSoundLink.tsx
- Focused checks: node scripts/check-english-letter-link.cjs
- Existing progression/PWA checks: node scripts/check-english.cjs

The progression adapts the IES recommendation to review a new letter sound alongside previously taught sounds. The exact round counts, interface and bounded revisit policy are app design choices, to review with children and parents.

Reference: [IES Foundational Skills practice guide, Recommendation 2](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf).
