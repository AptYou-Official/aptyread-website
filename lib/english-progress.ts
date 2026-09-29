import { englishLessons, englishVideos } from './english-curriculum';
import { FirstWordsAction, FirstWordsProgress, freshFirstWords, nextFirstWords, readFirstWords, ReviewPair } from './english-review';
import { freshSentenceReview, nextSentenceReview, readSentenceReview, SentenceReviewAction, SentenceReviewProgress } from './english-sentence-review';
import { ParentHelpLanguage } from './english-parent-help';
import { APPLICATION_ID, ApplicationAction, ApplicationProgress, freshApplication, nextApplication, readApplication } from './english-application';

export const ENGLISH_PROGRESS_KEY = 'apty.english.progress.v1';
export type WordProgress = { stage: number; built: string; reads: number; answers: Record<string, boolean[]>; started?: boolean; mode?: 'guided' | 'independent'; journeyVersion?: 2 };
export const wordFinishStage = (word: string) => word === 'sat' ? 5 : 3;
export type EnglishProgress = {
  version: 1;
  current: Record<string, number>;
  completed: string[];
  words: Record<string, WordProgress>;
  firstWords?: FirstWordsProgress;
  moreWords?: FirstWordsProgress;
  sentenceReview?: SentenceReviewProgress;
  parentHelpLanguage?: ParentHelpLanguage;
  application?: ApplicationProgress;
  audioIntroductions?: string[];
  practicePreviews?: string[];
  lastLesson: string;
};
export function emptyProgress(): EnglishProgress {
  return { version: 1, current: {}, completed: [], words: {}, lastLesson: 'first-words' };
}

const learningPath = englishLessons.flatMap(lesson => lesson.activities.map((activity, step) => ({ lessonId: lesson.id, activity, step })));

// Only an unbroken sequence of completed topics unlocks the next topic. Older
// out-of-order practice remains saved but cannot open gaps in the learning path.
export function englishAccess(progress: EnglishProgress) {
  const missing = learningPath.findIndex(item => !progress.completed.includes(item.activity.id));
  const frontier = missing < 0 ? learningPath.length : missing;
  const reached = learningPath.slice(0, frontier + 1);
  return {
    completed: new Set(learningPath.slice(0, frontier).map(item => item.activity.id)),
    activities: new Set(reached.map(item => item.activity.id)),
    lessons: new Set(reached.map(item => item.lessonId)),
    next: learningPath[frontier] || null,
  };
}

export function completeEnglishActivity(progress: EnglishProgress, activityId: string): EnglishProgress {
  const item = learningPath.find(entry => entry.activity.id === activityId);
  if (!item || !englishAccess(progress).activities.has(activityId)) return progress;
  if (item.activity.kind === 'video' && !englishVideos[activityId] && !item.activity.audioIntroduction && !item.activity.practicePreview) return progress;
  if (item.activity.kind === 'review') {
    const complete = activityId === 'more-little-words'
      ? progress.moreWords?.stage === 6
      : progress.sentenceReview?.step === 3 || progress.firstWords?.stage === 6;
    if (!complete) return progress;
  }
  if (item.activity.kind === 'apply' && readApplication(progress.application)?.step !== 10) return progress;
  if (item.activity.audioIntroduction && !englishVideos[activityId]) progress = { ...progress, audioIntroductions: [...new Set([...(progress.audioIntroductions || []), activityId])] };
  if (item.activity.practicePreview && !englishVideos[activityId]) progress = { ...progress, practicePreviews: [...new Set([...(progress.practicePreviews || []), activityId])] };
  return { ...progress, completed: [...new Set([...progress.completed, activityId])] };
}

export function updateFirstWords(progress: EnglishProgress, action: FirstWordsAction, pair: ReviewPair = 'first'): EnglishProgress {
  const id = pair === 'first' ? 'our-first-words' : 'more-little-words';
  const key = pair === 'first' ? 'firstWords' : 'moreWords';
  if (!englishAccess(progress).activities.has(id)) return progress;
  const review = nextFirstWords(progress[key] || freshFirstWords(), action, pair);
  const next = { ...progress, [key]: review };
  return review.stage === 6 ? completeEnglishActivity(next, id) : next;
}

export function updateSentenceReview(progress: EnglishProgress, action: SentenceReviewAction): EnglishProgress {
  const id = 'our-first-words';
  if (!englishAccess(progress).activities.has(id)) return progress;
  const review = nextSentenceReview(progress.sentenceReview || freshSentenceReview(), action);
  const next = { ...progress, sentenceReview: review };
  return review.step === 3 ? completeEnglishActivity(next, id) : next;
}

export function updateParentHelpLanguage(progress: EnglishProgress, language: ParentHelpLanguage): EnglishProgress {
  return { ...progress, parentHelpLanguage: language };
}

export function updateApplication(progress: EnglishProgress, action: ApplicationAction): EnglishProgress {
  if (!englishAccess(progress).activities.has(APPLICATION_ID)) return progress;
  const application = nextApplication(progress.application || freshApplication(), action);
  const next = { ...progress, application };
  return application.step === 10 ? completeEnglishActivity(next, APPLICATION_ID) : next;
}

