'use client';

import { useEffect, useRef, useState } from 'react';
import type { ExploreLetter as Letter, WritingLetter } from '@/lib/english-curriculum';
import { casePracticeStars, createLetterCases, initialLetterCases } from '@/lib/english-letter-cases';
import { narrationCue } from '@/lib/english-narration';
import useEnglishAudio from './useEnglishAudio';
import LearningCompanion from './LearningCompanion';
import AchievementStars from './AchievementStars';
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
  const guided = state.phase === 'guide';
  const complete = state.phase === 'complete';
  const matched = state.phase === 'matched';
  const help = state.phase === 'help';
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
  const title = complete ? 'Lovely listening!' : guided ? state.guideStep === 2 ? 'Same sound.' : `Tap ${state.guideStep === 0 ? 'big' : 'small'} ${pair[state.guideStep]}.` : help ? 'Listen with me.' : matched ? 'You found it!' : state.retry ? 'Listen again.' : state.heard ? 'Which letter?' : 'Listen.';
  const canContinue = complete || matched || help || (guided && state.guideStep === 2);

  return <div className={`en-guided-word en-letter-link en-letter-cases ${guided ? 'is-pair-guide' : ''} ${help ? 'is-help' : ''} ${complete ? 'is-complete' : ''}`}>
    <div className="en-link-stage">
      <LearningCompanion title={title} speaking={audio.playing} headingRef={heading} reaction={`${state.guideStep}-${state.index}-${state.phase}`} />
      {complete ? <div className="en-link-keepsake">
        <AchievementStars count={4} />
        <div className="en-link-keepsake-letters" aria-label={`You practised big ${pair[0]} and small ${letter}`}>{pair.map(value => <span key={value}>{value}</span>)}</div>
      </div> : <div className="en-link-experience">
        {guided ? <div className="en-cases-pair" role="group" aria-label="Two forms of the same letter">
          {pair.map((value, index) => <button key={value} className={`en-link-choice ${state.guideStep === index ? 'is-cued' : ''} ${state.highlight === value ? 'is-sounding' : ''} ${state.guideStep > index ? 'is-matched' : ''}`} disabled={state.busy || state.guideStep !== index} onClick={() => { cancelEntry.current(); void controller.current?.touch(value); }} aria-label={`Tap ${letterLabel(value)}`}>
            <span>{value}</span><span className="en-cases-tile-cue" aria-hidden="true"><Icon name={state.guideStep > index ? 'check' : 'hand'} size={20} /></span>
          </button>)}
        </div> : <>
          <button className={`en-link-speaker ${state.busy ? 'is-playing' : ''}`} onClick={state.busy ? quiet : listen} aria-label={state.busy ? 'Stop listening' : 'Hear the sound'}><Icon name={state.busy ? 'pause' : 'sound'} size={31} /><span className="en-link-waves" aria-hidden="true"><i /><i /><i /></span></button>
          {help ? <div className="en-cases-model" aria-label={`This sound matches ${letterLabel(current.target)}`}><span>{current.target}</span><Icon name="sound" size={24} /></div> : <div className="en-link-choices" role="group" aria-label="Choose the letter for the sound">
            {current.options.map(value => <button key={`${state.index}-${value}`} className={`en-link-choice ${state.highlight === value ? 'is-sounding' : ''} ${matched && value === current.target ? 'is-matched' : ''}`} disabled={matched || state.busy || !state.heard} onClick={() => void controller.current?.choose(value)} aria-label={`Choose ${letterLabel(value)}`}>
              <span>{value}</span>{matched && value === current.target && <span className="en-link-check"><Icon name="check" size={18} /></span>}
            </button>)}
          </div>}
          <div className="en-link-progress" role="status"><AchievementStars count={4} earned={casePracticeStars(state)} variant="progress" /></div>
          {!help && <button className="en-text-button en-link-help" disabled={matched || state.busy} onClick={() => void controller.current?.help()}><Icon name="hand" size={18} /> Help me</button>}
        </>}
      </div>}
    </div>
    <p className="en-link-notice" role="status">{state.notice}</p>
    <div className="en-word-dock en-link-dock" aria-label="Your next action">
      {!complete && <button className={`en-dock-audio ${state.busy ? 'is-playing' : ''}`} aria-label={state.busy ? 'Pause the sound' : guided ? 'Hear the instructions' : 'Listen again'} onClick={state.busy ? quiet : listen}><Icon name={state.busy ? 'pause' : 'sound'} size={24} /></button>}
      {canContinue ? <button className={`en-button ${complete ? 'en-next-topic' : ''}`} disabled={state.busy} onClick={complete ? () => { quiet(); onComplete(); } : next}>{complete ? 'Next topic' : guided ? 'Let’s listen' : help ? 'Try it' : 'Continue'}<Icon name="arrow" size={23} /></button>
        : !guided && !state.heard ? <button className="en-button" disabled={state.busy} onClick={listen}><Icon name="sound" size={23} />{state.busy ? 'Listening…' : 'Listen'}</button>
        : <p>{state.busy ? 'Listen…' : guided ? 'Tap the glowing letter.' : 'Tap a letter.'}</p>}
    </div>
    <details className="en-word-support en-link-parent" onToggle={event => { if (event.currentTarget.open) quiet(); }} onKeyDown={event => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }}>
      <summary aria-label="For grown-ups"><Icon name="grownups" size={18} /><span>For grown-ups</span></summary>
      <p>First, explore the big and small forms together. Then the model disappears for four listening turns mixing the familiar s, a and t sounds. Only capital forms already introduced appear.</p>
      <p>Help me, or two incorrect choices, shows the matching letter with its recorded sound. Tap Try it to hide the model and listen again. One helped letter may return for an extra turn.</p>
      <p>Four stars celebrate the four main listening turns. Help and retries never take stars away. Completion records practice, not mastery or pronunciation accuracy. The app does not record your child’s voice.</p>
    </details>
  </div>;
}
