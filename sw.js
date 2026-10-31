/* Service Worker â€“ QR-Code Generator Pro
 *
 * Ziel: nach dem ersten Besuch vollstÃ¤ndig offline nutzbar.
 *
 * Strategie:
 *   - Dokumente (HTML): Cache zuerst -> sofortiger Start, offline sicher.
 *     Im Hintergrund wird die neuere Version nachgeladen (stale-while-revalidate).
 *   - Ãœbrige eigene Dateien: Cache zuerst, sonst Netz.
 *   - Fremde HerkÃ¼nfte: nicht anfassen (die App lÃ¤dt ohnehin nichts Externes).
 */

const CACHE_NAME = 'qr-generator-v5';

const PRECACHE = [
  './',
  './index.html',
  './qrcode.min.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // cache: 'reload' -> HTTP-Cache umgehen, wirklich die Datei vom Server holen
      .then((cache) => cache.addAll(PRECACHE.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Ist die Anfrage ein Dokument (HTML) â€“ unabhÃ¤ngig vom mode-Wert?
function isDocumentRequest(req) {
  if (req.mode === 'navigate') return true;
  const accept = req.headers.get('accept') || '';
  return accept.indexOf('text/html') !== -1;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return;

  if (isDocumentRequest(req)) {
    event.respondWith(handleDocument(req));
    return;
  }

  event.respondWith(handleAsset(req));
});

async function handleDocument(req) {
  const cache = await caches.open(CACHE_NAME);

  // 1) Online: immer die frischeste Version (mit Timeout, damit es offline schnell geht)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(req, { signal: controller.signal, cache: 'no-cache' });
    clearTimeout(timer);

    if (res && res.status === 200) {
      cache.put('./index.html', res.clone()).catch(() => {});
      return res;
    }
    // z. B. 404: lieber den Cache nehmen
    if (res && res.status !== 200) {
      const fallback = await cache.match('./index.html');
      if (fallback) return fallback;
      return res;
    }
  } catch (e) {
    // offline oder Timeout -> Cache
  }

  // 2) Offline: Cache (Query-Strings ignorieren)
  const cached =
    (await cache.match(req, { ignoreSearch: true })) ||
    (await cache.match('./index.html')) ||
    (await cache.match('./'));

  if (cached) return cached;

  // 3) Letzte Rettung: Hinweis statt Browser-Fehlerseite
  return new Response(
    '<!doctype html><meta charset="utf-8"><title>Offline</title>' +
    '<body style="font-family:system-ui;padding:2rem">' +
    '<h1>Offline</h1><p>Diese Seite wurde noch nicht gespeichert. ' +
    'Bitte einmal mit Internetverbindung Ã¶ffnen.</p>',
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

async function handleAsset(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  if (cached) return cached;

  try {
    const res = await fetch(req);
    if (res && res.status === 200 && res.type === 'basic') {
      cache.put(req, res.clone()).catch(() => {});
    }
    return res;
  } catch (e) {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}
