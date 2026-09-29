# Lesson 5 — P, I, N — More Little Words

Implemented 28 September 2026. Preview route: `/english/learn/more-words`.

This extends Level 1 after Explore T. The first four lessons remain 30 topics; this lesson adds 13, for 43 implemented topics. It uses the existing sound-practice, sound-to-letter, guided word-building and two-word review templates, followed by a new-word application.

## Child's route

| Topic | Experience |
|---|---|
| 1. Meet p | Main-video placeholder; recorded /p/ listen-and-try introduction |
| 2. Practice the p Sound | Watch the mouth, imitate at the child's pace; three turns |
| 3. Listen and Find p | Four rounds using previously introduced letters |
| 4. Meet i | Main-video placeholder; recorded short /i/ listen-and-try introduction |
| 5. Practice the i Sound | Mouth modelling and three practice turns |
| 6. Listen and Find i | Four rounds, including earlier sounds |
| 7. Meet n | Main-video placeholder; recorded /n/ listen-and-try introduction |
| 8. Practice the n Sound | Mouth modelling and three practice turns |
| 9. Our Six Sounds | Four cumulative rounds, drawing choices from s, a, t, p, i, n |
| 10. Make and Read pin | Ordered p–i–n build, blending, two reading tries, whole-pin picture and spoken meaning |
| 11. Make and Read sit | Ordered s–i–t build, blending, two reading tries, sitting action and spoken instruction |
| 12. Our New Words | Listen to pin/sit, match each meaning picture, try each word without an automatic answer, five-star finish |
| 13. More Words with Apty | Try pan and tap, hear a model, explore meaning, build from a spoken word and read it back |

Listening choices show at most three tiles. No i/n distractors appear during the p activity, and no n appears during i. Help demonstrates a connection and schedules one bounded revisit. Four listening stars celebrate four main rounds; they are not a reading score. Sound practice uses three stars; word reading and review use five appreciation stars.

The application sentences are spoken, not assigned independent print: “This is a pin.” and “Sit on the mat.” These two words are practised teaching words, not reserved fresh assessment items. No new mastery or fluency claim is made.

## Media

Main Bunny Stream videos remain pending for `meet-p`, `meet-i`, and `meet-n`. Add their approved portrait/landscape IDs to `englishVideos` in `lib/english-curriculum.ts`; the real video player then replaces the temporary introduction automatically.

The temporary introduction is labelled “Video coming soon.” The child listens to the recorded phoneme and confirms “I listened and tried.” Its completion is stored in `audioIntroductions`, so it is not described as watching an unavailable video. Unavailable videos elsewhere keep their existing block. Adding the finished video later does not erase participation or force a restart.

Actual mouth clips use the supplied shared CDN folder:

- `english/level1/videos/letter-sound-video-clips/sound-p.mp4`
- `english/level1/videos/letter-sound-video-clips/sound-i.mp4`
- `english/level1/videos/letter-sound-video-clips/sound-n.mp4`

All three URLs returned HTTP 200. Posters and p/i/n phoneme MP3s are bundled under `public/english/media`. Phonemes came from the supplied native-app audio folder; they never use TTS letter names. Short instructions and whole words use the current TTS fallback. No new CDN upload was performed.

Optional adult pronunciation clips for pin/sit/pan/tap have not been supplied and remain hidden. Pin and sit are the next priorities; pan and tap can be recorded in the same studio batch and added later. Record one clearly spoken whole word per clip, with the mouth unobstructed and a little quiet space before and after. The model appears only after a first reading attempt. The earlier at/sat clips remain connected. Explore P/I/N writing lessons and the first tiny book are later work, not part of these 13 topics.

## Progress and offline use

Explore T's last topic opens Meet p. The normal sequential topic path remains in place. Partial pin/sit builds and reading attempts resume. Completed activities can be replayed. Lesson 5 review saves in `moreWords`; it cannot overwrite or reuse Lesson 1's `firstWords` review completion.

