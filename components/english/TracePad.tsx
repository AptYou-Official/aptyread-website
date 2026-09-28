'use client';

import { useEffect, useRef, useState } from 'react';
import tracing from '@/lib/english-tracing.json';
import Icon from './Icons';

type Point = { x: number; y: number };
type TraceGuide = { path: string; transform: string; start: number[]; midline?: number };
export default function TracePad({ letter, onComplete, onListen, speaking = false, needsListen = false, showPaperAlternative = true, suspended = false }: { letter: string; onComplete: () => void; onListen: () => void; speaking?: boolean; needsListen?: boolean; showPaperAlternative?: boolean; suspended?: boolean }) {
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [demoRun, setDemoRun] = useState(0);
  const [demoStroke, setDemoStroke] = useState(0);
  const activePointer = useRef<number | null>(null);
  const guide: TraceGuide | undefined = tracing[letter as keyof typeof tracing];
  const paths = guide?.path.match(/M[^M]+/g) || [];
  const activeStart = paths[demoStroke]?.match(/^M\s*([\d.-]+)[\s,]+([\d.-]+)/);
  useEffect(() => {
    setDemoStroke(0);
    if (!demoRun || suspended || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timers = Array.from({ length: paths.length }, (_, index) => setTimeout(() => setDemoStroke(index), index * 2200));
    timers.push(setTimeout(() => setDemoStroke(0), paths.length * 2200));
    return () => timers.forEach(clearTimeout);
  }, [demoRun, paths.length, suspended]);
  useEffect(() => { if (suspended) setDemoRun(0); }, [suspended]);
  useEffect(() => {
    const hidden = () => { if (document.hidden) setDemoRun(0); };
    document.addEventListener('visibilitychange', hidden);
    return () => document.removeEventListener('visibilitychange', hidden);
  }, []);
  function point(event: React.PointerEvent<SVGSVGElement>) {
    // Keep drawing under the finger, including when the SVG is resized.
    const matrix = event.currentTarget.getScreenCTM();
    if (matrix) return new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * 500 / rect.width, y: (event.clientY - rect.top) * 330 / rect.height };
  }
  function finish(event: React.PointerEvent<SVGSVGElement>) {
    if (event.pointerId === activePointer.current) activePointer.current = null;
  }
  return <div className="en-trace">
    <div className="en-trace-toolbar"><button className="en-trace-listen" onClick={onListen} aria-label={speaking ? 'Stop listening' : 'Hear the instructions'}><Icon name={speaking ? 'close' : 'sound'} size={20} /></button><span>{needsListen ? 'Tap to listen.' : guide ? 'Start at the dot.' : 'Trace with your finger.'}</span>{guide && <button className="en-trace-demo-button" onClick={() => setDemoRun(run => run + 1)}><Icon name={demoRun ? 'redo' : 'play'} size={17} />{demoRun ? 'Show again' : 'Show me'}</button>}</div>
    <svg viewBox="0 0 500 330" className="en-trace-pad" role="img" aria-label={`Writing practice for ${letter}. Draw with a finger or pointer; paper practice is also available.`}
      onPointerDown={event => {
        if (activePointer.current !== null || event.button !== 0 || !event.isPrimary) return;
        event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); activePointer.current = event.pointerId;
        setDemoRun(0); const p = point(event); setStrokes(old => [...old, [p]]);
      }}
      onPointerMove={event => {
        if (event.pointerId !== activePointer.current) return;
        const p = point(event); setStrokes(old => old.length ? [...old.slice(0, -1), [...old[old.length - 1], p]] : old);
      }} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish}>
      <path d="M24 35h452M24 285h452" stroke="var(--en-line)" strokeWidth="2" /><path d={`M24 ${guide?.midline || 111}h452`} stroke="var(--en-line)" strokeWidth="2" strokeDasharray="8 8" />
      {guide ? <g transform={guide.transform} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={guide.path} stroke="#E8F3F5" strokeWidth="9" />
        <path d={guide.path} stroke="#759AAE" strokeWidth="1.6" strokeDasharray=".5 3.5" />
        {demoRun > 0 && paths.map((path, index) => <path key={`${demoRun}-${index}`} d={path} pathLength="100" className="en-trace-demo" style={{ animationDuration: '2s', animationDelay: `${index * 2.2}s` }} stroke="var(--en-action)" strokeWidth="4" />)}
        <circle cx={activeStart ? Number(activeStart[1]) : guide.start[0]} cy={activeStart ? Number(activeStart[2]) : guide.start[1]} r="3.7" fill="var(--en-action)" stroke="#FFF" strokeWidth="1.2" />
      </g> : <text x="250" y="275" textAnchor="middle" className="en-trace-letter">{letter}</text>}
      {strokes.map((stroke, i) => stroke.length === 1 ? <circle key={i} cx={stroke[0].x} cy={stroke[0].y} r="6.5" fill="var(--en-ink)" /> : <polyline key={i} points={stroke.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="var(--en-ink)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
    <div className="en-word-dock en-trace-actions" aria-label="Your next action"><button className="en-dock-audio" aria-label="Clear my marks" disabled={!strokes.length && !demoRun} onClick={() => { setStrokes([]); setDemoRun(0); }}><Icon name="redo" size={23} /></button><button className="en-button" onClick={onComplete}>I practised <Icon name="check" size={19} /></button></div>
    {showPaperAlternative && <details className="en-trace-help"><summary>Practise on paper</summary><p>You can write on paper, too. Tap I practised when you are ready. This is free practice without scoring.</p></details>}
  </div>;
}
