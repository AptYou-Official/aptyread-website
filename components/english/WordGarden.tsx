'use client';

import { englishLessons, isEnglishLessonPublished } from '@/lib/english-curriculum';
import { getProgrammeActivity } from '@/lib/english-programme';
import { getFormationLetter } from '@/lib/english-learning-journey';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Link from './AppLink';
import Icon from './Icons';
import { ActivityStickerKind, StickerToken } from './ActivitySticker';
import { practisedWords, programmePicture, programmeTrials } from './programmePresentation';

function stickerFor(activity: (typeof englishLessons)[number]['activities'][number]): { kind: ActivityStickerKind; mark: string; label: string } {
  const baseLetter = activity.letter || activity.practiceLetter;
  const letter = baseLetter ? activity.uppercase ? baseLetter.toUpperCase() : baseLetter : '';
  if (activity.kind === 'practice') {
    const picture = programmePicture(activity);
    return { kind: picture.mark ? 'word' : 'garden', mark: picture.mark || '✦', label: 'Reading explorer' };
  }
  if (activity.kind === 'sound') return { kind: 'sound', mark: `${letter} ♪`, label: 'Sound explorer' };
  if (activity.kind === 'cases') return { kind: 'finder', mark: `${activity.letter?.toUpperCase()} ${activity.letter}`, label: 'Letter finder' };
  if (activity.kind === 'find') return { kind: 'link', mark: `${letter} ↔`, label: 'Sound link' };
  if (activity.kind === 'write' || activity.kind === 'formation') return { kind: 'write', mark: letter, label: 'Letter maker' };
  if (activity.kind === 'word') return { kind: 'word', mark: activity.word || 'word', label: 'Word builder' };
  if (activity.kind === 'review') return { kind: 'sentence', mark: activity.id === 'our-first-words' ? 'sat · at' : 'words', label: 'Sentence finder' };
  if (activity.kind === 'apply') return { kind: 'garden', mark: '✦', label: 'Word garden' };
  return { kind: 'video', mark: letter || '▶', label: 'Apty explorer' };
}

export default function WordGarden() {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const stickers = englishLessons.filter(isEnglishLessonPublished).flatMap(lesson => lesson.activities.map(activity => ({ activity, lesson: lesson.id }))).filter(({ activity }) => ready && access.completed.has(activity.id));
  const learned = new Map<string, { word: string; id: string; lesson: string }>();
  for (const { activity, lesson } of stickers) for (const word of practisedWords(activity)) {
    if (!learned.has(word)) learned.set(word, { word, id: activity.id, lesson });
  }
  const plants = [...learned.values()];
  const books = stickers.flatMap(({ activity, lesson }) => programmeTrials(getProgrammeActivity(activity.id)?.tasks || []).flatMap(task => task.kind === 'book' ? [{ title: task.title, id: activity.id, taskId: task.id, lesson }] : []));
  // A writing sticker needs a completed writing turn or actual recorded forms.
  // Watching Explore videos, matching cases, and deferring an offer do not count.
  const gardenStickers = [
    ...stickers.map(({ activity }) => ({ id: activity.id, ...stickerFor(activity) })),
    ...Object.entries(progress.formationOffers || {}).flatMap(([activityId, offer]) => {
      const letter = getFormationLetter(activityId);
      if (!ready || !letter || !access.activities.has(activityId)) return [];
      const forms = [...new Set(offer.forms.filter(form => form === letter || form === letter.toUpperCase()))];
      return forms.length ? [{ id: `formation-${activityId}`, kind: 'write' as const, mark: forms.join(' '), label: 'Letter maker' }] : [];
    }),
  ];
  function wordCards(words: typeof plants) {
    return <div className="en-garden-grid">{words.map(({ word, id, lesson }) => <Link key={word} className="en-word-plant is-grown" href={`/english/learn/${lesson}?activity=${id}`} aria-label={`Practise ${word} again`}><Icon name="leaf" size={30} /><strong>{word}</strong><span>Play again <Icon name="redo" size={19} /></span></Link>)}</div>;
  }
  function stickerCards(items: typeof gardenStickers) {
    return <div className="en-sticker-garden-grid">{items.map(sticker => <StickerToken key={sticker.id} kind={sticker.kind} sticker={sticker.mark} label={sticker.label} />)}</div>;
  }
  return <section className="en-word-garden"><h1>My word garden</h1><p>{plants.length ? 'Words we have practised. Let’s play again!' : 'Your words will grow here as you play.'}</p>
    {plants.length ? <>{wordCards(plants.slice(-12))}{plants.length > 12 && <details className="en-child-more-lessons"><summary><Icon name="book" size={22} /> More of my words <Icon name="chevron" size={20} /></summary>{wordCards(plants.slice(0, -12))}</details>}</> : <Link className="en-garden-start en-overview-secondary" href="/english/dashboard"><Icon name="play" size={24} /> Let’s learn a word <Icon name="arrow" size={20} /></Link>}
    {books.length > 0 && <section className="en-child-book-shelf" aria-labelledby="en-my-books-title"><h2 id="en-my-books-title">Books we explored</h2><div>{books.map(book => <Link className="en-child-book" key={`${book.id}-${book.taskId}`} href={`/english/learn/${book.lesson}?activity=${book.id}`}><Icon name="book" size={34} /><strong>{book.title}</strong><span>Read together <Icon name="redo" size={18} /></span></Link>)}</div></section>}
    <p className="en-fine">Your garden remembers practice. It isn’t a reading assessment.</p>
    <section className="en-sticker-garden" aria-labelledby="sticker-garden-title"><h2 id="sticker-garden-title">Apty’s sticker garden</h2><p>{gardenStickers.length ? `${gardenStickers.length} sticker${gardenStickers.length === 1 ? '' : 's'} for taking part.` : 'Your first sticker is waiting in the learning path.'}</p>{gardenStickers.length > 0 && <>{stickerCards(gardenStickers.slice(-12))}{gardenStickers.length > 12 && <details className="en-child-more-lessons"><summary>More stickers <Icon name="chevron" size={20} /></summary>{stickerCards(gardenStickers.slice(0, -12))}</details>}</>}</section>
  </section>;
}
