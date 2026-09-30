import { englishNarration, revisedNarrationIds } from './english-narration';
import { programmeLessons, programmeOpeningActivities, type ProgrammeActivity } from './english-programme';
import { programmeMedia } from './english-programme-media';

export const englishLevels = [
  { title: 'Sounds into First Words', description: 'Little sounds. A wonderful beginning.', forms: 's a t', colour: 'mint' },
  { title: 'First Reading with Meaning', description: 'Read a little. Understand a lot.', forms: 'cat', colour: 'peach' },
  { title: 'Letter Teams and Longer Words', description: 'Discover what letters can do together.', forms: 'sh', colour: 'lavender' },
  { title: 'Vowel Patterns and Sustained Reading', description: 'Find patterns. Keep the story going.', forms: 'ai', colour: 'blue' },
  { title: 'Independent Reading', description: 'A whole world of stories to explore.', forms: 'Aa', colour: 'gold' },
] as const;

export type ExploreLetter = 's' | 'a' | 't' | 'p' | 'i' | 'n';
export type Letter = ExploreLetter;
export type WritingLetter = ExploreLetter | Uppercase<ExploreLetter>;
export type ReadingWord = 'at' | 'sat' | 'pin' | 'sit';
export type ApplicationWord = 'pan' | 'tap';
export type PronunciationWord = ReadingWord | ApplicationWord;
export const isExploreLetter = (letter: Letter): letter is ExploreLetter => ['s', 'a', 't', 'p', 'i', 'n'].includes(letter);
export type Activity = {
  id: string;
  title: string;
  kind: 'video' | 'sound' | 'find' | 'cases' | 'write' | 'word' | 'review' | 'apply' | 'practice' | 'formation';
  letter?: Letter;
  uppercase?: boolean;
  word?: ReadingWord;
  // Only these explicitly authored introductions offer recorded-sound practice
  // while their teaching video is pending. Other missing videos stay blocked.
  audioIntroduction?: boolean;
  // An authored preview leads into guided practice, not a watched-video claim.
  practicePreview?: boolean;
  practiceLetter?: string;
};
export type EnglishLesson = { id: string; title: string; description: string; forms: string; colour: string; activities: Activity[]; supplemental?: boolean; requiredLetter?: string; objective?: string };

function explore(letter: ExploreLetter, practicePreview = false): EnglishLesson {
  const big = letter.toUpperCase();
  return {
    id: `explore-${letter}`, title: `Explore ${big}`, description: 'Meet its shapes. Make your mark.', forms: `${big}${letter}`,
    colour: letter === 's' || letter === 'p' ? 'peach' : letter === 'a' || letter === 'i' ? 'lavender' : 'blue',
    supplemental: true, requiredLetter: letter,
    activities: [
      { id: `meet-${letter}-cases`, title: `Big ${big} and Small ${letter}`, kind: 'video', letter, practicePreview },
      { id: `find-${letter}-cases`, title: `Find ${big} and ${letter}`, kind: 'cases', letter },
      { id: `watch-${letter}-capital`, title: `Write Big ${big}`, kind: 'video', letter, uppercase: true, practicePreview },
      { id: `write-${letter}-capital`, title: `My Big ${big}`, kind: 'write', letter, uppercase: true },
      { id: `watch-${letter}-lowercase`, title: `Write Small ${letter}`, kind: 'video', letter, practicePreview },
      { id: `write-${letter}-lowercase`, title: `My Small ${letter}`, kind: 'write', letter },
    ],
  };
}

