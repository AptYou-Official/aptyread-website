'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { BUNNY_LIBRARY, WordPronunciationVideo } from '@/lib/english-curriculum';
import Icon from './Icons';

export default function WordPronunciation({ word, video, open, onOpen, onClose }: {
  word: 'at' | 'sat'; video: WordPronunciationVideo; open: boolean; onOpen: () => void; onClose: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  const poster = video.kind === 'file' ? video.poster : undefined;
  const replay = () => {
    if (!player.current) return;
    setFailed(false);
    if (player.current.error) player.current.load();
    else player.current.currentTime = 0;
    void player.current.play().catch(() => setFailed(true));
  };
  const toggle = () => {
    if (!player.current) return;
    if (!player.current.paused) player.current.pause();
    else if (player.current.ended || player.current.error) replay();
    else void player.current.play().catch(() => setFailed(true));
  };
  useEffect(() => {
    const pause = () => { if (document.hidden) onClose(); };
    document.addEventListener('visibilitychange', pause);
    window.addEventListener('pagehide', onClose);
    return () => { document.removeEventListener('visibilitychange', pause); window.removeEventListener('pagehide', onClose); };
  }, [onClose]);
  return <aside className="en-word-model" aria-label={`Watch how to say ${word}`}>
    {open ? <>
      <div className="en-word-model-media" style={video.kind === 'file' ? { aspectRatio: video.aspectRatio } : undefined}>
        {video.kind === 'bunny' ? <iframe title={`Watch and say ${word}`} src={`https://player.mediadelivery.net/embed/${BUNNY_LIBRARY}/${video.id}?autoplay=true&preload=false&responsive=true`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> :
          <button className="en-word-video-toggle" aria-label={playing ? 'Pause video' : `Play ${word} video`} onClick={toggle}>
            <video ref={player} src={video.src} poster={video.poster} aria-label={`Watch and say ${word}`} autoPlay playsInline preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onPlaying={() => setFailed(false)} onError={() => { setPlaying(false); setFailed(true); }} />
            <span className="en-word-video-state"><Icon name={playing ? 'pause' : 'play'} size={16} /></span>
          </button>}
      </div>
      <div className="en-word-model-actions">
        {video.kind === 'file' && <button className="en-text-button" aria-label="Watch again" onClick={replay}><Icon name="redo" size={16} /> Again</button>}
        <button className="en-text-button en-word-model-close" aria-label="Close video" onClick={onClose}><Icon name="close" size={16} /></button>
      </div>
      {failed && <p role="status">Tap Again to retry. You can keep reading, too.</p>}
    </> : <button className={`en-word-model-open ${poster ? 'has-portrait' : ''}`} onClick={() => { setFailed(false); onOpen(); }}>
      {poster ? <><Image src={poster} alt="" width={320} height={320} unoptimized /><span className="en-word-model-label"><Icon name="play" size={18} /> Watch and say</span></> : <><Icon name="play" size={27} /><span>Watch and say</span></>}
    </button>}
  </aside>;
}
