/* Service worker : tout est mis en cache pour un usage 100 % hors connexion */
const VERSION = 'couture-singer-v2';
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'calcs.js', 'patterns.js', 'ill-extra.js', 'data-extra.js', 'ill-core.js', 'ill-plan.js', 'data-base.js', 'data-g1.js', 'data-g2.js', 'data-g3.js', 'manifest.webmanifest', 'photos/index.json', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match('index.html'))));
});
