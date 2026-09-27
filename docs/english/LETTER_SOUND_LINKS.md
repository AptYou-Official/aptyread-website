# Letter–sound connections in Lesson 1

The three former Find activities now have separate purposes. Their existing IDs stay unchanged, so saved topic completion and sequential unlocking remain compatible.

| Topic | ID | Title | Learning interaction |
| --- | --- | --- | --- |
| 3 | find-s | Touch and Say s | Hear the recorded /s/ alongside one large lowercase s, touch it to replay, then try saying its sound. |
| 6 | find-a | Listen and Find | Three listening choices: a, s, a. Only s and a are offered. |
| 9 | find-t | Our Three Sounds | Four listening choices: t, s, a, t. Only s, a and t are offered. |

## Child's experience

The guided s activity is participation practice, not a recognition test. After the initial model, the child touches the letter to hear it again. The separate Your turn stage offers an I tried it button; no microphone is requested and pronunciation is not judged.

The two listening activities play a recorded phoneme before enabling the letter choices. Neither the title nor the question prints the target letter. Cards have the same style; their order is shuffled for each turn and remains stable during listening, help and retry. Shuffles are independent, so an order can occasionally repeat by chance. Capital forms are reserved for later Explore lessons.

A correct choice pairs the letter with the sound again and shows a check. Continue starts the next turn; there is no automatic advance. Wrong choices do not flash red, lose points or move the cards. The first incorrect choice gives Listen again and repeats the sound. Two incorrect choices, or Help me, briefly highlight the matching letter while its sound plays. The highlight clears before the next choice.

A helped letter returns later without a highlight. If an already-scheduled later turn is completed without help, it satisfies that revisit. Otherwise an extra turn is appended. There is at most one extra revisit for each taught letter, so help never creates an endless sequence. This is practice, not a mastery gate or pronunciation assessment.

Stars fill as the main steps finish: two for Touch and Say s (touch, then self-reported try), three for Listen and Find, and four for Our Three Sounds. A helped match earns the same star. Listening again, incorrect choices and extra revisits neither add nor remove stars, and the goal never grows. The completion artwork shows the same two, three or four stars. Each mouth-model sound practice has three stars for its three completed tries. The reading activities at, sat and Our First Words retain a separate five-star celebration for finishing the journey, without a score or accuracy claim.

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
| link-touch | Tap and say. |
| link-your-turn | Your turn. |
| link-retry | Listen again. |
| link-help | Let's listen together. |

## Implementation and checks

- State/media controller: lib/english-letter-link.ts
- Reusable activity: components/english/LetterSoundLink.tsx
- Focused checks: node scripts/check-english-letter-link.cjs
- Existing progression/PWA checks: node scripts/check-english.cjs

The progression adapts the IES recommendation to review a new letter sound alongside previously taught sounds. The exact round counts, interface and bounded revisit policy are app design choices, to review with children and parents.

Reference: [IES Foundational Skills practice guide, Recommendation 2](https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf).
