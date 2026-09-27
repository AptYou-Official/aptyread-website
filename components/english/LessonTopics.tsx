'use client';

import { EnglishLesson, englishVideos } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Link from './AppLink';
import Icon from './Icons';

/** The same topic navigation on the learning home and inside a lesson. */
export default function LessonTopics({ lesson, currentId, onSelect }: {
  lesson: EnglishLesson; currentId?: string; onSelect?: (index: number) => void;
}) {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const groups = lesson.id === 'first-words'
    ? [{ title: 'Meet s', start: 0, end: 3 }, { title: 'Meet a', start: 3, end: 6 }, { title: 'Meet t', start: 6, end: 9 }, { title: 'Our first words', start: 9, end: 12 }]
    : [{ title: 'Big and small', start: 0, end: 2 }, { title: `Big ${lesson.forms[0]}`, start: 2, end: 4 }, { title: `Small ${lesson.forms[1]}`, start: 4, end: 6 }];
  return <div className="en-topic-route">{groups.map(group => <section className="en-topic-group" key={group.start} aria-label={group.title}>
    <h3>{group.title}</h3><ol start={group.start + 1}>
      {lesson.activities.slice(group.start, group.end).map((activity, offset) => {
        const index = group.start + offset;
        const done = access.completed.has(activity.id);
        const reached = ready && access.activities.has(activity.id);
        const missing = activity.kind === 'video' && !englishVideos[activity.id];
        const canOpen = reached && !missing;
        const next = access.next?.activity.id === activity.id;
        const selected = currentId === activity.id;
        const type = activity.kind === 'video' ? 'Watch' : activity.kind === 'word' || activity.kind === 'review' ? 'Read' : activity.kind === 'write' ? 'Write' : 'Try';
        const className = `en-route-topic ${done ? 'is-done' : ''} ${next && canOpen ? 'is-next' : ''} ${selected ? 'is-selected' : ''} ${!canOpen ? 'is-locked' : ''}`;
        const content = <><span className="en-route-marker" aria-hidden="true">{done ? <Icon name="check" size={17} /> : !canOpen ? <Icon name="lock" size={16} /> : index + 1}</span>
          <span className="en-route-copy"><strong>{activity.title}</strong><small>{missing ? 'Coming soon' : !reached ? 'Locked' : selected ? 'You are here' : next ? 'Up next' : type}</small></span>
          <span className="en-route-type" aria-hidden="true"><Icon name={done ? 'redo' : activity.kind === 'video' ? 'play' : activity.kind === 'word' || activity.kind === 'review' ? 'book' : 'pencil'} size={17} /></span></>;
        const label = `${activity.title}, ${done ? 'completed, practise again' : missing ? 'coming soon' : !reached ? 'locked' : selected ? 'current topic' : next ? 'up next' : type}`;
        return <li key={activity.id} data-topic-id={activity.id}>{!canOpen ? <div className={className} aria-disabled="true" aria-label={label}>{content}</div>
          : onSelect ? <button className={className} onClick={() => onSelect(index)} aria-current={selected ? 'step' : undefined} aria-label={label}>{content}</button>
          : <Link className={className} href={`/english/learn/${lesson.id}?activity=${activity.id}`} aria-label={label}>{content}</Link>}</li>;
      })}
    </ol>
  </section>)}</div>;
}
