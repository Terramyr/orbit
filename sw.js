// Orbit service worker: keeps the app working with no internet.
// Your budget data is NOT here; it lives in the phone's private storage and never leaves it.
const VERSION = 'orbit-1.2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './lib/pdf.min.js', './lib/pdf.worker.min.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !fonts) return;
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    // show the saved copy straight away, refresh it in the background for next time
    e.respondWith(caches.open(VERSION).then(async c => {
      const cached = await c.match('./index.html');
      const net = fetch(new Request(url.origin + url.pathname, { cache: 'no-cache' })).then(r => { if (r.ok) c.put('./index.html', r.clone()); return r; }).catch(() => null);
      return cached || (await net) || new Response('Offline', { status: 503 });
    }));
    return;
  }
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req); if (hit) return hit;
    try { const r = await fetch(req); if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; } catch (err) { return hit || Response.error(); }
  }));
});
