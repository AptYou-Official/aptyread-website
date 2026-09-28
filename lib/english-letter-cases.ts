import type { ExploreLetter as Letter, WritingLetter } from './english-curriculum';

export type CaseRound = { target: WritingLetter; options: WritingLetter[]; revisit: boolean };
export type LetterCasesState = {
  phase: 'guide' | 'choose' | 'help' | 'matched' | 'complete';
  guideStep: number; rounds: CaseRound[]; index: number;
  busy: boolean; heard: boolean; highlight: WritingLetter | null;
  misses: number; assisted: boolean; retry: boolean; notice: string;
};

// Every Explore lesson follows all of Our First Words: s/a/t are familiar.
// Capitals enter only after their own introduction video. Each listening
// choice set has exactly one spelling for each sound, never two valid answers.
const plans: Record<Letter, { target: WritingLetter; options: WritingLetter[] }[]> = {
  s: [
    { target: 'S', options: ['S', 'a', 't'] },
    { target: 'a', options: ['s', 'a', 't'] },
    { target: 't', options: ['S', 'a', 't'] },
    { target: 's', options: ['s', 'a', 't'] },
  ],
  a: [
    { target: 'a', options: ['s', 'a', 't'] },
    { target: 'S', options: ['S', 'a', 't'] },
    { target: 't', options: ['s', 'A', 't'] },
    { target: 'A', options: ['s', 'A', 't'] },
  ],
  t: [
    { target: 'T', options: ['s', 'a', 'T'] },
    { target: 'a', options: ['S', 'a', 't'] },
    { target: 'S', options: ['S', 'A', 't'] },
    { target: 't', options: ['s', 'A', 't'] },
  ],
};

export function initialLetterCases(letter: Letter): LetterCasesState {
  return { phase: 'guide', guideStep: 0, rounds: plans[letter].map(r => ({ ...r, options: [...r.options], revisit: false })), index: 0, busy: false, heard: false, highlight: null, misses: 0, assisted: false, retry: false, notice: '' };
}

export function casePracticeStars(state: LetterCasesState) {
  return state.phase === 'guide' ? 0 : Math.min(4, state.index + (state.phase === 'matched' || state.phase === 'complete' ? 1 : 0));
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
  let generation = 0, disposed = false;
  const review = new Map<WritingLetter, CaseRound>();
  const current = () => state.rounds[state.index];
  const change = (patch: Partial<LetterCasesState>) => {
    if (!disposed) { state = { ...state, ...patch }; media.changed(state); }
  };
  const interrupt = () => { generation++; media.stop(); return generation; };
  const valid = (token: number) => !disposed && token === generation;
  function stop() { if (!disposed) { interrupt(); change({ busy: false, highlight: null }); } }
  const prompt = () => state.guideStep === 2 ? 'cases-same-sound' : `cases-${state.guideStep === 0 ? 'big' : 'small'}-${letter}`;
  async function guidePrompt() {
    const token = interrupt();
    change({ busy: true, notice: '' });
    await media.say(prompt());
    if (valid(token)) change({ busy: false });
  }
  async function play(instruction?: string) {
    if (disposed || state.phase === 'complete') return;
    const token = interrupt();
    change({ busy: true, notice: '', highlight: null });
    if (instruction) { await media.say(instruction); if (!valid(token)) return; }
    const show = state.phase === 'help' || state.phase === 'matched';
    change({ highlight: show ? current().target : null });
    const ok = await media.sound(current().target.toLowerCase() as Letter);
    if (!valid(token)) return;
    change({ busy: false, highlight: null, heard: state.heard || ok, notice: ok ? '' : 'Tap the speaker to hear the sound.' });
  }
  async function listen() {
    if (disposed || state.phase === 'complete') return;
    if (state.phase === 'guide') await guidePrompt();
    else await play();
  }
  async function touch(value: WritingLetter) {
    if (disposed || state.phase !== 'guide' || state.busy || state.guideStep === 2) return;
    const target = state.guideStep === 0 ? letter.toUpperCase() : letter;
    if (value !== target) return;
    const token = interrupt();
    change({ busy: true, highlight: value, notice: '' });
    const ok = await media.sound(letter);
    if (!valid(token)) return;
    if (!ok) { change({ busy: false, highlight: null, notice: 'Tap the letter to hear its sound.' }); return; }
    change({ guideStep: state.guideStep + 1, highlight: null });
    await media.say(prompt());
    if (valid(token)) change({ busy: false });
  }
  async function help() {
    if (disposed || state.phase !== 'choose' || state.busy) return;
    change({ phase: 'help', assisted: true, retry: false });
    await play('link-help');
  }
  async function choose(value: WritingLetter) {
    if (disposed || state.phase !== 'choose' || state.busy || !state.heard || !current().options.includes(value)) return;
    if (value !== current().target) {
      change({ misses: state.misses + 1, retry: true });
      if (state.misses % 2 === 0) await help();
      else await play('link-retry');
      return;
    }
    if (state.assisted) review.set(value, current());
    else review.delete(value);
    change({ phase: 'matched', retry: false });
    await play();
  }
  async function next() {
    if (disposed || state.busy) return;
    if (state.phase === 'guide' && state.guideStep === 2) {
      change({ phase: 'choose', heard: false });
      await play('link-find');
    } else if (state.phase === 'help') {
      // Remove the model before replaying; no choice can be made while it is shown.
      change({ phase: 'choose', heard: false, retry: false });
      await play();
    } else if (state.phase === 'matched') {
      interrupt();
      const index = state.index + 1;
      let rounds = state.rounds;
      if (index === rounds.length) {
        // One extra revisit keeps this a short practice, never an endless test.
        const repeat = review.values().next().value as CaseRound | undefined;
        if (repeat && rounds.length === 4) rounds = [...rounds, mix({ ...repeat, revisit: true })];
        else { change({ phase: 'complete', highlight: null, busy: false }); return; }
      }
      change({ phase: 'choose', rounds, index, heard: false, misses: 0, assisted: false, retry: false, notice: '' });
      await play();
    }
  }
  media.changed(state);
  return { start: listen, listen, touch, choose, help, next, stop, snapshot: () => state, dispose: () => { disposed = true; interrupt(); } };
}
