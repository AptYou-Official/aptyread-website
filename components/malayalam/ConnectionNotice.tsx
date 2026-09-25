'use client';

import { useEffect, useState } from 'react';

export default function ConnectionNotice() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);
  return offline ? <p className="ml-connection-notice" role="status">You’re offline. You can explore this open preview. Reconnect before reloading or opening another page.</p> : null;
}
