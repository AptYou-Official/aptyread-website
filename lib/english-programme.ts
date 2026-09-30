/** Authored Level 1 teaching content. Completion is participation, not verified oral reading. */
export type ProgrammeChoice = { id: string; label: string; scene: string };
type TaskBase = { id: string; skills?: string[] };
export type ProgrammeTrial = TaskBase & (
  | { kind: 'sound'; letter: string; knownLetters: string[]; mode: 'teach' | 'check' }
  | { kind: 'build'; word: string; letters: string[]; meaning: string; scene: string; mode?: 'guided' | 'encode' }
  | { kind: 'read'; word: string; meaning?: string; choices: ProgrammeChoice[]; answer: string }
  | { kind: 'book'; title: string; pages: { id: string; text: string; scene: string; question?: string; choices?: ProgrammeChoice[]; answer?: string }[]; conventions?: string[]; preparation?: { text: string; scene: string }[] }
  | { kind: 'listen'; story: string; scene: string; question: string; choices: ProgrammeChoice[]; answer: string }
);
export type ProgrammeTask = ProgrammeTrial | (TaskBase & { kind: 'review'; trials: ProgrammeTrial[] }) | (TaskBase & { kind: 'check'; trials: ProgrammeTrial[] });
export type ProgrammeActivity = {
  id: string; title: string; objective: string; skills: string[]; tasks: ProgrammeTask[];
  /** null means before the first activity; omission means append when used as an opening extra. */
  afterActivityId?: string | null;
  /** The exact correspondences available for child-read print in this activity. */
  knownLetters?: string[];
};
export type ProgrammeLesson = {
  id: string; title: string; description: string; forms: string; colour: string;
  activities: ProgrammeActivity[]; prerequisite?: string; taughtLetters: string[];
};

export const LEVEL_ONE_LETTER_GROUPS = ['sat', 'pin', 'cme', 'hrg', 'dko', 'lfb', 'ujw', 'vyz'] as const;
export const LEVEL_ONE_LETTERS = [...LEVEL_ONE_LETTER_GROUPS.join('')];
const letters = (value: string) => [...value];
const choice = (id: string, label: string, scene = id): ProgrammeChoice => ({ id, label, scene });
const sound = (id: string, letter: string, known: string, mode: 'teach' | 'check' = 'check'): ProgrammeTrial =>
  ({ id, kind: 'sound', letter, knownLetters: letters(known), mode, skills: [`code.${letter}`, 'sound-to-print'] });
const build = (id: string, word: string, tiles: string, meaning: string, scene = word, mode: 'guided' | 'encode' = 'guided'): ProgrammeTrial =>
  ({ id, kind: 'build', word, letters: letters(tiles), meaning, scene, mode, skills: ['segment-and-encode', `word.${word}`] });
const read = (id: string, word: string, meaning: string, other: ProgrammeChoice, scene = word): ProgrammeTrial =>
  ({ id, kind: 'read', word, meaning, choices: [choice(word, meaning, scene), other], answer: word, skills: ['print-first-opportunity', 'word-meaning', `word.${word}`] });
const activity = (id: string, title: string, objective: string, known: string, tasks: ProgrammeTask[], skills = ['code', 'word-meaning']): ProgrammeActivity =>
  ({ id, title, objective, knownLetters: letters(known), tasks, skills });

/** One new correspondence, an immediate modelled word, then a child-first reread. */
function letterActivity(id: string, letter: string, knownBefore: string, word: string, meaning: string, other: ProgrammeChoice): ProgrammeActivity {
  const known = knownBefore + letter;
  return activity(id, `Meet ${letter} · ${word}`, `Hear ${letter}, build ${word}, and connect its print with its meaning.`, known, [
    sound(`${id}-retrieve`, knownBefore[knownBefore.length - 1], knownBefore),
    sound(`${id}-model`, letter, known, 'teach'),
    build(`${id}-build`, word, [...new Set(word + knownBefore.slice(-2))].join(''), meaning),
    read(`${id}-read`, word, meaning, other),
  ]);
}
const check = (id: string, trials: ProgrammeTrial[]): ProgrammeTask => ({ id, kind: 'check', trials, skills: ['cumulative-practice'] });

