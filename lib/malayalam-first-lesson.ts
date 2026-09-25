import type { MalayalamAudioId } from './malayalam-audio';

export const FIRST_LESSON_KEY = 'apty.malayalam.CL1-E01.v1';
export type StepId = 'meaning' | 'ra' | 'match-ra' | 'pause' | 'tha' | 'find-tha' | 'join' | 'build' | 'meaning-choice' | 'finish';
type Step = { id: StepId; heading: string; audio: MalayalamAudioId[]; help: MalayalamAudioId[]; evidence: string };
export const firstLessonSteps: Step[] = [
  { id: 'meaning', heading: 'ഇത് തറ', audio: ['A15'], help: ['A15'], evidence: 'meaning_teaching' },
  { id: 'ra', heading: 'റ', audio: ['F01', 'A16'], help: ['F01', 'A16'], evidence: 'form_teaching_unobserved_speech' },
  { id: 'match-ra', heading: 'ഇതുപോലെയുള്ളത് തൊടൂ', audio: ['A17'], help: ['A03', 'F01'], evidence: 'visual_matching' },
  { id: 'pause', heading: 'ഇനി മുന്നോട്ട് പോകാം', audio: ['A07'], help: ['A07'], evidence: 'child_choice' },
  { id: 'tha', heading: 'ത', audio: ['F02', 'A16'], help: ['F02', 'A16'], evidence: 'form_teaching_unobserved_speech' },
  { id: 'find-tha', heading: 'കേൾക്കൂ, തൊടൂ', audio: ['A18'], help: ['A03', 'F02'], evidence: 'sound_to_print' },
  { id: 'join', heading: 'ഒരു വാക്ക് ഉണ്ടാക്കാം', audio: ['A19', 'J01'], help: ['A19', 'J01'], evidence: 'joining_teaching' },
  { id: 'build', heading: 'വാക്ക് ഉണ്ടാക്കൂ', audio: ['U05'], help: ['A03', 'J01', 'U05'], evidence: 'guided_construction' },
  { id: 'meaning-choice', heading: 'ഇതിന്റെ ചിത്രം തൊടൂ', audio: ['W01', 'A20'], help: ['A03', 'A15', 'A20'], evidence: 'listening_supported_meaning' },
  { id: 'finish', heading: 'പിന്നെ വീണ്ടും വരാം', audio: ['U10'], help: ['W01'], evidence: 'end_of_route_not_mastery' },
];
export type Attempt = {
  options: string[]; built: string[]; selected: string | null; first: string | null;
  responses: { answer: string; correct: boolean; supported: boolean; at: number }[];
  helped: boolean; retryUsed: boolean; revealed: boolean; inputHeard: boolean;
};
export type LessonEvent = { step: StepId; kind: string; at: number; value?: string };
export type FirstLessonRecord = {
  version: 1; step: StepId; visited: StepId[]; attempts: Partial<Record<StepId, Attempt>>;
  events: LessonEvent[]; reachedEnd: boolean;
};
export function freshFirstLesson(): FirstLessonRecord {
  return { version: 1, step: 'meaning', visited: [], attempts: {}, events: [], reachedEnd: false };
}
export function newAttempt(id: StepId): Attempt {
  const choices = id === 'match-ra' ? ['റ', '○'] : id === 'find-tha' ? ['ത', 'റ'] : id === 'meaning-choice' ? ['floor', 'head'] : ['ത', 'റ'];
  return { options: Math.random() < .5 ? choices : [...choices].reverse(), built: [], selected: null, first: null, responses: [], helped: false, retryUsed: false, revealed: false, inputHeard: false };
}
export function readFirstLesson(raw: string | null): FirstLessonRecord {
  try {
    const r = JSON.parse(raw || 'null');
    const ids: string[] = firstLessonSteps.map(s => s.id);
    if (!r || r.version !== 1 || !ids.includes(r.step) || !Array.isArray(r.visited) || !r.visited.every((id: unknown) => typeof id === 'string' && ids.includes(id)) || !Array.isArray(r.events) || !r.attempts || typeof r.attempts !== 'object' || typeof r.reachedEnd !== 'boolean') return freshFirstLesson();
    for (const [id, a] of Object.entries(r.attempts) as [string, Attempt][]) {
      const allowed = id === 'match-ra' ? ['റ', '○'] : id === 'meaning-choice' ? ['floor', 'head'] : ['ത', 'റ'];
      if (!ids.includes(id) || !a || !Array.isArray(a.options) || a.options.length !== 2 || new Set(a.options).size !== 2 || !a.options.every(v => allowed.includes(v)) || !Array.isArray(a.built) || a.built.length > 2 || !a.built.every(v => allowed.includes(v)) || !Array.isArray(a.responses) || a.responses.length > 2 || !a.responses.every(v => typeof v.answer === 'string' && typeof v.correct === 'boolean' && typeof v.supported === 'boolean' && Number.isFinite(v.at)) || ![a.selected, a.first].every(v => v === null || typeof v === 'string') || ![a.helped, a.retryUsed, a.revealed, a.inputHeard].every(v => typeof v === 'boolean')) return freshFirstLesson();
    }
    if (!r.events.every((e: LessonEvent) => e && ids.includes(e.step) && typeof e.kind === 'string' && Number.isFinite(e.at) && (e.value === undefined || typeof e.value === 'string'))) return freshFirstLesson();
    return { ...r, events: r.events.slice(-300) };
  } catch { return freshFirstLesson(); }
}
