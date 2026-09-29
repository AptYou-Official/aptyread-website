'use client';

import { englishLessons } from '@/lib/english-curriculum';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Link from './AppLink';
import Icon from './Icons';
import { ActivityStickerKind, StickerToken } from './ActivitySticker';

function stickerFor(activity: (typeof englishLessons)[number]['activities'][number]): { kind: ActivityStickerKind; mark: string; label: string } {
  const letter = activity.letter ? activity.uppercase ? activity.letter.toUpperCase() : activity.letter : '';
  if (activity.kind === 'sound') return { kind: 'sound', mark: `${letter} ♪`, label: 'Sound explorer' };
  if (activity.kind === 'cases') return { kind: 'finder', mark: `${activity.letter?.toUpperCase()} ${activity.letter}`, label: 'Letter finder' };
  if (activity.kind === 'find') return { kind: 'link', mark: `${letter} ↔`, label: 'Sound link' };
  if (activity.kind === 'write') return { kind: 'write', mark: letter, label: 'Letter maker' };
  if (activity.kind === 'word') return { kind: 'word', mark: activity.word || 'word', label: 'Word builder' };
  if (activity.kind === 'review') return { kind: 'sentence', mark: activity.id === 'our-first-words' ? 'sat · at' : 'words', label: 'Sentence finder' };
  if (activity.kind === 'apply') return { kind: 'garden', mark: '✦', label: 'Word garden' };
  return { kind: 'video', mark: letter || '▶', label: 'Apty explorer' };
}

export default function WordGarden() {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const plants = [...englishLessons.flatMap((lesson, index) => lesson.activities.filter(activity => activity.word).map(activity => ({ word: activity.word!, id: activity.id, lesson: lesson.id, number: index + 1 }))), { word: 'pan · tap', id: 'more-words-with-apty', lesson: 'more-words', number: 5 }];
  const stickers = englishLessons.flatMap(lesson => lesson.activities.map(activity => ({ activity, lesson: lesson.id }))).filter(({ activity }) => access.completed.has(activity.id));
  return <section className="en-word-garden"><span className="en-eyebrow">LITTLE WORDS, GROWING CONFIDENCE</span><h1>My word garden</h1><p>Follow your learning path to unlock each word. Return here to practise it again.</p>
    <div className="en-garden-grid">{plants.map(({ word, id, lesson, number }) => {
      const unlocked = ready && access.activities.has(id);
      const completed = access.completed.has(id);
      const content = <><Icon name={unlocked ? 'leaf' : 'lock'} size={35} /><strong>{word}</strong><span>{!unlocked ? `Unlock in Lesson ${number}` : completed ? word.includes('·') ? 'Read these again' : 'Read it again' : word.includes('·') ? 'Try these words' : 'Practise this word'}<Icon name={unlocked ? 'arrow' : 'lock'} size={17} /></span></>;
      return unlocked ? <Link key={word} className={`en-word-plant ${word.includes('·') ? 'is-pair' : ''} ${completed ? 'is-grown' : ''}`} href={`/english/learn/${lesson}?activity=${id}`}>{content}</Link> : <div key={word} className={`en-word-plant is-locked ${word.includes('·') ? 'is-pair' : ''}`} aria-disabled="true">{content}</div>;
    })}</div><p className="en-fine">Your garden remembers practice. It isn’t a reading assessment.</p>
    <section className="en-sticker-garden" aria-labelledby="sticker-garden-title"><span className="en-eyebrow">SMALL MOMENTS, KEPT HERE</span><h2 id="sticker-garden-title">Apty’s sticker garden</h2><p>{stickers.length ? `${stickers.length} sticker${stickers.length === 1 ? '' : 's'} collected.` : 'Your first sticker is waiting in the learning path.'}</p>{stickers.length > 0 && <div className="en-sticker-garden-grid">{stickers.map(({ activity }) => { const sticker = stickerFor(activity); return <StickerToken key={activity.id} kind={sticker.kind} sticker={sticker.mark} label={sticker.label} />; })}</div>}</section>
  </section>;
}
