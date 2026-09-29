import type { ExploreLetter as Letter, WritingLetter } from './english-curriculum';

export type CaseRound = { target: WritingLetter; options: WritingLetter[] };
export type LetterCasesState = {
  phase: 'choose' | 'matched' | 'complete';
  rounds: CaseRound[];
  index: number;
  busy: boolean;
  retry: boolean;
  notice: string;
};

// This activity practises visual case recognition only: one big form and one
// small form. The sound is optional during the round and confirms a correct tap.
const plans: Record<Letter, { target: WritingLetter; options: WritingLetter[] }[]> = {
  s: [
    { target: 'S', options: ['S', 'A', 'T'] },
    { target: 's', options: ['s', 'a', 't'] },
  ],
  a: [
    { target: 'A', options: ['S', 'A', 'T'] },
    { target: 'a', options: ['s', 'a', 't'] },
  ],
  t: [
    { target: 'T', options: ['S', 'A', 'T'] },
    { target: 't', options: ['s', 'a', 't'] },
  ],
  p: [
    { target: 'P', options: ['P', 'I', 'N'] },
    { target: 'p', options: ['p', 'i', 'n'] },
  ],
  i: [
    { target: 'I', options: ['P', 'I', 'N'] },
    { target: 'i', options: ['p', 'i', 'n'] },
  ],
  n: [
    { target: 'N', options: ['P', 'I', 'N'] },
    { target: 'n', options: ['p', 'i', 'n'] },
  ],
};

export function initialLetterCases(letter: Letter): LetterCasesState {
  return { phase: 'choose', rounds: plans[letter].map(round => ({ ...round, options: [...round.options] })), index: 0, busy: false, retry: false, notice: '' };
}

export function casePracticeStars(state: LetterCasesState) {
  return Math.min(2, state.index + (state.phase === 'matched' || state.phase === 'complete' ? 1 : 0));
}

type Media = {
  say: (id: string) => Promise<boolean>;
  sound: (letter: Letter) => Promise<boolean>;
  stop: () => void;
  changed: (state: LetterCasesState) => void;
};

export function createLetterCases(letter: Letter, media: Media, random = Math.random) {
  function mix(round: CaseRound): CaseRound {
    const options = [...round.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return { ...round, options };
  }

  let state = initialLetterCases(letter);
  state.rounds = state.rounds.map(mix);
  let generation = 0;
  let disposed = false;

  const interrupt = () => { generation++; media.stop(); return generation; };
  const valid = (token: number) => !disposed && token === generation;
  const current = () => state.rounds[state.index];
  const caseWord = (value: WritingLetter) => value === value.toUpperCase() ? 'big' : 'small';
  const prompt = () => `cases-find-${caseWord(current().target)}-${letter}`;
  const change = (patch: Partial<LetterCasesState>) => {
    if (!disposed) { state = { ...state, ...patch }; media.changed(state); }
  };

  function stop() {
    if (!disposed) { interrupt(); change({ busy: false }); }
  }

  async function start() {
    if (disposed || state.phase === 'complete') return;
    const token = interrupt();
    change({ busy: true, retry: false, notice: '' });
    await media.say(prompt());
    if (valid(token)) change({ busy: false });
  }

  async function listen() {
    if (disposed || state.phase === 'complete' || state.busy) return;
    const token = interrupt();
    change({ busy: true, notice: '' });
    const ok = await media.sound(letter);
    if (valid(token)) change({ busy: false, notice: ok ? '' : 'Tap the speaker to hear the sound.' });
  }

  async function choose(value: WritingLetter) {
    if (disposed || state.phase !== 'choose' || state.busy || !current().options.includes(value)) return;
    if (value !== current().target) {
      const token = interrupt();
      change({ busy: true, retry: true, notice: '' });
      await media.say('cases-retry');
      if (valid(token)) change({ busy: false });
      return;
    }

    const token = interrupt();
    change({ phase: 'matched', busy: true, retry: false, notice: '' });
    const ok = await media.sound(letter);
    if (valid(token)) change({ busy: false, notice: ok ? '' : 'Tap the speaker to hear the sound.' });
  }

  async function next() {
    if (disposed || state.phase !== 'matched' || state.busy) return;
    const index = state.index + 1;
    if (index >= state.rounds.length) {
      interrupt();
      change({ phase: 'complete', index: state.index, busy: false, retry: false, notice: '' });
      return;
    }
    interrupt();
    change({ phase: 'choose', index, busy: true, retry: false, notice: '' });
    const token = generation;
    await media.say(prompt());
    if (valid(token)) change({ busy: false });
  }

  media.changed(state);
  return { start, listen, choose, next, stop, snapshot: () => state, dispose: () => { disposed = true; interrupt(); } };
}
