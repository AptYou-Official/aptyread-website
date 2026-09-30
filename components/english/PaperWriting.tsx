'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { englishPaperWritingVideos, type Letter, type WritingLetter } from '@/lib/english-curriculum';
import { createPaperWriting, initialPaperWriting } from '@/lib/english-paper-writing';
import { narrationCue } from '@/lib/english-narration';
import LearningCompanion from './LearningCompanion';
import WritingCelebration from './WritingCelebration';
import ParentHelp from './ParentHelp';
import useEnglishAudio from './useEnglishAudio';
import Icon from './Icons';

export default function PaperWriting({ letter: baseLetter, uppercase, suspended, onBack, onComplete }: {
  letter: Letter; uppercase: boolean; suspended: boolean; onBack: () => void; onComplete: () => void;
}) {
  const letter = (uppercase ? baseLetter.toUpperCase() : baseLetter) as WritingLetter;
  const source = englishPaperWritingVideos[letter];
  const audio = useEnglishAudio();
  const { sequence, stop } = audio;
  const video = useRef<HTMLVideoElement>(null);
  const controller = useRef<ReturnType<typeof createPaperWriting> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousComplete = useRef(false);
  const [state, setState] = useState(initialPaperWriting);
  const { phase, turns, covered, pictureOnly } = state;
  const complete = phase === 'complete';
  const caseLabel = `${uppercase ? 'big' : 'small'} ${letter}`;
  const displayLabel = `${uppercase ? 'Big' : 'Small'} ${letter}`;

  useEffect(() => {
    const session = createPaperWriting(letter, {
      say: id => sequence([narrationCue(id)]),
      play: () => {
        const player = video.current;
        if (!player) return Promise.reject(new Error('Missing writing model'));
        if (player.error) player.load();
        player.muted = true; player.loop = false; player.currentTime = 0;
        return player.play();
      },
      stop: () => { stop(); video.current?.pause(); }, changed: setState,
    });
    controller.current = session;
    const hidden = () => { if (document.hidden) session.pause(); };
    const leaving = () => session.pause();
    document.addEventListener('visibilitychange', hidden); window.addEventListener('pagehide', leaving);
    return () => { session.dispose(); controller.current = null; document.removeEventListener('visibilitychange', hidden); window.removeEventListener('pagehide', leaving); };
  }, [letter, sequence, stop]);
  useEffect(() => { if (suspended) controller.current?.pause(); }, [suspended]);
  useEffect(() => {
    if (complete && !previousComplete.current) {
      heading.current?.focus({ preventScroll: true });
      void sequence([{ id: 'sound-practice-complete' }]);
    }
    previousComplete.current = complete;
  }, [complete, sequence]);
  const title = complete ? 'Nice try!' : phase === 'paused' ? 'Ready?' : phase === 'blocked' ? 'Try again.' : phase === 'try' ? `Write ${caseLabel}.` : 'Watch the hand.';
  function leave(action: () => void) { controller.current?.pause(); action(); }

  return <div className={`en-guided-word en-paper-writing ${complete ? 'is-complete' : ''}`} data-action={complete ? 'continue' : phase === 'try' ? 'draw' : 'watch'}>
    <div className="en-paper-stage">
      <LearningCompanion title={title} speaking={audio.playing} headingRef={heading} reaction={`${turns}-${phase}`} />
      <div className="en-paper-experience">
        {complete ? <WritingCelebration label={displayLabel} letter={letter} /> : <>
          <div className={`en-paper-model ${covered ? 'is-covered' : ''}`}>
            <video ref={video} src={source.src} poster={source.poster} muted playsInline preload="none" aria-label={`A hand showing how to write ${uppercase ? 'capital' : 'lowercase'} ${letter}`} hidden={covered || pictureOnly}
              onEnded={() => controller.current?.videoEnded()} onPlaying={() => controller.current?.videoPlaying()} onWaiting={() => controller.current?.videoWaiting()} onError={() => controller.current?.failed()} />
            {pictureOnly && !covered && <Image src={source.poster} alt={`Finished ${uppercase ? 'capital' : 'lowercase'} ${letter} on writing lines`} width={480} height={480} unoptimized />}
            {covered && <div className="en-paper-own"><Icon name="pencil" size={49} /><span>Your paper. Your pencil.</span></div>}
            {['ready', 'paused', 'blocked'].includes(phase) && <button className="en-paper-play" aria-label={phase === 'paused' ? 'Resume writing practice' : 'Play writing video'} onClick={() => phase === 'paused' ? controller.current?.resume() : void controller.current?.watch(true)}><Icon name="play" size={29} /></button>}
          </div>
          <div className="en-paper-tools">
            {phase === 'try' ? <button className="en-text-button" onClick={() => pictureOnly ? controller.current?.showModel() : void controller.current?.watch(true)}><Icon name={covered ? 'play' : 'redo'} size={19} />{covered ? 'Show me' : pictureOnly ? 'Look again' : 'Watch again'}</button>
              : phase === 'blocked' ? <button className="en-text-button" onClick={() => controller.current?.usePicture()}>Show the picture <Icon name="arrow" size={18} /></button>
              : null}
          </div>
        </>}
      </div>
    </div>
    <div className="en-paper-return"><button className="en-text-button" onClick={() => leave(onBack)}><Icon name="back" size={17} /> Practice choices</button></div>
    <p className="en-sr-only" role="status">{state.notice}</p>
    <div className="en-word-dock en-paper-dock" aria-label="Your next action">
      {['try', 'watch', 'prompt'].includes(phase) && <button className="en-dock-audio" aria-label={phase !== 'try' || audio.playing ? 'Pause writing practice' : 'Hear the instructions'} onClick={() => phase !== 'try' || audio.playing ? controller.current?.pause() : controller.current?.repeatInstruction()}><Icon name={phase !== 'try' || audio.playing ? 'pause' : 'sound'} size={23} /></button>}
      {complete ? <><button className="en-text-button en-writing-again" onClick={() => controller.current?.tryAgain()}><Icon name="redo" size={19} /> Try again</button><button className="en-button en-next-topic" onClick={() => leave(onComplete)}>Next topic <span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button></>
        : phase === 'try' ? <button className="en-button" onClick={() => controller.current?.finishTry()}><Icon name="check" size={22} /> I tried it</button>
        : phase === 'paused' ? <button className="en-button" onClick={() => controller.current?.resume()}>Continue <Icon name="play" size={22} /></button>
        : phase === 'watch' ? <button className="en-button" disabled={!state.watched} onClick={() => controller.current?.tryNow()}>{state.watched ? 'Try it' : 'Watching…'} <Icon name="pencil" size={22} /></button>
        : <button className="en-button" disabled={phase === 'prompt'} onClick={() => void controller.current?.watch(true)}><Icon name="play" size={22} />{phase === 'prompt' ? 'Watch…' : phase === 'blocked' ? 'Try video again' : 'Watch'}</button>}
    </div>
    <ParentHelp kind="paper" className="en-paper-parent" onOpen={() => controller.current?.pause()} />
  </div>;
}