Service-worker version: `apty-english-v33-word-discovery`. Its 57-resource production package includes the new lesson route, phonemes and posters. Remote videos still need a connection; narration availability offline depends on the device voice.

## Audio additions

The first-four-lessons studio handover remains unchanged. Lesson 5 adds the following cue slots in `lib/english-narration.ts`; identical lines can share recordings when studio assets are connected.

| Cue ID(s) | Spoken line |
|---|---|
| `intro-listen` | Let's listen together. |
| `intro-try` | Now you try. |
| `build-intro-pin`, `build-intro-sit` | Let's make a word together. |
| `word-pin` | pin |
| `word-sit` | sit |
| `say-pin` | Say pin. |
| `say-sit` | Say sit. |
| `say-again-pin` | Say pin one more time. |
| `say-again-sit` | Say sit one more time. |
| `read-done-pin`, `read-done-sit` | Let's see what it means. |
| `story-pin` | This is a pin. |
| `story-sit` | Sit on the mat. |
| `celebrate-pin` | You made pin. Well done! |
| `celebrate-sit` | You made sit. Well done! |
| `more-review-intro` | Let's play with our new words. |
| `review-find-pin` | This is a pin. Find pin. |
| `review-find-sit` | Sit on the mat. Find sit. |
| `review-correct-pin` | You found pin! |
| `review-correct-sit` | You found sit! |

All common Watch/Your turn, tap, blending, listen/find, help/retry, review-reading and celebration cues reuse the existing library. This is a development addendum, not a new finalized studio recording order.

## More Words with Apty — teaching purpose

The difference from guided pin/sit building is deliberate: apply familiar sounds to a new combination with help available on request. Pan and tap are teaching words, not reserved assessment items or proof of fresh transfer. A parent may notice the child doing more of the work, but self-reported reading stays unassessed.

For **each** word:

1. Show only the word. Say “Your turn to read.” No meaning picture, automatic spoken answer or pronunciation video. “Hear the sounds” models the recorded phonemes and whole word if requested.
2. After “I tried it,” say the whole word. Optional adult video can be opened here once supplied. Let the child try again.
3. Show the meaning: an empty cooking pan, or a hand tapping the table. Narrate the sentence and offer replay.
4. Hide the printed answer and meaning picture. Say the word; offer four stationary tiles containing only taught letters. No letter is highlighted initially. The child builds in sound order; a wrong tile leaves the slots unchanged. Replay the word after the first mix-up; offer the next recorded sound and highlight after further difficulty or requested help. Undo remains available.
5. Show the constructed word and invite a final reading try. Move to the next word only when the child chooses.

A five-star celebration follows both words. It appreciates effort, not accuracy or oral fluency. Progress stores each phase, letters placed, attempts and support separately in `application`, preserving earlier word builds and reviews. Stopping audio, opening lesson steps or leaving the page cancels pending playback and never advances the activity. A missing device voice falls back to recorded sounds for spelling and marks that support; if audio still cannot play, the child can retry rather than receiving a silent answer.

Old 42-topic progress unlocks this new topic without erasing anything. The Lesson 5 review now leads to “Next topic.” The word garden includes a pan/tap practice card after this topic becomes available. All new illustrations are bundled SVG; they work offline. Remote adult videos remain optional.

### Additional studio cues for Topic 13

Use these IDs as the filenames (for example `word-pan.mp3`), then connect the approved CDN URLs in `englishMedia`. Existing recordings can be reused for identical lines. There is no TTS for isolated phonemes.

| Filename stem | Spoken line |
|---|---|
| `word-pan` | pan |
| `word-tap` | tap |
| `story-pan` | This is a pan. |
| `story-tap` | Tap the table. |
| `discover-read` | Your turn to read. |
| `discover-help` | Let’s read it together. |
| `discover-build` | Listen. Make the word. |
| `discover-build-help` | Try this sound. |
| `discover-retry` | Listen again. |
| `discover-read-back` | Read your word. |
| `discover-next` | Let’s try another word. |
| `discover-finish` | Two more words. Well done! |
