'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import tracing from '@/lib/english-tracing.json';
import { handwritingStrokes } from '@/lib/english-handwriting';
import Icon from './Icons';

type Point = { x: number; y: number };
type TraceGuide = { path: string; transform: string; start: number[]; starts?: number[][]; midline?: number; baseline?: number; descender?: number };
type Guidance = 'start' | 'path' | null;
type GuideMetrics = { starts: Point[]; bounds: { left: number; right: number; top: number; bottom: number } };

function guideMetrics(guide: TraceGuide | undefined): GuideMetrics | null {
  if (!guide) return null;
  const values = guide.transform.match(/-?\d*\.?\d+/g)?.map(Number) || [];
  const [translateX = 0, translateY = 0, scaleX = 1, scaleY = scaleX] = values;
  const localValues = guide.path.match(/-?\d*\.?\d+/g)?.map(Number) || [];
  const points = [];
  for (let index = 0; index < localValues.length - 1; index += 2) points.push({ x: translateX + localValues[index] * scaleX, y: translateY + localValues[index + 1] * scaleY });
  const transformedStart = { x: translateX + guide.start[0] * scaleX, y: translateY + guide.start[1] * scaleY };
  // Each authored stroke is a valid place to put the pencil down. In particular,
  // A's crossbar and T's second stroke must not receive a false start warning.
  const starts = (guide.starts || Array.from(guide.path.matchAll(/M\s*([\d.-]+)[\s,]+([\d.-]+)/g), match => [Number(match[1]), Number(match[2])]))
    .map(([x, y]) => ({ x: translateX + x * scaleX, y: translateY + y * scaleY }));
  if (!points.length) points.push(transformedStart);
  const xs = points.map(point => point.x), ys = points.map(point => point.y);
  return { starts: starts.length ? starts : [transformedStart], bounds: { left: Math.min(...xs) - 42, right: Math.max(...xs) + 42, top: Math.min(...ys) - 42, bottom: Math.max(...ys) + 42 } };
}

function distance(a: Point, b: Point) { return Math.hypot(a.x - b.x, a.y - b.y); }

