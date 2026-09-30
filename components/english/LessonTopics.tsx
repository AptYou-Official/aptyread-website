'use client';

import { Activity, EnglishLesson, englishVideos } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Link from './AppLink';
import Icon from './Icons';

/** Recognisable pictures let emerging readers find an activity before reading its name. */
export function TopicPicture({ activity }: { activity: Activity }) {
  const letter = activity.uppercase ? activity.letter?.toUpperCase() : activity.letter;
  const listening = activity.kind === 'video' && activity.audioIntroduction;
  return <span className={`en-topic-picture is-${listening ? 'listen' : activity.kind}`} aria-hidden="true">
    {activity.kind === 'word' || activity.kind === 'review' || activity.kind === 'apply' ? <><span className="en-topic-picture-word">{activity.word || (activity.id === 'our-first-words' ? 'sat' : 'pin')}</span><span className="en-topic-picture-underline" /></>
      : activity.kind === 'sound' ? <svg viewBox="0 0 64 64" width="58" height="58" fill="none"><path d="M10 27q22 10 44 0c-1 17-12 26-22 26S11 44 10 27Z" fill="#d54d67" stroke="#903550" strokeWidth="2.5" strokeLinejoin="round" /><path d="M15 30q17 7 34 0l-3 9H18Z" fill="#fff" /><path d="M23 49q9-11 18 0" fill="#ff9caf" /><path d="m8 16-4-4m14 1-1-6m31 9 4-4m-14 1 1-6" stroke="#903550" strokeWidth="3" strokeLinecap="round" /></svg>
        : activity.kind === 'write' ? <><span className="en-topic-picture-letter">{letter}</span><span className="en-topic-picture-corner"><Icon name="pencil" size={26} /></span></>
          : activity.kind === 'cases' ? <span className="en-topic-picture-cases">{activity.letter?.toUpperCase()}{activity.letter}</span>
            : activity.kind === 'find' ? <><span className="en-topic-picture-letter">{letter}</span><span className="en-topic-picture-corner"><Icon name="hand" size={27} /></span></>
              : <><span className="en-topic-picture-letter">{letter}</span><span className="en-topic-picture-corner"><Icon name={listening ? 'sound' : 'play'} size={23} /></span></>}
  </span>;
}

export function getLessonTopicGroups(lesson: EnglishLesson) {
  return lesson.id === 'first-words'
    ? [{ title: 'Meet s', start: 0, end: 2 }, { title: 'Meet a', start: 2, end: 5 }, { title: 'Meet t', start: 5, end: 8 }, { title: 'Our first words', start: 8, end: 11 }]
    : lesson.id === 'more-words' ? [{ title: 'Meet p', start: 0, end: 3 }, { title: 'Meet i', start: 3, end: 6 }, { title: 'Meet n', start: 6, end: 9 }, { title: 'Our new words', start: 9, end: 12 }, { title: 'Try new words', start: 12, end: 13 }]
    : [{ title: 'Big and small', start: 0, end: 2 }, { title: `Big ${lesson.forms[0]}`, start: 2, end: 4 }, { title: `Small ${lesson.forms[1]}`, start: 4, end: 6 }];
}

/** The same topic navigation on the learning home and inside a lesson. */
export default function LessonTopics({ lesson, currentId, onSelect, groupIndex, showHeading = true }: {
  lesson: EnglishLesson; currentId?: string; onSelect?: (index: number) => void; groupIndex?: number; showHeading?: boolean;
}) {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const groups = getLessonTopicGroups(lesson).filter((_, index) => groupIndex === undefined || index === groupIndex);
  return <div className="en-topic-route">
    {groups.map(group => <section className="en-topic-group" key={group.start} aria-label={group.title}>
    {showHeading && <h3><span className="en-topic-group-picture" aria-hidden="true">{group.title.startsWith('Meet ') ? group.title.slice(-1) : <Icon name={group.start === 0 || group.title.includes('words') ? 'book' : 'pencil'} size={22} />}</span>{group.title}</h3>}<ol start={group.start + 1}>
      {lesson.activities.slice(group.start, group.end).map((activity, offset) => {
        const index = group.start + offset;
        const done = access.completed.has(activity.id);
        const reached = ready && access.activities.has(activity.id);
        const missing = activity.kind === 'video' && !englishVideos[activity.id] && !activity.audioIntroduction && !activity.practicePreview;
        const canOpen = reached && !missing;
        const next = access.next?.activity.id === activity.id && canOpen;
        const selected = currentId === activity.id;
        const type = activity.kind === 'video' ? activity.audioIntroduction ? 'Listen' : 'Watch' : activity.kind === 'word' || activity.kind === 'review' || activity.kind === 'apply' ? 'Read' : activity.kind === 'write' ? 'Draw' : activity.kind === 'sound' ? 'Say' : 'Find';
        const status = selected && canOpen ? 'You are here' : done ? 'Play again' : !ready ? 'Getting ready…' : missing ? 'Coming later' : next ? 'Play next' : !reached ? 'Play in order' : type;
        const state = !canOpen ? 'is-locked' : selected ? 'is-selected' : done ? 'is-done' : next ? 'is-next' : 'is-available';
        const className = `en-route-topic ${state} ${!canOpen ? 'is-locked' : ''}`;
        const content = <><TopicPicture activity={activity} />
          <span className="en-route-copy"><strong>{activity.title}</strong><small><span className={`en-route-status ${state}`}>{done && <Icon name="check" size={16} />}{status}</span></small></span>
          <span className="en-route-type" aria-hidden="true"><Icon name={done ? 'redo' : !canOpen ? 'lock' : 'play'} size={24} /></span></>;
        const label = `${activity.title}, ${selected && canOpen ? 'current topic' : done ? 'finished, practise again' : missing ? 'locked' : next ? 'continue here' : !reached ? 'locked, finish earlier topics first' : type}`;
        return <li key={activity.id} data-topic-id={activity.id}>{!canOpen ? <div className={className} aria-disabled="true" aria-label={label}>{content}</div>
          : onSelect ? <button className={className} onClick={() => onSelect(index)} aria-current={selected ? 'step' : undefined} aria-label={label}>{content}</button>
          : <Link className={className} href={`/english/learn/${lesson.id}?activity=${activity.id}`} aria-current={selected ? 'step' : undefined} aria-label={label}>{content}</Link>}</li>;
      })}
    </ol>
  </section>)}
  </div>;
}
