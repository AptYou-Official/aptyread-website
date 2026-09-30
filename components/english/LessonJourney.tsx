'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { EnglishLesson } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';
import LessonTopics, { getLessonTopicGroups } from './LessonTopics';

/** A small, reversible overview of the first lesson, using the same access rules as its list. */
export default function LessonJourney({ lesson }: { lesson: EnglishLesson }) {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const groups = getLessonTopicGroups(lesson);
  const nextIndex = lesson.activities.findIndex(activity => !access.completed.has(activity.id));
  const currentGroup = nextIndex < 0 ? groups.length - 1 : groups.findIndex(group => nextIndex >= group.start && nextIndex < group.end);
  const [chosenGroup, setChosenGroup] = useState<number | null>(null);
  // A stored completion beyond a gap must not make that stop selectable.
  const selectedGroup = chosenGroup !== null && ready && access.activities.has(lesson.activities[groups[chosenGroup].start].id)
    ? chosenGroup : Math.max(0, currentGroup);
  const group = groups[selectedGroup];
  const groupDone = lesson.activities.slice(group.start, group.end).every(activity => access.completed.has(activity.id));
  const panelId = useId();
  const headingId = useId();

  return <div className="en-lesson-journey">
    <div className="en-journey-landscape">
      <svg className="en-journey-trail" viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M100 103C165 103 235 69 300 69S435 103 500 103 635 69 700 69" stroke="#e0cf9d" strokeWidth="27" fill="none" strokeLinecap="round" />
        <path d="M100 103C165 103 235 69 300 69S435 103 500 103 635 69 700 69" stroke="#fff4d5" strokeWidth="21" fill="none" strokeLinecap="round" />
        <path d="M100 103C165 103 235 69 300 69S435 103 500 103 635 69 700 69" stroke="#c9ac6f" strokeWidth="2" strokeDasharray="2 10" fill="none" strokeLinecap="round" />
      </svg>
      <ol className="en-journey-stops" aria-label="First words journey">
        {groups.map((stop, index) => {
          const done = lesson.activities.slice(stop.start, stop.end).every(activity => access.completed.has(activity.id));
          const reached = ready && access.activities.has(lesson.activities[stop.start].id);
          const current = ready && nextIndex >= 0 && index === currentGroup;
          const selected = ready && index === selectedGroup;
          const label = index === groups.length - 1 ? 'Words' : lesson.activities[stop.start].letter;
          const content = <>
            <span className="en-journey-stone" aria-hidden="true">
              {index === groups.length - 1 ? <Icon name="book" size={37} /> : label}
              {done && <span className="en-journey-check"><Icon name="check" size={17} /></span>}
            </span>
            <span className="en-journey-stop-caption">{current ? 'You are here' : done ? index === groups.length - 1 ? 'Words' : `Meet ${label}` : 'Later'}</span>
          </>;
          return <li key={stop.start} className={`en-journey-stop is-stop-${index} ${done ? 'is-done' : current ? 'is-current' : 'is-later'} ${selected ? 'is-chosen' : ''}`}>
            {current && <Image className="en-journey-apty" src="/images/apty-mascot.png" width={66} height={77} alt="" unoptimized />}
            {reached ? <button type="button" aria-label={`${stop.title}, ${current ? 'you are here' : 'completed'}. Show activities`} aria-current={current ? 'step' : undefined} aria-pressed={selected} aria-controls={panelId} onClick={() => setChosenGroup(index)}>{content}</button>
              : <div role="group" aria-disabled="true" aria-label={`${stop.title}, ${ready ? 'play earlier activities first' : 'getting ready'}`}>{content}</div>}
          </li>;
        })}
      </ol>
    </div>
    <section id={panelId} className="en-journey-activities" data-journey-group={selectedGroup} aria-labelledby={headingId}>
      <div className="en-journey-panel-heading">
        <div><span className="en-hub-kicker">{!ready ? 'GETTING READY' : groupDone ? 'PLAY AGAIN' : 'ONE LITTLE STEP'}</span><h3 id={headingId}>{group.title}</h3></div>
        <span className="en-journey-small-steps" role="img" aria-label={`${lesson.activities.slice(group.start, group.end).filter(activity => access.completed.has(activity.id)).length} of ${group.end - group.start} activities completed here`}>
          {lesson.activities.slice(group.start, group.end).map(activity => <i key={activity.id} className={access.completed.has(activity.id) ? 'is-done' : ''} aria-hidden="true" />)}
        </span>
      </div>
      <LessonTopics lesson={lesson} groupIndex={selectedGroup} showHeading={false} />
    </section>
    <details className="en-journey-all">
      <summary><Icon name="book" size={23} /><span>All activities</span><Icon name="chevron" size={21} /></summary>
      <div className="en-journey-all-content"><LessonTopics lesson={lesson} /></div>
    </details>
  </div>;
}
