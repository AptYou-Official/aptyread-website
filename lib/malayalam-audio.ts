// Public Bunny URLs are case-sensitive. Keep the studio's uploaded filenames.
export type MalayalamAudioId = `A${string}` | `F${string}` | `W${string}` | `J${string}` | `U${string}`;
export function malayalamAudioUrl(id: MalayalamAudioId) {
  const folder = id.startsWith('U') ? 'shared' : 'level1';
  return `https://aptyread-cdn.b-cdn.net/malayalam/${folder}/${id}.mp3`;
}

export const formAudio: Record<string, MalayalamAudioId> = {
  'റ': 'F01', 'ത': 'F02', 'ല': 'F03', 'മ': 'F04',
};
export const joiningAudio: MalayalamAudioId[] = ['J01', 'J02', 'J03'];

// A25 is awaiting upload. These previews use F04 for മ, not that choice prompt.
export function previewAudio(episode: number, form: string, isWord: boolean): MalayalamAudioId[] {
  return isWord ? ['A19', joiningAudio[episode], 'U05'] : [formAudio[form], 'A16'];
}
