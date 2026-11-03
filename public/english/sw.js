/* Retire only the former English web experiment. Saved app/account progress
   is not touched; these caches contain disposable web documents and assets. */
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    try {
      const names = await caches.keys();
      await Promise.all(names.filter(name => name.startsWith('apty-english-')).map(name => caches.delete(name)));
    } catch {
      // Unregister even if the browser has already removed or blocked its cache.
    }
    await self.clients.claim();
    await self.registration.unregister();
  })());
});

// No fetch handler: existing tabs now use the network and its /download redirect.
