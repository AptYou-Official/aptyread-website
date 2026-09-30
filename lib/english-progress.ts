import { englishLessons, englishVideos } from './english-curriculum';
import { FirstWordsAction, FirstWordsProgress, freshFirstWords, nextFirstWords, readFirstWords, ReviewPair } from './english-review';
import { freshSentenceReview, nextSentenceReview, readSentenceReview, SentenceReviewAction, SentenceReviewProgress } from './english-sentence-review';
import { ParentHelpLanguage } from './english-parent-help';
import { APPLICATION_ID, ApplicationAction, ApplicationProgress, freshApplication, nextApplication, readApplication } from './english-application';
import { getProgrammeActivity } from './english-programme';
import { getFormationLetter } from './english-learning-journey';
import { nextProgrammeState, freshProgrammeState, programmeEvidence, programmeSteps, readProgrammeState, type ProgrammeAction, type ProgrammeEvidence, type ProgrammeState } from './english-programme-progress';

export const ENGLISH_PROGRESS_KEY = 'apty.english.progress.v1';
export type WordProgress = { stage: number; built: string; reads: number; answers: Record<string, boolean[]>; started?: boolean; mode?: 'guided' | 'independent'; journeyVersion?: 2 };
export const wordFinishStage = (word: string) => word === 'sat' ? 5 : 3;
export type EnglishFormationOffer = { status: 'pending' | 'later' | 'practised'; forms: string[] };
export type EnglishProgress = {
  version: 1;
  contentVersion?: 2;
  /** In-memory adult sandbox only. readEnglishProgress never restores this. */
  preview?: true;
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
  programme?: Record<string, ProgrammeState>;
  evidence?: ProgrammeEvidence[];
  /** Optional writing invitations; participation is separate from reading completion and accuracy. */
  formationOffers?: Record<string, EnglishFormationOffer>;
  lastLesson: string;
};
export function emptyProgress(): EnglishProgress {
  return { version: 1, contentVersion: 2, current: {}, completed: [], words: {}, lastLesson: 'first-words' };
}
export function createEnglishPreviewProgress(): EnglishProgress {
  return { ...emptyProgress(), preview: true };
}

const allActivities = englishLessons.flatMap(lesson => lesson.activities.map((activity, step) => ({ lessonId: lesson.id, activity, step })));
const learningPath = allActivities.filter(item => !englishLessons.find(lesson => lesson.id === item.lessonId)?.supplemental);

// Only an unbroken sequence of completed topics unlocks the next topic. Older
// out-of-order practice remains saved but cannot open gaps in the learning path.
export function englishAccess(progress: EnglishProgress) {
  if (progress.preview) return {
    completed: new Set(progress.completed), activities: new Set(allActivities.map(item => item.activity.id)),
    lessons: new Set(englishLessons.map(lesson => lesson.id)), next: null as typeof learningPath[number] | null,
  };
  const missing = learningPath.findIndex(item => !progress.completed.includes(item.activity.id));
  const frontier = missing < 0 ? learningPath.length : missing;
  const reached = learningPath.slice(0, frontier + 1);
  const completed = new Set(learningPath.slice(0, frontier).map(item => item.activity.id));
  const known = new Set<string>();
  for (const item of learningPath.slice(0, frontier)) {
    if (item.activity.id.startsWith('meet-') && item.activity.letter) known.add(item.activity.letter);
    const authored = getProgrammeActivity(item.activity.id);
    for (const task of authored ? programmeSteps(authored) : []) if (task.kind === 'sound' && task.mode === 'teach') known.add(task.letter);
  }
  for (const lesson of englishLessons.filter(item => item.supplemental && known.has(item.requiredLetter || ''))) {
    reached.push(...allActivities.filter(item => item.lessonId === lesson.id));
    lesson.activities.forEach(activity => { if (progress.completed.includes(activity.id)) completed.add(activity.id); });
  }
  return {
    completed,
    activities: new Set(reached.map(item => item.activity.id)),
    lessons: new Set(reached.map(item => item.lessonId)),
    next: learningPath[frontier] || null,
  };
}

