import type { ProgrammeStep } from './english-programme-progress';

/** Optional recorded replacements for the exact cue IDs in the exported plan.
 * Leave an entry absent until its reviewed file exists. Existing opening-lesson
 * recordings and sound-<letter> phonemes retain their current registrations. */
export const programmeMedia: Record<string, string | undefined> = {};

/** Optional teaching models, keyed by l1.<activityId>.<stepId>.model.
 * A missing entry keeps the authored interactive prototype available. */
export const programmeVideoModels: Record<string, { src: string; poster?: string } | undefined> = {};

export function programmeMediaKey(activityId: string, stepId: string, name: string) {
  return `l1.${activityId}.${stepId}.${name}`;
}

export function programmeModelVisible(step: ProgrammeStep, phase: number, ready: boolean) {
  return ready || phase === 0 && (step.kind === 'sound' || step.kind === 'build' || step.kind === 'book-cover' || step.kind === 'listen');
}

/** Shared by the player and recording-plan exporter so recorded directions
 * have the same script as the device-voice fallback. */
export function programmeInstruction(step: ProgrammeStep, phase: number, done: boolean, ready: boolean, heard = false): string {
  if (done) return 'Well done!';
  if (ready) return 'You did it!';
  if (step.kind === 'sound') return !heard ? 'Tap Listen.' : phase === 0 ? 'Say the sound.' : 'Tap the letter.';
  if (step.kind === 'build') return !heard ? 'Tap Listen.' : phase === 0 ? 'Say the word.' : 'Make the word.';
  if (step.kind === 'read') return phase === 0 ? 'Try reading this word.' : 'Tap its picture.';
  if (step.kind === 'book-cover') return heard ? 'Ready for the next part?' : 'Tap Listen.';
  if (step.kind === 'page') return phase === 0 ? 'Your turn to read.' : step.question || 'See the story.';
  return phase === 0 ? heard ? 'Let’s see what happened.' : 'Tap Listen.' : step.question;
}

export function programmeInstructionName(step: ProgrammeStep, phase: number, done: boolean, ready: boolean, heard = false) {
  const changesAfterListening = ['sound', 'build', 'book-cover', 'listen'].includes(step.kind) && !ready;
  return `directions-${done ? 'complete' : phase}${!done && heard && changesAfterListening ? '-heard' : ''}`;
}

// Authored visual models for book conventions. These appear during teaching,
// before the child's print-first page; they are never response hints.
export function programmePreparationVisual(stepId: string, cardId: string): 'cases' | 'names' | 'tracking' | 'punctuation' | undefined {
  const models: Record<string, Partial<Record<string, 'cases' | 'names' | 'tracking' | 'punctuation'>>> = {
    'first-book-read.cover': { 'convention-0': 'cases', 'convention-1': 'names', 'convention-2': 'tracking', 'convention-3': 'punctuation' },
    'cme-tap-read.cover': { 'convention-1': 'tracking', 'convention-2': 'punctuation' },
    'hrg-race-read.cover': { 'convention-0': 'cases' },
    'dko-dig-read.cover': { 'convention-0': 'cases' },
    'lfb-location-read.cover': { 'convention-2': 'cases' },
    'ujw-wet-read.cover': { 'convention-0': 'cases' },
    'vyz-zed-read.cover': { 'convention-0': 'cases' },
    'l1-bridge-story-read.cover': { 'convention-1': 'tracking' },
    'l1-bridge-information-read.cover': { 'convention-2': 'cases' },
  };
  return models[stepId]?.[cardId];
}