// Unlocked topics can be revisited without losing completion. Completed words
// start a new try; partial tries resume. Locked links do not alter saved progress.
export function enterEnglishActivity(progress: EnglishProgress, lessonId: string, activityId: string | null = null): EnglishProgress {
  const lesson = englishLessons.find(item => item.id === lessonId);
  if (!lesson) return progress;
  const access = englishAccess(progress);
  if (!access.lessons.has(lessonId)) return progress;
  const requested = lesson.activities.findIndex(item => item.id === activityId);
  if (requested >= 0 && !access.activities.has(activityId!)) return progress;
  const fallback = access.next?.lessonId === lessonId ? access.next.step : 0;
  const saved = progress.current[lessonId] ?? fallback;
  const step = requested >= 0 ? requested : access.activities.has(lesson.activities[saved]?.id) ? saved : fallback;
  const word = lesson.activities[step].word;
  let words = progress.words;
  if (requested >= 0 && word && words[word]?.stage === wordFinishStage(word)) {
    words = { ...words };
    delete words[word];
  }
  const next = { ...progress, words, current: { ...progress.current, [lessonId]: step }, lastLesson: lessonId };
  if (requested >= 0 && lesson.activities[step].kind === 'apply' && next.application?.step === 10) delete next.application;
  if (requested >= 0 && lesson.activities[step].kind === 'review') {
    const key = lesson.id === 'more-words' ? 'moreWords' : 'firstWords';
    if (next[key]?.stage === 6) delete next[key];
    if (lesson.id === 'first-words' && next.sentenceReview?.step === 3) delete next.sentenceReview;
  }
  return next;
}

// Storage is user-controlled and may come from an older or interrupted release.
export function readEnglishProgress(raw: string | null): EnglishProgress {
  const clean = emptyProgress();
  if (!raw) return clean;
  try {
    const value = JSON.parse(raw);
    if (!value || value.version !== 1) return clean;
    // The former single-letter `find-s` topic was removed because it repeated
    // Practice s. Shift only records that prove they came from that older
    // sequence; new progress must not have its current index shifted.
    const removedFindS = Array.isArray(value.completed) && value.completed.includes('find-s');
    for (const lesson of englishLessons) {
      const step = value.current?.[lesson.id];
      const migratedStep = lesson.id === 'first-words' && removedFindS && step > 2 ? step - 1 : step;
      if (Number.isInteger(migratedStep) && migratedStep >= 0 && migratedStep < lesson.activities.length) clean.current[lesson.id] = migratedStep;
    }
    const ids = new Set(englishLessons.flatMap(l => l.activities.map(a => a.id)));
    clean.completed = Array.isArray(value.completed) ? [...new Set<string>(value.completed.filter((id: unknown) => typeof id === 'string' && ids.has(id)))] : [];
    if (englishLessons.some(l => l.id === value.lastLesson)) clean.lastLesson = value.lastLesson;
    for (const word of ['at', 'sat', 'pin', 'sit']) {
      const record = value.words?.[word];
      const maxStage = wordFinishStage(word);
      if (!record || !Number.isInteger(record.stage) || record.stage < 0 || record.stage > maxStage || typeof record.built !== 'string' || !word.startsWith(record.built) || !Number.isInteger(record.reads) || record.reads < 0 || record.reads > 2) continue;
      if ((record.stage > 0 && record.built !== word) || (record.stage > 1 && record.reads !== 2)) continue;
      const answers: Record<string, boolean[]> = {};
      for (const scene of ['mat', 'bench']) if (Array.isArray(record.answers?.[scene])) answers[scene] = record.answers[scene].filter((v: unknown) => typeof v === 'boolean').slice(0, 100);
      if (word === 'sat' && ((record.stage > 3 && !answers.mat?.includes(true)) || (record.stage > 4 && !answers.bench?.includes(true)))) continue;
      clean.words[word] = { stage: record.stage, built: record.built, reads: record.reads, answers };
      if (record.journeyVersion === 2) clean.words[word].journeyVersion = 2;
      // The original at activity ended at stage 2. Preserve its completion;
      // the new journey's stage 2 is the meaning scene, stage 3 the celebration.
      if (word === 'at' && record.stage === 2 && record.journeyVersion !== 2 && clean.completed.includes('build-at')) {
        clean.words[word].stage = 3; clean.words[word].journeyVersion = 2;
      }
      if (typeof record.started === 'boolean') clean.words[word].started = record.started;
      if (record.mode === 'guided' || record.mode === 'independent') clean.words[word].mode = record.mode;
    }
    const firstWords = readFirstWords(value.firstWords);
    if (firstWords) clean.firstWords = firstWords;
    const moreWords = readFirstWords(value.moreWords, 'more');
    if (moreWords) clean.moreWords = moreWords;
    const sentenceReview = readSentenceReview(value.sentenceReview);
    if (sentenceReview) clean.sentenceReview = sentenceReview;
    if (value.parentHelpLanguage === 'en' || value.parentHelpLanguage === 'ml' || value.parentHelpLanguage === 'hi') clean.parentHelpLanguage = value.parentHelpLanguage;
    const application = readApplication(value.application);
    if (application) clean.application = application;
    if (Array.isArray(value.audioIntroductions)) clean.audioIntroductions = [...new Set<string>(value.audioIntroductions.filter((id: unknown) => typeof id === 'string' && learningPath.some(item => item.activity.id === id && item.activity.audioIntroduction)))];
    if (Array.isArray(value.practicePreviews)) clean.practicePreviews = [...new Set<string>(value.practicePreviews.filter((id: unknown) => typeof id === 'string' && clean.completed.includes(id) && learningPath.some(item => item.activity.id === id && item.activity.practicePreview)))];
    return clean;
  } catch { return clean; }
}
