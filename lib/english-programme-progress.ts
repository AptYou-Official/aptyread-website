import { getProgrammeActivity, type ProgrammeActivity, type ProgrammeTrial } from './english-programme';

type Book = Extract<ProgrammeTrial, { kind: 'book' }>;
export type ProgrammeStep = Exclude<ProgrammeTrial, Book>
  | { kind: 'book-cover'; id: string; title: string; conventions: string[]; preparation: { text: string; scene: string }[]; capitals: string[]; skills?: string[] }
  | (Book['pages'][number] & { kind: 'page'; bookTitle: string; page: number; pages: number; skills?: string[] });
export type ProgrammeState = {
  task: number; phase: number; built: string; misses: number; supported: boolean;
  heard: boolean; answer?: string; complete?: boolean; hinted?: boolean; bookPrep?: number;
};
export type ProgrammeEvidence = {
  activityId: string; taskId: string; skillId: string;
  outcome: 'independent' | 'supported'; at: string;
};
export type ProgrammeAction =
  | { type: 'heard' | 'help' | 'continue' | 'undo' | 'next' | 'prepare-next' }
  | { type: 'choose'; value: string };

export function programmeSteps(activity: ProgrammeActivity): ProgrammeStep[] {
  return activity.tasks.flatMap(task => task.kind === 'check' || task.kind === 'review' ? task.trials : [task]).flatMap((task): ProgrammeStep[] => task.kind === 'book' ? [
    { kind: 'book-cover', id: `${task.id}.cover`, title: task.title, conventions: task.conventions || [], preparation: task.preparation || [], capitals: [...new Set(task.pages.flatMap(page => page.text.match(/[A-Z]/g) || []))], skills: task.skills },
    ...task.pages.map((page, index) => ({ ...page, kind: 'page' as const, id: `${task.id}.${page.id}`, bookTitle: task.title, page: index + 1, pages: task.pages.length, skills: task.skills })),
  ] : [task]);
}

/** One replayable model at a time; names/words precede their print/language concepts. */
export function programmeBookPreparation(step: Extract<ProgrammeStep, { kind: 'book-cover' }>): { id: `prepare-${number}` | `convention-${number}`; text: string; scene?: string }[] {
  return [
    ...step.preparation.map((item, index) => ({ ...item, id: `prepare-${index}` as const })),
    ...step.conventions.map((text, index) => ({ id: `convention-${index}` as const, text })),
  ];
}

function bookPreparationIndex(step: Extract<ProgrammeStep, { kind: 'book-cover' }>, state: ProgrammeState): number {
  // Old cover playback included every name and convention in one sequence.
  return state.bookPrep === undefined ? (state.heard ? Math.max(0, programmeBookPreparation(step).length - 1) : 0) : state.bookPrep;
}

export function programmeChoiceOrder<T>(items: T[], key: string): T[] {
  if (!items.length) return [];
  const offset = [...key].reduce((sum, char) => (Math.imul(sum, 31) + char.charCodeAt(0)) >>> 0, 7);
  const start = offset % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}
export function programmeSoundChoices(step: Extract<ProgrammeStep, { kind: 'sound' }>): string[] {
  const vowels = 'aeiou';
  const others = [...step.knownLetters].reverse().filter(letter => letter !== step.letter).sort((a, b) => Number(vowels.includes(b) === vowels.includes(step.letter)) - Number(vowels.includes(a) === vowels.includes(step.letter)));
  return programmeChoiceOrder([step.letter, ...others.slice(0, 2)], step.id);
}

export function freshProgrammeState(step?: ProgrammeStep, task = 0): ProgrammeState {
  return { task, phase: (step?.kind === 'sound' && step.mode === 'check') || (step?.kind === 'build' && step.mode === 'encode') ? 1 : 0, built: '', misses: 0, supported: false, heard: false, ...(step?.kind === 'book-cover' ? { bookPrep: 0 } : {}) };
}
export function isProgrammeStepReady(step: ProgrammeStep, state: ProgrammeState) {
  return step.kind === 'book-cover' ? state.phase === 1 : state.phase === 2;
}

/** This model records observable selections/encoding only. A tap saying "I tried"
 * does not create evidence of oral reading, fluency, or handwriting accuracy. */
