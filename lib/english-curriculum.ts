import { englishNarration } from './english-narration';

export const englishLevels = [
  { title: 'Sounds into First Words', description: 'Little sounds. A wonderful beginning.', forms: 's a t', colour: 'mint' },
  { title: 'First Reading with Meaning', description: 'Read a little. Understand a lot.', forms: 'cat', colour: 'peach' },
  { title: 'Letter Teams and Longer Words', description: 'Discover what letters can do together.', forms: 'sh', colour: 'lavender' },
  { title: 'Vowel Patterns and Sustained Reading', description: 'Find patterns. Keep the story going.', forms: 'ai', colour: 'blue' },
  { title: 'Independent Reading', description: 'A whole world of stories to explore.', forms: 'Aa', colour: 'gold' },
] as const;

export type ExploreLetter = 's' | 'a' | 't';
export type Letter = ExploreLetter | 'p' | 'i' | 'n';
export type WritingLetter = ExploreLetter | Uppercase<ExploreLetter>;
export type ReadingWord = 'at' | 'sat' | 'pin' | 'sit';
export type ApplicationWord = 'pan' | 'tap';
export type PronunciationWord = ReadingWord | ApplicationWord;
export const isExploreLetter = (letter: Letter): letter is ExploreLetter => letter === 's' || letter === 'a' || letter === 't';
export type Activity = {
  id: string;
  title: string;
  kind: 'video' | 'sound' | 'find' | 'cases' | 'write' | 'word' | 'review' | 'apply';
  letter?: Letter;
  uppercase?: boolean;
  word?: ReadingWord;
  // Only these explicitly authored introductions offer recorded-sound practice
  // while their teaching video is pending. Other missing videos stay blocked.
  audioIntroduction?: boolean;
};
export type EnglishLesson = { id: string; title: string; description: string; forms: string; colour: string; activities: Activity[] };

function explore(letter: ExploreLetter): EnglishLesson {
  const big = letter.toUpperCase();
  return {
    id: `explore-${letter}`, title: `Explore ${big}`, description: 'Meet its shapes. Make your mark.', forms: `${big}${letter}`,
    colour: letter === 's' ? 'peach' : letter === 'a' ? 'lavender' : 'blue',
    activities: [
      { id: `meet-${letter}-cases`, title: `Big ${big} and Small ${letter}`, kind: 'video', letter },
      { id: `find-${letter}-cases`, title: `Find ${big} and ${letter}`, kind: 'cases', letter },
      { id: `watch-${letter}-capital`, title: `Write Capital ${big}`, kind: 'video', letter, uppercase: true },
      { id: `write-${letter}-capital`, title: `My Capital ${big}`, kind: 'write', letter, uppercase: true },
      { id: `watch-${letter}-lowercase`, title: `Write Lowercase ${letter}`, kind: 'video', letter },
      { id: `write-${letter}-lowercase`, title: `My Lowercase ${letter}`, kind: 'write', letter },
    ],
  };
}

export const englishLessons: EnglishLesson[] = [
  {
    id: 'first-words', title: 'S, A, T — Our First Words', description: 'Hear a sound. Build a word. Find its meaning.', forms: 's a t', colour: 'mint',
    activities: [
      { id: 'meet-s', title: 'Meet s', kind: 'video', letter: 's' },
      { id: 'practice-s', title: 'Practice the s Sound', kind: 'sound', letter: 's' },
      { id: 'find-s', title: 'Touch and Say s', kind: 'find', letter: 's' },
      { id: 'meet-a', title: 'Meet the A Sound', kind: 'video', letter: 'a' },
      { id: 'practice-a', title: 'Practice the a Sound', kind: 'sound', letter: 'a' },
      { id: 'find-a', title: 'Listen and Find', kind: 'find', letter: 'a' },
      { id: 'meet-t', title: 'Meet the T Sound', kind: 'video', letter: 't' },
      { id: 'practice-t', title: 'Practice the t Sound', kind: 'sound', letter: 't' },
      { id: 'find-t', title: 'Our Three Sounds', kind: 'find', letter: 't' },
      { id: 'build-at', title: 'Make and Read at', kind: 'word', word: 'at' },
      { id: 'build-sat', title: 'Make and Read sat', kind: 'word', word: 'sat' },
      { id: 'our-first-words', title: 'Our First Words', kind: 'review' },
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
];

// Add approved, public media URLs here. Never use speech synthesis for isolated
// phonemes: it can pronounce letter names or add a misleading vowel sound.
// Local media belongs in public/english/media; hosted URLs must use HTTPS.
export const englishMedia: Record<string, string | undefined> = {
  ...Object.fromEntries(Object.keys(englishNarration).map(id => [id, undefined])),
  'sound-s': '/english/media/s-sound.mp3', 'sound-a': '/english/media/a-sound.mp3', 'sound-t': '/english/media/t-sound.mp3',
  'sound-p': '/english/media/p-sound.mp3', 'sound-i': '/english/media/i-sound.mp3', 'sound-n': '/english/media/n-sound.mp3',
  'word-at': undefined, 'word-sat': undefined,
  'story-sat': undefined, 'question-mat': undefined, 'question-bench': undefined,
};
export function mediaFor(id: string) { return englishMedia[id]; }

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
export const BUNNY_LIBRARY = '619329';
