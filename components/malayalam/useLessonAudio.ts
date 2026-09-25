'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { malayalamAudioUrl, type MalayalamAudioId } from '@/lib/malayalam-audio';

type PlaybackObserver = { onStart?: (clip: MalayalamAudioId) => void; onEnd?: (clip: MalayalamAudioId) => void; onError?: (clip: MalayalamAudioId) => void };

export default function useLessonAudio() {
  const element = useRef<HTMLAudioElement | null>(null);
  const generation = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mutedRef = useRef(false);
  const last = useRef<MalayalamAudioId[]>([]);
  const lastObserver = useRef<PlaybackObserver>({});
  const [muted, setMuted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle');

  const cancel = useCallback(() => {
    generation.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const audio = element.current;
    if (audio) {
      audio.onended = audio.onerror = audio.onplaying = audio.onwaiting = null;
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }
  }, []);

  const stop = useCallback(() => { cancel(); setStatus('idle'); }, [cancel]);

  const play = useCallback((clips: MalayalamAudioId[], observer: PlaybackObserver = {}) => {
    cancel();
    last.current = clips;
    lastObserver.current = observer;
    if (mutedRef.current || clips.length === 0) { setStatus('idle'); return; }
    const token = generation.current;
    let activeClip = clips[0];
    // Reuse one media element; the first play is called directly by a tap.
    const audio = element.current || (element.current = new Audio());
    const fail = () => {
      if (token !== generation.current) return;
      observer.onError?.(activeClip);
      cancel();
      setStatus('error');
    };
    const playAt = (index: number) => {
      if (token !== generation.current) return;
      if (timer.current) clearTimeout(timer.current);
      if (index === clips.length) { setStatus('idle'); return; }
      activeClip = clips[index];
      setStatus('loading');
      let announced = false;
      audio.onended = () => {
        if (token !== generation.current) return;
        observer.onEnd?.(clips[index]);
        playAt(index + 1);
      };
      audio.onerror = fail;
      audio.onplaying = () => {
        if (token !== generation.current) return;
        if (timer.current) clearTimeout(timer.current);
        setStatus('playing');
        if (!announced) { announced = true; observer.onStart?.(clips[index]); }
      };
      audio.onwaiting = () => {
        if (token !== generation.current) return;
        if (timer.current) clearTimeout(timer.current);
        setStatus('loading');
        timer.current = setTimeout(fail, 15000);
      };
      audio.src = malayalamAudioUrl(clips[index]);
      timer.current = setTimeout(fail, 15000);
      void audio.play().catch(fail);
    };
    playAt(0);
  }, [cancel]);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    stop();
  }, [stop]);
  const retry = useCallback(() => play(last.current, lastObserver.current), [play]);

  useEffect(() => {
    const hide = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', stop);
    return () => {
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', stop);
      cancel();
    };
  }, [cancel, stop]);

  return { play, stop, retry, toggleMute, muted, status };
}
