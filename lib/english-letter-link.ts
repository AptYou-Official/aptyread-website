import type { Letter } from './english-curriculum';

export type LinkRound = { target: Letter; options: Letter[]; revisit: boolean };
export type LetterLinkState = {
  phase: 'touch' | 'say' | 'choose' | 'matched' | 'complete';
  rounds: LinkRound[]; index: number; heard: boolean; busy: boolean;
  highlight: Letter | null; misses: number; assisted: boolean;
  feedback: '' | 'retry' | 'help'; notice: string;
};
export const linkLetters: Record<Letter, Letter[]> = { s: ['s'], a: ['s', 'a'], t: ['s', 'a', 't'] };
const targets = { s: ['s'], a: ['a', 's', 'a'], t: ['t', 's', 'a', 't'] } as const;

// Stars track the main practice steps. Help and extra revisits never change
// the goal or take away a star that the child has already earned.
export function letterLinkReward(letter: Letter, state: LetterLinkState) {
  const total: 2 | 3 | 4 = letter === 's' ? 2 : targets[letter].length;
  const earned = letter === 's'
    ? state.phase === 'complete' ? 2 : state.phase === 'say' ? 1 : 0
    : Math.min(total, state.index + (state.phase === 'matched' || state.phase === 'complete' ? 1 : 0));
  return { total, earned };
}

function round(target: Letter, known: Letter[], random: () => number, revisit = false): LinkRound {
  const options = [...known];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { target, options, revisit };
}
export function initialLetterLink(letter: Letter): LetterLinkState {
  return { phase: letter === 's' ? 'touch' : 'choose', rounds: targets[letter].map(target => ({ target, options: [...linkLetters[letter]], revisit: false })), index: 0, heard: false, busy: false, highlight: null, misses: 0, assisted: false, feedback: '', notice: '' };
}

type Media = {
  say: (id: string) => Promise<boolean>;
  sound: (letter: Letter) => Promise<boolean>;
  stop: () => void;
  changed: (state: LetterLinkState) => void;
};

// Help is teaching, not evidence of independent recall. A helped connection is
// revisited later, with at most one extra turn per letter to keep practice short.
export function createLetterLink(letter: Letter, media: Media, random = Math.random) {
  let state = initialLetterLink(letter);
  state.rounds = targets[letter].map(target => round(target, linkLetters[letter], random));
  let generation = 0;
  let disposed = false;
  const review = new Set<Letter>();
  const revisited = new Set<Letter>();
  const current = () => state.rounds[state.index];
  const change = (patch: Partial<LetterLinkState>) => {
    if (!disposed) { state = { ...state, ...patch }; media.changed(state); }
  };
  function interrupt() { generation++; media.stop(); return generation; }
  const valid = (token: number) => !disposed && token === generation;
  function stop() { if (!disposed) { interrupt(); change({ busy: false, highlight: null }); } }

  async function play(instruction?: string, show = false) {
    if (disposed || state.phase === 'complete') return false;
    const token = interrupt();
    change({ busy: true, highlight: null, notice: '' });
    if (instruction) {
      await media.say(instruction);
      if (!valid(token)) return false;
    }
    change({ highlight: show ? current().target : null });
    const ok = await media.sound(current().target);
    if (!valid(token)) return false;
    change({ busy: false, highlight: null, heard: state.heard || ok, notice: ok ? '' : 'Tap Listen to hear the sound.' });
    return ok;
  }
  async function afterSound(id: string) {
    const token = generation;
    change({ busy: true });
    await media.say(id);
    if (valid(token)) change({ busy: false });
  }
  async function start() {
    const ok = await play(letter === 's' ? 'link-listen' : 'link-find', letter === 's');
    if (ok && letter === 's' && !disposed) await afterSound('link-touch');
  }
  async function listen() {
    const first = !state.heard && state.index === 0;
    const ok = await play(undefined, letter === 's');
    // A manual first listen preserves the action prompt after an autoplay
    // rejection, while starting the actual recording inside the user gesture.
    if (ok && first && !disposed) await afterSound(letter === 's' ? 'link-touch' : 'link-find-it');
  }
  async function touch() {
    if (disposed || state.phase !== 'touch' || !state.heard || state.busy) return;
    const token = interrupt();
    // Touching the card records exploration; saying the sound stays child-led.
    change({ phase: 'say', busy: true, highlight: 's', notice: '' });
    await media.sound('s');
    if (!valid(token)) return;
    change({ highlight: null });
    await media.say('link-your-turn');
    if (valid(token)) change({ busy: false });
  }
  async function help() {
    if (disposed || state.phase !== 'choose' || state.busy) return;
    change({ assisted: true, feedback: 'help' });
    await play('link-help', true);
  }
  async function choose(value: Letter) {
    if (disposed || state.phase !== 'choose' || !state.heard || state.busy || !current().options.includes(value)) return;
    if (value !== current().target) {
      const misses = state.misses + 1;
      change({ misses, feedback: 'retry' });
      if (misses % 2 === 0) await help();
      else await play('link-retry');
      return;
    }
    if (state.assisted) { if (!revisited.has(value)) review.add(value); }
    else review.delete(value);
    change({ phase: 'matched', feedback: '' });
    await play(undefined, true);
  }
  function next() {
    if (disposed || state.busy) return;
    if (state.phase === 'say') { interrupt(); change({ phase: 'complete' }); return; }
    if (state.phase !== 'matched') return;
    interrupt();
    const index = state.index + 1;
    let rounds = state.rounds;
    if (index === rounds.length) {
      const target = review.values().next().value as Letter | undefined;
      if (!target) { change({ phase: 'complete' }); return; }
      review.delete(target); revisited.add(target);
      rounds = [...rounds, round(target, linkLetters[letter], random, true)];
    }
    change({ phase: 'choose', rounds, index, heard: false, misses: 0, assisted: false, feedback: '', notice: '' });
    void play();
  }
  media.changed(state);
  return {
    start, touch, choose, help, next, stop, listen,
    snapshot: () => state,
    dispose: () => { disposed = true; interrupt(); },
  };
}
