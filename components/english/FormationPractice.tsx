'use client';

import { useEffect, useRef, useState } from 'react';
import { addHandwritingTry, handwritingVideos, handwritingInstruction, type HandwritingMode } from '@/lib/english-handwriting';
import TracePad from './TracePad';
import Icon from './Icons';
import ParentHelp from './ParentHelp';
import useEnglishAudio from './useEnglishAudio';

type Props = { letter: string; suspended: boolean; onComplete: (forms?: string[]) => void; invitation?: boolean; onTryForm?: (form: string) => void };

/** Optional motor practice. Watching or skipping never creates a writing try. */
export default function FormationPractice(props: Props) {
  return <FormationSession key={props.letter.toLowerCase()} {...props} />;
}

function FormationSession({ letter, suspended, onComplete, invitation = false, onTryForm }: Props) {
  const baseLetter = letter.toLowerCase();
  const [form, setForm] = useState(baseLetter);
  const [mode, setMode] = useState<HandwritingMode>('trace');
  const [tried, setTried] = useState<string[]>([]);
  const triedRef = useRef<string[]>([]);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [pauseToken, setPauseToken] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const videoRun = useRef(0);
  const audio = useEnglishAudio();
  const { stop, sequence } = audio;
  const source = handwritingVideos[form];
  const quiet = () => { videoRun.current++; stop(); video.current?.pause(); };
  const caseLabel = `${form === baseLetter ? 'small' : 'big'} ${form}`;

  useEffect(() => { if (suspended) { videoRun.current++; stop(); video.current?.pause(); } }, [suspended, stop]);
  useEffect(() => {
    const pause = () => { videoRun.current++; stop(); video.current?.pause(); };
    const hidden = () => { if (document.hidden) pause(); };
    document.addEventListener('visibilitychange', hidden); window.addEventListener('pagehide', pause);
    return () => { pause(); document.removeEventListener('visibilitychange', hidden); window.removeEventListener('pagehide', pause); };
  }, [stop]);

  function recordTry(nextForm = form) {
    const next = addHandwritingTry(triedRef.current, nextForm);
    if (next !== triedRef.current) onTryForm?.(nextForm);
    triedRef.current = next;
    setTried(triedRef.current);
    return triedRef.current;
  }
  function finish(forms = triedRef.current) { quiet(); onComplete([...forms]); }
  function selectForm(nextForm: string) { quiet(); setForm(nextForm); setVideoStarted(false); setVideoFailed(false); }
  function selectMode(nextMode: typeof mode) { quiet(); setMode(nextMode); setVideoStarted(false); setVideoFailed(false); }
  function instructions() {
    if (audio.playing) { stop(); return; }
    void sequence([{ id: `handwriting.${form}.${mode}.directions`, narration: handwritingInstruction(mode) }]);
  }
  async function playVideo() {
    if (suspended || !video.current) return;
    const token = ++videoRun.current;
    stop(); setVideoFailed(false);
    try { video.current.currentTime = 0; await video.current.play(); }
    catch { if (token === videoRun.current) { setVideoStarted(false); setVideoFailed(true); } }
  }

  return <div className="en-programme-activity en-handwriting" data-handwriting-form={form} data-handwriting-mode={mode}>
    <section className="en-programme-stage">
      <div className="en-handwriting-heading"><div className="en-handwriting-heading-row"><span className="en-hub-kicker">{invitation ? 'A LITTLE WRITING TURN' : 'WRITE IT YOUR WAY'}</span>{invitation && <button type="button" className="en-handwriting-skip" disabled={suspended} onClick={() => finish()}>Keep reading <Icon name="arrow" size={20} /></button>}</div><h1>Make {caseLabel}.</h1></div>
      <div className="en-handwriting-cases" aria-label="Choose a letter shape">{[baseLetter, baseLetter.toUpperCase()].map(shape => <button key={shape} type="button" aria-pressed={shape === form} disabled={suspended} onClick={() => selectForm(shape)}><strong>{shape}</strong><span>{shape === baseLetter ? 'Small' : 'Big'}</span>{tried.includes(shape) && <Icon name="check" size={18} />}</button>)}</div>
      <div className="en-handwriting-modes" aria-label="Choose how to practise">{(['trace', 'video', 'paper'] as const).map(item => <button key={item} type="button" aria-label={item === 'trace' ? 'Draw here' : item === 'video' ? 'Watch a hand' : 'Use paper'} aria-pressed={mode === item} disabled={suspended} onClick={() => selectMode(item)}><Icon name={item === 'video' ? 'play' : 'pencil'} size={19} />{item === 'trace' ? 'Draw' : item === 'video' ? 'Watch' : 'Paper'}</button>)}</div>
      {mode === 'trace' ? <TracePad key={form} letter={form} autoDemo pauseToken={pauseToken} suspended={suspended} speaking={audio.playing} showPaperAlternative={false} onTry={() => recordTry()} onComplete={marked => finish(marked ? recordTry() : triedRef.current)} onListen={instructions} onDemoStop={stop} onStrokeCue={(text, index) => sequence([{ id: `handwriting.${form}.stroke.${index + 1}`, narration: text }])} /> : <div className="en-handwriting-paper">
        <p>{mode === 'paper' ? 'Your paper. Your pencil. Have a try.' : 'Watch the hand. Then try it your way.'}</p>
        {source && <div className="en-handwriting-video"><video key={form} ref={video} src={source.src} poster={source.poster} controls playsInline preload="none" aria-label={`A hand showing how to write ${caseLabel}`} onPlay={() => { if (suspended) { video.current?.pause(); return; } stop(); setVideoStarted(true); }} onError={() => { setVideoStarted(false); setVideoFailed(true); }} />{!videoStarted && <button type="button" className="en-handwriting-video-cover" disabled={suspended} onClick={() => void playVideo()} aria-label={`Watch a hand write ${caseLabel}`}><strong>{form}</strong><span><Icon name="play" size={24} /> Watch a hand</span></button>}</div>}
        {videoFailed && <p className="en-notice" role="status">The video could not play. You can use the moving-dot guide or try on paper.</p>}
        <button type="button" className="en-text-button" disabled={suspended} onClick={() => void playVideo()}><Icon name="redo" size={19} /> Watch again</button>
        <div className="en-word-dock en-handwriting-paper-dock"><button type="button" className="en-dock-audio" disabled={suspended} onClick={instructions} aria-label={audio.playing ? 'Stop listening' : 'Hear instructions'}><Icon name={audio.playing ? 'close' : 'sound'} size={23} /></button>{mode === 'paper' ? <button type="button" className="en-button" disabled={suspended} onClick={() => finish(recordTry())}>I tried on paper <Icon name="check" size={20} /></button> : <button type="button" className="en-button" disabled={suspended} onClick={() => selectMode('paper')}>Try on paper <Icon name="pencil" size={20} /></button>}</div>
      </div>}
    </section>
    {!invitation && <div className="en-handwriting-exit"><button type="button" className="en-text-button" disabled={suspended} onClick={() => finish()}>Done for now <Icon name="arrow" size={20} /></button></div>}
    <ParentHelp kind="trace" onOpen={() => { quiet(); setPauseToken(token => token + 1); }}><p>Try either letter shape with a finger or a pencil. Watching is optional. Only making a mark or choosing “I tried on paper” records a writing try. It does not assess handwriting accuracy.</p><p>The moving dot and numbered steps show this guide’s stroke order. The completed hand videos are available for both shapes. You can stop and keep reading at any time.</p></ParentHelp>
  </div>;
}
