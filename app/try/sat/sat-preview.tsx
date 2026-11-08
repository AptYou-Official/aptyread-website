"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useDeviceStore } from "@/lib/device-store";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/play-store-conversion";
import { PreviewAudio, type PreviewClip, type PreviewAudioState } from "@/lib/preview-audio";
import blendAudio from "@/lib/sat-blend-cues.json";

type Stage = "build" | "blend" | "read" | "meaning" | "choose" | "done";
const letters = ["s", "a", "t"] as const;
const clip = (name: string): PreviewClip => ({ src: `/try-assets/sat/${name}.mp3` });
const warmSounds = ["s", "a", "t", "story-sat", "find-sat", "word-sat"].map(name => clip(name).src).concat(blendAudio.src);
const wordStart = blendAudio.cues.find(cue => cue.kind === "word")!.start;
type SoundRequest = {
  clips: PreviewClip[];
  onStarted?: () => void;
  onTime?: (seconds: number) => void;
  onSuccess?: () => void;
  onPrepare?: () => void;
};

// These two small pictures stay mounted from the start of the activity.
// A tap only switches visibility, so narration never races a new image request.
function useSamPicture(pose: "standing" | "sat") {
  const [load, setLoad] = useState<{ attempt: number; status: "loading" | "ready" | "error" }>({ attempt: 0, status: "loading" });
  const attempt = load.attempt;
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLoad(current => current.attempt === attempt && current.status === "loading" ? { ...current, status: "error" } : current);
    }, 8000);
    return () => window.clearTimeout(timeout);
  }, [attempt]);

  function settle(status: "ready" | "error") {
    setLoad(current => current.attempt === attempt ? { ...current, status } : current);
  }

  return {
    ...load,
    src: `/try-assets/sat/sam-${pose}.webp${attempt ? `?retry=${attempt}` : ""}`,
    onLoad: async (event: SyntheticEvent<HTMLImageElement>) => {
      const image = event.currentTarget;
      try {
        await image.decode();
        if (image.isConnected) settle(image.naturalWidth > 0 ? "ready" : "error");
      } catch {
        if (image.isConnected) settle("error");
      }
    },
    onError: () => settle("error"),
    retry: () => setLoad(current => current.status === "error" ? { attempt: current.attempt + 1, status: "loading" } : current),
  };
}

function SoundIcon() {
  return <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m11 5-6 4H2v6h3l6 4V5Z" /><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /></svg>;
}

// Native links only: the activity never sends answers or store taps to trackers.
function PreviewDownloads() {
  const device = useDeviceStore();
  return <footer className="sat-downloads" aria-label="Download AptyRead at any time">
    <p>For grown-ups <span aria-hidden="true">·</span> 9 free lessons in the app</p>
    {device ? <a className="sat-store-primary" href={device === "android" ? PLAY_STORE_URL : APP_STORE_URL} target="_top">
      {device === "android" ? "Get AptyRead on Google Play" : "Get AptyRead on the App Store"}
    </a> : <div className="sat-store-badges">
      <a href={PLAY_STORE_URL} target="_top" aria-label="Download AptyRead on Google Play"><Image src="/homepage/store-google.png" width={188} height={56} alt="Get it on Google Play" unoptimized /></a>
      <a href={APP_STORE_URL} target="_top" aria-label="Download AptyRead on the App Store"><Image src="/homepage/store-apple.svg" width={168} height={56} alt="Download on the App Store" unoptimized /></a>
    </div>}
  </footer>;
}