export function completeEnglishActivity(progress: EnglishProgress, activityId: string): EnglishProgress {
  const item = allActivities.find(entry => entry.activity.id === activityId);
  if (!item || !englishAccess(progress).activities.has(activityId)) return progress;
  if (item.activity.kind === 'practice' && !progress.programme?.[activityId]?.complete) return progress;
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

export function updateProgramme(progress: EnglishProgress, activityId: string, action: ProgrammeAction, at = new Date().toISOString()): EnglishProgress {
  const activity = getProgrammeActivity(activityId);
  if (!activity || !englishAccess(progress).activities.has(activityId)) return progress;
  const previous = progress.programme?.[activityId] || freshProgrammeState(programmeSteps(activity)[0]);
  const next = nextProgrammeState(activity, previous, action);
  if (next === previous) return progress;
  const evidence = programmeEvidence(activity, previous, next, action, at);
  const result = { ...progress, programme: { ...progress.programme, [activityId]: next }, evidence: [...(progress.evidence || []), ...evidence].slice(-2000) };
  return next.complete ? completeEnglishActivity(result, activityId) : result;
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

function formationForms(letter: string, forms: unknown): string[] {
  if (!Array.isArray(forms)) return [];
  return [...new Set<string>(forms.filter((form: unknown): form is string => form === letter || form === letter.toUpperCase()))];
}

/** Offer once at an activity boundary. Replay can offer again without erasing earlier practice. */
export function offerEnglishFormation(progress: EnglishProgress, activityId: string): EnglishProgress {
  const letter = getFormationLetter(activityId);
  if (!letter || !englishAccess(progress).activities.has(activityId)) return progress;
  const previous = progress.formationOffers?.[activityId];
  if (previous?.status === 'pending') return progress;
  const offer: EnglishFormationOffer = { status: 'pending', forms: formationForms(letter, previous?.forms) };
  return { ...progress, formationOffers: { ...progress.formationOffers, [activityId]: offer } };
}

/** Persist participation as soon as a mark/paper self-report occurs, without advancing the invitation. */
export function recordEnglishFormationTry(progress: EnglishProgress, activityId: string, form: string): EnglishProgress {
  const letter = getFormationLetter(activityId);
  const previous = progress.formationOffers?.[activityId];
  if (!letter || previous?.status !== 'pending' || !englishAccess(progress).activities.has(activityId)) return progress;
  const valid = formationForms(letter, [form]);
  if (!valid.length) return progress;
  const forms = formationForms(letter, previous.forms);
  if (forms.includes(valid[0])) return progress;
  const offer: EnglishFormationOffer = { status: 'pending', forms: [...forms, valid[0]] };
  return { ...progress, formationOffers: { ...progress.formationOffers, [activityId]: offer } };
}

/** An empty response postpones this invitation; it never locks the next reading activity. */
export function finishEnglishFormation(progress: EnglishProgress, activityId: string, forms: string[]): EnglishProgress {
  const letter = getFormationLetter(activityId);
  const previous = progress.formationOffers?.[activityId];
  if (!letter || previous?.status !== 'pending' || !Array.isArray(forms) || !englishAccess(progress).activities.has(activityId)) return progress;
  const valid = formationForms(letter, forms);
  // A malformed nonempty response is not a child's explicit choice to practise later.
  if (forms.length > 0 && valid.length === 0) return progress;
  const practised = formationForms(letter, [...formationForms(letter, previous.forms), ...valid]);
  const offer: EnglishFormationOffer = { status: practised.length ? 'practised' : 'later', forms: practised };
  return { ...progress, formationOffers: { ...progress.formationOffers, [activityId]: offer } };
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
  if (requested >= 0 && lesson.activities[step].kind === 'practice' && next.programme?.[lesson.activities[step].id]?.complete) {
    next.programme = { ...next.programme };
    delete next.programme[lesson.activities[step].id];
  }
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
    const legacyOrder: Record<string, string[]> = {
      'first-words': ['meet-s', 'practice-s', 'meet-a', 'practice-a', 'find-a', 'meet-t', 'practice-t', 'find-t', 'build-at', 'build-sat', 'our-first-words'],
      'more-words': ['meet-p', 'practice-p', 'find-p', 'meet-i', 'practice-i', 'find-i', 'meet-n', 'practice-n', 'find-n', 'build-pin', 'build-sit', 'more-little-words', 'more-words-with-apty'],
    };
    for (const lesson of englishLessons) {
      const step = value.current?.[lesson.id];
      let migratedStep = lesson.id === 'first-words' && removedFindS && step > 2 ? step - 1 : step;
      if (value.contentVersion !== 2 && legacyOrder[lesson.id] && Number.isInteger(migratedStep)) {
        const oldId = legacyOrder[lesson.id][migratedStep];
        migratedStep = lesson.activities.findIndex(activity => activity.id === oldId);
      }
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
    if (Array.isArray(value.audioIntroductions)) clean.audioIntroductions = [...new Set<string>(value.audioIntroductions.filter((id: unknown) => typeof id === 'string' && allActivities.some(item => item.activity.id === id && item.activity.audioIntroduction)))];
    if (Array.isArray(value.practicePreviews)) clean.practicePreviews = [...new Set<string>(value.practicePreviews.filter((id: unknown) => typeof id === 'string' && clean.completed.includes(id) && allActivities.some(item => item.activity.id === id && item.activity.practicePreview)))];
    if (value.programme && typeof value.programme === 'object') {
      clean.programme = {};
      for (const [id, record] of Object.entries(value.programme)) { const parsed = readProgrammeState(id, record); if (parsed) clean.programme[id] = parsed; }
    }
    if (Array.isArray(value.evidence)) clean.evidence = value.evidence.filter((row: ProgrammeEvidence) => {
      const activity = row && typeof row.activityId === 'string' && getProgrammeActivity(row.activityId);
      return activity && programmeSteps(activity).some(step => step.id === row.taskId) && typeof row.skillId === 'string' && row.skillId.length < 160 && (row.outcome === 'independent' || row.outcome === 'supported') && typeof row.at === 'string' && Number.isFinite(Date.parse(row.at));
    }).slice(-2000);
    if (value.formationOffers && typeof value.formationOffers === 'object' && !Array.isArray(value.formationOffers)) {
      const available = englishAccess(clean).activities;
      const offers: Record<string, EnglishFormationOffer> = {};
      for (const [id, rawOffer] of Object.entries(value.formationOffers)) {
        const letter = getFormationLetter(id);
        if (!letter || !available.has(id) || !rawOffer || typeof rawOffer !== 'object' || Array.isArray(rawOffer)) continue;
        const record = rawOffer as EnglishFormationOffer;
        if (!['pending', 'later', 'practised'].includes(record.status) || !Array.isArray(record.forms)) continue;
        const forms = formationForms(letter, record.forms);
        if (record.status === 'practised' && !forms.length) continue;
        offers[id] = { status: record.status === 'pending' ? 'pending' : forms.length ? 'practised' : 'later', forms };
      }
      if (Object.keys(offers).length) clean.formationOffers = offers;
    }
    return clean;
  } catch { return clean; }
}
