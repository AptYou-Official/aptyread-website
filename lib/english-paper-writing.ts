import type { WritingLetter } from './english-curriculum';

export type PaperWritingState = {
  phase: 'ready' | 'prompt' | 'watch' | 'try' | 'between' | 'paused' | 'blocked' | 'complete';
  turns: number; watched: boolean; covered: boolean; pictureOnly: boolean; notice: string;
};
export const initialPaperWriting: PaperWritingState = {
  phase: 'ready', turns: 0, watched: false, covered: false, pictureOnly: false, notice: '',
};
type Media = {
  say: (id: string) => Promise<boolean>;
  play: () => Promise<void>;
  stop: () => void;
  changed: (state: PaperWritingState) => void;
};

// Watching models the movement. Only the child's explicit try earns a star.
export function createPaperWriting(letter: WritingLetter, media: Media) {
  let state = { ...initialPaperWriting };
  let generation = 0;
  let disposed = false;
  let resumeTo: 'watch' | 'try' = 'watch';
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const change = (patch: Partial<PaperWritingState>) => {
    if (!disposed) { state = { ...state, ...patch }; media.changed(state); }
  };
  const valid = (token: number) => !disposed && token === generation;
  function interrupt() { generation++; clearTimeout(timeout); media.stop(); return generation; }
  const instruction = () => state.turns === 2 && state.covered ? 'paper-own-turn' : `paper-write-${letter === letter.toUpperCase() ? 'big' : 'small'}-${letter.toLowerCase()}`;
  function failed() {
    if (disposed || !['watch', 'prompt'].includes(state.phase)) return;
    interrupt(); change({ phase: 'blocked', notice: 'Try again, or use the picture.' });
  }
  async function watch(direct = false) {
    if (disposed || ['complete', 'between'].includes(state.phase)) return;
    const replay = state.watched;
    const token = interrupt();
    change({ phase: 'prompt', covered: false, pictureOnly: false, notice: '' });
    if (!direct) {
      await media.say(replay ? 'paper-watch-again' : 'paper-watch');
      if (!valid(token)) return;
    }
    // The clip is muted. Missing TTS never prevents seeing the model.
    change({ phase: 'watch' });
    timeout = setTimeout(failed, 15000);
    try { await media.play(); } catch { if (valid(token)) failed(); }
  }
  function tryNow() {
    if (disposed || !state.watched || state.phase !== 'watch') return;
    interrupt(); change({ phase: 'try', notice: '' });
  }
  function videoEnded() {
    if (disposed || state.phase !== 'watch') return;
    interrupt(); change({ phase: 'try', watched: true, notice: '' });
    void media.say(instruction());
  }
  function videoPlaying() { if (!disposed && state.phase === 'watch') clearTimeout(timeout); }
  function videoWaiting() {
    if (!disposed && state.phase === 'watch') { clearTimeout(timeout); timeout = setTimeout(failed, 15000); }
  }
  function usePicture() {
    if (disposed || state.phase !== 'blocked') return;
    interrupt(); change({ phase: 'try', watched: true, pictureOnly: true, covered: false, notice: '' });
    void media.say(instruction());
  }
  function finishTry() {
    if (disposed || state.phase !== 'try' || !state.watched) return;
    interrupt();
    const turns = state.turns + 1;
    change({ turns, phase: turns === 3 ? 'complete' : 'between', notice: '' });
  }
  function nextTry() {
    if (disposed || state.phase !== 'between') return;
    interrupt(); change({ phase: 'try', covered: state.turns === 2, notice: '' });
    void media.say(state.turns === 2 ? 'paper-own-turn' : 'paper-one-more');
  }
  function showModel() {
    if (disposed || state.phase !== 'try') return;
    if (state.pictureOnly) { interrupt(); change({ covered: false }); }
    else void watch();
  }
  function pause() {
    if (disposed) return;
    if (['prompt', 'watch', 'try'].includes(state.phase)) {
      resumeTo = state.phase === 'try' ? 'try' : 'watch';
      interrupt(); change({ phase: 'paused' });
    } else interrupt();
  }
  function resume() {
    if (disposed || state.phase !== 'paused') return;
    if (resumeTo === 'try') change({ phase: 'try' });
    else void watch(true);
  }
  function repeatInstruction() {
    if (disposed || state.phase !== 'try') return;
    interrupt(); void media.say(instruction());
  }
  return {
    watch, tryNow, videoEnded, videoPlaying, videoWaiting, failed, usePicture,
    finishTry, nextTry, showModel, pause, resume, repeatInstruction,
    snapshot: () => state,
    dispose: () => { disposed = true; interrupt(); },
  };
}