export default function SatPreview({ embedded = false }: { embedded?: boolean }) {
  const standingPicture = useSamPicture("standing");
  const sittingPicture = useSamPicture("sat");
  const picturesReady = standingPicture.status === "ready" && sittingPicture.status === "ready";
  const pictureError = standingPicture.status === "error" || sittingPicture.status === "error";
  const [stage, setStage] = useState<Stage>("build");
  const [placed, setPlaced] = useState(0);
  const [busy, setBusy] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [joined, setJoined] = useState(false);
  const [sitting, setSitting] = useState(false);
  const [meaningHeard, setMeaningHeard] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [hint, setHint] = useState("");
  const [audioError, setAudioError] = useState(false);
  const [audioState, setAudioState] = useState<PreviewAudioState | "idle">("idle");
  const busyNow = useRef(false);
  const retryRequest = useRef<SoundRequest | null>(null);
  const audio = useRef<PreviewAudio | null>(null);
  const action = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const scrollArea = useRef<HTMLElement>(null);
  const step = stage === "done" ? 3 : ["meaning", "choose"].includes(stage) ? 2 : ["blend", "read"].includes(stage) ? 1 : 0;

  useEffect(() => {
    const player = audio.current ??= new PreviewAudio();
    player.preload(warmSounds);
    const stop = () => {
      action.current += 1;
      audio.current?.stop();
      // Returning from another app can retry the interrupted action in place.
      if (busyNow.current && retryRequest.current) setAudioError(true);
      busyNow.current = false;
      setBusy(false);
      setAudioState("idle");
      setHighlight(-1);
    };
    const onHidden = () => { if (document.hidden) stop(); };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && embedded) {
        stop();
        window.parent.postMessage({ type: "aptyread-preview-close" }, window.location.origin);
      }
    };
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("pagehide", stop);
    document.addEventListener("keydown", onKey);
    return () => {
      action.current += 1;
      busyNow.current = false;
      player.dispose();
      if (audio.current === player) audio.current = null;
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("pagehide", stop);
      document.removeEventListener("keydown", onKey);
    };
  }, [embedded]);

  useEffect(() => {
    if (stage !== "build") heading.current?.focus({ preventScroll: true });
    scrollArea.current?.scrollTo({ top: 0 });
  }, [stage]);

  async function listen(request: SoundRequest) {
    if (busyNow.current) return;
    const current = ++action.current;
    busyNow.current = true;
    retryRequest.current = request;
    setBusy(true);
    setAudioError(false);
    setHighlight(-1);
    request.onPrepare?.();
    audio.current ??= new PreviewAudio();
    // play() is reached synchronously from the tap, never after a preload await.
    const played = await audio.current.play(request.clips, () => {
      if (current === action.current) request.onStarted?.();
    }, {
      onState: state => { if (current === action.current) setAudioState(state); },
      onTime: request.onTime ? seconds => { if (current === action.current) request.onTime?.(seconds); } : undefined,
    });
    if (current !== action.current) return;
    busyNow.current = false;
    setBusy(false);
    setAudioState("idle");
    setHighlight(-1);
    setAudioError(!played);
    if (played) {
      retryRequest.current = null;
      request.onSuccess?.();
    }
  }

  function clearSound() {
    action.current += 1;
    audio.current?.stop();
    busyNow.current = false;
    retryRequest.current = null;
    setBusy(false); setHighlight(-1); setAudioState("idle"); setAudioError(false);
  }

  function goTo(next: Stage) {
    clearSound();
    setStage(next);
  }

  function reset() {
    clearSound();
    setStage("build"); setPlaced(0);
    setJoined(false); setSitting(false); setMeaningHeard(false);
    setCorrect(false); setHint("");
    scrollArea.current?.scrollTo({ top: 0 });
  }

  function place(letter: typeof letters[number]) {
    if (busyNow.current || placed >= 3) return;
    const expected = letters[placed];
    if (letter !== expected) {
      setHint(`Try ${expected} first. Listen to its sound.`);
      void listen({ clips: [clip(expected)], onStarted: () => setHighlight(placed) });
      return;
    }
    setHint("");
    void listen({
      clips: [clip(letter)],
      onStarted: () => setHighlight(placed),
      onSuccess: () => setPlaced(placed + 1),
    });
  }

  function blend() {
    if (busyNow.current) return;
    setStage("blend"); setHint("");
    void listen({
      clips: [{ src: blendAudio.src }],
      onPrepare: () => setJoined(false),
      onTime: seconds => {
        const cue = blendAudio.cues.find(item => seconds >= item.start && seconds < item.end);
        setHighlight(cue ? letters.findIndex(letter => letter === cue.kind) : -1);
        setJoined(seconds >= wordStart);
      },
      onSuccess: () => setStage("read"),
    });
  }

  function showMeaning() {
    if (busyNow.current || !picturesReady) return;
    setSitting(true); // Show the completed action before its past-tense narration.
    void listen({ clips: [clip("story-sat")], onSuccess: () => setMeaningHeard(true) });
  }

  function findMeaning() {
    if (busyNow.current || !picturesReady) return;
    setStage("choose"); setHint("");
    void listen({ clips: [clip("find-sat")] });
  }

  function choose(isSitting: boolean) {
    if (busyNow.current || correct || !picturesReady) return;
    setCorrect(isSitting);
    setHint(isSitting ? "Yes. Sam sat." : "Look again. Who sat down?");
    void listen({ clips: [clip("word-sat")] });
  }

  const title = stage === "build" ? placed < 3 ? "Let’s make a word." : "You made sat." : stage === "blend" ? "Put the sounds together." : stage === "read" ? "Your turn." : stage === "meaning" ? "What does sat mean?" : stage === "choose" ? "Find sat." : "Keep learning together.";

  return <div className="sat-preview" data-stage={stage}>
    <header className="sat-header">
      <div className="sat-brand"><Image src="/homepage/apty-mascot.webp" width={50} height={50} alt="" unoptimized /><div><span>AptyRead</span><p>Make and read <span className="sat-reading">sat</span></p></div></div>
      {!embedded && <a className="sat-back" href="/download" target="_top">Back</a>}
      <button className="sat-restart" onClick={reset} aria-label="Start the activity again">Start again</button>
    </header>
    <ol className="sat-progress" aria-label="Activity steps">
      {["Build", "Read", "Understand"].map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} className={index <= step ? "is-reached" : ""}><span aria-hidden="true" />{label}</li>)}
    </ol>
    <main ref={scrollArea} className="sat-main">
      <div className="sat-stage">
        <h1 ref={heading} tabIndex={-1}>{title}</h1>
        {audioError && <div className="sat-audio-error">
          <p role="status">Sound couldn’t play. Try again from here.</p>
          <button className="sat-listen" onClick={() => { if (retryRequest.current) void listen(retryRequest.current); }} disabled={busy}><SoundIcon />Retry sound</button>
        </div>}
        {audioState === "loading" && <p className="sat-loading" role="status">Loading sound…</p>}
        {stage === "build" && <>
          <p className="sat-instruction">{placed < 3 ? <>Tap <span className="sat-reading">{letters[placed]}</span> and listen to its sound.</> : "Now listen as the sounds come together."}</p>
          <div className="sat-slots" aria-label={`Word built so far: ${letters.slice(0, placed).join(", ") || "no letters yet"}`}>
            {letters.map((letter, index) => <span key={letter} className={`sat-slot sat-reading ${index < placed ? "is-filled" : ""} ${highlight === index ? "is-sounding" : ""}`}>{index < placed ? letter : <span aria-hidden="true">·</span>}</span>)}
          </div>
          {placed < 3 ? <div className="sat-letter-bank" aria-label="Choose a letter sound">{letters.map((letter, index) => <button key={letter} className={`sat-letter sat-reading ${index === placed ? "is-next" : ""}`} disabled={busy || index < placed} onClick={() => void place(letter)} aria-label={`Sound ${letter}`}>{letter}</button>)}</div> : <button className="sat-action" onClick={() => void blend()} disabled={busy}><SoundIcon />Blend sat</button>}
          <p className="sat-status" role="status">{hint || (audioState === "playing" ? "Listen…" : !busy && placed < 3 ? "Sound on. Take your time." : "")}</p>
        </>}
        {(stage === "blend" || stage === "read") && <>
          <p className="sat-instruction">{stage === "blend" ? "Listen to the sounds, then the word." : "Try saying the word together. Take your time."}</p>
          <div className={`sat-blend sat-reading ${joined ? "is-joined" : ""}`} aria-label="sat">{letters.map((letter, index) => <span key={letter} aria-hidden="true" className={highlight === index ? "is-sounding" : ""}>{letter}</span>)}</div>
          <button className="sat-listen" disabled={busy} onClick={() => void blend()}><SoundIcon />{audioState === "loading" ? "Loading sound…" : busy ? "Listening…" : "Listen again"}</button>
          {stage === "read" && <button className="sat-action" onClick={() => goTo("meaning")} disabled={busy}>What does it mean?</button>}
        </>}
        <div hidden={stage !== "meaning" && stage !== "choose"}>
          {stage === "meaning" && <p className="sat-instruction">{picturesReady ? sitting ? "Sam sat on the mat." : "Tap Sam and watch what happens." : "Let’s see what sat means."}</p>}
          {stage === "choose" && <>
            <p className="sat-instruction">Which picture shows <span className="sat-reading">sat</span>?</p>
            <button className="sat-listen sat-question-audio" onClick={() => void listen({ clips: [clip("find-sat")] })} disabled={busy || !picturesReady}><SoundIcon />Listen</button>
          </>}
          {!picturesReady && <div className="sat-picture-loading" aria-busy={!pictureError}>
            <p role="status">{pictureError ? "The pictures couldn’t load. Try again from here." : "Loading pictures…"}</p>
            {pictureError && <button className="sat-listen" onClick={() => { standingPicture.retry(); sittingPicture.retry(); }}>Retry pictures</button>}
          </div>}
          <div className={stage === "choose" ? "sat-pictures" : "sat-scene-wrap"} hidden={!picturesReady}>
            {[false, true].map(isSitting => {
              const picture = isSitting ? sittingPicture : standingPicture;
              return <button
                key={String(isSitting)}
                className={stage === "choose" ? `sat-picture ${correct && isSitting ? "is-correct" : ""}` : `sat-scene ${isSitting ? "has-sat" : ""}`}
                hidden={stage !== "choose" && sitting !== isSitting}
                onClick={() => stage === "choose" ? choose(isSitting) : showMeaning()}
                disabled={busy || !picturesReady || (stage === "choose" && correct)}
                aria-label={stage === "choose" ? isSitting ? "Sam sitting on the mat" : "Sam standing on the mat" : isSitting ? "Hear Sam sat on the mat again" : "Tap Sam to see sat"}
              >
                <Image key={picture.attempt} src={picture.src} width={600} height={600} alt="" loading="eager" onLoad={picture.onLoad} onError={picture.onError} unoptimized />
                {stage === "meaning" && <span className="sat-scene-label"><SoundIcon />{isSitting ? "Listen again" : "Tap Sam"}</span>}
                {stage === "choose" && correct && isSitting && <span className="sat-correct" aria-hidden="true">✓</span>}
              </button>;
            })}
          </div>
          {stage === "meaning" && meaningHeard && <button className="sat-action" onClick={() => void findMeaning()} disabled={busy || !picturesReady}>Find sat</button>}
          {stage === "choose" && <>
            <p className="sat-status" role="status">{hint}</p>
            {correct && <button className="sat-action" onClick={() => goTo("done")} disabled={busy || !picturesReady}>Continue</button>}
          </>}
        </div>
        {stage === "done" && <>
          <Image className="sat-finish-mascot" src="/homepage/apty-mascot.webp" width={140} height={140} alt="Apty holding a storybook" unoptimized />
          <p className="sat-finish-copy">Build words. Read them.<br />Discover what they mean.</p>
          <p className="sat-finish-offer"><strong>Download AptyRead to explore 9 free lessons.</strong><br />Including your child’s first story.</p>
          <p className="sat-finish-note">First 4 without an account.<br />Start with Lesson 1 in the app.</p>
          <button className="sat-listen" onClick={reset}>Play this activity again</button>
        </>}
      </div>
    </main>
    <PreviewDownloads />
  </div>;
}
