/* Only the English learning app is controlled by this worker. Marketing,
   admin pages, APIs and third-party media are deliberately never cached. */
const CACHE = 'apty-english-v36-mobile-readability';
const PREFIX = 'apty-english-';
const PAGES = ['/english/dashboard', '/english/lesson/first-words', '/english/lesson/explore-s', '/english/lesson/explore-a', '/english/lesson/explore-t', '/english/lesson/more-words', '/english/lesson/explore-p', '/english/lesson/explore-i', '/english/lesson/explore-n', '/english/learn/first-words', '/english/learn/explore-s', '/english/learn/explore-a', '/english/learn/explore-t', '/english/learn/more-words', '/english/learn/explore-p', '/english/learn/explore-i', '/english/learn/explore-n'];
const ASSETS = ['/english/media/write-big-p-v1.webp', '/english/media/write-small-p-v1.webp', '/english/media/write-big-i-v1.webp', '/english/media/write-small-i-v1.webp', '/english/media/write-big-n-v1.webp', '/english/media/write-small-n-v1.webp', '/english/media/p-sound.mp3', '/english/media/i-sound.mp3', '/english/media/n-sound.mp3', '/english/media/p-practice-v1.webp', '/english/media/i-practice-v1.webp', '/english/media/n-practice-v1.webp', '/english/offline.html', '/english/manifest.webmanifest', '/images/apty-mascot.png', '/english/media/s-practice-v1.webp', '/english/media/a-practice-v1.webp', '/english/media/t-practice-v1.webp', '/english/media/write-big-s-v1.webp', '/english/media/write-small-s-v1.webp', '/english/media/write-big-a-v1.webp', '/english/media/write-small-a-v1.webp', '/english/media/write-big-t-v1.webp', '/english/media/write-small-t-v1.webp', '/english/media/s-sound.mp3', '/english/media/a-sound.mp3', '/english/media/t-sound.mp3', '/english/icons/icon-192.png', '/english/icons/icon-512.png', '/english/icons/apple-touch-icon.png', '/english/icons/icon-maskable-512.png', '/english/fonts/Andika-OFL.txt'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    // Save complete documents and their versioned Next assets together. Never
    // mix a Next server-component response with a document at the same URL.
    const assets = new Set();
    for (const page of PAGES) {
      const response = await fetch(new Request(page, { cache: 'reload' }));
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) throw new Error('Page could not be saved');
      const html = await response.clone().text();
      await cache.put(page, response);
      for (const match of html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
        if (match[1].startsWith('/_next/static/')) assets.add(match[1]);
      }
    }
    await cache.addAll([...assets]);
    const fonts = new Set();
    for (const path of assets) {
      if (!path.endsWith('.css')) continue;
      const css = await (await cache.match(path)).text();
      for (const match of css.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) {
        const url = new URL(match[1], self.location.origin + path);
        if (url.origin === self.location.origin && url.pathname.startsWith('/_next/static/')) fonts.add(url.href);
      }
    }
    await cache.addAll([...fonts]);
    // The client activates this fully-cached replacement once it is ready.
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') void self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) if (name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name);
    await self.clients.claim();
  })());
});

async function cachedAsset(request) {
  const cache = await caches.open(CACHE);
  const saved = await cache.match(request);
  if (saved) return saved;
  const response = await fetch(request);
  if (response.ok && response.type === 'basic') await cache.put(request, response.clone());
  return response;
}
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.headers.has('RSC') || url.searchParams.has('_rsc')) return;
  // Video models load only on demand. Leave range requests
  // to the browser/server instead of treating a partial MP4 as a cached file.
  if (url.pathname.startsWith('/english/media/') && url.pathname.endsWith('.mp4')) return;
  if (request.mode === 'navigate' && url.pathname.startsWith('/english/')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok && PAGES.includes(url.pathname) && response.headers.get('content-type')?.includes('text/html')) {
          const cache = await caches.open(CACHE); await cache.put(url.pathname, response.clone());
        }
        return response;
      } catch {
        return (await caches.match(url.pathname)) || (await caches.match('/english/offline.html'));
      }
    })());
  } else if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/english/media/') || url.pathname.startsWith('/english/icons/') || url.pathname === '/images/apty-mascot.png') {
    // The bundled phoneme MP3 files are complete files; browsers may ask for ranges.
    event.respondWith((async () => {
      const whole = await cachedAsset(new Request(request.url));
      const range = request.headers.get('range');
      if (!range || !url.pathname.endsWith('.mp3')) return whole;
      const bytes = await whole.arrayBuffer();
      const match = /^bytes=(\d+)-(\d*)$/.exec(range);
      if (!match) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${bytes.byteLength}` } });
      const start = Number(match[1]); const end = match[2] ? Math.min(Number(match[2]), bytes.byteLength - 1) : bytes.byteLength - 1;
      if (start > end) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${bytes.byteLength}` } });
      return new Response(bytes.slice(start, end + 1), { status: 206, headers: { 'Content-Type': 'audio/mpeg', 'Content-Range': `bytes ${start}-${end}/${bytes.byteLength}`, 'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes' } });
    })());
  }
});
