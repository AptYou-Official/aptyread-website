'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { englishPaperWritingVideos } from '@/lib/english-curriculum';
import { createPaperWriting, initialPaperWriting } from '@/lib/english-paper-writing';
import { narrationCue } from '@/lib/english-narration';
import AchievementStars from './AchievementStars';
import LearningCompanion from './LearningCompanion';
import useEnglishAudio from './useEnglishAudio';
import Icon from './Icons';

export default function PaperWriting({ uppercase, suspended, onBack, onComplete }: {
  uppercase: boolean; suspended: boolean; onBack: () => void; onComplete: () => void;
}) {
  const letter = uppercase ? 'S' : 's';
  const source = englishPaperWritingVideos[letter];
  const audio = useEnglishAudio();
  const { sequence, stop } = audio;
  const video = useRef<HTMLVideoElement>(null);
  const controller = useRef<ReturnType<typeof createPaperWriting> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [state, setState] = useState(initialPaperWriting);
  const { phase, turns, covered, pictureOnly } = state;
  const complete = phase === 'complete';

  useEffect(() => {
    const session = createPaperWriting(uppercase, {
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
  }, [uppercase, sequence, stop]);
  useEffect(() => { if (suspended) controller.current?.pause(); }, [suspended]);
  useEffect(() => { if (complete) heading.current?.focus({ preventScroll: true }); }, [complete]);
  const title = complete ? 'Lovely writing!' : phase === 'ready' ? 'Ready to write?' : phase === 'paused' ? 'Ready when you are.' : phase === 'between' ? 'A lovely try!' : phase === 'blocked' ? 'Let’s try together.' : phase === 'try' ? covered ? 'One on your own.' : 'Your turn.' : 'Watch.';
  function leave(action: () => void) { controller.current?.pause(); action(); }

  return <div className={`en-guided-word en-paper-writing ${complete ? 'is-complete' : ''}`}>
    <div className="en-paper-stage">
      <LearningCompanion title={title} speaking={audio.playing} headingRef={heading} reaction={`${turns}-${phase}`} />
      <div className="en-paper-experience">
        {complete ? <div className="en-paper-keepsake"><AchievementStars count={3} /><div className="en-written-letter"><strong>{letter}</strong><span><Icon name="pencil" size={25} /></span></div></div> : <>
          <div className={`en-paper-model ${covered ? 'is-covered' : ''}`}>
            <video ref={video} src={source.src} poster={source.poster} muted playsInline preload="none" aria-label={`A hand showing how to write ${uppercase ? 'capital S' : 'lowercase s'}`} hidden={covered || pictureOnly}
              onEnded={() => controller.current?.videoEnded()} onPlaying={() => controller.current?.videoPlaying()} onWaiting={() => controller.current?.videoWaiting()} onError={() => controller.current?.failed()} />
            {pictureOnly && !covered && <Image src={source.poster} alt={`Finished ${uppercase ? 'capital S' : 'lowercase s'} on writing lines`} width={480} height={480} unoptimized />}
            {covered && <div className="en-paper-own"><Icon name="pencil" size={49} /><span>Your paper. Your pencil.</span></div>}
            {['ready', 'paused', 'blocked'].includes(phase) && <button className="en-paper-play" aria-label={phase === 'paused' ? 'Resume writing practice' : 'Play writing video'} onClick={() => phase === 'paused' ? controller.current?.resume() : void controller.current?.watch(phase === 'blocked')}><Icon name="play" size={29} /></button>}
          </div>
          <div className="en-paper-stars" role="status"><AchievementStars count={3} earned={turns} variant="progress" /></div>
          <div className="en-paper-tools">
            {phase === 'try' ? <button className="en-text-button" onClick={() => controller.current?.showModel()}><Icon name={covered ? 'play' : 'redo'} size={19} />{covered ? 'Show me' : pictureOnly ? 'Look again' : 'Watch again'}</button>
              : phase === 'blocked' ? <button className="en-text-button" onClick={() => controller.current?.usePicture()}>Use picture guide <Icon name="arrow" size={18} /></button>
              : <span>{phase === 'ready' ? 'Watch. Then write on your paper.' : phase === 'watch' || phase === 'prompt' ? 'Watch the pencil move.' : phase === 'between' ? 'Take your time.' : ''}</span>}
          </div>
        </>}
      </div>
    </div>
    <div className="en-paper-return"><button className="en-text-button" onClick={() => leave(onBack)}><Icon name="back" size={17} /> Practice choices</button></div>
    <p className="en-sr-only" role="status">{state.notice}</p>
    <div className="en-word-dock en-paper-dock" aria-label="Your next action">
      {['try', 'watch', 'prompt'].includes(phase) && <button className="en-dock-audio" aria-label={phase !== 'try' || audio.playing ? 'Pause writing practice' : 'Hear the instructions'} onClick={() => phase !== 'try' || audio.playing ? controller.current?.pause() : controller.current?.repeatInstruction()}><Icon name={phase !== 'try' || audio.playing ? 'pause' : 'sound'} size={23} /></button>}
      {complete ? <button className="en-button en-next-topic" onClick={() => leave(onComplete)}>Next topic <span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button>
        : phase === 'try' ? <button className="en-button" onClick={() => controller.current?.finishTry()}><Icon name="check" size={22} /> I tried it</button>
        : phase === 'between' ? <button className="en-button" onClick={() => controller.current?.nextTry()}>One more <Icon name="arrow" size={22} /></button>
        : phase === 'paused' ? <button className="en-button" onClick={() => controller.current?.resume()}>Continue <Icon name="play" size={22} /></button>
        : phase === 'watch' ? <button className="en-button" disabled={!state.watched} onClick={() => controller.current?.tryNow()}>{state.watched ? 'My turn' : 'Watching…'} <Icon name="pencil" size={22} /></button>
        : <button className="en-button" disabled={phase === 'prompt'} onClick={() => void controller.current?.watch(phase === 'blocked')}><Icon name="play" size={22} />{phase === 'prompt' ? 'Watch…' : phase === 'blocked' ? 'Try video again' : 'Watch'}</button>}
    </div>
    <details className="en-word-support en-paper-parent" onToggle={event => { if (event.currentTarget.open) controller.current?.pause(); }} onKeyDown={event => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }}>
      <summary aria-label="For grown-ups"><Icon name="grownups" size={18} /><span>For grown-ups</span></summary>
      <p>Have paper and a pencil ready. Watch together, then let your child write one letter at their own pace. Help them find a comfortable hold. You can talk in your home language.</p>
      <p>Three short tries earn three stars. The final try invites writing without the model; Show me is always available and never costs a star. I tried it records participation, not handwriting accuracy. No photo or handwriting assessment is needed.</p>
      <p>No pencil today? Practice choices returns to finger tracing. Either option completes this writing topic. Watching or replaying a clip never counts as a writing try.</p>
    </details>
  </div>;
}
