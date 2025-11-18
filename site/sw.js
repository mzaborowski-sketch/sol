const CACHE_NAME = 'schoborn-pwa-v2';

// Small static assets that almost never change
const STATIC_ASSETS = [
  './assets/css/metro.css',
  './assets/js/metro.js',
  './assets/img/icon-192.png',
  './assets/img/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') {
    return;
  }

  const accept = req.headers.get('accept') || '';
  const isHTML = accept.includes('text/html');

  // --- 1) HTML: NETWORK FIRST ---
  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then(cached => cached || caches.match('./index.html'))
        )
    );
    return;
  }

  // --- 2) Small static files: CACHE FIRST ---
  const url = new URL(req.url);
  const isStatic = STATIC_ASSETS.some(path =>
    url.pathname.endsWith(path.replace('./', '/'))
  );

  if (isStatic) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) {
          return cached;
        }
        return fetch(req).then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        });
      })
    );
    return;
  }

  // --- 3) Everything else: NETWORK ONLY (no cache bloat) ---
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
