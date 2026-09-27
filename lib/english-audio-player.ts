import { EnglishAudioCue } from './english-narration';
import { chooseEnglishVoice } from './english-voice';

export type AudioState = { playing: boolean; notice: string; blocked: boolean };

// A new interaction cancels and settles the old queue, so an old prompt cannot
// continue over a child's next action or a new page.
export function createEnglishAudioPlayer(resolveMedia: (id: string) => string | undefined, report: (state: AudioState) => void) {
  let generation = 0;
  let cancelClip: (() => void) | undefined;
  let notice = '';
  let blocked = false;
  function stop() {
    generation++;
    cancelClip?.(); cancelClip = undefined;
    report({ playing: false, notice, blocked });
  }
  function clip(cue: EnglishAudioCue): Promise<boolean> {
    return new Promise(resolve => {
      let settled = false;
      let cleanup = () => {};
      const finish = (ok: boolean) => {
        if (settled) return;
        settled = true; cleanup(); cancelClip = undefined; resolve(ok);
      };
      cancelClip = () => finish(false);
      const fail = (message: string) => { if (!settled) { notice = message; finish(false); } };
      const needsTap = () => { if (!settled) { blocked = true; fail('Tap the speaker to listen.'); } };
      const src = resolveMedia(cue.id);
      if (src) {
        const recording = new Audio(src);
        cleanup = () => { recording.onended = null; recording.onerror = null; recording.pause(); recording.removeAttribute('src'); recording.load(); };
        recording.onended = () => finish(true);
        recording.onerror = () => fail('The recording could not play. Tap Listen to try again.');
        void recording.play().catch((error: unknown) => {
          if (settled) return;
          if (error && typeof error === 'object' && 'name' in error && error.name === 'NotAllowedError') needsTap();
          else fail('The recording could not play. Tap Listen to try again.');
        });
      } else if (cue.narration && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(cue.narration);
        speech.lang = 'en-US'; speech.rate = 0.85; speech.pitch = 1;
        // Read the current list for every cue: many browsers load it lazily.
        const voice = chooseEnglishVoice(window.speechSynthesis.getVoices());
        if (voice) speech.voice = voice;
        cleanup = () => { speech.onend = null; speech.onerror = null; window.speechSynthesis.cancel(); };
        speech.onend = () => finish(true);
        speech.onerror = event => {
          if (event.error === 'not-allowed') needsTap();
          else fail('The device voice could not play. Tap Listen to retry, or read the prompt together.');
        };
        try { window.speechSynthesis.speak(speech); }
        catch (error: unknown) {
          if (error && typeof error === 'object' && 'name' in error && error.name === 'NotAllowedError') needsTap();
          else fail('The device voice could not play. Read the prompt together.');
        }
      } else {
        fail(cue.narration ? 'This device has no spoken voice. Read the prompt together.' : 'This sound is not available. Tap Listen to try again.');
      }
    });
  }
  async function sequence(cues: EnglishAudioCue[], onCue?: (index: number) => void) {
    stop(); notice = ''; blocked = false;
    const token = generation;
    report({ playing: true, notice, blocked });
    let ok = true;
    for (let index = 0; index < cues.length; index++) {
      if (generation !== token) return false;
      onCue?.(index);
      const played = await clip(cues[index]);
      ok = ok && played;
      // An autoplay rejection must preserve the whole prompt for a user tap,
      // rather than skipping optional instructions and playing only its sound.
      if (blocked || (!played && !cues[index].optional)) break;
    }
    if (generation !== token) return false;
    report({ playing: false, notice, blocked });
    return ok;
  }
  return { stop, sequence, play: (id: string, narration?: string) => sequence([{ id, narration }]) };
}