const openingLessons: EnglishLesson[] = [
  {
    id: 'first-words', title: 'S, A, T — Our First Words', description: 'Hear a sound. Build a word. Find its meaning.', forms: 's a t', colour: 'mint',
    activities: [
      { id: 'meet-s', title: 'Meet s', kind: 'video', letter: 's' },
      { id: 'practice-s', title: 'Practice the s Sound', kind: 'sound', letter: 's' },
      { id: 'meet-a', title: 'Meet a', kind: 'video', letter: 'a' },
      { id: 'practice-a', title: 'Practice the a Sound', kind: 'sound', letter: 'a' },
      { id: 'find-a', title: 'Listen and Find', kind: 'find', letter: 'a' },
      { id: 'meet-t', title: 'Meet t', kind: 'video', letter: 't' },
      { id: 'practice-t', title: 'Practice the t Sound', kind: 'sound', letter: 't' },
      { id: 'find-t', title: 'Our Three Sounds', kind: 'find', letter: 't' },
      { id: 'build-at', title: 'Make and Read at', kind: 'word', word: 'at' },
      { id: 'build-sat', title: 'Make and Read sat', kind: 'word', word: 'sat' },
      { id: 'our-first-words', title: 'Find our words', kind: 'review' },
    ],
  },
  explore('s'), explore('a'), explore('t'),
  {
    id: 'more-words', title: 'P, I, N — More Little Words', description: 'Three new sounds. More words to discover.', forms: 'pin', colour: 'mint',
    activities: [
      { id: 'meet-p', title: 'Meet p', kind: 'video', letter: 'p', audioIntroduction: true },
      { id: 'practice-p', title: 'Practice the p Sound', kind: 'sound', letter: 'p' },
      { id: 'find-p', title: 'Listen and Find p', kind: 'find', letter: 'p' },
      { id: 'meet-i', title: 'Meet i', kind: 'video', letter: 'i', audioIntroduction: true },
      { id: 'practice-i', title: 'Practice the i Sound', kind: 'sound', letter: 'i' },
      { id: 'find-i', title: 'Listen and Find i', kind: 'find', letter: 'i' },
      { id: 'meet-n', title: 'Meet n', kind: 'video', letter: 'n', audioIntroduction: true },
      { id: 'practice-n', title: 'Practice the n Sound', kind: 'sound', letter: 'n' },
      { id: 'find-n', title: 'Our Six Sounds', kind: 'find', letter: 'n' },
      { id: 'build-pin', title: 'Make and Read pin', kind: 'word', word: 'pin' },
      { id: 'build-sit', title: 'Make and Read sit', kind: 'word', word: 'sit' },
      { id: 'more-little-words', title: 'Our New Words', kind: 'review' },
      { id: 'more-words-with-apty', title: 'More Words with Apty', kind: 'apply' },
    ],
  },
  explore('p', true), explore('i', true), explore('n', true),
];

const practiceActivity = (activity: ProgrammeActivity): Activity => ({ id: activity.id, title: activity.title, kind: 'practice' });
function withOpeningPractice(lesson: EnglishLesson): EnglishLesson {
  const extras = programmeOpeningActivities[lesson.id as keyof typeof programmeOpeningActivities] || [];
  return { ...lesson, activities: [
    ...extras.filter(item => item.afterActivityId === null).map(practiceActivity),
    ...lesson.activities.flatMap(activity => [activity, ...extras.filter(item => item.afterActivityId === activity.id).map(practiceActivity)]),
    ...extras.filter(item => item.afterActivityId === undefined).map(practiceActivity),
  ] };
}

// Reading is the main route. Letter formation remains available alongside it;
// eighteen handwriting screens no longer delay the child's next new words.
export const englishLessons: EnglishLesson[] = [
  ...openingLessons.filter(lesson => !lesson.supplemental).map(withOpeningPractice),
  ...programmeLessons.map(lesson => ({ ...lesson, objective: lesson.description, activities: lesson.activities.map(practiceActivity) })),
  ...openingLessons.filter(lesson => lesson.supplemental),
  ...[...'cmehrgd kolfbujwvyz'.replace(/ /g, '')].map(letter => ({
    id: `explore-${letter}`, title: `Explore ${letter.toUpperCase()}`, description: 'Match its shapes. Draw it your way.',
    forms: `${letter.toUpperCase()}${letter}`, colour: 'peach', supplemental: true, requiredLetter: letter,
    activities: [{ id: `forms-${letter}`, title: `Big ${letter.toUpperCase()} and small ${letter}`, kind: 'formation' as const, practiceLetter: letter }],
  })),
];

