'use client';

import { useEffect, useRef, useState } from 'react';
import type { Activity, WritingLetter } from '@/lib/english-curriculum';
import LearningCompanion from './LearningCompanion';
import TracePad from './TracePad';
import PaperWriting from './PaperWriting';
import WritingCelebration from './WritingCelebration';
import ParentHelp from './ParentHelp';
import useEnglishAudio from './useEnglishAudio';
import Icon from './Icons';

export default function WritingPractice({ activity, suspended = false, onComplete }: {
  activity: Activity; suspended?: boolean; onComplete: () => void;
}) {
  const [mode, setMode] = useState<'choose' | 'trace' | 'invite' | 'paper'>('choose');
  const audio = useEnglishAudio();
  const { sequence, stop } = audio;
  const uppercase = !!activity.uppercase;
  const baseLetter = activity.letter || 's';
  const letter = (uppercase ? baseLetter.toUpperCase() : baseLetter) as WritingLetter;
  const heading = useRef<HTMLHeadingElement>(null);
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;
  const opening = useRef<ReturnType<typeof setTimeout>>();
  const caseLabel = `${uppercase ? 'big' : 'small'} ${letter}`;
  const displayLabel = `${uppercase ? 'Big' : 'Small'} ${letter}`;
  const successAudioId = `writing-success-${uppercase ? 'big' : 'small'}-${baseLetter.toLowerCase()}`;
  const instruction = `Let’s write ${caseLabel}. Start at the dot.`;
  function quiet() { clearTimeout(opening.current); stop(); }
  function directions() { quiet(); void sequence([{ id: `instruction-${activity.id}`, narration: instruction, optional: true }]); }
  function changeMode(next: typeof mode) { quiet(); setMode(next); }
  useEffect(() => {
    if (mode === 'trace' && !suspendedRef.current && !document.hidden) opening.current = setTimeout(() => { if (!suspendedRef.current && !document.hidden) void sequence([{ id: `instruction-${activity.id}`, narration: instruction, optional: true }]); }, 0);
    if (mode === 'invite' && !suspendedRef.current && !document.hidden) opening.current = setTimeout(() => { if (!suspendedRef.current && !document.hidden) void sequence([{ id: successAudioId, narration: `Nice try! You practised ${displayLabel}.`, optional: true }, { id: 'sound-practice-complete' }]); }, 0);
    return () => { clearTimeout(opening.current); stop(); };
    // Entering a tracing mode speaks once; closing a menu does not restart it.
  }, [mode, activity.id, displayLabel, instruction, sequence, stop, successAudioId]);
  useEffect(() => { if (suspended) { clearTimeout(opening.current); stop(); } }, [suspended, stop]);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [mode]);
  useEffect(() => {
    const hidden = () => { if (document.hidden) { clearTimeout(opening.current); stop(); } };
    document.addEventListener('visibilitychange', hidden);
    return () => document.removeEventListener('visibilitychange', hidden);
  }, [stop]);

  if (mode === 'paper') return <PaperWriting letter={baseLetter} uppercase={uppercase} suspended={suspended} onBack={() => changeMode('choose')} onComplete={onComplete} />;
  return <div className={`en-guided-word en-letter-studio en-writing-practice is-${mode}`}>
    <div className="en-writing-stage">
      <LearningCompanion title={mode === 'trace' ? `Trace ${caseLabel}.` : mode === 'invite' ? 'Nice try!' : `Make ${caseLabel}.`} speaking={audio.playing} headingRef={heading} reaction={mode} />
      {mode === 'trace' ? <div className="en-writing-trace">
        <TracePad letter={letter} suspended={suspended} onComplete={() => changeMode('invite')} onListen={audio.playing ? quiet : directions} speaking={audio.playing} needsListen={audio.blocked} showPaperAlternative={false} />
        <button className="en-text-button en-writing-switch" onClick={() => changeMode('paper')}><Icon name="pencil" size={18} /> Write on paper</button>
      </div> : <div className={`en-writing-choices ${mode === 'invite' ? 'is-invitation' : ''}`}>
        {mode === 'invite' && <WritingCelebration label={displayLabel} letter={letter} />}
        {mode === 'choose' && <button className="en-writing-choice" onClick={() => changeMode('trace')}><span className="en-writing-choice-art is-tracing" aria-hidden="true"><strong>{letter}</strong><Icon name="hand" size={27} /></span><span>Trace on screen</span></button>}
        <button className="en-writing-choice" onClick={() => changeMode('paper')}><span className="en-writing-choice-art is-paper" aria-hidden="true"><strong>{letter}</strong><Icon name="pencil" size={27} /></span><span>{mode === 'invite' ? 'Try on paper' : 'Write on paper'}</span></button>
        {mode === 'invite' && <p>Or try with a pencil.</p>}
      </div>}
    </div>
    {mode === 'trace' && <ParentHelp kind="trace" className="en-writing-parent" onOpen={quiet} />}
    {mode !== 'choose' && <button className="en-text-button en-writing-back" onClick={() => changeMode('choose')}><Icon name="back" size={17} /> Practice choices</button>}
    {mode !== 'trace' && <div className="en-word-dock en-writing-choice-dock" aria-label="Your next action">{mode === 'invite'
      ? <button className="en-button en-next-topic" onClick={() => { quiet(); onComplete(); }}>Next topic <span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button>
      : <p>Choose how to practise.</p>}</div>}
  </div>;
}
