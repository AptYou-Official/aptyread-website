'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icons';

type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
export default function PwaInstall() {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);
  const help = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const media = matchMedia('(display-mode: standalone)');
    const check = () => setInstalled(media.matches || !!(navigator as Navigator & { standalone?: boolean }).standalone);
    const capture = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPrompt); };
    const done = () => { setInstalled(true); setPrompt(null); };
    check(); setIos(/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    media.addEventListener('change', check); window.addEventListener('beforeinstallprompt', capture); window.addEventListener('appinstalled', done);
    return () => { media.removeEventListener('change', check); window.removeEventListener('beforeinstallprompt', capture); window.removeEventListener('appinstalled', done); };
  }, []);
  async function install() {
    if (!prompt) { help.current?.showModal(); return; }
    try { await prompt.prompt(); await prompt.userChoice; } catch { help.current?.showModal(); }
    setPrompt(null);
  }
  return <>
    <button className="en-install-button" onClick={install} disabled={installed}><Icon name={installed ? 'check' : 'download'} size={19} />{installed ? 'Added to your home' : 'Add to home screen'}</button>
    <dialog ref={help} className="en-dialog" aria-labelledby="en-install-title" onClick={e => { if (e.target === e.currentTarget) help.current?.close(); }}>
      <button className="en-icon-button en-dialog-close" onClick={() => help.current?.close()} aria-label="Close install instructions"><Icon name="close" /></button>
      <div className="en-dialog-icon"><Icon name="download" size={32} /></div><h2 id="en-install-title">A little reading, one tap away.</h2>
      <p>Add AptyRead to your home screen to open your learning space like an app.</p>
      {ios ? <ol><li>Open this page in Safari.</li><li>Tap Share, then <strong>Add to Home Screen</strong>.</li><li>Keep <strong>Open as Web App</strong> on if shown, then tap Add.</li></ol> : <ol><li>Open your browser’s menu.</li><li>Choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</li><li>Follow the steps to add AptyRead.</li></ol>}
      <p className="en-fine">If your browser doesn’t offer installation, you can keep learning here. Open a lesson online once to save its page for offline visits. Streamed videos and some device voices need a connection.</p>
      <button className="en-button" onClick={() => help.current?.close()}>Got it <Icon name="check" size={18} /></button>
    </dialog>
  </>;
}