// Add approved, public media URLs here. Never use speech synthesis for isolated
// phonemes: it can pronounce letter names or add a misleading vowel sound.
// Local media belongs in public/english/media; hosted URLs must use HTTPS.
export const englishMedia: Record<string, string | undefined> = {
  ...Object.fromEntries([...'satpincmehrgdkolfbujwvyz'].map(letter => [`sound-${letter}`, `/english/media/${letter}-sound.mp3`])),
  ...Object.fromEntries(Object.keys(englishNarration).map(id => [id, undefined])),
  'sound-s': '/english/media/s-sound.mp3', 'sound-a': '/english/media/a-sound.mp3', 'sound-t': '/english/media/t-sound.mp3',
  'sound-p': '/english/media/p-sound.mp3', 'sound-i': '/english/media/i-sound.mp3', 'sound-n': '/english/media/n-sound.mp3',
  'sound-practice-star': '/english/media/star-fill.mp3',
  'sound-practice-complete': '/english/media/achievement-celebration.mp3',
  'word-at': undefined, 'word-sat': undefined,
  'story-sat': undefined, 'question-mat': undefined, 'question-bench': undefined,
};

// Recorded narration lives in Bunny's level-specific audio folders. The
// filename convention is intentional: adding a new letter's matching files
// wires it automatically without another per-letter map entry.
const ENGLISH_AUDIO = 'https://aptyread-cdn.b-cdn.net/english/level1/audio';
const SHARED_AUDIO: Record<string, string> = {
  // The same short cue is intentionally reused wherever the child's action is
  // the same. This keeps the voice warm and makes the CDN easy to maintain.
  'link-listen': 'listen-v1.mp3',
  'link-find': 'listen-find-it-v1.mp3',
  'link-find-it': 'find-it-v1.mp3',
  'link-retry': 'listen-again-v1.mp3',
  'link-help': 'lets-listen-together-v1.mp3',
  'link-your-turn': 'your-turn-v1.mp3',
  'practice-listen': 'listen-v1.mp3',
  'practice-now-try': 'now-you-try-v1.mp3',
  'practice-your-turn': 'your-turn-v1.mp3',
  'practice-one-more': 'one-more-v1.mp3',
  'intro-listen': 'lets-listen-together-v1.mp3',
  'intro-try': 'now-you-try-v1.mp3',
  'build-intro-at': 'lets-make-a-word-together-v1.mp3',
  'build-intro-sat': 'lets-make-a-word-together-v1.mp3',
  'build-tap': 'now-tap-v1.mp3',
  'build-next-tap': 'now-tap-v1.mp3',
  'build-ready': 'put-the-sounds-together-v1.mp3',
  'read-done-at': 'lets-see-what-it-means-v1.mp3',
  'read-done-sat': 'lets-see-what-it-means-v1.mp3',
  'meaning-correct': 'you-found-it-v1.mp3',
  'sentence-retry': 'listen-again-v1.mp3',
  'discover-retry': 'listen-again-v1.mp3',
  'practice-watch': 'watch-v1.mp3',
  'practice-watch-again': 'watch-again-v1.mp3',
  'paper-watch': 'watch-v1.mp3',
  'paper-watch-again': 'watch-again-v1.mp3',
};

const LESSON_1_AUDIO: Record<string, string> = {
  'word-at': 'word-at-v1.mp3',
  'word-sat': 'word-sat-v1.mp3',
  'say-at': 'say-at-v1.mp3',
  'say-sat': 'say-sat-v1.mp3',
  'say-again-at': 'say-again-at-v1.mp3',
  'say-again-sat': 'say-again-sat-v1.mp3',
  'sentence-intro': 'sentence-intro-v1.mp3',
  'sentence-sat': 'sentence-sat-v1.mp3',
  'sentence-at': 'sentence-at-v1.mp3',
  'sentence-find-sat': 'sentence-find-sat-v1.mp3',
  'sentence-find-at': 'sentence-find-at-v1.mp3',
  'sentence-correct-sat': 'sentence-correct-sat-v1.mp3',
  'sentence-correct-at': 'sentence-correct-at-v1.mp3',
  'story-sat': 'story-sat-v1.mp3',
  'question-mat': 'question-mat-v1.mp3',
  'question-bench': 'question-bench-v1.mp3',
  'meaning-retry': 'who-sat-down-v1.mp3',
  'celebrate-at': 'you-made-at-v1.mp3',
  'celebrate-sat': 'you-made-sat-v1.mp3',
};

