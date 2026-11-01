/* Service Worker – Revu QR
 *
 * Ziel: nach dem ersten Besuch vollständig offline nutzbar.
 *
 * Strategie:
 *   - Dokumente (HTML): Netz zuerst -> immer aktuell; offline aus dem Cache.
 *   - Übrige eigene Dateien: Cache zuerst, sonst Netz.
 *   - Fremde Herkünfte: nicht anfassen (die App lädt ohnehin nichts Externes).
 */

const CACHE_NAME = 'revuqr-v7';

const PRECACHE = [
  './',
  './index.html',
  './datenschutz.html',
  './i18n.js',
  './qrcode.min.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Einzeln statt addAll: eine einzelne fehlende Datei darf die komplette
    // Offline-Fähigkeit nicht verhindern.
    for (const u of PRECACHE) {
      try {
        // cache: 'reload' -> HTTP-Cache umgehen, wirklich die Datei vom Server holen
        const res = await fetch(new Request(u, { cache: 'reload' }));
        if (res && res.status === 200) {
          await cache.put(u, res);
        } else {
          console.warn('[sw] nicht gespeichert:', u, res && res.status);
        }
      } catch (e) {
        console.warn('[sw] Fehler beim Speichern:', u, e && e.message);
      }
    }

    await self.skipWaiting();
  })());
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

// Ist die Anfrage ein Dokument (HTML)? mode ist nicht bei allen Requests gesetzt.
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

  // 1) Online: immer die frischeste Version (Timeout hält den Offline-Start schnell)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(req, { signal: controller.signal, cache: 'no-cache' });
    clearTimeout(timer);

    if (res && res.status === 200) {
      // Bugfix: unter der tatsächlich angefragten Adresse ablegen –
      // sonst überschreibt z. B. datenschutz.html den Eintrag von index.html.
      // Query-Strings (?type=vcard) landen nicht als eigene Einträge im Cache.
      const url = new URL(req.url);
      cache.put(new Request(url.origin + url.pathname), res.clone()).catch(() => {});
      return res;
    }
    if (res && res.status !== 200) {
      const fallback = await cache.match(req, { ignoreSearch: true });
      if (fallback) return fallback;
      return res;
    }
  } catch (e) {
    // offline oder Timeout -> Cache
  }

  // 2) Offline: Cache (Query-Strings ignorieren, z. B. ?utm=... oder ?type=vcard)
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;

  // 3) Letzte Rettung: Hinweis statt Browser-Fehlerseite
  return new Response(
    '<!doctype html><meta charset="utf-8"><title>Offline</title>' +
    '<body style="font-family:system-ui;padding:2rem;line-height:1.6">' +
    '<h1>Offline</h1>' +
    '<p>Diese Seite wurde noch nicht gespeichert. Bitte einmal mit Internetverbindung öffnen.</p>' +
    '<p lang="en">This page has not been saved yet. Please open it once while online.</p>',
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

async function handleAsset(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);

  // Immer im Hintergrund aktualisieren (stale-while-revalidate),
  // damit geänderte Dateien nicht dauerhaft im Cache "kleben".
  const network = fetch(req)
    .then((res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        cache.put(req, res.clone()).catch(() => {});
      }
      return res;
    })
    .catch(() => null);

  if (cached) return cached;

  const res = await network;
  if (res) return res;

  return new Response('', { status: 504, statusText: 'Offline' });
}
