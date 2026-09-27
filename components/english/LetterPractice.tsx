'use client';

import { useEffect, useRef, useState } from 'react';
import { Activity } from '@/lib/english-curriculum';
import LearningCompanion from './LearningCompanion';
import TracePad from './TracePad';
import useEnglishAudio from './useEnglishAudio';
import Icon from './Icons';

export default function LetterPractice({ activity, onComplete }: { activity: Activity; onComplete: () => void }) {
  const audio = useEnglishAudio();
  const [chosen, setChosen] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [tried, setTried] = useState(false);
  const letter = activity.letter || 's';
  const target = activity.uppercase ? letter.toUpperCase() : letter;
  const cases = activity.kind === 'cases';
  const writing = activity.kind === 'write';
  const done = cases ? chosen.length === 2 : chosen.length === 1;
  const prompt = activity.kind === 'sound' ? 'Listen. Try the sound.' : writing ? `Let's write ${target}.` : cases ? `Find ${letter.toUpperCase()} and ${letter}.` : `Find ${letter}.`;
  const cues = useRef(activity.kind === 'sound' || activity.kind === 'find'
    ? [{ id: `instruction-${activity.id}`, narration: activity.kind === 'sound' ? 'Try this sound.' : 'Find this sound.', optional: true }, { id: `sound-${letter}` }]
    : [{ id: `instruction-${activity.id}`, narration: writing ? `Let's write ${activity.uppercase ? 'big' : 'small'} ${letter}.` : `Find big ${letter} and small ${letter}.`, optional: true }]);
  const cancelOpening = useRef(() => {});
  const { sequence } = audio;
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const cancel = () => { clearTimeout(timer); document.removeEventListener('visibilitychange', visible); };
    const visible = () => {
      if (document.hidden) return;
      clearTimeout(timer);
      timer = setTimeout(() => { if (!document.hidden) { cancel(); void sequence(cues.current); } }, 0);
    };
    cancelOpening.current = cancel;
    document.addEventListener('visibilitychange', visible); visible();
    return cancel;
  }, [sequence]);
  const directions = () => { cancelOpening.current(); void sequence(cues.current); };
  const stop = () => { cancelOpening.current(); audio.stop(); };
  function choose(value: string) {
    cancelOpening.current();
    const correct = cases ? value.toLowerCase() === letter : value === letter;
    if (correct) { setChosen(old => [...new Set([...old, value])]); setFeedback('You found it!'); void audio.play(`sound-${letter}`); }
    else { setFeedback('Try again.'); void audio.play('review-retry'); }
  }
  function complete() { cancelOpening.current(); audio.stop(); onComplete(); }
  return <div className="en-guided-word en-letter-studio">
    <LearningCompanion title={feedback || prompt} speaking={audio.playing} reaction={`${chosen.length}-${tried}`} />
    {writing ? <TracePad letter={target} onComplete={complete} onListen={audio.playing ? stop : directions} speaking={audio.playing} needsListen={audio.blocked} /> : <>
      {activity.kind === 'sound' ? <div className="en-letter-sound-stage"><button className={`en-letter-sound-card ${audio.playing ? 'is-speaking' : ''}`} onClick={() => { cancelOpening.current(); void audio.play(`sound-${letter}`); setTried(true); }} aria-label={`Hear the ${letter} sound`}><strong>{letter}</strong><span><Icon name="sound" size={25} /></span></button><div className="en-read-dots" aria-label={tried ? 'Sound explored' : 'Tap to hear the sound'}><span className={tried ? 'is-done' : ''}>{tried ? <Icon name="check" size={20} /> : <Icon name="sound" size={18} />}</span></div></div> : <div className="en-letter-search-stage">
        {cases && <div className="en-case-pair" aria-label={`Look for ${letter.toUpperCase()} and ${letter}`}><span className={chosen.includes(letter.toUpperCase()) ? 'is-found' : ''}>{letter.toUpperCase()}</span><span className={chosen.includes(letter) ? 'is-found' : ''}>{letter}</span></div>}
        <div className={`en-find-letters ${cases ? 'en-case-grid' : ''}`}>{(cases ? [letter === 's' ? 'A' : 'S', letter, letter === 't' ? 'a' : 't', letter.toUpperCase()] : ['t', 's', 'a']).map(value => <button key={value} className={`en-letter-tile ${chosen.includes(value) ? 'is-correct' : ''}`} onClick={() => choose(value)} disabled={done || chosen.includes(value)} aria-label={`Choose ${value}`}>{value}{chosen.includes(value) && <Icon name="check" size={18} />}</button>)}</div>
      </div>}
      <p className="en-sr-only" role="status">{feedback}</p>
      <div className="en-word-dock" aria-label="Your next action"><button className={`en-dock-audio ${audio.playing ? 'is-playing' : ''}`} onClick={audio.playing ? stop : directions} aria-label={audio.playing ? 'Stop listening' : 'Hear the instructions'}><Icon name={audio.playing ? 'close' : 'sound'} size={23} /></button><button className="en-button" disabled={activity.kind === 'sound' ? !tried : !done} onClick={complete}>{activity.kind === 'sound' ? 'I tried it' : 'I found it'} <Icon name="check" size={21} /></button></div>
    </>}
    {audio.notice && <p className={writing ? "en-sr-only" : "en-audio-note"} role="status">{audio.notice}</p>}
  </div>;
}