function recordedNarrationFor(id: string) {
  if (SHARED_AUDIO[id]) return `${ENGLISH_AUDIO}/shared/${SHARED_AUDIO[id]}`;
  if (LESSON_1_AUDIO[id]) return `${ENGLISH_AUDIO}/lesson1/${LESSON_1_AUDIO[id]}`;

  // Case prompts are deliberately data-driven: adding cases-find-big-p-v1.mp3
  // (or another future letter) to /letters wires it without a code change.
  const cases = /^cases-(?:find-)?(big|small)-([a-z])$/i.exec(id);
  if (cases) return `${ENGLISH_AUDIO}/letters/cases-find-${cases[1].toLowerCase()}-${cases[2].toLowerCase()}-v1.mp3`;
  if (id === 'cases-retry') return `${ENGLISH_AUDIO}/letters/cases-retry-v1.mp3`;

  const trace = /^instruction-write-([a-z])-([a-z]+)$/i.exec(id);
  if (trace && (trace[2] === 'capital' || trace[2] === 'lowercase')) {
    const size = trace[2] === 'capital' ? 'big' : 'small';
    return `${ENGLISH_AUDIO}/writing/trace-${size}-${trace[1].toLowerCase()}-v1.mp3`;
  }
  const writing = /^(paper-write|writing-success)-(big|small)-([a-z])$/i.exec(id);
  if (writing) return `${ENGLISH_AUDIO}/writing/${writing[1]}-${writing[2].toLowerCase()}-${writing[3].toLowerCase()}-v1.mp3`;
  return undefined;
}
export function mediaFor(id: string) {
  // Revised directions use their shorter device-voice script until an exact
  // replacement is explicitly registered. Never silently play the old wording.
  return programmeMedia[id] ?? englishMedia[id] ?? (revisedNarrationIds.some(cue => cue === id) ? undefined : recordedNarrationFor(id));
}

const SOUND_CLIPS = 'https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-sound-video-clips';
export const englishSoundPracticeVideos: Record<Letter, { src: string; poster: string }> = {
  s: {
    src: `${SOUND_CLIPS}/sound-s.mp4`,
    poster: '/english/media/s-practice-v1.webp',
  },
  a: {
    src: `${SOUND_CLIPS}/sound-a.mp4`,
    poster: '/english/media/a-practice-v1.webp',
  },
  t: {
    src: `${SOUND_CLIPS}/sound-t.mp4`,
    poster: '/english/media/t-practice-v1.webp',
  },
  p: { src: `${SOUND_CLIPS}/sound-p.mp4`, poster: '/english/media/p-practice-v1.webp' },
  i: { src: `${SOUND_CLIPS}/sound-i.mp4`, poster: '/english/media/i-practice-v1.webp' },
  n: { src: `${SOUND_CLIPS}/sound-n.mp4`, poster: '/english/media/n-practice-v1.webp' },
};

// Paper practice stays inside each writing topic; it is not an extra access gate.
const WRITING_CLIPS = 'https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-writing-video-clips';
export const englishPaperWritingVideos: Record<WritingLetter, { src: string; poster: string }> = {
  S: {
    src: `${WRITING_CLIPS}/draw-big-s.mp4`,
    poster: '/english/media/write-big-s-v1.webp',
  },
  s: {
    src: `${WRITING_CLIPS}/draw-small-s.mp4`,
    poster: '/english/media/write-small-s-v1.webp',
  },
  A: { src: `${WRITING_CLIPS}/draw-big-a.mp4`, poster: '/english/media/write-big-a-v1.webp' },
  a: { src: `${WRITING_CLIPS}/draw-small-a.mp4`, poster: '/english/media/write-small-a-v1.webp' },
  T: { src: `${WRITING_CLIPS}/draw-big-t.mp4`, poster: '/english/media/write-big-t-v1.webp' },
  t: { src: `${WRITING_CLIPS}/draw-small-t.mp4`, poster: '/english/media/write-small-t-v1.webp' },
  P: { src: `${WRITING_CLIPS}/draw-big-p.mp4`, poster: '/english/media/write-big-p-v1.webp' },
  p: { src: `${WRITING_CLIPS}/draw-small-p.mp4`, poster: '/english/media/write-small-p-v1.webp' },
  I: { src: `${WRITING_CLIPS}/draw-big-i.mp4`, poster: '/english/media/write-big-i-v1.webp' },
  i: { src: `${WRITING_CLIPS}/draw-small-i.mp4`, poster: '/english/media/write-small-i-v1.webp' },
  N: { src: `${WRITING_CLIPS}/draw-big-n.mp4`, poster: '/english/media/write-big-n-v1.webp' },
  n: { src: `${WRITING_CLIPS}/draw-small-n.mp4`, poster: '/english/media/write-small-n-v1.webp' },
};

