'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ENGLISH_PROGRESS_KEY, emptyProgress, EnglishProgress, readEnglishProgress } from '@/lib/english-progress';

type Context = {
  progress: EnglishProgress; ready: boolean; storageAvailable: boolean; offline: boolean;
  update: (change: (previous: EnglishProgress) => EnglishProgress) => void;
};
const EnglishContext = createContext<Context | null>(null);
export function useEnglish() { const value = useContext(EnglishContext); if (!value) throw new Error('EnglishProvider is required'); return value; }

export default function EnglishProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(emptyProgress);
  const latest = useRef(progress);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    try { latest.current = readEnglishProgress(localStorage.getItem(ENGLISH_PROGRESS_KEY)); setProgress(latest.current); }
    catch { setStorageAvailable(false); }
    setReady(true);
    const connection = () => setOffline(!navigator.onLine);
    connection();
    window.addEventListener('online', connection); window.addEventListener('offline', connection);
    // Development hot-reload assets must never be stored for offline use.
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/english/sw.js', { scope: '/english/', updateViaCache: 'none' }).catch(() => { /* Installation is optional; online learning still works. */ });
    }
    const sync = (event: StorageEvent) => {
      if (event.key !== ENGLISH_PROGRESS_KEY) return;
      latest.current = readEnglishProgress(event.newValue); setProgress(latest.current);
    };
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('online', connection); window.removeEventListener('offline', connection); window.removeEventListener('storage', sync); };
  }, []);
  const update = useCallback((change: (previous: EnglishProgress) => EnglishProgress) => {
    const next = change(latest.current); latest.current = next; setProgress(next);
    try { localStorage.setItem(ENGLISH_PROGRESS_KEY, JSON.stringify(next)); setStorageAvailable(true); }
    catch { setStorageAvailable(false); }
  }, []);
  return <EnglishContext.Provider value={{ progress, update, ready, storageAvailable, offline }}>{children}</EnglishContext.Provider>;
}
