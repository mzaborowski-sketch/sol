const CACHE_NAME = 'solary-pwa-v1';

const OFFLINE_URLS = [
  './',
  './index.html',
  './ceny_rdn_dystr_today.html',
  './dashboard.html',
  './archiwum.html',
  './o-mnie.html',
  './kontakt.html',
  './instrukcja_srodowisko_docker.html',
  './cron_instrukcja_v2.html',
  './strona_instrukcja.html',
  './assets/css/metro.css',
  './assets/js/metro.js'
  // add other static assets here if needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(OFFLINE_URLS))
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
  const request = event.request;
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        // cache-first strategy: serve from cache, then update in background
        fetch(request).then(response => {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
          });
        }).catch(() => {});
        return cached;
      }

      return fetch(request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
