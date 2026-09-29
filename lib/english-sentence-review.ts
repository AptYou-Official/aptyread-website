export type SentenceTarget = 'sat' | 'at';

export type SentenceReviewProgress = {
  step: 0 | 1 | 2 | 3;
  found: SentenceTarget[];
};

export type SentenceReviewAction =
  | { type: 'start' }
  | { type: 'find'; word: SentenceTarget };

export const freshSentenceReview = (): SentenceReviewProgress => ({ step: 0, found: [] });

export function nextSentenceReview(current: SentenceReviewProgress, action: SentenceReviewAction): SentenceReviewProgress {
  if (action.type === 'start' && current.step === 0) return { step: 1, found: [] };
  if (action.type === 'find') {
    if (current.step === 1 && action.word === 'sat') return { step: 2, found: ['sat'] };
    if (current.step === 2 && action.word === 'at') return { step: 3, found: ['sat', 'at'] };
  }
  return current;
}

export function readSentenceReview(raw: unknown): SentenceReviewProgress | undefined {
  if (!raw || typeof raw !== 'object') return;
  const value = raw as SentenceReviewProgress;
  if (!Number.isInteger(value.step) || value.step < 0 || value.step > 3) return;
  if (!Array.isArray(value.found) || value.found.some(word => word !== 'sat' && word !== 'at') || new Set(value.found).size !== value.found.length) return;
  if (value.step < 2 && value.found.length > 0) return;
  if (value.step === 2 && value.found.length !== 1 || value.step === 2 && !value.found.includes('sat')) return;
  if (value.step === 3 && (value.found.length !== 2 || !value.found.includes('sat') || !value.found.includes('at'))) return;
  return { step: value.step as SentenceReviewProgress['step'], found: [...value.found] };
}
