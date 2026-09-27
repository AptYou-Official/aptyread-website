export type SoundPracticePhase = 'ready' | 'prompt' | 'watch' | 'try' | 'holding' | 'between' | 'complete' | 'paused' | 'blocked';
export type SoundPracticeState = { phase: SoundPracticePhase; turns: number; audioOnly: boolean; looping: boolean; notice: string };
export const initialSoundPractice: SoundPracticeState = { phase: 'ready', turns: 0, audioOnly: false, looping: false, notice: '' };

type Dependencies = {
  say: (id: string) => Promise<boolean>;
  sound: () => Promise<boolean>;
  stopAudio: () => void;
  playVideo: (loop: boolean) => Promise<void>;
  pauseVideo: () => void;
  changed: (state: SoundPracticeState) => void;
};

// The controller owns media turn-taking. Completing a hold records participation,
// never speech accuracy or a minimum speaking duration.
export function createSoundPracticeSession(media: Dependencies) {
  let state = { ...initialSoundPractice };
  let generation = 0;
  let disposed = false;
  let resumeTry = false;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const change = (patch: Partial<SoundPracticeState>) => {
    if (disposed) return;
    state = { ...state, ...patch }; media.changed(state);
  };
  function interrupt() {
    generation++; clearTimeout(timeout);
    if (state.looping) change({ looping: false });
    media.stopAudio(); media.pauseVideo();
    return generation;
  }
  function failed() {
    if (disposed || !(state.phase === 'watch' || (state.phase === 'try' && state.looping))) return;
    interrupt(); change({ phase: 'blocked', notice: 'Try again, or hear the sound.' });
  }
  async function yourTurn(direct = false) {
    if (disposed) return;
    const token = interrupt();
    change({ phase: 'try', notice: '' });
    if (!direct) {
      const ok = await media.say(state.turns ? 'practice-your-turn' : 'practice-now-try');
      if (disposed || token !== generation) return;
      if (!ok) change({ notice: 'Hold the button and say the sound.' });
    }
    if (state.audioOnly) return;
    // Repeat the mouth model only after the instruction. Native looping does
    // not replay narration or complete a turn: only the child's release does.
    change({ looping: true });
    timeout = setTimeout(failed, 15000);
    try {
      await media.playVideo(true);
      if (!disposed && token === generation) clearTimeout(timeout);
    } catch {
      if (!disposed && token === generation) failed();
    }
  }
  async function watch(direct = false, audioOnly = state.audioOnly) {
    if (disposed) return;
    const token = interrupt();
    change({ phase: 'prompt', audioOnly, notice: '' });
    if (!direct) {
      const ok = await media.say(audioOnly ? 'practice-listen' : state.turns ? 'practice-watch-again' : 'practice-watch');
      if (disposed || token !== generation) return;
      if (!ok) { change({ phase: 'blocked', notice: audioOnly ? 'Tap to listen.' : 'Tap Watch to begin.' }); return; }
    }
    change({ phase: 'watch' });
    timeout = setTimeout(failed, 15000);
    try {
      if (audioOnly) {
        const ok = await media.sound();
        if (disposed || token !== generation) return;
        clearTimeout(timeout);
        if (ok) void yourTurn(); else failed();
      } else {
        await media.playVideo(false);
        if (disposed || token !== generation) return;
        clearTimeout(timeout);
      }
    } catch {
      if (!disposed && token === generation) failed();
    }
  }
  function beginHold() {
    if (disposed || !['try', 'watch'].includes(state.phase)) return false;
    interrupt(); change({ phase: 'holding', notice: '' }); return true;
  }
  function endHold() {
    if (disposed || state.phase !== 'holding') return;
    const turns = Math.min(3, state.turns + 1);
    change({ turns, phase: turns === 3 ? 'complete' : 'between', notice: '' });
  }
  function cancelHold() {
    if (!disposed && state.phase === 'holding') { interrupt(); change({ phase: 'try' }); }
  }
  function pause() {
    if (disposed) return;
    const active = ['prompt', 'watch', 'try', 'holding'].includes(state.phase);
    if (active) resumeTry = state.phase === 'try' || state.phase === 'holding';
    interrupt();
    if (active) change({ phase: 'paused', notice: '' });
  }
  return {
    watch, beginHold, endHold, cancelHold, pause,
    snapshot: () => state,
    videoEnded: () => { if (state.phase === 'watch' && !state.audioOnly) void yourTurn(); },
    videoFailed: () => { if (!state.audioOnly) failed(); },
    videoWaiting: () => { if (!disposed && (state.phase === 'watch' || state.looping) && !state.audioOnly) { clearTimeout(timeout); timeout = setTimeout(failed, 15000); } },
    videoPlaying: () => clearTimeout(timeout),
    resume: () => { if (state.phase === 'paused') { if (resumeTry) void yourTurn(true); else void watch(true); } },
    hearDirections: () => { if (state.phase === 'try') void yourTurn(); },
    restart: () => { interrupt(); change({ ...initialSoundPractice }); void watch(); },
    dispose: () => { disposed = true; interrupt(); },
  };
}
