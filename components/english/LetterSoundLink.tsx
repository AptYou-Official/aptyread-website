'use client';

import { useEffect, useRef, useState } from 'react';
import type { Letter } from '@/lib/english-curriculum';
import { createLetterLink, initialLetterLink, letterLinkReward, linkLetters } from '@/lib/english-letter-link';
import { narrationCue } from '@/lib/english-narration';
import useEnglishAudio from './useEnglishAudio';
import LearningCompanion from './LearningCompanion';
import AchievementStars from './AchievementStars';
import ActivitySticker from './ActivitySticker';
import Icon from './Icons';

export default function LetterSoundLink({ letter, suspended = false, onComplete, nextTopic }: { letter: Letter; suspended?: boolean; onComplete: () => void; nextTopic?: string }) {
  const audio = useEnglishAudio();
  const { sequence, stop } = audio;
  const [state, setState] = useState(() => initialLetterLink(letter));
  const controller = useRef<ReturnType<typeof createLetterLink> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;
  const cancelEntry = useRef(() => {});
  const guided = letter === 's';
  const complete = state.phase === 'complete';
  const matched = state.phase === 'matched';
  const current = state.rounds[state.index];
  const previousPhase = useRef(state.phase);

  useEffect(() => {
    const session = createLetterLink(letter, {
      say: id => sequence([narrationCue(id)]),
      sound: value => sequence([{ id: `sound-${value}` }]),
      stop, changed: setState,
    });
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
    if (state.phase === 'complete' && previousPhase.current !== 'complete') heading.current?.focus({ preventScroll: true });
    previousPhase.current = state.phase;
  }, [state.phase]);

  function quiet() { cancelEntry.current(); controller.current?.stop(); }
  function listen() { cancelEntry.current(); void controller.current?.listen(); }
  function touch() { cancelEntry.current(); void controller.current?.touch(); }
  const title = complete ? 'Sound link!' : matched ? 'You found it!' : guided ? state.phase === 'say' ? 'Your turn.' : state.heard ? 'Tap and say.' : 'Listen.' : state.feedback === 'help' && state.busy ? 'Listen with me.' : state.feedback === 'retry' && state.busy ? 'Listen again.' : !state.heard ? 'Listen.' : 'Tap.';
  const reward = letterLinkReward(letter, state);

  return <div className={`en-guided-word en-letter-link ${guided ? 'is-guided' : ''} ${complete ? 'is-complete' : ''}`}>
    <div className="en-link-stage">
      <LearningCompanion title={title} speaking={audio.playing} headingRef={heading} reaction={`${state.index}-${state.phase}`} />
      {complete ? <ActivitySticker kind="link" title="Sound link!" detail={guided ? `You tried the ${letter} sound.` : `You matched the ${letter} sound.`} sticker={`${letter} ↔`} /> : <div className="en-link-experience">
        {guided ? <button className={`en-link-single ${state.highlight === 's' ? 'is-sounding' : ''}`} disabled={state.busy || !state.heard} onClick={state.phase === 'touch' ? touch : listen} aria-label={state.phase === 'touch' ? 'Touch s and try its sound' : 'Hear the s sound again'}>
          <strong>s</strong><span><Icon name={state.phase === 'touch' ? 'hand' : 'sound'} size={25} /></span>
        </button> : <>
          <button className={`en-link-speaker ${audio.playing ? 'is-playing' : ''}`} onClick={state.busy ? quiet : listen} aria-label={state.busy ? 'Stop listening' : 'Hear the sound'}><Icon name={state.busy ? 'pause' : 'sound'} size={31} /><span className="en-link-waves" aria-hidden="true"><i /><i /><i /></span></button>
          <div className={`en-link-choices ${state.heard && !state.busy && !matched ? 'is-ready' : ''}`} role="group" aria-label="Choose the letter for the sound">
            {current.options.map(value => <button key={value} className={`en-link-choice ${state.highlight === value ? 'is-sounding' : ''} ${matched && value === current.target ? 'is-matched' : ''}`} disabled={matched || state.busy || !state.heard} onClick={() => void controller.current?.choose(value)} aria-label={`Choose ${value}`}>
              <span>{value}</span>{matched && value === current.target && <span className="en-link-check"><Icon name="check" size={18} /></span>}
            </button>)}
          </div>
        </>}
        <div className="en-link-progress" role="status"><AchievementStars count={reward.total} earned={reward.earned} variant="progress" /></div>
        {!guided && <button className="en-text-button en-link-help" disabled={matched || state.busy} onClick={() => void controller.current?.help()}><Icon name="hand" size={18} /> Help me</button>}
      </div>}
    </div>
    <p className="en-link-notice" role="status">{state.notice}</p>
    <div className="en-word-dock en-link-dock" aria-label="Your next action">
      {!complete && (guided || !state.heard) && <button className={`en-dock-audio ${state.busy ? 'is-playing' : ''}`} aria-label={state.busy ? 'Pause the sound' : 'Listen again'} onClick={state.busy ? quiet : listen}><Icon name={state.busy ? 'pause' : 'sound'} size={24} /></button>}
      {complete ? <button className="en-button en-next-topic" onClick={() => { quiet(); onComplete(); }}><span className="en-next-topic-copy"><small>Next topic</small><strong>{nextTopic || 'Keep going'}</strong></span><span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button>
        : matched ? <button className="en-button" disabled={state.busy} onClick={() => controller.current?.next()}>Continue <Icon name="arrow" size={22} /></button>
        : !state.heard ? <button className="en-button" disabled={state.busy} onClick={listen}><Icon name="sound" size={23} />{state.busy ? 'Listening…' : 'Listen'}</button>
        : guided ? <button className="en-button" disabled={state.busy} onClick={state.phase === 'touch' ? touch : () => controller.current?.next()}><Icon name={state.phase === 'touch' ? 'hand' : 'check'} size={23} />{state.phase === 'touch' ? 'Tap and say' : 'I tried it'}</button>
        : <div className="en-link-action-cue" role="status"><Icon name="hand" size={24} /><span>Tap one</span></div>}
    </div>
    <details className="en-word-support en-link-parent" onToggle={event => { if (event.currentTarget.open) quiet(); }} onKeyDown={event => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }}>
      <summary aria-label="For grown-ups"><Icon name="grownups" size={18} /><span>For grown-ups</span></summary>
      <p>{guided ? 'Only s has been taught. Listen together, touch the letter, then give your child time to try its sound. I tried it celebrates participation; this is guided practice, not a recognition test.' : `Only ${linkLetters[letter].join(', ')} appear here. Listen to the sound, then let your child choose. The letter positions are mixed between turns and stay still while your child thinks.`}</p>
      <p>{guided ? 'Tapping the letter again replays the real sound. The app does not record or assess your child’s voice.' : 'Help me, or two incorrect choices, demonstrates the matching letter with its sound. A helped connection returns later without a highlight. There is at most one extra revisit per letter; completion celebrates practice, not mastery.'}</p>
      <p>Take all the time you need. Pause and talk in your home language. All letter sounds use the bundled recordings; only the short instructions use a device voice.</p>
      <p>The sound-link sticker celebrates the main practice steps. Help and extra tries never take progress away. Reading activities have their own word and sentence stickers.</p>
    </details>
  </div>;
}
