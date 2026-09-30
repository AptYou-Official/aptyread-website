import tracing from './english-tracing.json';

export const handwritingLetters = [...'satpincmehrgdkolfbujwvyz'];
export type HandwritingMode = 'trace' | 'video' | 'paper';
export function handwritingInstruction(mode: HandwritingMode): string {
  if (mode === 'trace') return 'Watch the dot.';
  if (mode === 'paper') return 'Try writing on paper.';
  return 'Watch the hand.';
}
const writingFolder = 'https://aptyread-cdn.b-cdn.net/english/level1/videos/letter-writing-video-clips';
export type HandwritingVideo = { src: string; poster?: string; verified: '2026-09-30'; bytes: number };
// Every URL below returned HEAD 200, video/mp4 on the verification date. These
// are the user's completed models, using the approved shared-folder filenames.
const verifiedSizes: Record<string, [number, number]> = {
  s: [121889, 114153], a: [136303, 102472], t: [94821, 92943], p: [127408, 113726], i: [110826, 95555], n: [149576, 101283],
  c: [100745, 59405], m: [201764, 193313], e: [149429, 120800], h: [119962, 115522], r: [169695, 98734], g: [134668, 130188],
  d: [139845, 100126], k: [139940, 123989], o: [101150, 84862], l: [86996, 62608], f: [120197, 108608], b: [199491, 108775],
  u: [94343, 114966], j: [114867, 104246], w: [194676, 159030], v: [99874, 94277], y: [127343, 114669], z: [154056, 116751],
};
export const handwritingVideos: Record<string, HandwritingVideo> = Object.fromEntries(handwritingLetters.flatMap(letter => ['big', 'small'].map((size, index) => [
  size === 'big' ? letter.toUpperCase() : letter,
  { src: `${writingFolder}/draw-${size}-${letter}.mp4`, ...('satpin'.includes(letter) ? { poster: `/english/media/write-${size}-${letter}-v1.webp` } : {}), verified: '2026-09-30', bytes: verifiedSizes[letter][index] },
])));

// One short cue per authored M path, in exactly the order demonstrated by the
// dotted guide. A lift is announced between paths, never inside a continuous one.
const strokeWords: Record<string, string[]> = {
  S: ['Curve round, back, and round.'], s: ['Curve round, back, and round.'],
  A: ['Slant down to the left.', 'Slant down to the right.', 'Go across to the right.'],
  a: ['Go round to the left and back up.', 'Go down.'],
  T: ['Go across to the right.', 'Go down.'], t: ['Go down.', 'Go across to the right.'],
  P: ['Go down.', 'Go across, round, and back.'], p: ['Go down below the line.', 'Go up and round to the right.'],
  I: ['Go across to the right.', 'Go down.', 'Go across to the right.'], i: ['Go down.', 'Make a dot.'],
  N: ['Go down.', 'Go down.', 'Slant down to the right.'], n: ['Go down.', 'Go back up, over, and down.'],
  C: ['Curve round to the left and up.'], c: ['Curve round to the left and up.'],
  M: ['Go down.', 'Slant down to the right.', 'Slant up to the right.', 'Go down.'],
  m: ['Go down.', 'Curve up, over, and down.', 'Curve up, over, and down.'],
  E: ['Go down.', 'Go across to the right.', 'Go across to the right.', 'Go across to the right.'],
  e: ['Go across, curve up and round.'],
  H: ['Go down.', 'Go down.', 'Go across to the right.'], h: ['Go down.', 'Curve up, over, and down.'],
  R: ['Go down.', 'Go across, round, and back.', 'Slant down to the right.'], r: ['Go down.', 'Curve up and over.'],
  G: ['Curve round to the left, then up.', 'Go across to the right.'],
  g: ['Go round to the left.', 'Go down below the line and curl left.'],
  D: ['Go down.', 'Go across, round, and back.'], d: ['Go round to the left.', 'Go down from the top.'],
  K: ['Go down.', 'Slant up to the right.', 'Slant down to the right.'],
  k: ['Go down.', 'Slant down to the left.', 'Slant down to the right.'],
  O: ['Go round to the left and back to the start.'], o: ['Go round to the left and back to the start.'],
  L: ['Go down.', 'Go across to the right.'], l: ['Go down.'],
  F: ['Go down.', 'Go across to the right.', 'Go across to the right.'], f: ['Curve left and go down.', 'Go across to the right.'],
  B: ['Go down.', 'Go across, round, and back.', 'Go across, round, and back.'], b: ['Go down.', 'Curve up and round to the right.'],
  U: ['Go down, curve round, and go up.'], u: ['Go down, curve round, and go up.', 'Go down.'],
  J: ['Go across to the right.', 'Go down and curl left.'], j: ['Go down below the line and curl left.', 'Make a dot.'],
  W: ['Slant down, up, down, and up.'], w: ['Slant down, up, down, and up.'],
  V: ['Slant down and up.'], v: ['Slant down and up.'],
  Y: ['Slant down to the right.', 'Slant down to the left.', 'Go down.'],
  y: ['Slant down to the right.', 'Slant down to the left, below the line.'],
  Z: ['Go across to the right.', 'Slant down to the left.', 'Go across to the right.'], z: ['Go across, slant down, and go across.'],
};

export function handwritingStrokes(form: string) {
  const guide = tracing[form as keyof typeof tracing];
  if (!guide) return [];
  return (guide.path.match(/M[^M]+/g) || []).map((path, index) => ({
    path, number: index + 1, cue: strokeWords[form]?.[index] || 'Follow this line.',
    narration: `${index ? 'Lift. ' : ''}${strokeWords[form]?.[index] || 'Follow this line.'}`,
    start: guide.starts[index],
  }));
}

/** A practice record describes participation only, never handwriting accuracy. */
export function addHandwritingTry(forms: string[], form: string): string[] {
  return handwritingVideos[form] && !forms.includes(form) ? [...forms, form] : forms;
}
