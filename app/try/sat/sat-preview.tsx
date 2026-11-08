"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDeviceStore } from "@/lib/device-store";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/play-store-conversion";
import { PreviewAudio, type PreviewClip } from "@/lib/preview-audio";

type Stage = "build" | "blend" | "read" | "meaning" | "choose" | "done";
const letters = ["s", "a", "t"] as const;
const clip = (name: string, pauseBefore = 0): PreviewClip => ({ src: `/try-assets/sat/${name}.mp3`, pauseBefore });

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
  const audio = useRef<PreviewAudio | null>(null);
  const action = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const scrollArea = useRef<HTMLElement>(null);
  const step = stage === "done" ? 3 : ["meaning", "choose"].includes(stage) ? 2 : ["blend", "read"].includes(stage) ? 1 : 0;

  useEffect(() => {
    const stop = () => {
      action.current += 1;
      audio.current?.stop();
      setBusy(false);
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
      audio.current?.stop();
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("pagehide", stop);
      document.removeEventListener("keydown", onKey);
    };
  }, [embedded]);

  useEffect(() => {
    if (stage !== "build") heading.current?.focus({ preventScroll: true });
    scrollArea.current?.scrollTo({ top: 0 });
  }, [stage]);

  async function listen(clips: PreviewClip[], onClip?: (index: number) => void) {
    const current = ++action.current;
    setBusy(true);
    setAudioError(false);
    audio.current ??= new PreviewAudio();
    const played = await audio.current.play(clips, onClip);
    if (current !== action.current) return false;
    setBusy(false);
    setHighlight(-1);
    setAudioError(!played);
    return played;
  }

  function reset() {
    action.current += 1;
    audio.current?.stop();
    setStage("build"); setPlaced(0); setBusy(false); setHighlight(-1);
    setJoined(false); setSitting(false); setMeaningHeard(false);
    setCorrect(false); setHint(""); setAudioError(false);
    scrollArea.current?.scrollTo({ top: 0 });
  }

  async function place(letter: typeof letters[number]) {
    if (busy || placed >= 3) return;
    const expected = letters[placed];
    if (letter !== expected) {
      setHint(`Try ${expected} first. Listen to its sound.`);
      await listen([clip(expected)]);
      return;
    }
    setHint("");
    setHighlight(placed);
    if (await listen([clip(letter)])) setPlaced(placed + 1);
  }

  async function blend() {
    if (busy) return;
    setStage("blend"); setJoined(false); setHint("");
    const played = await listen([clip("blend"), clip("s"), clip("a"), clip("t"), clip("word-sat", 600), clip("your-turn", 350)], index => {
      setHighlight(index >= 1 && index <= 3 ? index - 1 : -1);
      if (index === 4) setJoined(true);
    });
    if (played) setStage("read");
  }

  async function showMeaning() {
    if (busy) return;
    setSitting(true); // Show the completed action before its past-tense narration.
    if (await listen([clip("story-sat")])) setMeaningHeard(true);
  }

  async function findMeaning() {
    setStage("choose"); setHint("");
    await listen([clip("find-sat")]);
  }

  async function choose(isSitting: boolean) {
    if (busy || correct) return;
    setCorrect(isSitting);
    setHint(isSitting ? "Yes. Sam sat." : "Look again. Who sat down?");
    await listen([clip("word-sat")]);
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
        {stage === "build" && <>
          <p className="sat-instruction">{placed < 3 ? <>Tap <span className="sat-reading">{letters[placed]}</span> and listen to its sound.</> : "Now listen as the sounds come together."}</p>
          <div className="sat-slots" aria-label={`Word built so far: ${letters.slice(0, placed).join(", ") || "no letters yet"}`}>
            {letters.map((letter, index) => <span key={letter} className={`sat-slot sat-reading ${index < placed ? "is-filled" : ""} ${highlight === index ? "is-sounding" : ""}`}>{index < placed ? letter : <span aria-hidden="true">·</span>}</span>)}
          </div>
          {placed < 3 ? <div className="sat-letter-bank" aria-label="Choose a letter sound">{letters.map((letter, index) => <button key={letter} className={`sat-letter sat-reading ${index === placed ? "is-next" : ""}`} disabled={busy || index < placed} onClick={() => void place(letter)} aria-label={`Sound ${letter}`}>{letter}</button>)}</div> : <button className="sat-action" onClick={() => void blend()} disabled={busy}><SoundIcon />Blend sat</button>}
          <p className="sat-status" role="status">{hint || (busy ? "Listen…" : placed < 3 ? "Sound on. Take your time." : "")}</p>
        </>}
        {(stage === "blend" || stage === "read") && <>
          <p className="sat-instruction">{stage === "blend" ? "Listen to the sounds, then the word." : "Try saying the word together. Take your time."}</p>
          <div className={`sat-blend sat-reading ${joined ? "is-joined" : ""}`} aria-label="sat">{letters.map((letter, index) => <span key={letter} aria-hidden="true" className={highlight === index ? "is-sounding" : ""}>{letter}</span>)}</div>
          <button className="sat-listen" disabled={busy} onClick={() => void blend()}><SoundIcon />{busy ? "Listening…" : "Listen again"}</button>
          {stage === "read" && <button className="sat-action" onClick={() => { setStage("meaning"); setAudioError(false); }} disabled={busy}>What does it mean?</button>}
        </>}
        {stage === "meaning" && <>
          <p className="sat-instruction">{sitting ? "Sam sat on the mat." : "Tap Sam and watch what happens."}</p>
          <button className={`sat-scene ${sitting ? "has-sat" : ""}`} onClick={() => void showMeaning()} disabled={busy} aria-label={sitting ? "Hear Sam sat on the mat again" : "Tap Sam to see sat"}>
            <Image src={`/try-assets/sat/sam-${sitting ? "sat" : "standing"}.webp`} width={600} height={600} alt={sitting ? "Sam sitting on the mat" : "Sam standing on the mat"} unoptimized />
            <span className="sat-scene-label"><SoundIcon />{sitting ? "Listen again" : "Tap Sam"}</span>
          </button>
          {meaningHeard && <button className="sat-action" onClick={() => void findMeaning()} disabled={busy}>Find sat</button>}
        </>}
        {stage === "choose" && <>
          <p className="sat-instruction">Which picture shows <span className="sat-reading">sat</span>?</p>
          <button className="sat-listen sat-question-audio" onClick={() => void listen([clip("find-sat")])} disabled={busy}><SoundIcon />Listen</button>
          <div className="sat-pictures">{[false, true].map(isSitting => <button key={String(isSitting)} className={`sat-picture ${correct && isSitting ? "is-correct" : ""}`} onClick={() => void choose(isSitting)} disabled={busy || correct} aria-label={isSitting ? "Sam sitting on the mat" : "Sam standing on the mat"}>
            <Image src={`/try-assets/sat/sam-${isSitting ? "sat" : "standing"}.webp`} width={600} height={600} alt="" unoptimized />
            {correct && isSitting && <span className="sat-correct" aria-hidden="true">✓</span>}
          </button>)}</div>
          <p className="sat-status" role="status">{hint}</p>
          {correct && <button className="sat-action" onClick={() => setStage("done")} disabled={busy}>Continue</button>}
        </>}
        {stage === "done" && <>
          <Image className="sat-finish-mascot" src="/homepage/apty-mascot.webp" width={140} height={140} alt="Apty holding a storybook" unoptimized />
          <p className="sat-finish-copy">Build words. Read them.<br />Discover what they mean.</p>
          <p className="sat-finish-offer"><strong>Download AptyRead to explore 9 free lessons.</strong><br />Including your child’s first story.</p>
          <p className="sat-finish-note">First 4 without an account.<br />Start with Lesson 1 in the app.</p>
          <button className="sat-listen" onClick={reset}>Play this activity again</button>
        </>}
        {audioError && <p className="sat-audio-error" role="status">Sound didn’t play. Please tap again to retry. You can still download the app below.</p>}
      </div>
    </main>
    <PreviewDownloads />
  </div>;
}
