import type { WordProgress } from './english-progress';
import { EnglishAudioCue, narrationCue } from './english-narration';

export type FirstReadingWord = 'at' | 'sat';
export const freshGuidedWord = (): WordProgress => ({ stage: 0, built: '', reads: 0, answers: {}, started: true, mode: 'guided', journeyVersion: 2 });
export const wordSound = (letter: string): EnglishAudioCue => ({ id: `sound-${letter}` });

export function guidedWordPrompt(word: FirstReadingWord, built: string, introduction = false): EnglishAudioCue[] {
  if (built === word) return [narrationCue('build-ready')];
  return [
    ...(introduction ? [narrationCue(`build-intro-${word}`)] : []),
    narrationCue(built ? 'build-next-tap' : 'build-tap'), wordSound(word[built.length]),
  ];
}

// All builds, including replays, have the same supportive left-to-right path.
export function placeGuidedLetter(word: FirstReadingWord, saved: WordProgress, letter: string): WordProgress {
  if (saved.stage !== 0 || word[saved.built.length] !== letter) return saved;
  return { ...saved, built: saved.built + letter, started: true, mode: 'guided', journeyVersion: 2 };
}

export function tryReadingWord(saved: WordProgress): WordProgress {
  if (saved.stage !== 1 || saved.reads >= 2) return saved;
  return { ...saved, reads: saved.reads + 1 };
}