export const programmeOpeningActivities: Record<'first-words' | 'more-words', ProgrammeActivity[]> = {
  'first-words': [{
    ...activity('sat-use-words', 'My turn', 'Try familiar sounds and printed sat, then build sat from a spoken word without an initial answer cue. Help remains available.', 'sat', [
      check('sat-use-check', [
        sound('sat-use-a', 'a', 'sat'),
        read('sat-use-read', 'sat', 'Sat means someone was sitting.', choice('standing', 'Someone standing', 'pat-standing')),
        build('sat-use-build', 'sat', 'tas', 'Sat means someone was sitting.', 'sat', 'encode'),
      ]),
    ], ['sound-to-print', 'segment-and-encode', 'word-meaning']),
    afterActivityId: 'our-first-words',
  }],
  'more-words': [
    { ...activity('pin-remember-sat', 'Hello, familiar sounds', 'Retrieve two familiar correspondences before meeting p.', 'sat', [
      { id: 'pin-old-sounds', kind: 'review', trials: [sound('pin-old-s', 's', 'sat'), sound('pin-old-a', 'a', 'sat')] },
    ], ['sound-to-print']), afterActivityId: null },
    { ...activity('pin-use-p', 'Make tap', 'Use p immediately in a word and connect the word to a gentle tapping action.', 'satp', [
      build('pin-tap-build', 'tap', 'past', 'Tap means touch something gently with a finger.'),
      read('pin-tap-read', 'tap', 'A gentle tap', choice('sitting', 'Someone sitting', 'pat-sat')),
    ]), afterActivityId: 'find-p' },
    { ...activity('pin-use-i', 'Make sit', 'Use short i immediately and distinguish sitting from standing.', 'satpi', [
      build('pin-sit-build', 'sit', 'atips', 'Sit means rest on a seat or on the ground.'),
      read('pin-sit-read', 'sit', 'Someone sitting', choice('standing', 'Someone standing', 'pat-standing')),
    ]), afterActivityId: 'find-i' },
    { ...activity('pin-use-words', 'Six sounds together', 'Mix earlier words and the two short vowels without claiming verified oral reading.', 'satpin', [
      check('pin-six-check', [
        sound('pin-check-i', 'i', 'satpin'),
        sound('pin-check-a', 'a', 'satpin'),
        read('pin-check-pan', 'pan', 'A pan for cooking', choice('pin', 'A closed safety pin', 'pin')),
        build('pin-check-tap', 'tap', 'patsin', 'Tap means touch gently.', 'tap', 'encode'),
      ]),
    ], ['sound-to-print', 'segment-and-encode', 'word-meaning']), afterActivityId: 'more-words-with-apty' },
  ],
};

