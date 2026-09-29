'use client';

import { useEffect, useRef, useState } from 'react';
import { mediaFor } from '@/lib/english-curriculum';
import { englishNarration } from '@/lib/english-narration';
import { createEnglishAudioPlayer } from '@/lib/english-audio-player';

export default function useEnglishAudio() {
  const [state, setState] = useState({ playing: false, notice: '', blocked: false });
  const player = useRef<ReturnType<typeof createEnglishAudioPlayer> | null>(null);
  if (!player.current) player.current = createEnglishAudioPlayer(mediaFor, setState);
  const engine = player.current;
  useEffect(() => {
    // Start loading installed voices before the child's first audio tap.
    window.speechSynthesis?.getVoices();
    const pause = () => { if (document.hidden) engine.stop(); };
    document.addEventListener('visibilitychange', pause);
    window.addEventListener('pagehide', engine.stop);
    return () => { engine.stop(); document.removeEventListener('visibilitychange', pause); window.removeEventListener('pagehide', engine.stop); };
  }, [engine]);
  return { ...state, stop: engine.stop, sequence: engine.sequence, play: (id: string, narration = englishNarration[id]) => engine.play(id, narration) };
}
