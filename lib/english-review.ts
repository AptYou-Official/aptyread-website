export type FirstWord = 'at' | 'sat';
export type FirstWordsProgress = {
  stage: number;
  heard: FirstWord[];
  matched: FirstWord[];
  read: FirstWord[];
  questionOrders: [boolean, boolean];
  readAtFirst: boolean;
};
export type FirstWordsAction =
  | { type: 'start'; questionOrders: [boolean, boolean]; readAtFirst: boolean }
  | { type: 'hear' | 'choose'; word: FirstWord }
  | { type: 'next' | 'read' };

export const freshFirstWords = (): FirstWordsProgress => ({ stage: 0, heard: [], matched: [], read: [], questionOrders: [true, false], readAtFirst: false });
export const reviewReadingWord = (review: FirstWordsProgress): FirstWord => (review.stage === 4) === review.readAtFirst ? 'at' : 'sat';

// All forward transitions are child actions. Listening and matching cannot
// complete the lesson: both final reading attempts are required as well.
export function nextFirstWords(current: FirstWordsProgress, action: FirstWordsAction): FirstWordsProgress {
  if (action.type === 'start') return { ...freshFirstWords(), stage: 1, questionOrders: action.questionOrders, readAtFirst: action.readAtFirst };
  if (action.type === 'hear' && current.stage === 1) return { ...current, heard: [...new Set([...current.heard, action.word])] };
  if (action.type === 'choose' && (current.stage === 2 || current.stage === 3)) {
    const target: FirstWord = current.stage === 2 ? 'at' : 'sat';
    return action.word === target ? { ...current, matched: [...new Set<FirstWord>([...current.matched, target])] } : current;
  }
  if (action.type === 'next' && ((current.stage === 1 && current.heard.length === 2) || (current.stage === 2 && current.matched.includes('at')) || (current.stage === 3 && current.matched.includes('sat')))) return { ...current, stage: current.stage + 1 };
  if (action.type === 'read' && (current.stage === 4 || current.stage === 5)) return { ...current, stage: current.stage + 1, read: [...new Set([...current.read, reviewReadingWord(current)])] };
  return current;
}

export function readFirstWords(raw: unknown): FirstWordsProgress | undefined {
  if (!raw || typeof raw !== 'object') return;
  const value = raw as FirstWordsProgress;
  if (!Number.isInteger(value.stage) || value.stage < 0 || value.stage > 6 || typeof value.readAtFirst !== 'boolean' || !Array.isArray(value.questionOrders) || value.questionOrders.length !== 2 || value.questionOrders.some(v => typeof v !== 'boolean')) return;
  for (const key of ['heard', 'matched', 'read'] as const) {
    if (!Array.isArray(value[key]) || value[key].some(word => word !== 'at' && word !== 'sat') || new Set(value[key]).size !== value[key].length) return;
  }
  if (value.stage >= 2 && value.heard.length !== 2) return;
  if (value.stage >= 3 && !value.matched.includes('at')) return;
  if (value.stage >= 4 && value.matched.length !== 2) return;
  if (value.stage >= 5 && !value.read.includes(value.readAtFirst ? 'at' : 'sat')) return;
  if (value.stage === 6 && value.read.length !== 2) return;
  // Future answers cannot be pre-filled in a partially restored activity.
  if (value.stage < 2 && value.matched.length || value.stage === 2 && value.matched.includes('sat') || value.stage < 5 && value.read.length || value.stage === 5 && value.read.length !== 1) return;
  return { stage: value.stage, heard: [...value.heard], matched: [...value.matched], read: [...value.read], questionOrders: [...value.questionOrders], readAtFirst: value.readAtFirst };
}
