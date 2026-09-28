'use client';

import Image from 'next/image';
import Link from './AppLink';
import { useEffect, useRef, useState } from 'react';
import { englishLevels, englishLessons, englishVideos, EnglishLesson } from '@/lib/english-curriculum';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';
import PwaInstall from './PwaInstall';
import BrandWordmark from '@/components/public/BrandWordmark';
import { englishAccess } from '@/lib/english-progress';
import LessonCard from './LessonCard';
import LessonTopics from './LessonTopics';
import WordGarden from './WordGarden';

export default function Dashboard() {
  const { progress, ready, offline, storageAvailable } = useEnglish();
  const [tab, setTab] = useState<'path' | 'words' | 'grownups'>('path');
  const [selectedLesson, setSelectedLesson] = useState<EnglishLesson | null>(null);
  const topicsDialog = useRef<HTMLDialogElement>(null);
  const levelsDialog = useRef<HTMLDialogElement>(null);
  const main = useRef<HTMLElement>(null);
  const access = englishAccess(progress);
  const completed = access.completed.size;
  const next = access.next;
  const waiting = !!next && next.activity.kind === 'video' && !englishVideos[next.activity.id] && !next.activity.audioIntroduction;
  const revisit = !next || waiting;
  const resumeLesson = englishLessons.find(l => l.id === next?.lessonId) || englishLessons[0];
  const lastFinished = [...englishLessons].reverse().find(l => l.activities.every(a => access.completed.has(a.id))) || englishLessons[0];
  const featuredLesson = revisit ? lastFinished : resumeLesson;
  const started = completed > 0 || Object.keys(progress.current).length > 0;
  const lessonNumber = englishLessons.indexOf(featuredLesson) + 1;
  const resumeHref = `/english/learn/${featuredLesson.id}${next && !revisit ? `?activity=${next.activity.id}` : ''}`;
  const featuredDone = featuredLesson.activities.filter(a => access.completed.has(a.id)).length;
  const title = revisit ? 'Look what you can do.' : next?.activity.title || 'Our First Words';

  useEffect(() => {
    if (!selectedLesson) return;
    topicsDialog.current?.showModal();
    const frame = requestAnimationFrame(() => topicsDialog.current?.querySelector('.is-next')?.scrollIntoView({ block: 'center', behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, [selectedLesson]);
  function changeTab(value: typeof tab) {
    setTab(value);
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => main.current?.focus({ preventScroll: true }));
  }
  const navigation = <>{([
    ['path', 'home', 'Learn'], ['words', 'book', 'My words'], ['grownups', 'grownups', 'Grown-ups'],
  ] as const).map(([key, icon, label]) => <button key={key} onClick={() => changeTab(key)} aria-current={tab === key ? 'page' : undefined}><span><Icon name={icon} size={23} /></span><b>{label}</b></button>)}</>;
  const selectedDone = selectedLesson?.activities.filter(a => access.completed.has(a.id)).length || 0;
  const selectedUnlocked = !!selectedLesson && access.lessons.has(selectedLesson.id);
  const selectedNext = selectedLesson?.activities.find(a => access.activities.has(a.id) && !access.completed.has(a.id));
  const selectedUnavailable = selectedNext?.kind === 'video' && !englishVideos[selectedNext.id] && !selectedNext.audioIntroduction;

  return <div className="en-hub">
    <a className="en-skip" href="#english-main">Skip to learning</a>
    <aside className="en-hub-sidebar">
      <a href="/english/dashboard" className="en-hub-brand" aria-label="AptyRead English home"><BrandWordmark /><small>ENGLISH</small></a>
      <nav aria-label="Learning space">{navigation}</nav>
      <div className="en-hub-sidebar-foot">{tab !== 'grownups' && <PwaInstall />}<a href="/"><Icon name="back" size={16} /> AptyRead home</a></div>
    </aside>
    <div className="en-hub-body">
      <header className="en-hub-header"><a href="/english/dashboard" className="en-hub-mobile-brand" aria-label="AptyRead English home"><BrandWordmark /></a><span className="en-hub-language"><i /> English</span><button className="en-hub-parent" aria-label="For grown-ups" onClick={() => changeTab('grownups')}><Icon name="grownups" size={21} /></button></header>
      <main id="english-main" ref={main} tabIndex={-1} className="en-hub-main">
        {offline && <p role="status" className="en-notice">You’re offline. Saved activities and letter sounds are available.</p>}
        {!storageAvailable && <p role="status" className="en-notice">Your browser cannot save progress. You can still learn during this visit.</p>}
        {tab === 'path' ? <>
          <div className="en-hub-greeting"><div><h1>Let’s read.</h1><p>You + Apty. Let’s do this!</p></div><button className="en-hub-level-chip" onClick={() => levelsDialog.current?.showModal()}>Level 1 <Icon name="chevron" size={15} /></button></div>
          <section className="en-hub-feature" aria-labelledby="next-discovery-title">
            <div className="en-hub-feature-copy"><span className="en-hub-kicker">{revisit ? 'READ, TRY, DISCOVER AGAIN' : started ? 'YOUR NEXT DISCOVERY' : 'YOUR FIRST DISCOVERY'}</span>
              <h2 id="next-discovery-title">{title}</h2>
              <p>{revisit ? featuredLesson.title : `Lesson ${lessonNumber} · Topic ${(next?.step || 0) + 1} of ${featuredLesson.activities.length}`}</p>
              {revisit ? <button className="en-hub-cta" disabled={!ready} onClick={() => setSelectedLesson(featuredLesson)}>Practise again <span><Icon name="redo" size={22} /></span></button>
                : ready ? <Link className="en-hub-cta" href={resumeHref}>{started ? 'Continue' : 'Let’s begin'}<span><Icon name="arrow" size={24} /></span></Link>
                  : <button className="en-hub-cta" disabled>Getting ready…</button>}
              <div className="en-hub-feature-progress" aria-label={`${featuredDone} of ${featuredLesson.activities.length} topics completed in ${featuredLesson.title}`}><span aria-hidden="true">{featuredLesson.activities.map(a => <i key={a.id} className={access.completed.has(a.id) ? 'is-done' : ''} />)}</span><small>{featuredDone} / {featuredLesson.activities.length}</small></div>
            </div>
            <div className="en-hub-feature-art" aria-hidden="true"><div className="en-hub-orbit" /><span className="en-hub-spark is-one">✦</span><span className="en-hub-spark is-two">✧</span><div className="en-hub-letter-cloud">{(featuredLesson.id === 'more-words' ? ['p', 'i', 'n'] : ['s', 'a', 't']).map(letter => <span key={letter}>{letter}</span>)}</div><Image src="/images/apty-mascot.png" width={270} height={315} alt="" unoptimized priority /><div className="en-hub-art-shadow" /></div>
          </section>
          {waiting && <p className="en-hub-preparing"><Icon name="leaf" size={16} /> {resumeLesson.title} is coming soon. Your place is saved.</p>}
          <section className="en-hub-lessons" aria-labelledby="lesson-list-title"><div className="en-hub-section-heading"><div><span className="en-hub-kicker">SOUNDS INTO FIRST WORDS</span><h2 id="lesson-list-title">Your lessons</h2></div><button onClick={() => levelsDialog.current?.showModal()}>All levels <Icon name="arrow" size={17} /></button></div>
            <div className="en-hub-lesson-grid">{englishLessons.map((lesson, index) => <LessonCard key={lesson.id} lesson={lesson} index={index} onOpen={() => setSelectedLesson(lesson)} />)}</div>
          </section>
        </> : tab === 'words' ? <WordGarden /> : <section className="en-grownups"><h1>For grown-ups</h1><p className="en-intro">A little insight into their reading journey.</p><div className="en-parent-grid"><article><Icon name="book" size={28} /><h2>Reading with meaning</h2><p>Children read words using sounds they have met. Spoken sentences and pictures help them understand. Help and replay are always welcome.</p></article><article><Icon name="leaf" size={28} /><h2>Progress without pressure</h2><p>Topics open in order. Completed topics stay available. Practice stars celebrate turns; five stars celebrate reading activities. These are encouragement, not reading scores.</p></article><article><Icon name="home" size={28} /><h2>Their place, saved here</h2><p>Progress stays in this browser on this device. Clearing browser data clears progress.</p><strong>{completed} of {englishLessons.reduce((count, lesson) => count + lesson.activities.length, 0)} opening topics completed</strong></article><article><Icon name="sound" size={28} /><h2>About this preview</h2><p>The first four lessons are ready. Lesson 5 introduces p, i and n with recorded-sound introductions while its main teaching videos are being prepared. Letter sounds are recorded; other instructions use device narration for now.</p><p>Pronunciation and handwriting are not scored. Videos and some voices need internet.</p></article></div><div className="en-parent-install"><div><h2>Ready on your home screen</h2><p>Add AptyRead for easy access.</p></div><PwaInstall /></div><div className="en-parent-links"><a href="/privacy">Privacy</a><a href="/contact">Contact</a><a href="/malayalam">Malayalam <Icon name="arrow" size={16} /></a></div></section>}
      </main>
    </div>
    <nav className="en-hub-mobile-nav" aria-label="Learning space">{navigation}</nav>
    <dialog ref={topicsDialog} className="en-hub-sheet" aria-labelledby="en-hub-topics-title" onClose={() => setSelectedLesson(null)} onClick={event => { if (event.target === event.currentTarget) topicsDialog.current?.close(); }}>
      {selectedLesson && <><header className="en-sheet-heading"><div><span className="en-hub-kicker">LEVEL 1 · LESSON {englishLessons.indexOf(selectedLesson) + 1}</span><h2 id="en-hub-topics-title">{selectedLesson.id === 'first-words' ? 'Our First Words' : selectedLesson.title}</h2><div className="en-sheet-progress"><span aria-hidden="true"><i style={{width:`${100 * selectedDone / selectedLesson.activities.length}%`}} /></span><small>{selectedDone} / {selectedLesson.activities.length} done</small></div></div><button className="en-icon-button" aria-label="Close topics" onClick={() => topicsDialog.current?.close()}><Icon name="close" /></button></header>
        <div className="en-sheet-scroll"><LessonTopics lesson={selectedLesson} /></div>
        <footer className="en-sheet-footer">{!selectedUnlocked ? <p><Icon name="lock" size={16} /> Opens after Lesson {englishLessons.indexOf(selectedLesson)}.</p> : selectedUnavailable ? <p><Icon name="leaf" size={17} /> This lesson is coming soon.</p> : selectedNext ? <Link className="en-hub-cta" href={`/english/learn/${selectedLesson.id}?activity=${selectedNext.id}`}>{selectedDone ? 'Continue' : 'Let’s begin'}<span><Icon name="arrow" /></span></Link> : <p><Icon name="check" size={18} /> All done. Choose any topic to try again.</p>}</footer>
      </>}
    </dialog>
    <dialog ref={levelsDialog} className="en-hub-sheet en-level-sheet" aria-labelledby="en-hub-levels-title" onClick={event => { if (event.target === event.currentTarget) levelsDialog.current?.close(); }}>
      <header className="en-sheet-heading"><div><span className="en-hub-kicker">ONE STEP AT A TIME</span><h2 id="en-hub-levels-title">Your reading journey</h2></div><button className="en-icon-button" aria-label="Close levels" onClick={() => levelsDialog.current?.close()}><Icon name="close" /></button></header>
      <div className="en-sheet-scroll"><ol className="en-hub-level-map">{englishLevels.map((item, index) => <li key={item.title}>{index === 0 ? <button onClick={() => { levelsDialog.current?.close(); changeTab('path'); }}><span className="en-hub-level-number">1</span><span><small>YOU ARE HERE</small><strong>{item.title}</strong></span><Icon name="arrow" size={21} /></button> : <div><span className="en-hub-level-number">{index + 1}</span><span><small>COMING LATER</small><strong>{item.title}</strong></span><Icon name="lock" size={17} /></div>}</li>)}</ol></div>
    </dialog>
  </div>;
}