// Optional whole-word mouth-movement models, revealed after the first reading
// try. Missing clips stay hidden and never gate progress.
export type WordPronunciationVideo = { kind: 'bunny'; id: string } | { kind: 'file'; src: string; poster?: string; aspectRatio?: '1 / 1' | '4 / 3' };
export const englishPronunciationVideos: Partial<Record<PronunciationWord, WordPronunciationVideo>> = {
  // Optional next recordings: pin, sit, pan, tap. Add approved URLs when ready.
  at: { kind: 'file', src: '/english/media/at-pronunciation-v1.mp4', poster: '/english/media/at-pronunciation-v1.webp', aspectRatio: '1 / 1' },
  // Cropped/optimized from the supplied CDN Sat.mp4. Replace src with the
  // versioned CDN URL once this optimized file is uploaded (see media brief).
  sat: { kind: 'file', src: '/english/media/sat-pronunciation-v1.mp4', poster: '/english/media/sat-pronunciation-v1.webp', aspectRatio: '1 / 1' },
};

// Public Bunny Stream identifiers. Never put a Stream API key in the client.
export const englishVideos: Record<string, { landscape: string; portrait: string } | undefined> = {
  'meet-s-cases': { landscape: 'a2f5e6e4-c23b-45e2-82a1-03ed1883bdcc', portrait: '9d8ac13c-9318-4ce0-b725-f5e19dbe904a' },
  'watch-s-capital': { landscape: '7ffe5456-c411-4da6-87d5-cc132d04fea1', portrait: 'd4e5f743-ab27-4333-8e67-039b72d247ac' },
  'watch-s-lowercase': { landscape: '5084d7fc-eb6d-4ce0-878e-17008cf6ca6f', portrait: '4b630290-94ab-4b5d-8f05-64649fd43f35' },
  'meet-a-cases': { landscape: 'f0b6622c-1d84-423c-a30d-8de8641c1255', portrait: '9f10d272-a656-40db-9f11-1dab43150603' },
  'meet-t-cases': { landscape: '9005fb48-9649-40af-a847-28c5b602679b', portrait: 'f8b1a874-5632-4db8-adc9-ae5c5ebd69f9' },
  'watch-a-capital': { landscape: '34e4ee38-4e8f-417a-8d70-9750367fffe0', portrait: 'f5794733-c876-45b7-a66e-a8ab14b512fd' },
  'watch-t-capital': { landscape: '1fbeaa04-511c-4688-85e0-2f9fbe9a685b', portrait: '8d290c0e-1360-4989-93c5-9af718134fcf' },
  'watch-a-lowercase': { landscape: 'bbb70298-5a64-4149-9eb9-da6efdba4d06', portrait: 'b331d500-d541-41dd-89ed-daa819e784bf' },
  'watch-t-lowercase': { landscape: 'b591a72e-d7b8-4f06-8d91-7719d3dce1d6', portrait: '566dcea8-668c-4120-b61b-9f4a38c97141' },
  'meet-s': { landscape: 'be494891-516f-4373-9440-165743fe47f2', portrait: '62e7f648-5355-4533-9e3e-f618d7f799fd' },
  'meet-a': { landscape: '9536091f-2211-4faf-b3e7-ffcec9d8bdc6', portrait: '9575f978-c9e0-460c-a93e-7c7598a87d30' },
  'meet-t': { landscape: 'd2b24f3e-547d-4e4a-89ed-d4b5dabd14cb', portrait: 'e8f78faf-8c6f-4c38-bac1-253ac6924a8e' },
};
// This release is a complete learning prototype. Authored sound/model fallbacks
// and labelled video placeholders make every listed lesson playable.
export function isEnglishLessonPublished(lesson: EnglishLesson) {
  return lesson.activities.length > 0;
}
export const BUNNY_LIBRARY = '619329';
