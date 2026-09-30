'use client';

import { useEffect, useRef, useState } from 'react';
import type { ExploreLetter as Letter, WritingLetter } from '@/lib/english-curriculum';
import { casePracticeStars, createLetterCases, initialLetterCases } from '@/lib/english-letter-cases';
import { narrationCue } from '@/lib/english-narration';
import useEnglishAudio from './useEnglishAudio';
import LearningCompanion from './LearningCompanion';
import AchievementStars from './AchievementStars';
import ActivitySticker from './ActivitySticker';
import ParentHelp from './ParentHelp';
import Icon from './Icons';

const letterLabel = (value: string) => `${value === value.toUpperCase() ? 'big' : 'small'} ${value}`;

export default function LetterCases({ letter, suspended = false, onComplete }: { letter: Letter; suspended?: boolean; onComplete: () => void }) {
  const audio = useEnglishAudio();
  const { sequence, stop } = audio;
  const [state, setState] = useState(() => initialLetterCases(letter));
  const controller = useRef<ReturnType<typeof createLetterCases> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;
  const cancelEntry = useRef(() => {});
  const previousPhase = useRef(state.phase);
  const complete = state.phase === 'complete';
  const matched = state.phase === 'matched';
  const current = state.rounds[state.index];
  const pair = [letter.toUpperCase(), letter] as WritingLetter[];

  useEffect(() => {
    const session = createLetterCases(letter, { say: id => sequence([narrationCue(id)]), sound: value => sequence([{ id: `sound-${value}` }]), stop, changed: setState });
    controller.current = session;
    let entered = false;
    let timer: ReturnType<typeof setTimeout>;
    cancelEntry.current = () => { clearTimeout(timer); entered = true; };
    const pause = () => { cancelEntry.current(); session.stop(); };
    function visible() {
      clearTimeout(timer);
      if (document.hidden) session.stop();
      else if (!entered) timer = setTimeout(() => {
        if (!suspendedRef.current && !document.hidden) { entered = true; void session.start(); }
      }, 0);
    }
    document.addEventListener('visibilitychange', visible);
    window.addEventListener('pagehide', pause); visible();
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', visible); window.removeEventListener('pagehide', pause); session.dispose(); controller.current = null; };
  }, [letter, sequence, stop]);
  useEffect(() => { if (suspended) { cancelEntry.current(); controller.current?.stop(); } }, [suspended]);
  useEffect(() => {
    if (complete && previousPhase.current !== 'complete') heading.current?.focus({ preventScroll: true });
    previousPhase.current = state.phase;
  }, [complete, state.phase]);

  function quiet() { cancelEntry.current(); controller.current?.stop(); }
  function listen() { cancelEntry.current(); void controller.current?.listen(); }
  function next() { cancelEntry.current(); void controller.current?.next(); }
  const title = complete ? 'Letter finder!' : matched ? 'You found it!' : state.retry ? 'Try again.' : `Find ${letterLabel(current.target)}.`;
  const canContinue = complete || matched;

  return <div className={`en-guided-word en-letter-link en-letter-cases ${complete ? 'is-complete' : ''}`} data-action={canContinue ? 'continue' : state.busy ? 'listen' : 'find'}>
    <div className="en-link-stage">
      <LearningCompanion title={title} speaking={audio.playing} headingRef={heading} reaction={`${state.index}-${state.phase}-${state.retry}`} />
      {complete ? <ActivitySticker kind="finder" title="Letter finder!" detail={`You found Big ${pair[0]} and Small ${letter}.`} sticker={`${pair[0]} ${letter}`} /> : <div className="en-link-experience en-cases-visual">
        <button className={`en-link-speaker ${state.busy ? 'is-playing' : ''}`} onClick={state.busy ? quiet : listen} aria-label={state.busy ? 'Stop listening' : `Hear the ${letter} sound`}><Icon name={state.busy ? 'pause' : 'sound'} size={31} /><span className="en-link-waves" aria-hidden="true"><i /><i /><i /></span></button>
        <div className="en-link-choices" role="group" aria-label={`Find ${letterLabel(current.target)}`}>
          {current.options.map(value => <button key={`${state.index}-${value}`} className={`en-link-choice ${matched && value === current.target ? 'is-matched' : ''}`} disabled={matched || state.busy} onClick={() => void controller.current?.choose(value)} aria-label={`Choose ${letterLabel(value)}`}>
            <span>{value}</span>{matched && value === current.target && <span className="en-link-check"><Icon name="check" size={18} /></span>}
          </button>)}
        </div>
        <div className="en-link-progress" role="status"><AchievementStars count={2} earned={casePracticeStars(state)} variant="progress" /></div>
      </div>}
    </div>
    <p className="en-link-notice" role="status">{state.notice}</p>
    <div className="en-word-dock en-link-dock" aria-label="Your next action">
      {!complete && <button className={`en-dock-audio ${state.busy ? 'is-playing' : ''}`} aria-label={state.busy ? 'Pause the sound' : `Hear the ${letter} sound`} onClick={state.busy ? quiet : listen}><Icon name={state.busy ? 'pause' : 'sound'} size={24} /></button>}
      {canContinue ? <button className={`en-button ${complete ? 'en-next-topic' : ''}`} disabled={state.busy} onClick={complete ? () => { quiet(); onComplete(); } : next}>{complete ? 'Next topic' : 'Next'}<Icon name="arrow" size={23} /></button>
        : <div className="en-link-action-cue" role="status"><Icon name={state.busy ? 'sound' : 'hand'} size={23} /><span>{state.busy ? 'Listen…' : 'Tap a letter'}</span></div>}
    </div>
    <ParentHelp kind="cases" className="en-link-parent" onOpen={quiet} />
  </div>;
}
