'use client';

import { useEffect, useState } from 'react';
import { Activity, BUNNY_LIBRARY, englishVideos } from '@/lib/english-curriculum';
import Icon from './Icons';
import LetterIntroduction from './LetterIntroduction';

export default function LessonVideo({ activity, suspended = false, onComplete }: { activity: Activity; suspended?: boolean; onComplete: () => void }) {
  const [portrait, setPortrait] = useState(false);
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const video = englishVideos[activity.id];
  useEffect(() => {
    const media = matchMedia('(max-width: 640px) and (orientation: portrait)');
    const change = () => setPortrait(media.matches);
    change(); media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  // Keep the selected recording stable during playback (rotation must not restart it).
  const isPortrait = started ? selected === video?.portrait : portrait;
  function start() { if (!video) return; setSelected(portrait ? video.portrait : video.landscape); setStarted(true); }
  if (!video && activity.audioIntroduction && activity.letter) return <LetterIntroduction letter={activity.letter} suspended={suspended} onComplete={onComplete} />;
  return <div className="en-video-step en-video-studio"><h1>Watch and try.</h1>
    {video ? <><div className={`en-video-frame ${isPortrait ? 'is-portrait' : ''}`}>{started ? <iframe src={`https://player.mediadelivery.net/embed/${BUNNY_LIBRARY}/${selected}?autoplay=false&preload=false&responsive=true`} title={activity.title} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : <button className="en-video-poster" onClick={start} aria-label={`Play ${activity.title}`}><span className="en-video-letter">{activity.uppercase ? activity.letter?.toUpperCase() : activity.id.includes('cases') ? `${activity.letter?.toUpperCase()} ${activity.letter}` : activity.letter}</span><span className="en-video-play"><Icon name="play" size={31} /></span><span>Watch with me</span></button>}</div><div className="en-word-dock" aria-label="Your next action"><button className="en-button" onClick={onComplete} disabled={!started}>I watched and tried <Icon name="arrow" size={21} /></button></div>{started && <details className="en-video-help"><summary>Help with the video</summary><p>Tap play inside the video. Watch and try along, then continue when you are ready. If it does not load, check your connection or come back later.</p></details>}</> : <><div className="en-video-placeholder"><span>{activity.uppercase ? activity.letter?.toUpperCase() : activity.id.includes('cases') ? `${activity.letter?.toUpperCase()}${activity.letter}` : activity.letter}</span><Icon name="play" size={29} /><h2>This little video is on its way.</h2><p>Your next topic will unlock after this video is ready and you have watched and tried it. You can practise earlier topics while you wait.</p></div></>}
  </div>;
}
