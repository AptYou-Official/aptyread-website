'use client';

import { useEffect, useRef, useState } from 'react';
import { createSoundPracticeSession, initialSoundPractice } from '@/lib/english-sound-practice';
import { englishSoundPracticeVideos, type Letter } from '@/lib/english-curriculum';
import { narrationCue } from '@/lib/english-narration';
import useEnglishAudio from './useEnglishAudio';
import LearningCompanion from './LearningCompanion';
import AchievementStars from './AchievementStars';
import ActivitySticker from './ActivitySticker';
import Icon from './Icons';

export default function SoundPractice({ letter, suspended = false, onComplete, nextTopic }: { letter: Letter; suspended?: boolean; onComplete: () => void; nextTopic?: string }) {
  const audio = useEnglishAudio();
  const { sequence, stop, play } = audio;
  const [state, setState] = useState(initialSoundPractice);
  const video = useRef<HTMLVideoElement>(null);
  const session = useRef<ReturnType<typeof createSoundPracticeSession> | null>(null);
  const previousTurns = useRef(0);
  const oneMorePlayed = useRef(false);
  const celebrationStarted = useRef(false);
  const rewardSound = useRef<Promise<boolean> | null>(null);
  const completionRun = useRef(0);
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;
  const source = englishSoundPracticeVideos[letter];
  const { phase, turns, audioOnly, looping } = state;
  const canTry = phase === 'try' || phase === 'watch';
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
      if (document.hidden) controller.pause();
      else if (!entered) timer = setTimeout(() => { if (!suspendedRef.current) { entered = true; void controller.watch(); } }, 0);
    }
    const leaving = () => { controller.pause(); };
    document.addEventListener('visibilitychange', visible); window.addEventListener('pagehide', leaving); visible();
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', visible); window.removeEventListener('pagehide', leaving); controller.dispose(); session.current = null; };
  }, [letter, sequence, stop]);

  useEffect(() => {
    if (suspended) session.current?.pause();
  }, [suspended]);

  // Each finished turn earns one star. After the first star, play the short
  // invitation in the same queue so the reward sound cannot be cancelled by
  // the following "One more." cue.
  useEffect(() => {
    if (turns === 0) {
      previousTurns.current = 0;
      oneMorePlayed.current = false;
      celebrationStarted.current = false;
      rewardSound.current = null;
      completionRun.current += 1;
      setCelebrating(false);
      return;
    }
    if (turns <= previousTurns.current) return;
    previousTurns.current = turns;
    if (turns === 1) {
      oneMorePlayed.current = true;
      rewardSound.current = sequence([{ id: 'sound-practice-star' }, narrationCue('practice-one-more')]);
    } else if (turns === 2) {
      rewardSound.current = play('sound-practice-star');
    }
  }, [play, sequence, turns]);

  // The second invitation belongs immediately after the first turn, rather
  // than being hidden inside the second CTA tap.
  useEffect(() => {
    if (phase === 'between' && turns === 1 && !oneMorePlayed.current) {
      oneMorePlayed.current = true;
      void sequence([narrationCue('practice-one-more')]);
    }
  }, [phase, sequence, turns]);

  // Let the child notice the second filled star before the larger reward takes
  // over. The celebration stays visible until the child chooses Next topic.
  useEffect(() => {
    if (phase !== 'complete' || turns !== 2 || celebrationStarted.current) return;
    celebrationStarted.current = true;
    const run = completionRun.current;
    void (rewardSound.current || Promise.resolve(true)).then(() => {
      if (run !== completionRun.current) return;
      celebrationTimer.current = setTimeout(() => {
        if (run !== completionRun.current) return;
        setCelebrating(true);
        void play('sound-practice-complete');
      }, 450);
    });
  }, [phase, play, turns]);

  useEffect(() => () => {
    if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
  }, []);

  function finish() {
    if (!celebrating) return;
    onCompleteRef.current();
  }

  function startTapTurn() {
    session.current?.startTurn();
  }
  const title = celebrating ? 'Sound explorer!' : complete ? 'All done!' : holding ? 'Your turn.' : phase === 'between' ? 'One more.' : phase === 'paused' ? 'Ready?' : phase === 'blocked' ? 'Let’s try together.' : phase === 'try' ? 'Your turn.' : audioOnly ? 'Listen.' : turns ? 'Watch again.' : 'Watch.';

  return <div className={`en-guided-word en-sound-practice ${holding ? 'is-holding' : ''} ${complete ? 'is-complete' : ''}`}>
    <div className="en-sound-stage">
      <LearningCompanion title={title} speaking={audio.playing} reaction={`${turns}-${phase === 'holding'}`} />
      <div className="en-sound-experience">
        {complete && celebrating ? <ActivitySticker kind="sound" title="Sound explorer!" detail={`You explored the ${letter} sound.`} sticker={`${letter} ♪`} /> : complete ? <ActivitySticker kind="sound" compact title="Sound explorer!" detail={`You explored the ${letter} sound.`} sticker={`${letter} ♪`} /> : <>
          <div className={`en-sound-circle ${phase === 'watch' || looping ? 'is-watching' : ''}`}>
            <div className="en-sound-circle-inner">
              <video ref={video} src={source.src} poster={source.poster} playsInline preload="none" aria-label={`A mouth showing how to make the ${letter} sound`} onEnded={() => session.current?.videoEnded()} onError={() => session.current?.videoFailed()} onWaiting={() => session.current?.videoWaiting()} onPlaying={() => session.current?.videoPlaying()} hidden={audioOnly} />
              {audioOnly && <strong className="en-sound-audio-letter">{letter}</strong>}
              {(phase === 'ready' || phase === 'blocked' || phase === 'paused') && <button className="en-sound-play-overlay" aria-label={phase === 'paused' ? 'Resume practice' : audioOnly ? 'Play the sound' : 'Play the mouth video'} onClick={() => phase === 'paused' ? session.current?.resume() : void session.current?.watch(true)}><Icon name="play" size={31} /></button>}
            </div>
            {!audioOnly && <span className="en-sound-letter-badge" aria-label={`Letter ${letter}`}>{letter}</span>}
          </div>
          <div className="en-sound-turns" role="status"><AchievementStars count={2} earned={turns} variant="progress" /></div>
          {phase === 'blocked' && <button className="en-text-button en-sound-alternative" onClick={() => void session.current?.watch(true, true)}><Icon name="sound" size={17} /> Hear the sound instead</button>}
        </>}
        <p className="en-sr-only" role="status">{state.notice}</p>
      </div>
    </div>
    <div className="en-word-dock en-sound-dock" aria-label="Your next action">
      {holding && <div className="en-sound-turn-state" role="status" aria-label={`Your turn to make the ${letter} sound`}><span className="en-sound-turn-icon"><Icon name="sound" size={24} /></span><strong>{letter}</strong><span className="en-sound-turn-pulse" aria-hidden="true" /></div>}
      {!holding && canTry && <><button className="en-dock-audio" aria-label={phase === 'watch' || looping || audio.playing ? 'Pause practice' : 'Hear the sound again'} onClick={() => phase === 'watch' || looping || audio.playing ? session.current?.pause() : void session.current?.watch(true)}><Icon name={phase === 'watch' || looping || audio.playing ? 'pause' : 'redo'} size={23} /></button><button className="en-button en-sound-tap-cta" aria-label={`Tap to try the ${letter} sound`} onClick={() => startTapTurn()}><Icon name="hand" size={28} /><strong>{letter}</strong><span className="en-sound-tap-dots" aria-hidden="true">{turns === 0 ? '○ ○' : '● ○'}</span></button></>}
      {!holding && complete && !celebrating && <div className="en-sound-auto-advance" role="status" aria-label="Apty is celebrating"><span className="en-sound-auto-advance-dots" aria-hidden="true"><i /><i /><i /></span></div>}
      {!holding && celebrating && <button className="en-button en-next-topic" onClick={finish}><span className="en-next-topic-copy"><small>Next topic</small><strong>{nextTopic || 'Keep going'}</strong></span><span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button>}
      {!holding && phase === 'between' && <><button className="en-dock-audio" aria-label="Hear the sound again" onClick={() => void session.current?.watch()}><Icon name="redo" size={23} /></button><button className="en-button en-sound-tap-cta is-next-turn" aria-label={`Tap to try the ${letter} sound again`} onClick={startTapTurn}><Icon name="sound" size={28} /><strong>{letter}</strong><span className="en-sound-tap-dots" aria-hidden="true">● ○</span></button></>}
      {!holding && phase === 'paused' && <button className="en-button" onClick={() => session.current?.resume()}><Icon name="play" size={22} /> Continue</button>}
      {!holding && phase === 'prompt' && <><button className="en-dock-audio" aria-label="Pause practice" onClick={() => session.current?.pause()}><Icon name="pause" /></button><button className="en-button" onClick={() => void session.current?.watch(true)}><Icon name="play" size={22} />{audioOnly ? 'Listen' : 'Watch'}</button></>}
      {!holding && !canTry && !complete && !['between', 'paused', 'prompt'].includes(phase) && <button className="en-button" onClick={() => void session.current?.watch(true)}><Icon name="play" size={22} />{audioOnly ? 'Listen' : 'Watch'}</button>}
    </div>
    <details className="en-word-support en-sound-parent" onToggle={event => { if (event.currentTarget.open) session.current?.pause(); }} onKeyDown={event => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }}><summary aria-label="For grown-ups"><Icon name="grownups" size={18} /><span>For grown-ups</span></summary>
      <p>When Apty says “Your turn,” your child taps the hand button and makes the sound. The app gives a short turn, then offers one more tap. Watching or hearing the model again is always optional.</p>
      <p>Each finished turn helps your child practise. The sticker celebrates participation; the app does not listen, record or judge pronunciation. Pause for conversation in your home language whenever helpful.</p>
      <p>When the video cannot play, Hear the sound instead uses the recorded phoneme. Apty gives the spoken cue, then the hand button starts the child’s turn.</p>
      {complete && <button className="en-text-button" onClick={() => session.current?.restart()}><Icon name="redo" size={17} /> Practise again</button>}
    </details>
  </div>;
}