export const programmeLessons: ProgrammeLesson[] = [
  {
    id: 'first-book', title: 'Pat and Pip', description: 'Our first tiny story. Read, listen and act it out.', forms: 'Pat · Pip', colour: 'peach',
    prerequisite: 'more-words', taughtLetters: letters('satpin'), activities: [
      activity('first-book-story', 'Pat and Pip sit', 'Follow a three-event story and revisit known code in connected print.', 'satpin', [
        { id: 'first-book-read', kind: 'book', title: 'Pat and Pip', preparation: [{ text: 'Pat', scene: 'pat-sat' }, { text: 'Pip', scene: 'pip-sat' }], skills: ['connected-print', 'print-conventions', 'language.agent-action'], conventions: [
          'Big P and small p go together. Big S and small s go together.',
          'Names start with a big letter.',
          'Read from left to right. Spaces separate words.',
          'Listen: Sit, Pip. Pause at the comma and the full stop.',
        ], pages: [
          { id: 'pat-sits', text: 'Pat sat.', scene: 'pat-sat' },
          { id: 'invite-pip', text: 'Sit, Pip.', scene: 'pip-sit' },
          { id: 'pip-sits', text: 'Pip sat.', scene: 'pip-sat', question: 'Who sat after Pat?', choices: [choice('pip', 'Pip', 'pip-sat'), choice('pat', 'Pat', 'pat-sat')], answer: 'pip' },
        ] },
      ], ['connected-print', 'language.agent-action', 'print-conventions']),
      activity('first-book-listen', 'Listen, then show', 'Understand an invitation and its result through narrated language.', 'satpin', [
        { id: 'first-book-listen-story', kind: 'listen', story: 'Pat sat on a soft mat. Pat invited Pip to sit beside her. Pip sat down too. Now they could look at a picture book together. If you like, tell or show what Pip did.', scene: 'pat-and-pip-sit', question: 'What did Pip do when Pat invited him?', choices: [choice('sat', 'Pip sat beside Pat.', 'pip-sat'), choice('stood', 'Pip stayed standing.', 'pip-standing')], answer: 'sat', skills: ['listening-meaning', 'language.invitation'] },
      ], ['listening-meaning']),
      activity('first-book-return', 'A word to remember', 'Return to a practised word after another activity.', 'satpin', [
        check('first-book-return-check', [read('first-book-pin', 'pin', 'A closed safety pin', choice('pan', 'A pan', 'pan')), build('first-book-sit', 'sit', 'tasipn', 'Sit means rest on a seat or on the ground.', 'sit', 'encode')]),
      ], ['word-meaning', 'segment-and-encode']),
    ],
  },
  {
    id: 'cat-mat-pen', title: 'C, M, E · Play together', description: 'Meet three sounds. Tap, read and remember.', forms: 'c m e', colour: 'mint',
    prerequisite: 'first-book', taughtLetters: letters('satpincme'), activities: [
      letterActivity('cme-meet-c', 'c', 'satpin', 'cat', 'A cat is an animal with whiskers.', choice('pan', 'A pan', 'pan')),
      letterActivity('cme-meet-m', 'm', 'satpinc', 'mat', 'A mat is something we can sit or stand on.', choice('cat', 'A cat', 'cat')),
      letterActivity('cme-meet-e', 'e', 'satpincm', 'pen', 'A pen makes marks for writing and drawing.', choice('pin', 'A closed safety pin', 'pin')),
      activity('cme-tap-book', 'We can tap', 'Understand can as being able to do an action and read three short sentences.', 'satpincme', [
        { id: 'cme-tap-listen', kind: 'listen', story: 'Pat can tap a gentle beat. Pip watches, then taps a beat too. After tapping, Pip sits to rest. Can means someone is able to do something. You can tap your knee gently, if you would like.', scene: 'pat-tap', question: 'Who copied the tapping?', choices: [choice('pip', 'Pip', 'pip-tap'), choice('cat', 'A cat', 'cat')], answer: 'pip', skills: ['language.can', 'listening-meaning'] },
        { id: 'cme-tap-read', kind: 'book', title: 'Tap together', preparation: [{ text: 'Pat', scene: 'pat-tap' }, { text: 'Pip', scene: 'pip-tap' }, { text: 'can', scene: 'pat-tap' }], conventions: ['Can means you are able to do something. You can tap gently.', 'Read from left to right. Spaces separate words.', 'Pause at a full stop.'], pages: [
          { id: 'pat-tap', text: 'Pat can tap.', scene: 'pat-tap' },
          { id: 'pip-tap', text: 'Pip can tap.', scene: 'pip-tap' },
          { id: 'pip-rest', text: 'Pip sat.', scene: 'pip-sat', question: 'What did Pip do at the end?', choices: [choice('sat', 'Pip sat.', 'pip-sat'), choice('tap', 'Pip tapped.', 'pip-tap')], answer: 'sat' },
        ], skills: ['connected-print', 'language.can'] },
      ], ['connected-print', 'listening-meaning', 'language.can']),
      activity('cme-return', 'Mix our words', 'Distinguish short e and short i and retrieve earlier words.', 'satpincme', [check('cme-check', [sound('cme-check-e', 'e', 'satpincme'), sound('cme-check-i', 'i', 'satpincme'), read('cme-check-pen', 'pen', 'A pen', choice('pin', 'A closed safety pin', 'pin')), build('cme-check-cat', 'cat', 'mtac', 'A cat is an animal with whiskers.', 'cat', 'encode')])], ['sound-to-print', 'word-meaning', 'segment-and-encode']),
    ],
  },
  {
    id: 'hat-rat-pig', title: 'H, R, G · A little race', description: 'New sounds, familiar friends and a place to rest.', forms: 'h r g', colour: 'lavender',
    prerequisite: 'cat-mat-pen', taughtLetters: letters('satpincmehrg'), activities: [
      letterActivity('hrg-meet-h', 'h', 'satpincme', 'hat', 'A hat goes on your head.', choice('mat', 'A mat', 'mat')),
      letterActivity('hrg-meet-r', 'r', 'satpincmeh', 'rat', 'A rat is a small animal with a long tail.', choice('cat', 'A cat', 'cat')),
      letterActivity('hrg-meet-g', 'g', 'satpincmehr', 'pig', 'A pig is an animal with a rounded snout.', choice('pin', 'A closed safety pin', 'pin')),
      activity('hrg-race-book', 'Run and rest', 'Track who does an action and understand ran and sat as past events.', 'satpincmehrg', [
        { id: 'hrg-race-listen', kind: 'listen', story: 'Meet Sam, Pat’s friend. Sam ran across the grass. Pat ran after him. Sam felt tired, so he sat on a mat. Ran tells us about running that happened. Sat tells us about sitting that happened. You can tell or show what Sam did first, and what he did last.', scene: 'sam-ran', question: 'Who sat down to rest?', choices: [choice('sam', 'Sam', 'sam-sat'), choice('pat', 'Pat', 'pat-ran')], answer: 'sam', skills: ['language.agent-action', 'language.past-events'] },
        { id: 'hrg-race-read', kind: 'book', title: 'A little race', preparation: [{ text: 'Sam', scene: 'sam-sat' }, { text: 'ran', scene: 'sam-ran' }], conventions: ['Sam starts with big S. Big S and small s go together.', 'Sam ran. That tells us about running that happened.', 'Sam sat. That tells us about sitting that happened.'], pages: [
          { id: 'sam-ran', text: 'Sam ran.', scene: 'sam-ran' },
          { id: 'pat-ran', text: 'Pat ran.', scene: 'pat-ran' },
          { id: 'sam-rest', text: 'Sam sat.', scene: 'sam-sat', question: 'Who ran first in this story?', choices: [choice('sam', 'Sam', 'sam-ran'), choice('pat', 'Pat', 'pat-ran')], answer: 'sam' },
        ], skills: ['connected-print', 'language.agent-action'] },
      ], ['connected-print', 'listening-meaning', 'language.past-events']),
      activity('hrg-return', 'Remember and build', 'Retrieve earlier vowels and encode a practised word with new final g.', 'satpincmehrg', [check('hrg-check', [sound('hrg-check-a', 'a', 'satpincmehrg'), read('hrg-check-hat', 'hat', 'A hat', choice('rat', 'A rat', 'rat')), read('hrg-check-cat', 'cat', 'A cat', choice('pig', 'A pig', 'pig')), build('hrg-check-pig', 'pig', 'gpit', 'A pig is an animal with a rounded snout.', 'pig', 'encode')])], ['sound-to-print', 'word-meaning', 'segment-and-encode']),
    ],
  },
  {
    id: 'sad-kid-dog', title: 'D, K, O · Dig and rest', description: 'Hear a new vowel. Read a little adventure.', forms: 'd k o', colour: 'blue',
    prerequisite: 'hat-rat-pig', taughtLetters: letters('satpincmehrgdko'), activities: [
      letterActivity('dko-meet-d', 'd', 'satpincmehrg', 'sad', 'Sad is how we may feel when something upsetting happens.', choice('happy', 'Someone feeling happy', 'jim-fun')),
      letterActivity('dko-meet-k', 'k', 'satpincmehrgd', 'kid', 'A kid is a child.', choice('pig', 'A pig', 'pig')),
      letterActivity('dko-meet-o', 'o', 'satpincmehrgdk', 'dog', 'A dog is an animal that may live with people.', choice('pig', 'A pig', 'pig')),
      activity('dko-dig-book', 'Time for a rest', 'Read a short event sequence and connect feeling hot with resting.', 'satpincmehrgdko', [
        { id: 'dko-dig-listen', kind: 'listen', story: 'Meet Kim. Kim and Pat dig in a garden with a grown-up nearby. Pat gets hot after working. Pat puts down the tool and sits in the shade for a rest. Taking a break helps Pat feel comfortable. You can tell why Pat needed a rest, or show how she felt.', scene: 'kim-dig', question: 'Why did Pat stop digging?', choices: [choice('hot', 'Pat felt hot.', 'pat-hot'), choice('dog', 'Pat saw a dog.', 'dog')], answer: 'hot', skills: ['language.cause', 'listening-meaning'] },
        { id: 'dko-dig-read', kind: 'book', title: 'Dig and rest', preparation: [{ text: 'Kim', scene: 'kim-dig' }, { text: 'dig', scene: 'pat-dig' }, { text: 'hot', scene: 'pat-hot' }], conventions: ['Kim starts with big K. Big K and small k go together.'], pages: [
          { id: 'kim-dig', text: 'Kim can dig.', scene: 'kim-dig' },
          { id: 'pat-dig', text: 'Pat can dig.', scene: 'pat-dig' },
          { id: 'pat-hot', text: 'Pat got hot.', scene: 'pat-hot' },
          { id: 'pat-rest', text: 'Pat sat.', scene: 'pat-sat', question: 'What happened after Pat got hot?', choices: [choice('rest', 'Pat sat.', 'pat-sat'), choice('dig', 'Pat started digging.', 'pat-dig')], answer: 'rest' },
        ], skills: ['connected-print', 'language.event-order'] },
      ], ['connected-print', 'listening-meaning', 'language.cause']),
      activity('dko-return', 'Listen across vowels', 'Compare short o with earlier vowels and build a known word.', 'satpincmehrgdko', [check('dko-check', [sound('dko-check-o', 'o', 'satpincmehrgdko'), sound('dko-check-e', 'e', 'satpincmehrgdko'), read('dko-check-dog', 'dog', 'A dog', choice('pig', 'A pig', 'pig')), build('dko-check-mat', 'mat', 'tamo', 'A mat is something we can sit or stand on.', 'mat', 'encode')])], ['sound-to-print', 'word-meaning', 'segment-and-encode']),
    ],
  },
  {
    id: 'log-fan-bag', title: 'L, F, B · Find the bag', description: 'Read picture labels and talk about where things are.', forms: 'l f b', colour: 'gold',
    prerequisite: 'sad-kid-dog', taughtLetters: letters('satpincmehrgdkolfb'), activities: [
      letterActivity('lfb-meet-l', 'l', 'satpincmehrgdko', 'log', 'A log is a thick piece of wood from a tree.', choice('dog', 'A dog', 'dog')),
      letterActivity('lfb-meet-f', 'f', 'satpincmehrgdkol', 'fan', 'A fan moves air to help us feel cooler.', choice('pan', 'A pan', 'pan')),
      letterActivity('lfb-meet-b', 'b', 'satpincmehrgdkolf', 'bag', 'A bag holds things so we can carry them.', choice('fan', 'A fan', 'fan')),
      activity('lfb-location-book', 'Where is the bag?', 'Read short information captions and distinguish in from on.', 'satpincmehrgdkolfb', [
        { id: 'lfb-location-listen', kind: 'listen', story: 'Look at the bag. First it is on the bed, resting on top. Then it is in a clean storage bin, inside the bin. Finally it is on a mat. In means inside. On means resting on top. Look at this picture. You can try saying, in the bin, or point to the bag.', scene: 'bag-in-bin', question: 'Which picture shows the bag inside something?', choices: [choice('in', 'The bag in the bin.', 'bag-in-bin'), choice('on', 'The bag on the bed.', 'bag-on-bed')], answer: 'in', skills: ['language.location', 'listening-meaning'] },
        { id: 'lfb-location-read', kind: 'book', title: 'Picture labels', preparation: [{ text: 'bed', scene: 'bag-on-bed' }, { text: 'bin', scene: 'bag-in-bin' }], conventions: ['These picture labels tell us where the bag is.', 'In means inside. On means resting on top.', 'Big B and small b go together.'], pages: [
          { id: 'bag-bed', text: 'Bag on bed.', scene: 'bag-on-bed' },
          { id: 'bag-bin', text: 'Bag in bin.', scene: 'bag-in-bin' },
          { id: 'bag-mat', text: 'Bag on mat.', scene: 'bag-on-mat', question: 'Which picture has the bag on a mat?', choices: [choice('mat', 'Bag on mat.', 'bag-on-mat'), choice('bin', 'Bag in bin.', 'bag-in-bin')], answer: 'mat' },
        ], skills: ['information-captions', 'language.location'] },
      ], ['information-captions', 'language.location', 'listening-meaning']),
      activity('lfb-return', 'Look back, try again', 'Mix objects from different lessons and retrieve a final consonant.', 'satpincmehrgdkolfb', [check('lfb-check', [sound('lfb-check-b', 'b', 'satpincmehrgdkolfb'), read('lfb-check-fan', 'fan', 'A fan', choice('pan', 'A pan', 'pan')), read('lfb-check-pen', 'pen', 'A pen', choice('log', 'A log', 'log')), build('lfb-check-bag', 'bag', 'agbd', 'A bag holds things so we can carry them.', 'bag', 'encode')])], ['sound-to-print', 'word-meaning', 'segment-and-encode']),
    ],
  },
  {
    id: 'sun-jug-wet', title: 'U, J, W · A wet day', description: 'Five short vowels. A story about a rainy surprise.', forms: 'u j w', colour: 'peach',
    prerequisite: 'log-fan-bag', taughtLetters: letters('satpincmehrgdkolfbujw'), activities: [
      letterActivity('ujw-meet-u', 'u', 'satpincmehrgdkolfb', 'sun', 'The sun gives our world light and warmth.', choice('fan', 'A fan', 'fan')),
      letterActivity('ujw-meet-j', 'j', 'satpincmehrgdkolfbu', 'jug', 'A jug holds water or another drink for pouring.', choice('bag', 'A bag', 'bag')),
      letterActivity('ujw-meet-w', 'w', 'satpincmehrgdkolfbuj', 'wet', 'Wet means covered with some water.', choice('dry', 'A dry object', 'dry-cup')),
      activity('ujw-wet-book', 'A rainy surprise', 'Connect events, feelings and a simple narrative across four pages.', 'satpincmehrgdkolfbujw', [
        { id: 'ujw-wet-listen', kind: 'listen', story: 'Meet Jim. Jim is playing outside when a little rain begins. Jim gets wet and runs to a covered seat. Jim sits down and laughs about the surprise. Getting a little wet during the game was fun for Jim. You can say how Jim felt, or show his happy face.', scene: 'jim-wet', question: 'Where did Jim go to get out of the rain?', choices: [choice('seat', 'To a covered seat.', 'jim-sat'), choice('sun', 'Into the sunshine.', 'sun')], answer: 'seat', skills: ['language.event-order', 'language.feelings'] },
        { id: 'ujw-wet-read', kind: 'book', title: 'Jim gets wet', preparation: [{ text: 'Jim', scene: 'jim-sat' }, { text: 'wet', scene: 'jim-wet' }, { text: 'fun', scene: 'jim-fun' }], conventions: ['Jim starts with big J. Big J and small j go together.', 'Wet means covered with some water.', 'Jim had fun means he enjoyed what happened.'], pages: [
          { id: 'jim-wet', text: 'Jim got wet.', scene: 'jim-wet' },
          { id: 'jim-ran', text: 'Jim ran.', scene: 'jim-ran' },
          { id: 'jim-sat', text: 'Jim sat.', scene: 'jim-sat' },
          { id: 'jim-fun', text: 'Jim had fun.', scene: 'jim-fun', question: 'How did Jim feel about the little surprise?', choices: [choice('fun', 'Jim had fun.', 'jim-fun'), choice('sad', 'Jim felt sad.', 'sad')], answer: 'fun' },
        ], skills: ['connected-print', 'language.event-order'] },
      ], ['connected-print', 'listening-meaning', 'language.feelings']),
      activity('ujw-return', 'Five vowel sounds', 'Retrieve short u and short a, then practise earlier print and encoding.', 'satpincmehrgdkolfbujw', [check('ujw-check', [sound('ujw-check-u', 'u', 'satpincmehrgdkolfbujw'), sound('ujw-check-a', 'a', 'satpincmehrgdkolfbujw'), read('ujw-check-jug', 'jug', 'A jug', choice('dog', 'A dog', 'dog')), build('ujw-check-sun', 'sun', 'unsao', 'The sun gives light and warmth.', 'sun', 'encode')])], ['sound-to-print', 'word-meaning', 'segment-and-encode']),
    ],
  },
  {
    id: 'van-yam-zip', title: 'V, Y, Z · Meet Zed', description: 'Our last three beginner sounds and a lively little dog.', forms: 'v y z', colour: 'mint',
    prerequisite: 'sun-jug-wet', taughtLetters: letters('satpincmehrgdkolfbujwvyz'), activities: [
      letterActivity('vyz-meet-v', 'v', 'satpincmehrgdkolfbujw', 'van', 'A van is a vehicle that carries people or things.', choice('fan', 'A fan', 'fan')),
      letterActivity('vyz-meet-y', 'y', 'satpincmehrgdkolfbujwv', 'yam', 'A yam is a root vegetable that people cook and eat.', choice('jug', 'A jug', 'jug')),
      letterActivity('vyz-meet-z', 'z', 'satpincmehrgdkolfbujwvy', 'zip', 'A zip joins the two sides of a bag or some clothes.', choice('pin', 'A closed safety pin', 'pin')),
      activity('vyz-zed-book', 'Zed plays outside', 'Read a connected sequence about a named dog and understand yap as a small bark.', 'satpincmehrgdkolfbujwvyz', [
        { id: 'vyz-zed-listen', kind: 'listen', story: 'This little dog is called Zed. Zed makes a small bark: yap, yap! Then Zed runs through a little puddle and gets wet. Zed sits beside a friend to be dried with a towel. You can make Zed’s little bark, or tell what he did next.', scene: 'zed-yap', question: 'What made Zed wet?', choices: [choice('puddle', 'Running through a puddle.', 'zed-wet'), choice('bark', 'Making a little bark.', 'zed-yap')], answer: 'puddle', skills: ['language.cause', 'listening-meaning'] },
        { id: 'vyz-zed-read', kind: 'book', title: 'Zed plays', preparation: [{ text: 'Zed', scene: 'zed-sat' }, { text: 'yap', scene: 'zed-yap' }], conventions: ['Zed starts with big Z. Big Z and small z go together.', 'Yap means a small bark.'], pages: [
          { id: 'zed-yap', text: 'Zed can yap.', scene: 'zed-yap' },
          { id: 'zed-ran', text: 'Zed ran.', scene: 'zed-ran' },
          { id: 'zed-wet', text: 'Zed got wet.', scene: 'zed-wet' },
          { id: 'zed-sat', text: 'Zed sat.', scene: 'zed-sat', question: 'What did Zed do after getting wet?', choices: [choice('sat', 'Zed sat.', 'zed-sat'), choice('ran', 'Zed started to run.', 'zed-ran')], answer: 'sat' },
        ], skills: ['connected-print', 'language.event-order'] },
      ], ['connected-print', 'listening-meaning', 'language.cause']),
      activity('vyz-return', 'Our sounds together', 'Use the last new consonants and retrieve short vowels from earlier lessons.', 'satpincmehrgdkolfbujwvyz', [check('vyz-check', [sound('vyz-check-y', 'y', 'satpincmehrgdkolfbujwvyz'), sound('vyz-check-o', 'o', 'satpincmehrgdkolfbujwvyz'), read('vyz-check-van', 'van', 'A van', choice('fan', 'A fan', 'fan')), build('vyz-check-zip', 'zip', 'pziv', 'A zip joins the sides of a bag or some clothes.', 'zip', 'encode')])], ['sound-to-print', 'word-meaning', 'segment-and-encode']),
    ],
  },
  {
    id: 'level-one-bridge', title: 'Look how far we have come', description: 'Revisit words, enjoy two little books and choose what to practise next.', forms: 'Read · Enjoy', colour: 'gold',
    prerequisite: 'van-yam-zip', taughtLetters: letters('satpincmehrgdkolfbujwvyz'), activities: [
      activity('l1-bridge-words', 'Words from our journey', 'Sample practised words across vowels with help available; identify useful practice, not a pass or fail.', 'satpincmehrgdkolfbujwvyz', [check('l1-bridge-word-check', [read('l1-bridge-cat', 'cat', 'A cat', choice('dog', 'A dog', 'dog')), read('l1-bridge-pig', 'pig', 'A pig', choice('pen', 'A pen', 'pen')), read('l1-bridge-dog', 'dog', 'A dog', choice('jug', 'A jug', 'jug')), build('l1-bridge-sun', 'sun', 'unsio', 'The sun gives light and warmth.', 'sun', 'encode')])], ['word-meaning', 'segment-and-encode']),
      activity('l1-bridge-story', 'One more little story', 'Offer a short matched text before its model, with an optional listener and no inferred oral score.', 'satpincmehrgdkolfbujwvyz', [
        { id: 'l1-bridge-story-read', kind: 'book', title: 'Pat goes for a jog', preparation: [{ text: 'jog', scene: 'pat-jog' }], conventions: ['Jog means run slowly and steadily.', 'Read from left to right. Pause at the full stop.'], pages: [
          { id: 'pat-jog', text: 'Pat can jog.', scene: 'pat-jog' },
          { id: 'pat-wet', text: 'Pat got wet.', scene: 'pat-wet' },
          { id: 'pat-sat', text: 'Pat sat.', scene: 'pat-sat', question: 'What did Pat do at the end?', choices: [choice('sat', 'Pat sat.', 'pat-sat'), choice('jog', 'Pat jogged.', 'pat-jog')], answer: 'sat' },
        ], skills: ['connected-print', 'language.event-order'] },
      ], ['connected-print', 'language.event-order']),
      activity('l1-bridge-information', 'Read a picture label', 'Read information captions and use print to distinguish an attribute and a location.', 'satpincmehrgdkolfbujwvyz', [
        { id: 'l1-bridge-information-read', kind: 'book', title: 'Look at the bags', preparation: [{ text: 'red', scene: 'red-bag' }, { text: 'big', scene: 'big-bag' }], conventions: ['These picture labels tell us about bags.', 'Big means large. This bag is bigger than the other bag.', 'Big R and small r go together. Big B and small b go together.'], pages: [
          { id: 'red-bag', text: 'Red bag.', scene: 'red-bag' },
          { id: 'big-bag', text: 'Big bag.', scene: 'big-bag' },
          { id: 'bag-van', text: 'Bag in van.', scene: 'bag-in-van', question: 'Which picture has a bag inside a vehicle?', choices: [choice('van', 'Bag in van.', 'bag-in-van'), choice('bed', 'Bag on bed.', 'bag-on-bed')], answer: 'van' },
        ], skills: ['information-captions', 'language.attributes', 'language.location'] },
      ], ['information-captions', 'language.attributes', 'language.location']),
    ],
  },
];
export const allProgrammeActivities: ProgrammeActivity[] = [...Object.values(programmeOpeningActivities).flat(), ...programmeLessons.flatMap(lesson => lesson.activities)];
export function getProgrammeActivity(id: string) { return allProgrammeActivities.find(activity => activity.id === id); }
export function programmeKnownLetters(activityId: string): string[] {
  const activity = getProgrammeActivity(activityId);
  return activity?.knownLetters || programmeLessons.find(lesson => lesson.activities.some(item => item.id === activityId))?.taughtLetters || [];
}

export function programmeTrials(activityId: string): ProgrammeTrial[] {
  return (getProgrammeActivity(activityId)?.tasks || []).flatMap(task => task.kind === 'review' || task.kind === 'check' ? task.trials : [task]);
}

/** Only explicit word tasks; rich narration and book captions are not an unlocked word bank. */
export function programmePracticeWords(activityId: string): string[] {
  return [...new Set(programmeTrials(activityId).flatMap(task => task.kind === 'build' || task.kind === 'read' ? [task.word] : []))];
}

/** These remain reserved in the original register. Pan is already taught in the web opening. */
export const programmeReservedObservationWords = ['nap', 'tip', 'tin'] as const;
