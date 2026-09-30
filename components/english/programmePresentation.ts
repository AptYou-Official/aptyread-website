import { englishLessons, type Activity } from '@/lib/english-curriculum';
import { getProgrammeActivity, programmePracticeWords, type ProgrammeTask, type ProgrammeTrial } from '@/lib/english-programme';
import { getFormationLetter } from '@/lib/english-learning-journey';
import { englishAccess, type EnglishProgress } from '@/lib/english-progress';

/** Resume only the invitation the child actually left open. An older pending
 * invitation must not pull a later visit away from its current reading step. */
export function pendingFormationActivity(progress: EnglishProgress, lessonId?: string) {
  if (lessonId && progress.lastLesson !== lessonId) return null;
  const lesson = englishLessons.find(item => item.id === progress.lastLesson);
  const step = lesson ? progress.current[lesson.id] : undefined;
  const activity = lesson && Number.isInteger(step) ? lesson.activities[step!] : undefined;
  if (!lesson || !activity || !getFormationLetter(activity.id) || progress.formationOffers?.[activity.id]?.status !== 'pending') return null;
  const access = englishAccess(progress);
  return access.activities.has(activity.id) && access.completed.has(activity.id) ? { lessonId: lesson.id, activity, step: step! } : null;
}

export function programmeTrials(tasks: ProgrammeTask[]): ProgrammeTrial[] {
  return tasks.flatMap(task => task.kind === 'review' || task.kind === 'check' ? task.trials : [task]);
}

/** Only explicitly authored build/read words become word-garden entries.
 * Story vocabulary and future choices must not imply a taught word. */
export function practisedWords(activity: Activity): string[] {
  if (activity.word) return [activity.word];
  if (activity.id === 'more-words-with-apty') return ['pan', 'tap'];
  return programmePracticeWords(activity.id);
}

export function programmePicture(activity: Activity): { icon: 'sound' | 'hand' | 'book' | 'leaf' | 'pencil'; mark?: string; label: string } {
  const programme = getProgrammeActivity(activity.id);
  const task = programme?.tasks.find(item => item.kind === 'sound' && item.mode === 'teach') || programme?.tasks[0];
  if (!task) return { icon: 'hand', label: 'Try' };
  if (task.kind === 'sound') return { icon: task.mode === 'teach' ? 'sound' : 'hand', mark: task.letter, label: task.mode === 'teach' ? 'Listen' : 'Find' };
  if (task.kind === 'build') return { icon: 'hand', mark: task.word, label: 'Make' };
  if (task.kind === 'read') return { icon: 'book', mark: task.word, label: 'Read' };
  if (task.kind === 'book') return { icon: 'book', label: 'Story' };
  if (task.kind === 'listen') return { icon: 'sound', label: 'Listen' };
  return { icon: 'leaf', label: 'Try' };
}

export function programmeGroupTitle(activity: Activity): string {
  const tasks = getProgrammeActivity(activity.id)?.tasks;
  const task = tasks?.find(item => item.kind === 'sound' && item.mode === 'teach') || tasks?.[0];
  if (task?.kind === 'sound') return task.mode === 'teach' ? 'Meet the sounds' : 'Listen and find';
  if (task?.kind === 'build') return 'Make words';
  if (task?.kind === 'read') return 'Read and choose';
  if (task?.kind === 'book') return 'Our little book';
  if (task?.kind === 'listen') return 'Listen to a story';
  if (task?.kind === 'check' || task?.kind === 'review') return 'Have a go';
  return 'Let’s practise';
}
