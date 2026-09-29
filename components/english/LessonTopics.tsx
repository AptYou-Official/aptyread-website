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
    ? [{ title: 'Meet s', start: 0, end: 2 }, { title: 'Meet a', start: 2, end: 5 }, { title: 'Meet t', start: 5, end: 8 }, { title: 'Our first words', start: 8, end: 11 }]
    : lesson.id === 'more-words' ? [{ title: 'Meet p', start: 0, end: 3 }, { title: 'Meet i', start: 3, end: 6 }, { title: 'Meet n', start: 6, end: 9 }, { title: 'Our new words', start: 9, end: 12 }, { title: 'Try new words', start: 12, end: 13 }]
    : [{ title: 'Big and small', start: 0, end: 2 }, { title: `Big ${lesson.forms[0]}`, start: 2, end: 4 }, { title: `Small ${lesson.forms[1]}`, start: 4, end: 6 }];
  return <div className="en-topic-route">
    <div className="en-topic-key" aria-label="Topic status key">
      <span className="is-done"><Icon name="check" size={14} /> Finished</span>
      <span className="is-next"><Icon name="arrow" size={14} /> Continue here</span>
      <span className="is-locked"><Icon name="lock" size={14} /> Locked</span>
    </div>
    {groups.map(group => <section className="en-topic-group" key={group.start} aria-label={group.title}>
    <h3>{group.title}</h3><ol start={group.start + 1}>
      {lesson.activities.slice(group.start, group.end).map((activity, offset) => {
        const index = group.start + offset;
        const done = access.completed.has(activity.id);
        const reached = ready && access.activities.has(activity.id);
        const missing = activity.kind === 'video' && !englishVideos[activity.id] && !activity.audioIntroduction && !activity.practicePreview;
        const canOpen = reached && !missing;
        const next = access.next?.activity.id === activity.id && canOpen;
        const selected = currentId === activity.id;
        const type = activity.kind === 'video' ? 'Watch' : activity.kind === 'word' || activity.kind === 'review' || activity.kind === 'apply' ? 'Read' : activity.kind === 'write' ? 'Write' : 'Try';
        const status = done ? 'Finished · Practise again' : missing ? 'Locked · More practice will open here' : next ? 'Continue here' : selected ? 'You are here' : !reached ? 'Locked · Finish earlier topics' : `${type} · Ready to practise`;
        const state = done ? 'is-done' : missing ? 'is-locked' : next ? 'is-next' : selected ? 'is-selected' : !reached ? 'is-locked' : 'is-available';
        const className = `en-route-topic ${state} ${!canOpen ? 'is-locked' : ''}`;
        const content = <><span className="en-route-marker" aria-hidden="true">{done ? <Icon name="check" size={17} /> : !canOpen ? <Icon name="lock" size={16} /> : index + 1}</span>
          <span className="en-route-copy"><strong>{activity.title}</strong><small><span className={`en-route-status ${state}`}>{status}</span></small></span>
          <span className="en-route-type" aria-hidden="true"><Icon name={done ? 'redo' : !canOpen ? 'lock' : activity.kind === 'video' ? 'play' : activity.kind === 'word' || activity.kind === 'review' || activity.kind === 'apply' ? 'book' : 'pencil'} size={17} /></span></>;
        const label = `${activity.title}, ${done ? 'finished, practise again' : missing ? 'locked' : next ? 'continue here' : !reached ? 'locked, finish earlier topics first' : selected ? 'current topic' : type}`;
        return <li key={activity.id} data-topic-id={activity.id}>{!canOpen ? <div className={className} aria-disabled="true" aria-label={label}>{content}</div>
          : onSelect ? <button className={className} onClick={() => onSelect(index)} aria-current={selected ? 'step' : undefined} aria-label={label}>{content}</button>
          : <Link className={className} href={`/english/learn/${lesson.id}?activity=${activity.id}`} aria-label={label}>{content}</Link>}</li>;
      })}
    </ol>
  </section>)}
  </div>;
}
