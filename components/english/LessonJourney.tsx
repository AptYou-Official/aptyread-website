'use client';

import Image from 'next/image';
import { CSSProperties, useEffect, useId, useRef, useState } from 'react';
import { EnglishLesson } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';
import LessonTopics, { getLessonTopicGroups } from './LessonTopics';
import { pendingFormationActivity } from './programmePresentation';

/** Only a small group is open at a time, even as the programme grows. */
export default function LessonJourney({ lesson }: { lesson: EnglishLesson }) {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const groups = getLessonTopicGroups(lesson);
  const pendingFormation = pendingFormationActivity(progress, lesson.id);
  const nextIndex = pendingFormation?.step ?? lesson.activities.findIndex(activity => !access.completed.has(activity.id));
  const currentGroup = nextIndex < 0 ? groups.length - 1 : groups.findIndex(group => nextIndex >= group.start && nextIndex < group.end);
  const [chosenGroup, setChosenGroup] = useState<number | null>(null);
  // A stored completion beyond a gap must not make that stop selectable.
  const selectedGroup = chosenGroup !== null && groups[chosenGroup] && ready && access.activities.has(lesson.activities[groups[chosenGroup].start].id)
    ? chosenGroup : Math.max(0, currentGroup);
  const group = groups[selectedGroup];
  const groupDone = lesson.activities.slice(group.start, group.end).every(activity => access.completed.has(activity.id));
  const panelId = useId();
  const headingId = useId();
  const stops = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const current = stops.current?.querySelector<HTMLElement>('[aria-current="step"]');
    if (current && stops.current) stops.current.scrollLeft = Math.max(0, (current.parentElement?.offsetLeft || 0) - stops.current.clientWidth / 2 + current.offsetWidth / 2);
  }, [currentGroup, ready]);

  return <div className={`en-lesson-journey ${groups.length !== 4 ? 'is-flexible-journey' : ''}`}>
    <div className="en-journey-landscape">
      <svg className="en-journey-trail" viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M100 103C165 103 235 69 300 69S435 103 500 103 635 69 700 69" stroke="#e0cf9d" strokeWidth="27" fill="none" strokeLinecap="round" />
        <path d="M100 103C165 103 235 69 300 69S435 103 500 103 635 69 700 69" stroke="#fff4d5" strokeWidth="21" fill="none" strokeLinecap="round" />
        <path d="M100 103C165 103 235 69 300 69S435 103 500 103 635 69 700 69" stroke="#c9ac6f" strokeWidth="2" strokeDasharray="2 10" fill="none" strokeLinecap="round" />
      </svg>
      <ol ref={stops} className="en-journey-stops" style={{ '--stop-count': groups.length } as CSSProperties} aria-label={`${lesson.title} journey`} tabIndex={groups.length > 4 ? 0 : undefined}>
        {groups.map((stop, index) => {
          const done = lesson.activities.slice(stop.start, stop.end).every(activity => access.completed.has(activity.id));
          const reached = ready && access.activities.has(lesson.activities[stop.start].id);
          const current = ready && nextIndex >= 0 && index === currentGroup;
          const selected = ready && index === selectedGroup;
          const activity = lesson.activities[stop.start];
          const label = stop.title.startsWith('Meet ') && activity.letter ? activity.letter : null;
          const writing = activity.kind === 'write' || activity.kind === 'formation' || activity.id.includes('capital') || activity.id.includes('lowercase');
          const content = <>
            <span className="en-journey-stone" aria-hidden="true">
              {label || <Icon name={writing ? 'pencil' : stop.title.includes('sound') || stop.title.includes('Listen') ? 'sound' : 'book'} size={37} />}
              {done && <span className="en-journey-check"><Icon name="check" size={17} /></span>}
            </span>
            <span className="en-journey-stop-caption">{stop.title}<small>{current ? 'You are here' : done ? 'Play again' : reached ? 'Ready' : 'Later'}</small></span>
          </>;
          return <li key={stop.start} className={`en-journey-stop is-stop-${index % 4} ${current ? 'is-current' : done ? 'is-done' : 'is-later'} ${selected ? 'is-chosen' : ''}`}>
            {current && <Image className="en-journey-apty" src="/images/apty-mascot.png" width={66} height={77} alt="" unoptimized />}
            {reached ? <button type="button" aria-label={`${stop.title}, ${current ? 'you are here' : done ? 'completed' : 'ready to practise'}. Show activities`} aria-current={current ? 'step' : undefined} aria-pressed={selected} aria-controls={panelId} onClick={() => setChosenGroup(index)}>{content}</button>
              : <div role="group" aria-disabled="true" aria-label={`${stop.title}, ${ready ? 'play earlier activities first' : 'getting ready'}`}>{content}</div>}
          </li>;
        })}
      </ol>
      {groups.length > 4 && <p className="en-journey-scroll-hint">Slide to see more stops <Icon name="arrow" size={16} /></p>}
    </div>
    <section id={panelId} className="en-journey-activities" data-journey-group={selectedGroup} aria-labelledby={headingId}>
      <div className="en-journey-panel-heading">
        <div><span className="en-hub-kicker">{!ready ? 'GETTING READY' : pendingFormation && selectedGroup === currentGroup ? 'A LETTER TURN, IF YOU LIKE' : groupDone ? 'PLAY AGAIN' : 'ONE LITTLE VISIT'}</span><h3 id={headingId}>{group.title}</h3></div>
        <span className="en-journey-small-steps" role="img" aria-label={`${lesson.activities.slice(group.start, group.end).filter(activity => access.completed.has(activity.id)).length} of ${group.end - group.start} activities completed here`}>
          {lesson.activities.slice(group.start, group.end).map(activity => <i key={activity.id} className={access.completed.has(activity.id) ? 'is-done' : ''} aria-hidden="true" />)}
        </span>
      </div>
      <LessonTopics lesson={lesson} groupIndex={selectedGroup} showHeading={false} currentId={pendingFormation?.activity.id} />
      <p className="en-journey-pause-note"><Icon name="leaf" size={19} /> A little today. More another day.</p>
    </section>
    <details className="en-journey-all">
      <summary><Icon name="book" size={23} /><span>All activities</span><Icon name="chevron" size={21} /></summary>
      <div className="en-journey-all-content"><LessonTopics lesson={lesson} /></div>
    </details>
  </div>;
}
