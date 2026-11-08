export type PreviewClip = { src: string; pauseBefore?: number };
export type PreviewAudioState = "loading" | "playing";
export type PreviewAudioCallbacks = {
  onState?: (state: PreviewAudioState) => void;
  onTime?: (seconds: number, index: number) => void;
};

/** User-started sound only. The optional warm-up is in memory, with no tracking. */
export class PreviewAudio {
  private audio: HTMLAudioElement | null = null;
  private generation = 0;
  private cacheGeneration = 0;
  private cancelPending: (() => void) | null = null;
  private cached = new Map<string, string>();
  private warming = new Map<string, { controller: AbortController; timer: ReturnType<typeof setTimeout> }>();

  constructor(
    private readonly createAudio: () => HTMLAudioElement = () => new Audio(),
    private readonly timeoutMs = 8000,
  ) {}

  preload(sources: string[]) {
    const generation = this.cacheGeneration;
    for (const src of sources) {
      if (this.cached.has(src) || this.warming.has(src)) continue;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      this.warming.set(src, { controller, timer });
      // Never await this before play(): a tap must retain its user activation.
      void fetch(src, { signal: controller.signal, cache: "force-cache", credentials: "omit" })
        .then(response => {
          if (!response.ok) throw new Error("Sound unavailable");
          return response.blob();
        })
        .then(blob => {
          if (!blob.size || controller.signal.aborted || generation !== this.cacheGeneration) return;
          this.cached.set(src, URL.createObjectURL(blob));
        })
        .catch(() => { /* A failed warm-up never prevents direct playback/retry. */ })
        .finally(() => {
          clearTimeout(timer);
          if (this.warming.get(src)?.controller === controller) this.warming.delete(src);
        });
    }
  }

  stop() {
    this.generation += 1;
    this.cancelPending?.();
    this.cancelPending = null;
    this.audio?.pause();
  }

  dispose() {
    this.stop();
    this.cacheGeneration += 1;
    for (const { controller, timer } of this.warming.values()) {
      clearTimeout(timer);
      controller.abort();
    }
    this.warming.clear();
    for (const url of this.cached.values()) URL.revokeObjectURL(url);
    this.cached.clear();
    if (this.audio) {
      this.audio.removeAttribute("src");
      this.audio.load();
      this.audio = null;
    }
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

  private playClip(src: string, onStarted: () => void, callbacks: PreviewAudioCallbacks, index: number): Promise<boolean> {
    this.audio ??= this.createAudio();
    const audio = this.audio;
    return new Promise(resolve => {
      let settled = false;
      let started = false;
      let lastTime = 0;
      let frame: number | undefined;
      let state: PreviewAudioState | undefined;
      let timer: ReturnType<typeof setTimeout>;
      const report = (next: PreviewAudioState) => {
        if (settled || next === state) return;
        state = next;
        callbacks.onState?.(next);
      };
      const finish = (ok: boolean) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (frame !== undefined) cancelAnimationFrame(frame);
        audio.removeEventListener("ended", ended);
        audio.removeEventListener("error", failed);
        audio.removeEventListener("playing", playing);
        audio.removeEventListener("waiting", waiting);
        audio.removeEventListener("timeupdate", progress);
        if (this.cancelPending === cancel) this.cancelPending = null;
        if (!ok) audio.pause();
        resolve(ok);
      };
      const ended = () => finish(true);
      const failed = () => {
        // Allow a new request if an already-warmed file could not be decoded.
        const url = this.cached.get(src);
        if (!settled && url && audio.error) {
          this.cached.delete(src);
          URL.revokeObjectURL(url);
        }
        finish(false);
      };
      const cancel = () => finish(false);
      const armWatchdog = () => {
        clearTimeout(timer);
        timer = setTimeout(failed, this.timeoutMs);
      };
      const progress = () => {
        if (settled || !started) return;
        const time = audio.currentTime;
        if (time > lastTime) {
          lastTime = time;
          armWatchdog();
          report("playing");
        }
        callbacks.onTime?.(time, index);
      };
      const animate = () => {
        if (settled) return;
        progress();
        // Read media time, not elapsed wall time, so buffering cannot move cues.
        frame = requestAnimationFrame(animate);
      };
      const playing = () => {
        if (settled) return;
        if (!started) {
          started = true;
          lastTime = audio.currentTime;
          armWatchdog();
          onStarted();
          if (callbacks.onTime && typeof requestAnimationFrame === "function") frame = requestAnimationFrame(animate);
        }
        report("playing");
        progress();
      };
      const waiting = () => report("loading");
      this.cancelPending = cancel;
      audio.addEventListener("ended", ended);
      audio.addEventListener("error", failed);
      audio.addEventListener("playing", playing);
      audio.addEventListener("waiting", waiting);
      audio.addEventListener("timeupdate", progress);
      audio.preload = "auto";
      audio.src = this.cached.get(src) || src;
      armWatchdog();
      report("loading");
      try { void audio.play().catch(failed); } catch { failed(); }
    });
  }

  async play(clips: PreviewClip[], onClip?: (index: number) => void, callbacks: PreviewAudioCallbacks = {}): Promise<boolean> {
    this.stop();
    const generation = this.generation;
    for (let index = 0; index < clips.length; index += 1) {
      if (generation !== this.generation) return false;
      const clip = clips[index];
      if (clip.pauseBefore && !await this.wait(clip.pauseBefore)) return false;
      if (generation !== this.generation) return false;
      try {
        if (!await this.playClip(clip.src, () => onClip?.(index), callbacks, index)) return false;
      } catch { return false; }
    }
    return generation === this.generation;
  }
}
