'use client';

import { useEffect, useRef, useState } from 'react';
import { createSoundPracticeSession, initialSoundPractice } from '@/lib/english-sound-practice';
import { englishSoundPracticeVideos, type Letter } from '@/lib/english-curriculum';
import { narrationCue } from '@/lib/english-narration';
import useEnglishAudio from './useEnglishAudio';
import LearningCompanion from './LearningCompanion';
import AchievementStars from './AchievementStars';
import Icon from './Icons';

export default function SoundPractice({ letter, suspended = false, onComplete }: { letter: Letter; suspended?: boolean; onComplete: () => void }) {
  const audio = useEnglishAudio();
  const { sequence, stop } = audio;
  const [state, setState] = useState(initialSoundPractice);
  const [tapMode, setTapMode] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const session = useRef<ReturnType<typeof createSoundPracticeSession> | null>(null);
  const pointer = useRef<number | null>(null);
  const key = useRef<string | null>(null);
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;
  const source = englishSoundPracticeVideos[letter];
  const { phase, turns, audioOnly, looping } = state;
  const canTry = phase === 'try' || phase === 'watch' || phase === 'holding';
  const holding = phase === 'holding';
  const complete = phase === 'complete';

  useEffect(() => {
    const controller = createSoundPracticeSession({
      say: id => sequence([narrationCue(id)]),
      sound: () => sequence([{ id: `sound-${letter}` }]),
      stopAudio: stop,
      pauseVideo: () => { if (video.current) { video.current.pause(); video.current.loop = false; } },
      playVideo: loop => {
        const player = video.current;
        if (!player) return Promise.reject(new Error('No video'));
        if (player.error) player.load();
        player.loop = loop;
        player.currentTime = 0;
        return player.play();
      },
      changed: setState,
    });
    session.current = controller;
    let entered = false;
    let timer: ReturnType<typeof setTimeout>;
    function visible() {
      clearTimeout(timer);
      if (document.hidden) { pointer.current = null; key.current = null; controller.pause(); }
      else if (!entered) timer = setTimeout(() => { if (!suspendedRef.current) { entered = true; void controller.watch(); } }, 0);
    }
    const leaving = () => { pointer.current = null; key.current = null; controller.pause(); };
    document.addEventListener('visibilitychange', visible); window.addEventListener('pagehide', leaving); visible();
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', visible); window.removeEventListener('pagehide', leaving); controller.dispose(); session.current = null; };
  }, [letter, sequence, stop]);

  useEffect(() => {
    if (suspended) { pointer.current = null; key.current = null; session.current?.pause(); }
  }, [suspended]);

  function cancelHold() { pointer.current = null; key.current = null; session.current?.cancelHold(); }
  function finish() { session.current?.pause(); onComplete(); }
  const title = complete ? 'You tried it!' : holding ? 'Your sound. Your pace.' : phase === 'between' ? 'A lovely try!' : phase === 'paused' ? 'Ready when you are.' : phase === 'blocked' ? 'Let’s try together.' : phase === 'try' ? 'Now you try.' : audioOnly ? 'Listen.' : turns ? 'Watch again.' : 'Watch.';

  return <div className={`en-guided-word en-sound-practice ${holding ? 'is-holding' : ''} ${complete ? 'is-complete' : ''}`}>
    <div className="en-sound-stage">
      <LearningCompanion title={title} speaking={audio.playing} reaction={`${turns}-${phase === 'holding'}`} />
      <div className="en-sound-experience">
        {complete ? <div className="en-sound-keepsake"><AchievementStars count={3} /><strong>{letter}</strong><span>Three little tries.</span></div> : <>
          <div className={`en-sound-circle ${phase === 'watch' || looping ? 'is-watching' : ''}`}>
            <div className="en-sound-circle-inner">
              <video ref={video} src={source.src} poster={source.poster} playsInline preload="none" aria-label={`A mouth showing how to make the ${letter} sound`} onEnded={() => session.current?.videoEnded()} onError={() => session.current?.videoFailed()} onWaiting={() => session.current?.videoWaiting()} onPlaying={() => session.current?.videoPlaying()} hidden={audioOnly} />
              {audioOnly && <strong className="en-sound-audio-letter">{letter}</strong>}
              {(phase === 'ready' || phase === 'blocked' || phase === 'paused') && <button className="en-sound-play-overlay" aria-label={phase === 'paused' ? 'Resume practice' : audioOnly ? 'Play the sound' : 'Play the mouth video'} onClick={() => phase === 'paused' ? session.current?.resume() : void session.current?.watch(true)}><Icon name="play" size={31} /></button>}
            </div>
            {!audioOnly && <span className="en-sound-letter-badge" aria-label={`Letter ${letter}`}>{letter}</span>}
          </div>
          <div className="en-sound-turns" role="status"><AchievementStars count={3} earned={turns} variant="progress" /></div>
          {phase === 'blocked' ? <button className="en-text-button en-sound-alternative" onClick={() => void session.current?.watch(true, true)}><Icon name="sound" size={17} /> Hear the sound instead</button> : <button className="en-text-button en-sound-alternative" disabled={holding} onClick={() => { cancelHold(); setTapMode(value => !value); }}>{tapMode ? 'Use press and hold' : 'Tap instead'}</button>}
        </>}
        <p className="en-sr-only" role="status">{state.notice}</p>
      </div>
    </div>
    <div className="en-word-dock en-sound-dock" aria-label="Your next action">
      {canTry ? <>
        <button className="en-dock-audio" aria-label={phase === 'watch' || looping || audio.playing ? 'Pause practice' : 'Watch the sound again'} disabled={holding} onClick={() => phase === 'watch' || looping || audio.playing ? session.current?.pause() : void session.current?.watch(true)}><Icon name={phase === 'watch' || looping || audio.playing ? 'pause' : 'redo'} size={23} /></button>
        <button className={`en-button en-sound-hold ${holding ? 'is-held' : ''}`} aria-pressed={holding} aria-label={tapMode ? holding ? 'Finish my turn' : 'Start my turn' : `Hold and say the ${letter} sound`}
          onPointerDown={event => {
            if (tapMode || pointer.current !== null || !event.isPrimary || event.button !== 0) return;
            event.preventDefault();
            if (session.current?.beginHold()) { pointer.current = event.pointerId; event.currentTarget.setPointerCapture(event.pointerId); }
          }}
          onPointerUp={event => { if (event.pointerId === pointer.current) { pointer.current = null; session.current?.endHold(); } }}
          onPointerCancel={event => { if (event.pointerId === pointer.current) cancelHold(); }}
          onLostPointerCapture={event => { if (event.pointerId === pointer.current) cancelHold(); }}
          onKeyDown={event => { if (!tapMode && [' ', 'Enter'].includes(event.key)) { event.preventDefault(); if (!event.repeat && key.current === null && session.current?.beginHold()) key.current = event.key; } }}
          onKeyUp={event => { if (!tapMode && event.key === key.current) { event.preventDefault(); key.current = null; session.current?.endHold(); } }}
          onBlur={cancelHold} onContextMenu={event => event.preventDefault()}
          onClick={event => { if (tapMode || (event.detail === 0 && key.current === null && pointer.current === null)) { if (session.current?.snapshot().phase === 'holding') session.current.endHold(); else session.current?.beginHold(); } }}>
          <Icon name={holding ? 'sound' : 'hand'} size={26} />{holding ? tapMode ? 'I’m done' : 'Let go when done' : tapMode ? 'My turn' : 'Hold and say'}
        </button>
      </> : complete ? <button className="en-button en-next-topic" onClick={finish}>Next topic <span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button> : phase === 'between' ? <button className="en-button" onClick={() => void session.current?.watch()}><Icon name="redo" size={22} />{audioOnly ? 'Listen again' : 'Watch again'}</button> : phase === 'paused' ? <button className="en-button" onClick={() => session.current?.resume()}><Icon name="play" size={22} /> Continue</button> : phase === 'prompt' ? <><button className="en-dock-audio" aria-label="Pause practice" onClick={() => session.current?.pause()}><Icon name="pause" /></button><button className="en-button" onClick={() => void session.current?.watch(true)}><Icon name="play" size={22} />{audioOnly ? 'Listen' : 'Watch'}</button></> : <button className="en-button" onClick={() => void session.current?.watch(true)}><Icon name="play" size={22} />{audioOnly ? 'Listen' : 'Watch'}</button>}
    </div>
    <details className="en-word-support en-sound-parent" onToggle={event => { if (event.currentTarget.open) session.current?.pause(); }} onKeyDown={event => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }}><summary aria-label="For grown-ups"><Icon name="grownups" size={18} /><span>For grown-ups</span></summary>
      <p>Watch the mouth once. After “Now you try,” the video and its sound repeat for as long as your child needs. Hold the button to stop the model and try the sound; release when ready. Tap instead offers a start/finish button. Keyboard users can hold Space or Enter.</p>
      <p>Each finished turn earns one star, with three stars for three tries. Watching again and pausing keep the earned stars. The app does not listen, record or judge pronunciation. Pause for conversation in your home language whenever helpful.</p>
      <p>When the video cannot play, Hear the sound instead uses the recorded phoneme. Opening audio: “Watch.” After the model: “Now you try.” Later turns: “Watch again.” and “Your turn.”</p>
      {complete && <button className="en-text-button" onClick={() => session.current?.restart()}><Icon name="redo" size={17} /> Practise again</button>}
    </details>
  </div>;
}
