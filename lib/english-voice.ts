// Web Speech exposes names and languages, but no gender or speaker-age field.
// Prefer known US female voices only when the browser actually offers them.
const femaleUSNames = [ /\baria\b/i, /\bjenny\b/i, /\bava\b/i, /\bzira\b/i ];

export function chooseEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const american = voices.filter(voice => voice.lang.replace('_', '-').toLowerCase() === 'en-us');
  for (const name of femaleUSNames) {
    const match = american.find(voice => /microsoft/i.test(voice.name) && name.test(voice.name));
    if (match) return match;
  }
  // Other platforms may expose different voices. Preserve the requested accent
  // without guessing a voice's gender or claiming an age for its speaker.
  return american.find(voice => voice.default) || american[0];
}
