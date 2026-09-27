import { englishNarration } from './english-narration';

export const englishLevels = [
  { title: 'Sounds into First Words', description: 'Little sounds. A wonderful beginning.', forms: 's a t', colour: 'mint' },
  { title: 'First Reading with Meaning', description: 'Read a little. Understand a lot.', forms: 'cat', colour: 'peach' },
  { title: 'Letter Teams and Longer Words', description: 'Discover what letters can do together.', forms: 'sh', colour: 'lavender' },
  { title: 'Vowel Patterns and Sustained Reading', description: 'Find patterns. Keep the story going.', forms: 'ai', colour: 'blue' },
  { title: 'Independent Reading', description: 'A whole world of stories to explore.', forms: 'Aa', colour: 'gold' },
] as const;

export type Letter = 's' | 'a' | 't';
export type Activity = {
  id: string;
  title: string;
  kind: 'video' | 'sound' | 'find' | 'cases' | 'write' | 'word' | 'review';
  letter?: Letter;
  uppercase?: boolean;
  word?: 'at' | 'sat';
};
export type EnglishLesson = { id: string; title: string; description: string; forms: string; colour: string; activities: Activity[] };

function explore(letter: Letter): EnglishLesson {
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
];

// Add approved, public media URLs here. Never use speech synthesis for isolated
// phonemes: it can pronounce letter names or add a misleading vowel sound.
// Local media belongs in public/english/media; hosted URLs must use HTTPS.
export const englishMedia: Record<string, string | undefined> = {
  ...Object.fromEntries(Object.keys(englishNarration).map(id => [id, undefined])),
  'sound-s': '/english/media/s-sound.mp3', 'sound-a': '/english/media/a-sound.mp3', 'sound-t': '/english/media/t-sound.mp3',
  'word-at': undefined, 'word-sat': undefined,
  'story-sat': undefined, 'question-mat': undefined, 'question-bench': undefined,
};
export function mediaFor(id: string) { return englishMedia[id]; }

export const englishSoundPracticeVideos: Record<Letter, { src: string; poster: string }> = {
  s: {
    src: 'https://aptyread-cdn.b-cdn.net/english/reading-writing/level1-learning-letters/letter-s/activity-topics/sound-practice/video/sound-s.mp4',
    poster: '/english/media/s-practice-v1.webp',
  },
  a: {
    src: 'https://aptyread-cdn.b-cdn.net/english/reading-writing/level1-learning-letters/letter-a/activity-topics/sound-practice/video/sound-a.mp4',
    poster: '/english/media/a-practice-v1.webp',
  },
  t: {
    src: 'https://aptyread-cdn.b-cdn.net/english/reading-writing/level1-learning-letters/letter-t/activity-topics/sound-practice/video/sound-t.mp4',
    poster: '/english/media/t-practice-v1.webp',
  },
};

// Optional paper-writing models inside the existing S writing topics.
export const englishPaperWritingVideos = {
  S: {
    src: 'https://aptyread-cdn.b-cdn.net/english/reading-writing/level1-learning-letters/letter-s/activity-topics/draw-big-s/video/draw-big-s.mp4',
    poster: '/english/media/write-big-s-v1.webp',
  },
  s: {
    src: 'https://aptyread-cdn.b-cdn.net/english/reading-writing/level1-learning-letters/letter-s/activity-topics/draw-little-s/video/draw-small-s.mp4',
    poster: '/english/media/write-small-s-v1.webp',
  },
};

// Optional whole-word mouth-movement models, revealed after the first reading
// try. Missing clips stay hidden and never gate progress.
export type WordPronunciationVideo = { kind: 'bunny'; id: string } | { kind: 'file'; src: string; poster?: string; aspectRatio?: '1 / 1' | '4 / 3' };
export const englishPronunciationVideos: Record<'at' | 'sat', WordPronunciationVideo | undefined> = {
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
  'meet-s': { landscape: 'be494891-516f-4373-9440-165743fe47f2', portrait: '62e7f648-5355-4533-9e3e-f618d7f799fd' },
  'meet-a': { landscape: '9536091f-2211-4faf-b3e7-ffcec9d8bdc6', portrait: '9575f978-c9e0-460c-a93e-7c7598a87d30' },
  'meet-t': { landscape: 'd2b24f3e-547d-4e4a-89ed-d4b5dabd14cb', portrait: 'e8f78faf-8c6f-4c38-bac1-253ac6924a8e' },
};
export const BUNNY_LIBRARY = '619329';
