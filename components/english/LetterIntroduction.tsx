'use client';

import { useEffect, useRef, useState } from 'react';
import type { Letter } from '@/lib/english-curriculum';
import { narrationCue } from '@/lib/english-narration';
import useEnglishAudio from './useEnglishAudio';
import LearningCompanion from './LearningCompanion';
import ActivitySticker from './ActivitySticker';
import ParentHelp from './ParentHelp';
import Icon from './Icons';

/** Guided audio introduction for a topic without a teaching video. */
export default function LetterIntroduction({ letter, suspended, onComplete }: {
  letter: Letter; suspended: boolean; onComplete: () => void;
}) {
  const { sequence, stop, playing, notice } = useEnglishAudio();
  const [heard, setHeard] = useState(false);
  const run = useRef(0);
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;
  function quiet() { run.current++; stop(); }
  async function listen() {
    const token = ++run.current;
    const ok = await sequence([narrationCue('intro-listen'), { id: `sound-${letter}` }, narrationCue('intro-try')]);
    if (token === run.current && ok && !suspendedRef.current && !document.hidden) setHeard(true);
  }
  useEffect(() => { if (suspended) { run.current++; stop(); } }, [suspended, stop]);
  useEffect(() => {
    const playbackRun = run;
    const pause = () => { if (document.hidden) { playbackRun.current++; stop(); } };
    document.addEventListener('visibilitychange', pause);
    return () => { playbackRun.current++; stop(); document.removeEventListener('visibilitychange', pause); };
  }, [stop]);
  return <div className="en-guided-word en-letter-introduction">
    <LearningCompanion title={heard ? 'Sound explorer!' : `Meet ${letter}.`} speaking={playing} reaction={heard ? 'try' : 'listen'} />
    {heard ? <ActivitySticker kind="sound" compact title="Sound explorer!" detail={`You explored the ${letter} sound.`} sticker={`${letter} ♪`} /> : <div className="en-intro-sound-card">
      <span className="en-intro-video-note"><Icon name="sound" size={15} /> Listen and try</span>
      <button className={`en-intro-letter ${playing ? 'is-playing' : ''}`} onClick={playing ? quiet : () => void listen()} aria-label={playing ? 'Stop listening' : `Hear the ${letter} sound`}>
        <strong>{letter}</strong><span><Icon name={playing ? 'pause' : 'sound'} size={26} /></span>
      </button>
      <p>Listen. Then try.</p>
    </div>}
    {notice && <p className="en-audio-note" role="status">{notice}</p>}
    <div className="en-word-dock" aria-label="Your next action">
      <button className="en-dock-audio" aria-label={playing ? 'Stop listening' : 'Listen again'} onClick={playing ? quiet : () => void listen()}><Icon name={playing ? 'pause' : 'sound'} size={24} /></button>
      {heard ? <button className="en-button en-next-topic" onClick={() => { quiet(); onComplete(); }}>Next topic <Icon name="arrow" size={21} /></button>
        : <button className="en-button" disabled={playing} onClick={() => void listen()}><Icon name="sound" size={23} /> Listen with me</button>}
    </div>
    <ParentHelp kind="introduction" onOpen={quiet} />
  </div>;
}
