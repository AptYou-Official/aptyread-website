'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { HillScene, Icon, MalayalamBrand } from './Shared';
import InstallApp from './InstallApp';
import ConnectionNotice from './ConnectionNotice';

const STORAGE_KEY = 'apty.malayalam.preview.v1';
const episodes = [
  { title: 'തറ', description: 'Our first word', forms: ['റ', 'ത', 'തറ'], tiles: ['ത', 'റ'], icon: 'floor' as const, colour: 'floor' },
  { title: 'തല', description: 'A new letter joins in', forms: ['ല', 'തല'], tiles: ['ത', 'ല'], icon: 'head' as const, colour: 'head' },
  { title: 'മല', description: 'A little word adventure', forms: ['മ', 'മല'], tiles: ['മ', 'ല'], icon: 'hill' as const, colour: 'hill' },
];

type Position = { episode: number; step: number };
function validPosition(value: unknown): value is Position {
  if (!value || typeof value !== 'object') return false;
  const { episode, step } = value as Position;
  return Number.isInteger(episode) && episode >= 0 && episode < episodes.length && Number.isInteger(step) && step >= 0 && step < episodes[episode].forms.length;
}

export default function ChildDashboard() {
  const [position, setPosition] = useState<Position>({ episode: 0, step: 0 });
  const [hasSaved, setHasSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [tab, setTab] = useState<'path' | 'words'>('path');
  const [open, setOpen] = useState(false);
  const [built, setBuilt] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const episode = episodes[position.episode];
  const isWord = position.step === episode.forms.length - 1;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // A malformed preview record should not disable otherwise working storage.
        try {
          const saved: unknown = JSON.parse(raw);
          if (validPosition(saved)) { setPosition(saved); setHasSaved(true); }
        } catch { /* Start a fresh preview; replace this record on the next visit. */ }
      }
    } catch { setStorageAvailable(false); }
    setReady(true);
  }, []);

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    if (!open && dialog.current?.open) dialog.current?.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function save(next: Position) {
    setPosition(next); setHasSaved(true); setBuilt([]); setFeedback('');
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setStorageAvailable(true); }
    catch { setStorageAvailable(false); }
  }
  function start(index?: number) {
    trigger.current = document.activeElement as HTMLElement;
    save(index === undefined ? position : { episode: index, step: 0 });
    setOpen(true);
  }
  function finish() {
    setOpen(false);
    trigger.current?.focus();
  }
  function chooseTile(tile: string) {
    if (built.length >= 2) return;
    const next = [...built, tile];
    setBuilt(next);
    setFeedback(next.length === 2 ? (next.join('') === episode.title ? 'You matched the word.' : 'Take another look at the model. You can try again.') : '');
  }

  return <div className="ml-dashboard">
    <a className="ml-skip" href="#child-main">Skip to learning path</a>
    <aside className="ml-sidebar">
      <MalayalamBrand compact />
      <nav aria-label="Learning area"><button onClick={() => setTab('path')} aria-current={tab === 'path' ? 'page' : undefined}><Icon name="home" /><span lang="ml">എന്റെ വഴി</span><small>My path</small></button><button onClick={() => setTab('words')} aria-current={tab === 'words' ? 'page' : undefined}><Icon name="book" /><span lang="ml">വാക്കുകൾ</span><small>Word corner</small></button></nav>
      <div className="ml-sidebar-bottom"><Image src="/images/apty-mascot.png" width={110} height={110} alt="" /><p>A little discovery<br />at your own pace.</p><a href="/malayalam">About the programme <Icon name="arrow" size={16} /></a></div>
    </aside>
    <div className="ml-dashboard-body">
      <header className="ml-dash-header"><a href="/malayalam" className="ml-mobile-brand">Apty<span>Malayalam</span></a><span className="ml-dash-breadcrumb">MY LEARNING SPACE <span>/</span> MALAYALAM</span><span className="ml-preview-badge"><span /> Early preview</span></header>
      <main id="child-main" className="ml-dash-main">
        <ConnectionNotice />
        <section className="ml-dash-welcome"><div><span className="ml-eyebrow">A LITTLE ADVENTURE WITH APTY</span><h1 lang="ml">നമുക്ക് വായിക്കാം!</h1><p>Little steps. Lovely discoveries.</p></div><div className="ml-welcome-sun"><Icon name="sun" size={42} /></div></section>
        {tab === 'path' ? <>
          <section className="ml-next-card" aria-labelledby="next-title"><div className="ml-next-copy"><span className="ml-mini-label">LEVEL 1 · FIRST WORDS</span><h2 id="next-title" lang="ml">{hasSaved ? 'വീണ്ടും നോക്കാം!' : 'ആദ്യ ചുവട്'}</h2><p>{hasSaved ? 'Your preview is right where you left it.' : 'Meet a letter. Discover a word.'}</p><button className="ml-btn ml-btn-large" onClick={() => start()} disabled={!ready}><span lang="ml">{hasSaved ? 'തുടരാം' : 'തുടങ്ങാം'}</span><Icon name="arrow" /></button><small>{hasSaved ? `Continue preview ${position.episode + 1}` : 'Start the first preview'}</small></div><div className="ml-next-art"><span className="ml-floating-letter" lang="ml">{episode.forms[position.step]}</span><Image src="/images/apty-mascot.png" width={260} height={260} alt="Apty is ready to explore with you" priority /><span className="ml-next-spark">✦</span></div></section>
          <section className="ml-lesson-section"><div className="ml-dash-section-title"><div><h2 lang="ml">വാക്കുകൾ വായിക്കാം</h2><p>Your first three word previews</p></div><span>01 / 05 <small>levels planned</small></span></div><ol className="ml-lesson-cards">{episodes.map((item, index) => <li key={item.title} className={`ml-lesson-card ml-card-${item.colour}`}><div className="ml-card-top"><span className="ml-card-number">0{index + 1}</span><Icon name={item.icon} size={25} /></div><span className="ml-card-word" lang="ml">{item.title}</span><div className="ml-card-bottom"><div><h3>{item.description}</h3><p>{index === 0 ? 'റ + ത' : index === 1 ? 'Meet ല' : 'Meet മ'}</p></div><button disabled={!ready} onClick={() => start(index)} aria-label={`Open preview ${index + 1}: ${item.title}`}><Icon name="arrow" /></button></div></li>)}</ol></section>
          <section className="ml-gentle-note"><span><Icon name="leaf" size={27} /></span><div><h3>Your pace is a good pace.</h3><p>Explore a little. Take a break. Your place will be here.</p></div></section>
        </> : <section className="ml-word-corner"><span className="ml-eyebrow">WORDS TO EXPLORE</span><h2 lang="ml">വാക്കുകളുടെ ലോകം</h2><p>Revisit a preview. These are words to meet, not a record of words mastered.</p><div className="ml-word-grid">{episodes.map((item, index) => <button key={item.title} onClick={() => start(index)} disabled={!ready}>{index === 2 ? <HillScene small /> : <Icon name={item.icon} size={44} />}<span lang="ml">{item.title}</span><small>Open preview <span aria-hidden="true">↗</span></small></button>)}</div></section>}
        <details className="ml-grownup-note"><summary>About this preview <span aria-hidden="true">+</span></summary><p>This is an interface preview. The three word previews have video placeholders; spoken instructions and approved writing guides are still to come. Preview visits are not reading assessments. Children will need the completed guidance before we can evaluate solo learning.</p><p>{storageAvailable ? 'Only your last preview position is saved in this browser. No account is needed, and it does not sync to other devices.' : 'Browser storage is unavailable. You can keep exploring, but your place may not be saved after leaving.'}</p></details>
        <InstallApp />
        {!storageAvailable && <p className="ml-storage-note" role="status">Your place is kept for this visit only.</p>}
      </main>
    </div>
    <dialog ref={dialog} className="ml-preview-dialog" aria-labelledby="preview-title" onCancel={(event) => { event.preventDefault(); finish(); }} onClick={event => { if (event.target === dialog.current) finish(); }}>
      <div className="ml-dialog-inner"><header><span className="ml-mini-label">WORD PREVIEW {position.episode + 1} · {position.step + 1} / {episode.forms.length}</span><button className="ml-icon-button" onClick={finish} aria-label="Close preview and save position"><Icon name="close" /></button></header><h2 id="preview-title">{isWord ? 'Put the letters together' : 'Meet a Malayalam letter'}</h2>
      {!isWord ? <div className="ml-video-placeholder"><span className="ml-model-letter" lang="ml">{episode.forms[position.step]}</span><div><Icon name="play" size={18} /><span>Formation video coming soon</span></div></div> : <div className="ml-word-activity"><span className="ml-model-word" lang="ml">{episode.title}</span><p>Match the word above.</p><div className="ml-word-slots" aria-label={`Your word: ${built.join('') || 'empty'}`} lang="ml">{[0, 1].map(i => <span key={i}>{built[i] || <span aria-hidden="true">·</span>}</span>)}</div><div className="ml-choice-tiles">{[...episode.tiles].reverse().map(tile => <button key={tile} onClick={() => chooseTile(tile)} disabled={built.length === 2} aria-label={`Add ${tile}`} lang="ml">{tile}</button>)}<button className="ml-clear-tiles" onClick={() => { setBuilt([]); setFeedback(''); }}>Try again</button></div><p className="ml-feedback" role="status">{feedback}</p></div>}
      <p className="ml-dialog-note">Preview only · Spoken guidance and teaching recordings are still being prepared.</p><footer><button className="ml-text-button" onClick={finish}>Stop here</button><button className="ml-btn" onClick={() => isWord ? finish() : save({ ...position, step: position.step + 1 })}>{isWord ? 'Back to my path' : 'Next'}<Icon name="arrow" size={20} /></button></footer></div>
    </dialog>
  </div>;
}
