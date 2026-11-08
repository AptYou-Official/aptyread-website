export type PreviewClip = { src: string; pauseBefore?: number };

/** One user-started audio sequence. Nothing is recorded, persisted or reported. */
export class PreviewAudio {
  private audio: HTMLAudioElement | null = null;
  private generation = 0;
  private cancelPending: (() => void) | null = null;

  constructor(
    private readonly createAudio: () => HTMLAudioElement = () => new Audio(),
    private readonly timeoutMs = 12000,
  ) {}

  stop() {
    this.generation += 1;
    this.cancelPending?.();
    this.cancelPending = null;
    this.audio?.pause();
  }

  private wait(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      const finish = (ok: boolean) => {
        clearTimeout(timer);
        if (this.cancelPending === cancel) this.cancelPending = null;
        resolve(ok);
      };
      const cancel = () => finish(false);
      const timer = setTimeout(() => finish(true), ms);
      this.cancelPending = cancel;
    });
  }

  private playClip(src: string): Promise<boolean> {
    this.audio ??= this.createAudio();
    const audio = this.audio;
    return new Promise(resolve => {
      let settled = false;
      const finish = (ok: boolean) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        audio.removeEventListener("ended", ended);
        audio.removeEventListener("error", failed);
        if (this.cancelPending === cancel) this.cancelPending = null;
        if (!ok) audio.pause();
        resolve(ok);
      };
      const ended = () => finish(true);
      const failed = () => finish(false);
      const cancel = () => finish(false);
      const timer = setTimeout(failed, this.timeoutMs);
      this.cancelPending = cancel;
      audio.addEventListener("ended", ended);
      audio.addEventListener("error", failed);
      audio.preload = "auto";
      audio.src = src;
      try { void audio.play().catch(failed); } catch { failed(); }
    });
  }

  async play(clips: PreviewClip[], onClip?: (index: number) => void): Promise<boolean> {
    this.stop();
    const generation = this.generation;
    for (let index = 0; index < clips.length; index += 1) {
      if (generation !== this.generation) return false;
      const clip = clips[index];
      if (clip.pauseBefore && !await this.wait(clip.pauseBefore)) return false;
      if (generation !== this.generation) return false;
      onClip?.(index);
      try {
        if (!await this.playClip(clip.src)) return false;
      } catch { return false; }
    }
    return generation === this.generation;
  }
}
