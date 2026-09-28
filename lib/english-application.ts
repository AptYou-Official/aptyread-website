import type { ApplicationWord } from './english-curriculum';

export const APPLICATION_ID = 'more-words-with-apty';
export const APPLICATION_WORDS: readonly ApplicationWord[] = ['pan', 'tap'];
// Keep choices still while the child thinks. Each set contains only taught letters.
export const applicationTiles: Record<ApplicationWord, readonly string[]> = { pan: ['n', 'a', 't', 'p'], tap: ['p', 's', 't', 'a'] };
export type ApplicationTrial = {
  readAttempted: boolean; readingHelp: boolean; modelTried: boolean; meaningSeen: boolean;
  heard: boolean; built: string; spellingHelp: boolean; misses: number; readBack: boolean;
};
export type ApplicationProgress = { step: number; words: Record<ApplicationWord, ApplicationTrial> };
export type ApplicationAction = { type: 'read-help' | 'tried' | 'model-tried' | 'meaning-next' | 'heard' | 'build-help' | 'undo' | 'read-built' | 'read-back' } | { type: 'choose'; letter: string };
const freshTrial = (): ApplicationTrial => ({ readAttempted: false, readingHelp: false, modelTried: false, meaningSeen: false, heard: false, built: '', spellingHelp: false, misses: 0, readBack: false });
export const freshApplication = (): ApplicationProgress => ({ step: 0, words: { pan: freshTrial(), tap: freshTrial() } });
export const applicationWord = (saved: ApplicationProgress): ApplicationWord => APPLICATION_WORDS[Math.min(1, Math.floor(saved.step / 5))];

// Read -> model -> meaning -> build from sound -> read back, once for each word.
// Attempts are participation. Help flags do not turn self-report into assessment.
export function nextApplication(saved: ApplicationProgress, action: ApplicationAction): ApplicationProgress {
  if (saved.step === 10) return saved;
  const word = applicationWord(saved), phase = saved.step % 5, trial = saved.words[word];
  let patch: Partial<ApplicationTrial> | undefined, advance = false;
  if (phase === 0 && action.type === 'read-help') patch = { readingHelp: true };
  if (phase === 0 && action.type === 'tried') { patch = { readAttempted: true }; advance = true; }
  if (phase === 1 && action.type === 'model-tried') { patch = { modelTried: true }; advance = true; }
  if (phase === 2 && action.type === 'meaning-next') { patch = { meaningSeen: true }; advance = true; }
  if (phase === 3) {
    if (action.type === 'heard') patch = { heard: true };
    if (action.type === 'build-help') patch = { spellingHelp: true };
    if (action.type === 'choose' && trial.heard && trial.built !== word && applicationTiles[word].includes(action.letter)) {
      patch = action.letter === word[trial.built.length] ? { built: trial.built + action.letter } : { misses: Math.min(100, trial.misses + 1) };
    }
    if (action.type === 'undo' && trial.built) patch = { built: trial.built.slice(0, -1) };
    if (action.type === 'read-built' && trial.built === word && trial.heard) { patch = {}; advance = true; }
  }
  if (phase === 4 && action.type === 'read-back') { patch = { readBack: true }; advance = true; }
  return patch ? { step: saved.step + (advance ? 1 : 0), words: { ...saved.words, [word]: { ...trial, ...patch } } } : saved;
}

export function readApplication(raw: unknown): ApplicationProgress | undefined {
  if (!raw || typeof raw !== 'object') return;
  const value = raw as ApplicationProgress;
  if (!Number.isInteger(value.step) || value.step < 0 || value.step > 10 || !value.words) return;
  const result = freshApplication(); result.step = value.step;
  for (const [index, word] of APPLICATION_WORDS.entries()) {
    const trial = value.words[word], phase = Math.max(0, Math.min(5, value.step - index * 5));
    if (!trial || typeof trial.built !== 'string' || !word.startsWith(trial.built) || !Number.isInteger(trial.misses) || trial.misses < 0 || trial.misses > 100) return;
    for (const key of ['readAttempted', 'readingHelp', 'modelTried', 'meaningSeen', 'heard', 'spellingHelp', 'readBack'] as const) if (typeof trial[key] !== 'boolean') return;
    if (trial.readAttempted !== (phase >= 1) || trial.modelTried !== (phase >= 2) || trial.meaningSeen !== (phase >= 3) || trial.readBack !== (phase >= 5)) return;
    if (phase < 3 && (trial.heard || trial.built || trial.spellingHelp || trial.misses)) return;
    if ((trial.built || trial.misses) && !trial.heard) return;
    if (phase >= 4 && (trial.built !== word || !trial.heard)) return;
    if (value.step < index * 5 && trial.readingHelp) return;
    result.words[word] = { readAttempted: trial.readAttempted, readingHelp: trial.readingHelp, modelTried: trial.modelTried, meaningSeen: trial.meaningSeen, heard: trial.heard, built: trial.built, spellingHelp: trial.spellingHelp, misses: trial.misses, readBack: trial.readBack };
  }
  return result;
}
