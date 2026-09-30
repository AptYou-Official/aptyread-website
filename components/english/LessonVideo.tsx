'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Activity, BUNNY_LIBRARY, englishVideos } from '@/lib/english-curriculum';
import Icon from './Icons';
import LetterIntroduction from './LetterIntroduction';
import ExplorePreview from './ExplorePreview';
import ActivitySticker from './ActivitySticker';
import { useEnglish } from './EnglishProvider';

type BunnyPlayer = { on: (event: string, callback: () => void) => void; pause?: () => void; off?: (event: string, callback: () => void) => void; destroy?: () => void };
type PlayerJs = { Player: new (target: HTMLIFrameElement) => BunnyPlayer };

export default function LessonVideo({ activity, suspended = false, onComplete, nextTopic }: { activity: Activity; suspended?: boolean; onComplete: () => void; nextTopic?: string }) {
  const video = englishVideos[activity.id];
  const { preview } = useEnglish();
  const [portrait, setPortrait] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSlow, setVideoSlow] = useState(false);
  const [videoAttempt, setVideoAttempt] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [ended, setEnded] = useState(false);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const player = useRef<BunnyPlayer | null>(null);

  useEffect(() => {
    const media = matchMedia('(max-width: 640px) and (orientation: portrait)');
    const change = () => setPortrait(media.matches);
    change(); setLayoutReady(true); media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => () => { if (loadingTimer.current) clearTimeout(loadingTimer.current); }, []);

  // Keep the selected recording stable during playback (rotation must not restart it).
  const isPortrait = started ? selected === video?.portrait : portrait;

  const start = useCallback(() => {
    if (!video) return;
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    setSelected(portrait ? video.portrait : video.landscape);
    setVideoReady(false);
    setVideoSlow(false);
    setEnded(false);
    setVideoAttempt(value => value + 1);
    setStarted(true);
    loadingTimer.current = setTimeout(() => setVideoSlow(true), 6000);
  }, [video, portrait]);

  useEffect(() => {
    if (video && layoutReady && !started) start();
  }, [layoutReady, started, video, start]);
  useEffect(() => { if (suspended) player.current?.pause?.(); }, [suspended]);

  function loaded() {
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    setVideoReady(true);
    setVideoSlow(false);
  }

  useEffect(() => {
    if (!started || !videoReady || !iframe.current) return;
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let instance: BunnyPlayer | null = null;
    const complete = () => setEnded(true);
    const message = (event: MessageEvent) => {
      if (event.source !== iframe.current?.contentWindow) return;
      let data: unknown = event.data;
      if (typeof data === 'string') { try { data = JSON.parse(data); } catch { return; } }
      if (data && typeof data === 'object') {
        const value = data as Record<string, unknown>;
        const name = value.event || value.type || value.name || value.eventName;
        if (name === 'ended') complete();
      }
    };
    const attach = () => {
      if (cancelled || !iframe.current) return;
      const Player = (window as unknown as { playerjs?: PlayerJs }).playerjs?.Player;
      if (!Player) { retryTimer = setTimeout(attach, 120); return; }
      try { instance = new Player(iframe.current); instance.on('ended', complete); player.current = instance; }
      catch { retryTimer = setTimeout(attach, 250); }
    };
    window.addEventListener('message', message);
    attach();
    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      window.removeEventListener('message', message);
      // Bunny's Player.js cleanup posts back through the iframe. During a
      // Next navigation that iframe may already be detached, so calling
      // off()/destroy() here can throw while the next topic is mounting.
      // The iframe owns its listeners and is removed with this component.
      player.current = null;
    };
  }, [playerReady, selected, started, videoAttempt, videoReady]);

  if (!video && activity.audioIntroduction && activity.letter) return <LetterIntroduction letter={activity.letter} suspended={suspended} onComplete={onComplete} />;
  if (!video && activity.practicePreview && activity.letter) return <ExplorePreview activity={activity} onComplete={onComplete} />;

  return <div className="en-video-step en-video-studio">
    {video ? <>
      <Script src="https://assets.mediadelivery.net/playerjs/player-0.1.0.min.js" strategy="afterInteractive" onLoad={() => setPlayerReady(true)} />
      <div className={`en-video-frame ${isPortrait ? 'is-portrait' : ''}`}>
        {started ? (
          <>
            <iframe ref={iframe} key={`${selected}-${videoAttempt}`} src={`https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY}/${selected}?autoplay=true&preload=true&responsive=true`} title={activity.title} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen onLoad={loaded} />
            {!videoReady && <div className="en-video-loading" role="status"><span>{videoSlow ? 'Still loading.' : 'Loading your video…'}</span>{videoSlow && <button onClick={start}><Icon name="redo" size={16} /> Try again</button>}</div>}
          </>
        ) : (
          <div className="en-video-loading" role="status"><span>Loading your video…</span></div>
        )}
      </div>
      {ended && <><ActivitySticker kind="video" compact title="Apty explorer!" detail="You watched and explored." sticker={activity.letter ? activity.letter.toUpperCase() : '▶'} /><div className="en-word-dock en-video-dock" aria-label="Your next action"><button className="en-button en-video-next" onClick={onComplete}><span className="en-next-topic-copy"><small>Next topic</small><strong>{nextTopic || 'Keep going'}</strong></span><span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button></div></>}
      {preview && !ended && <div className="en-word-dock"><button className="en-button" onClick={onComplete}>Continue preview <Icon name="arrow" /></button></div>}
    </> : <div className="en-video-placeholder"><span>{activity.uppercase ? activity.letter?.toUpperCase() : activity.id.includes('cases') ? `${activity.letter?.toUpperCase()}${activity.letter}` : activity.letter}</span><Icon name="play" size={29} /><h2>Video placeholder</h2><p>Let’s continue to the practice.</p><button className="en-button" onClick={onComplete}>Done <Icon name="arrow" /></button></div>}
  </div>;
}
