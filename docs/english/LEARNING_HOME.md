# Learning home and topic navigation

Updated 27 September 2026. The dashboard uses the existing off-white, indigo and cyan brand, Andika font and Apty illustration.

- The main screen has one featured action and four compact lesson cards. The action uses the exact next unlocked topic, including partial-activity resume. It becomes a revision invitation when the next required video is not yet connected.
- Each lesson card opens a focused topic sheet. The full card is a touch target. Sound/letter and writing groups make longer lists easier to scan; reached topics link directly into the existing activity. Locked lessons can be previewed without launching locked topics.
- The current five-level overview opens separately from the Level 1 chip or All levels. Future levels remain visibly unavailable.
- The same topic list appears in the player's existing lesson menu. Opening it brings the current topic into view. On the dashboard, the next available topic is brought into view. Native dialogs contain keyboard focus, close on Escape and restore focus to the opener.
- The sheet heading and primary action stay visible while only the topic list scrolls. The home screen uses bottom navigation on phones and a small sidebar on larger screens. Activity layouts and teaching sequences are unchanged.
- Preparation status, local-storage information and parent explanations remain available. Missing video topics are never presented as playable. Sequential access still comes from `englishAccess`; no saved-progress schema or completion rule changed.

`app/english/hub.css` scopes this presentation separately from the activity styles. No new images, UI package or remote design dependency was added. The current worker package is `apty-english-v31-shared-video-folders`.

Copy refinement: the opening topic is **Meet s**, with the existing `meet-s` ID and saved progress preserved. The dashboard greeting restores **You + Apty. Let’s do this!**. The lesson remains Our First Words. A dedicated lesson page is the recommended next navigation refinement; the topic sheet remains implemented for now.

Explore A and Explore T are connected as of 28 September. A reader finishing Explore S now continues into Explore A; finishing A opens T. Completing all 30 opening topics offers replay. Unavailable-media handling remains in place for future additions.

Automated navigation checks: `node scripts/check-english-navigation.cjs`. Existing sequence/offline checks: `node scripts/check-english.cjs`.
