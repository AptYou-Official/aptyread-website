'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Shared';

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export default function InstallApp() {
  const [ready, setReady] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const help = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const display = window.matchMedia('(display-mode: standalone)');
    const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
    const updateDisplay = () => setInstalled(display.matches || !!navigatorWithStandalone.standalone);
    const onPrompt = (event: Event) => { event.preventDefault(); setInstallEvent(event as InstallEvent); };
    const onInstalled = () => { setInstalled(true); setInstallEvent(null); help.current?.close(); };
    updateDisplay();
    setIos(/iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    setReady(true);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    display.addEventListener('change', updateDisplay);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      display.removeEventListener('change', updateDisplay);
    };
  }, []);

  async function install() {
    if (!installEvent) { help.current?.showModal(); return; }
    setBusy(true); setMessage('');
    try {
      // The native prompt must be called from this explicit user gesture.
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      setMessage(choice.outcome === 'accepted' ? 'Follow your browser to finish adding AptyMalayalam.' : 'No problem. You can add it another time.');
    } catch {
      setMessage('You can also add AptyMalayalam from your browser menu.');
      help.current?.showModal();
    } finally { setInstallEvent(null); setBusy(false); }
  }

  if (!ready || installed) return null;
  return <div className="ml-install">
    <button className="ml-install-button" onClick={install} disabled={busy} aria-haspopup={installEvent ? undefined : 'dialog'}><Icon name="install" size={19} /><span>{busy ? 'Opening…' : installEvent ? 'Install AptyMalayalam' : 'Add to home screen'}</span></button>
    <small>Open straight to your learning space. Internet needed.</small>
    {message && <p className="ml-install-message" role="status">{message}</p>}
    <dialog ref={help} className="ml-install-dialog" aria-labelledby={titleId} onClick={event => { if (event.target === help.current) help.current.close(); }}>
      <div><header><Icon name="install" size={26} /><button className="ml-icon-button" aria-label="Close installation help" onClick={() => help.current?.close()}><Icon name="close" /></button></header>
        <h2 id={titleId}>A little closer, every day.</h2><p>Add AptyMalayalam to your home screen to open straight into the dashboard.</p>
        {ios ? <ol><li>Open this page in Safari.</li><li>Tap Share, then choose <strong>Add to Home Screen</strong>.</li><li>If shown, keep <strong>Open as Web App</strong> on. Tap <strong>Add</strong>.</li></ol> : <ol><li>Open your browser’s menu.</li><li>Look for <strong>Install app</strong> or <strong>Add to Home Screen</strong>. On some desktop browsers, use the install icon in the address bar.</li><li>Follow the browser’s steps to add AptyMalayalam.</li></ol>}
        <p className="ml-install-limit">The option depends on your browser. If you don’t see it, you can keep using the website. This preview needs an internet connection to open; lessons aren’t available offline yet.</p>
        <button className="ml-btn" onClick={() => help.current?.close()}>Got it <Icon name="check" size={18} /></button>
      </div>
    </dialog>
  </div>;
}
