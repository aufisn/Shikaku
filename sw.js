/* Shikaku service worker.
   REMINDER: bump CACHE_NAME (shikaku-v1 -> shikaku-v2 ...) on every deploy that changes a precached file.
   Shares the aufisn.github.io origin with other apps: only caches starting with "shikaku-" are touched. */
var CACHE_NAME = 'shikaku-v1';
var CACHE_PREFIX = 'shikaku-';
var PRECACHE_URLS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './favicon-32.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function (c) { return c.addAll(PRECACHE_URLS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf(CACHE_PREFIX) === 0 && k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; /* never touch cross-origin requests */
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE_NAME).then(function (c) { c.put('./index.html', copy); });
      return res;
    }).catch(function () { return caches.match('./index.html'); }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) { return hit || fetch(req); }));
});
