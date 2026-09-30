import { programmeLessons, programmeTrials } from './english-programme';

/** An invitation inside an existing topic, never an extra reading prerequisite. */
const openingFormation: Record<string, string> = {
  'practice-s': 's', 'find-a': 'a', 'find-t': 't',
  'find-p': 'p', 'find-i': 'i', 'find-n': 'n',
};

export function getFormationLetter(activityId: string): string | undefined {
  if (Object.prototype.hasOwnProperty.call(openingFormation, activityId)) return openingFormation[activityId];
  const task = programmeTrials(activityId).find(task => task.kind === 'sound' && task.mode === 'teach');
  return task?.kind === 'sound' ? task.letter : undefined;
}

export type LessonLearningSummary = {
  sounds: string[]; words: string[]; book?: string; focus: string; revisit: string;
};

export function getLessonLearningSummary(lessonId: string): LessonLearningSummary {
  if (lessonId === 'first-words') return {
    sounds: ['s', 'a', 't'], words: ['at', 'sat'],
    focus: 'Link sounds with letters, blend a first word, then try reading and building with less help.',
    revisit: 'Return to s, a and t on another day. Try sat before playing its model. Sentence listening here is supported word finding.',
  };
  if (lessonId === 'more-words') return {
    sounds: ['p', 'i', 'n'], words: ['tap', 'sit', 'pin', 'pan'],
    focus: 'Combine three new sounds with s, a and t. Use p in tap and i in sit before meeting n.',
    revisit: 'Revisit earlier sounds and words. After n, compare pin and pan together and notice the middle sound.',
  };
  const lesson = programmeLessons.find(item => item.id === lessonId);
  if (!lesson) return { sounds: [], words: [], focus: 'Explore the letter, then choose screen or paper practice.', revisit: 'Make a small mark today and return when useful.' };
  const trials = lesson.activities.flatMap(activity => programmeTrials(activity.id));
  const sounds = trials.flatMap(task => task.kind === 'sound' && task.mode === 'teach' ? [task.letter] : []);
  const words = [...new Set(trials.flatMap(task => task.kind === 'build' || task.kind === 'read' ? [task.word] : []))];
  const books = trials.flatMap(task => task.kind === 'book' ? [task.title] : []);
  return {
    sounds, words, book: books.join(' · ') || undefined,
    focus: lesson.description,
    revisit: lessonId === 'first-book'
      ? 'Use s, a, t, p, i and n in a prepared little story. Revisit pin and build sit after listening together.'
      : 'Mix familiar sounds and words with the new learning. Reread a short book together on another day.',
  };
}