export default function TracePad({ letter, onComplete, onListen, speaking = false, needsListen = false, showPaperAlternative = true, suspended = false, autoDemo = false, pauseToken = 0, onTry, onStrokeCue, onDemoStop }: { letter: string; onComplete: (tried?: boolean) => void; onListen: () => void; speaking?: boolean; needsListen?: boolean; showPaperAlternative?: boolean; suspended?: boolean; autoDemo?: boolean; pauseToken?: number; onTry?: () => void; onStrokeCue?: (text: string, index: number) => void | Promise<unknown>; onDemoStop?: () => void }) {
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [demoRun, setDemoRun] = useState(0);
  const [demoStroke, setDemoStroke] = useState(0);
  const [guidance, setGuidance] = useState<Guidance>(null);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [lifting, setLifting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const demonstrationPaths = useRef<(SVGPathElement | null)[]>([]);
  const movingDot = useRef<SVGCircleElement>(null);
  const cancelDemonstration = useRef<() => void>(() => {});
  const autoDemoTimer = useRef<ReturnType<typeof setTimeout>>();
  const seenPauseToken = useRef(pauseToken);
  const demoCallbacks = useRef({ onStrokeCue, onDemoStop });
  demoCallbacks.current = { onStrokeCue, onDemoStop };
  const activePointer = useRef<number | null>(null);
  const startedNearDot = useRef(false);
  const guidanceTimer = useRef<ReturnType<typeof setTimeout>>();
  const scratchContext = useRef<AudioContext | null>(null);
  const guide: TraceGuide | undefined = tracing[letter as keyof typeof tracing];
  const metrics = useMemo(() => guideMetrics(guide), [guide]);
  const paths = guide?.path.match(/M[^M]+/g) || [];
  const strokeSteps = handwritingStrokes(letter);
  const activeStart = paths[demoStroke]?.match(/^M\s*([\d.-]+)[\s,]+([\d.-]+)/);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync(); media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    if (!autoDemo || suspended) return;
    autoDemoTimer.current = setTimeout(() => { if (!document.hidden) setDemoRun(run => run + 1); }, 160);
    return () => clearTimeout(autoDemoTimer.current);
    // An invitation demonstrates once; closing a menu never restarts it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDemo, letter]);
  useEffect(() => {
    setDemoStroke(0);
    setLifting(false); setDemoPlaying(false);
    if (!demoRun || suspended || reducedMotion || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false, frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let voiceTimer: ReturnType<typeof setTimeout> | undefined;
    let releaseWait: (() => void) | undefined;
    let releaseVoice: (() => void) | undefined;
    const cancel = () => { if (cancelled) return; cancelled = true; cancelAnimationFrame(frame); clearTimeout(timer); clearTimeout(voiceTimer); releaseWait?.(); releaseVoice?.(); demoCallbacks.current.onDemoStop?.(); };
    cancelDemonstration.current = cancel;
    const wait = (duration: number) => new Promise<void>(resolve => { releaseWait = resolve; timer = setTimeout(resolve, duration); });
    const move = (path: SVGPathElement) => new Promise<void>(resolve => {
      releaseWait = resolve;
      const length = path.getTotalLength();
      let started: number | undefined;
      const tick = (now: number) => {
        if (cancelled) { resolve(); return; }
        started ??= now;
        const progress = Math.min(1, (now - started) / 1800);
        path.style.strokeDashoffset = String(100 * (1 - progress));
        const point = path.getPointAtLength(length * progress);
        movingDot.current?.setAttribute('cx', String(point.x)); movingDot.current?.setAttribute('cy', String(point.y));
        if (progress < 1) frame = requestAnimationFrame(tick); else resolve();
      };
      frame = requestAnimationFrame(tick);
    });
    setDemoPlaying(true);
    void (async () => {
      for (let index = 0; index < strokeSteps.length && !cancelled; index++) {
        setDemoStroke(index); setLifting(false);
        const path = demonstrationPaths.current[index];
        if (!path) continue;
        const [x, y] = strokeSteps[index].start;
        movingDot.current?.setAttribute('cx', String(x)); movingDot.current?.setAttribute('cy', String(y));
        // The cue and moving tip describe the same stroke. Wait for both before
        // the next lift, so slower voices do not get cut off or overlap.
        const voice = new Promise<void>(resolve => { releaseVoice = resolve; voiceTimer = setTimeout(resolve, 8000); Promise.resolve(demoCallbacks.current.onStrokeCue?.(strokeSteps[index].narration, index)).then(() => resolve(), () => resolve()); });
        await Promise.all([move(path), voice]);
        clearTimeout(voiceTimer);
        if (cancelled) break;
        if (index + 1 < strokeSteps.length) { setLifting(true); await wait(380); }
      }
      if (!cancelled) { setDemoPlaying(false); setLifting(false); }
    })();
    return cancel;
    // Path/cue content is fixed for a letter; callbacks use the current ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoRun, letter, suspended, reducedMotion]);
  useEffect(() => { if (suspended) { clearTimeout(autoDemoTimer.current); cancelDemonstration.current(); setDemoRun(0); activePointer.current = null; clearTimeout(guidanceTimer.current); setGuidance(null); } }, [suspended]);
  useEffect(() => { if (pauseToken !== seenPauseToken.current) { seenPauseToken.current = pauseToken; clearTimeout(autoDemoTimer.current); cancelDemonstration.current(); setDemoRun(0); activePointer.current = null; } }, [pauseToken]);
  useEffect(() => { setStrokes([]); setDemoRun(0); setDemoStroke(0); setGuidance(null); activePointer.current = null; clearTimeout(guidanceTimer.current); }, [letter]);
  useEffect(() => {
    const hidden = () => { if (document.hidden) { clearTimeout(autoDemoTimer.current); cancelDemonstration.current(); setDemoRun(0); activePointer.current = null; clearTimeout(guidanceTimer.current); setGuidance(null); } };
    document.addEventListener('visibilitychange', hidden);
    return () => document.removeEventListener('visibilitychange', hidden);
  }, []);
  useEffect(() => () => { clearTimeout(guidanceTimer.current); void scratchContext.current?.close(); scratchContext.current = null; }, []);
  function showGuidance(next: Exclude<Guidance, null>) {
    clearTimeout(guidanceTimer.current);
    setGuidance(next);
    guidanceTimer.current = setTimeout(() => setGuidance(null), 2400);
  }
  function playPencilScratch() {
    if (typeof window === 'undefined') return;
    const AudioContextConstructor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return;
    const context = scratchContext.current || (scratchContext.current = new AudioContextConstructor());
    if (context.state === 'suspended') void context.resume();
    const length = Math.floor(context.sampleRate * 0.075);
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index++) data[index] = (Math.random() * 2 - 1) * (1 - index / length);
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    source.buffer = buffer; filter.type = 'bandpass'; filter.frequency.value = 1150; filter.Q.value = 0.7;
    gain.gain.setValueAtTime(0.0001, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.012); gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.075);
    source.connect(filter).connect(gain).connect(context.destination); source.start(); source.stop(context.currentTime + 0.08);
  }
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
  function stopDemo() { clearTimeout(autoDemoTimer.current); cancelDemonstration.current(); setDemoRun(0); setDemoPlaying(false); setLifting(false); }
  return <div className="en-trace">
    <div className="en-trace-toolbar"><button className="en-trace-listen" disabled={suspended} onClick={() => { stopDemo(); onListen(); }} aria-label={speaking ? 'Stop listening' : 'Hear the instructions'}><Icon name={speaking ? 'close' : 'sound'} size={20} /></button><span>{needsListen ? 'Tap to listen.' : guide ? 'Start at a numbered dot.' : 'Trace with your finger.'}</span>{guide && <button className="en-trace-demo-button" disabled={suspended} onClick={() => { clearTimeout(autoDemoTimer.current); cancelDemonstration.current(); setDemoRun(run => run + 1); }}><Icon name={demoRun ? 'redo' : 'play'} size={17} />{demoRun ? 'Show again' : 'Show me'}</button>}</div>
    {guide && <p className="en-handwriting-cue" aria-live="polite">{demoPlaying ? lifting ? 'Lift. Find the next dot.' : `${demoStroke + 1}. ${strokeSteps[demoStroke]?.cue || 'Follow the moving dot.'}` : demoRun ? 'Your turn. Try it your way.' : 'Watch the dot. Then have a try.'}</p>}
    <svg viewBox="0 0 500 330" className={`en-trace-pad ${guidance ? `is-guiding-${guidance}` : ''}`} role="img" aria-label={`Writing practice for ${letter}. Draw with a finger or pointer; paper practice is also available.`}
      onPointerDown={event => {
        if (suspended || activePointer.current !== null || event.button !== 0 || !event.isPrimary) return;
        event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); activePointer.current = event.pointerId;
        stopDemo(); onTry?.(); playPencilScratch(); const p = point(event); startedNearDot.current = !metrics || metrics.starts.some(start => distance(p, start) <= 58);
        if (metrics && !startedNearDot.current) showGuidance('start'); else { clearTimeout(guidanceTimer.current); setGuidance(null); }
        setStrokes(old => [...old, [p]]);
      }}
      onPointerMove={event => {
        if (event.pointerId !== activePointer.current) return;
        const p = point(event);
        if (metrics && startedNearDot.current && (p.x < metrics.bounds.left || p.x > metrics.bounds.right || p.y < metrics.bounds.top || p.y > metrics.bounds.bottom)) showGuidance('path');
        setStrokes(old => old.length ? [...old.slice(0, -1), [...old[old.length - 1], p]] : old);
      }} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish}>
      <path d={`M24 35h452M24 ${guide?.baseline || 285}h452`} stroke="var(--en-line)" strokeWidth="2" /><path d={`M24 ${guide?.midline || 111}h452`} stroke="var(--en-line)" strokeWidth="2" strokeDasharray="8 8" />
      {guide?.descender && <path d={`M24 ${guide.descender}h452`} stroke="var(--en-line)" strokeWidth="2" />}
      {guide ? <g transform={guide.transform} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={guide.path} stroke="#E8F3F5" strokeWidth="9" />
        <path d={guide.path} stroke="#759AAE" strokeWidth="1.6" strokeDasharray=".5 3.5" />
        {demoRun > 0 && paths.map((path, index) => <path ref={node => { demonstrationPaths.current[index] = node; }} key={`${demoRun}-${index}`} d={path} pathLength="100" className="en-handwriting-stroke" style={{ strokeDasharray: 100, strokeDashoffset: reducedMotion ? 0 : 100 }} stroke="var(--en-action)" strokeWidth="4" />)}
        {(guide.starts || [guide.start]).map(([x, y], index, starts) => {
          if (starts.findIndex(([sx, sy]) => sx === x && sy === y) !== index) return null;
          const numbers = starts.flatMap(([sx, sy], i) => sx === x && sy === y ? [i + 1] : []);
          return <g key={index} className="en-handwriting-start"><circle cx={x} cy={y} r="4.2" fill="var(--en-action)" stroke="#FFF" strokeWidth="1.1" /><text x={x - 7} y={y - 3} textAnchor="end" stroke="#FFF" strokeWidth="1.7" paintOrder="stroke" fill="var(--en-ink)" fontSize="6.3" fontWeight="700">{numbers.join(',')}</text></g>;
        })}
        {demoPlaying && <circle ref={movingDot} className="en-handwriting-moving-dot" cx={activeStart ? Number(activeStart[1]) : guide.start[0]} cy={activeStart ? Number(activeStart[2]) : guide.start[1]} r="4.5" fill="#FFC65A" stroke="#654E1E" strokeWidth="1" opacity={lifting ? .35 : 1} />}
      </g> : <text x="250" y="275" textAnchor="middle" className="en-trace-letter">{letter}</text>}
      {strokes.map((stroke, i) => stroke.length === 1 ? <circle key={i} cx={stroke[0].x} cy={stroke[0].y} r="6.5" fill="var(--en-ink)" /> : <polyline key={i} points={stroke.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="var(--en-ink)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
    {guidance && <div className="en-trace-guidance" role="status"><Icon name="hand" size={18} /><span>{guidance === 'start' ? paths.length > 1 ? 'Start at one of the dots.' : 'Start at the dot.' : 'Follow the dots.'}</span></div>}
    {guide && <details className="en-handwriting-steps" open={reducedMotion}><summary>Stroke steps</summary><ol>{strokeSteps.map(step => <li key={step.number}><span>{step.number > 1 ? 'Lift. ' : ''}{step.cue}</span>{onStrokeCue && <button type="button" className="en-handwriting-step-audio" aria-label={`Hear stroke ${step.number}`} disabled={suspended} onClick={() => { stopDemo(); void onStrokeCue(step.narration, step.number - 1); }}><Icon name="sound" size={17} /></button>}</li>)}</ol></details>}
    <div className="en-word-dock en-trace-actions" aria-label="Your next action"><button className="en-trace-clear" aria-label="Clear my marks" disabled={suspended || (!strokes.length && !demoRun)} onClick={() => { setStrokes([]); stopDemo(); clearTimeout(guidanceTimer.current); setGuidance(null); }}><Icon name="redo" size={19} /><span>Clear</span></button><button className="en-button" disabled={suspended} onClick={() => { stopDemo(); onComplete(strokes.some(stroke => stroke.length > 0)); }}>Done <Icon name="check" size={19} /></button></div>
    {showPaperAlternative && <details className="en-trace-help" translate="yes"><summary>Practise on paper</summary><p>You can write on paper, too. Tap Done when you are ready. This is free practice without scoring.</p></details>}
  </div>;
}