export function nextProgrammeState(activity: ProgrammeActivity, saved: ProgrammeState | undefined, action: ProgrammeAction): ProgrammeState {
  const steps = programmeSteps(activity);
  let state = saved || freshProgrammeState(steps[0]);
  const step = steps[state.task];
  if (!step || state.complete) return state;
  if (step.kind === 'book-cover' && state.bookPrep === undefined) state = { ...state, bookPrep: bookPreparationIndex(step, state) };
  if (action.type === 'help') return { ...state, supported: true, hinted: true };
  if (action.type === 'heard') return { ...state, heard: true };
  if (action.type === 'prepare-next') {
    if (step.kind !== 'book-cover' || state.phase !== 0 || !state.heard || state.bookPrep! >= programmeBookPreparation(step).length - 1) return state;
    return { ...state, bookPrep: state.bookPrep! + 1, heard: false };
  }
  if (action.type === 'undo') return step.kind === 'build' && state.phase === 1 ? { ...state, built: state.built.slice(0, -1) } : state;
  if (action.type === 'next') {
    if (!isProgrammeStepReady(step, state)) return state;
    return state.task + 1 === steps.length ? { ...state, complete: true } : freshProgrammeState(steps[state.task + 1], state.task + 1);
  }
  if (action.type === 'continue') {
    if (step.kind === 'book-cover') return state.heard && state.bookPrep === Math.max(0, programmeBookPreparation(step).length - 1) ? { ...state, phase: 1 } : state;
    if (state.phase === 0) {
      if ((step.kind === 'sound' || step.kind === 'listen' || step.kind === 'build') && !state.heard) return state;
      return { ...state, phase: 1, heard: step.kind === 'sound' ? false : state.heard, supported: state.supported || (step.kind === 'build' && step.mode !== 'encode') };
    }
    if (step.kind === 'page' && state.phase === 1 && !step.question) return { ...state, phase: 2 };
    return state;
  }
  if (action.type !== 'choose' || state.phase !== 1) return state;
  let correct = false;
  if (step.kind === 'build') {
    if (!state.heard || !step.letters.includes(action.value)) return state;
    correct = action.value === step.word[state.built.length];
    if (correct) {
      const built = state.built + action.value;
      return { ...state, built, phase: built === step.word ? 2 : 1, supported: state.supported || step.mode !== 'encode' };
    }
  } else if (step.kind === 'sound') {
    if (!state.heard || !step.knownLetters.includes(action.value)) return state;
    correct = action.value === step.letter;
  } else if (step.kind === 'read' || step.kind === 'listen' || step.kind === 'page') {
    if (!step.choices?.some(choice => choice.id === action.value)) return state;
    correct = action.value === step.answer;
  } else return state;
  return correct ? { ...state, answer: action.value, phase: 2 } : { ...state, misses: state.misses + 1, supported: true };
}

export function programmeEvidence(activity: ProgrammeActivity, previous: ProgrammeState, next: ProgrammeState, action: ProgrammeAction, at: string): ProgrammeEvidence[] {
  if (action.type !== 'choose' || previous.phase !== 1 || next.phase !== 2) return [];
  const step = programmeSteps(activity)[previous.task];
  if (!step || step.kind === 'book-cover') return [];
  const skillId = step.kind === 'sound' ? `sound.${step.letter}` : step.kind === 'build' ? `encode.${step.word}` : step.kind === 'read' ? `meaning.${step.word}` : `${step.kind === 'page' ? 'text-meaning' : 'listening'}.${step.id}`;
  return [{ activityId: activity.id, taskId: step.id, skillId, outcome: next.supported || (step.kind === 'sound' && step.mode === 'teach') ? 'supported' : 'independent', at }];
}

export function readProgrammeState(activityId: string, value: unknown): ProgrammeState | undefined {
  const activity = getProgrammeActivity(activityId);
  if (!activity || !value || typeof value !== 'object') return;
  const record = value as ProgrammeState;
  const steps = programmeSteps(activity), step = steps[record.task];
  if (!Number.isInteger(record.task) || !step || !Number.isInteger(record.phase) || record.phase < 0 || record.phase > 2) return;
  if (step.kind === 'book-cover' && record.phase > 1 || step.kind === 'sound' && step.mode === 'check' && record.phase === 0 || step.kind === 'build' && step.mode === 'encode' && record.phase === 0) return;
  if (typeof record.built !== 'string' || (step.kind === 'build' ? !step.word.startsWith(record.built) : record.built !== '')) return;
  if (step.kind === 'build' && record.phase === 2 && record.built !== step.word) return;
  if (!Number.isInteger(record.misses) || record.misses < 0 || typeof record.supported !== 'boolean' || typeof record.heard !== 'boolean') return;
  if ((step.kind === 'read' || step.kind === 'listen' || step.kind === 'sound' || (step.kind === 'page' && step.question)) && record.phase === 2 && record.answer !== (step.kind === 'sound' ? step.letter : step.answer)) return;
  const clean: ProgrammeState = { task: record.task, phase: record.phase, built: record.built, misses: Math.min(record.misses, 100), supported: record.supported || record.hinted === true || record.misses > 0 || step.kind === 'build' && step.mode !== 'encode' && record.phase > 0, heard: record.heard };
  if (step.kind === 'book-cover') {
    const last = Math.max(0, programmeBookPreparation(step).length - 1);
    const index = bookPreparationIndex(step, record);
    if (!Number.isInteger(index) || index < 0 || index > last) return;
    if (record.phase === 1 && (!record.heard || index !== last)) return;
    clean.bookPrep = index;
  }
  if (typeof record.answer === 'string') clean.answer = record.answer;
  if (record.hinted === true) clean.hinted = true;
  if (record.complete && record.task === steps.length - 1 && isProgrammeStepReady(step, clean)) clean.complete = true;
  return clean;
}
