// ═══════════════════════════════════════════════════════════
//   MK SHOP – Service Worker
//   Cache-first for static assets, network-first for sheet
// ═══════════════════════════════════════════════════════════

const CACHE_NAME = 'mkshop-v1';

// Assets to cache on install (app shell)
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/sheet-loader.js',
  '/js/products.js',
  '/js/main.js',
];

// ─── Install: cache the app shell ────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()) // activate immediately
  );
});

// ─── Activate: delete old caches ─────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim()) // take control immediately
  );
});

// ─── Fetch: strategy per request type ────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Google Sheets / external APIs → network-first, no cache
  //    (always want fresh product data)
  if (
    url.hostname.includes('google.com') ||
    url.hostname.includes('allorigins.win') ||
    url.hostname.includes('codetabs.com')
  ) {
    event.respondWith(fetch(request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // 2. Google Fonts / Font Awesome CDN → cache-first
  //    (rarely change, big perf win to cache)
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('cdn.jsdelivr.net')
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 3. Product images (any external image URL) → cache-first
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 4. App shell (HTML, CSS, JS) → stale-while-revalidate
  //    (serve cache instantly, update in background)
  if (
    url.origin === self.location.origin &&
    (request.destination === 'document' ||
     request.destination === 'script' ||
     request.destination === 'style')
  ) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // 5. Everything else → network with cache fallback
  event.respondWith(networkWithCacheFallback(request));
});

// ─── Strategy: Cache-first ────────────────────────────────
// Serve from cache; fetch and cache if missing
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503 });
  }
}

// ─── Strategy: Stale-while-revalidate ────────────────────
// Serve cache immediately; fetch fresh copy in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  // Return cached version instantly if available, else wait for network
  return cached || fetchPromise || offlineFallback(request);
}

// ─── Strategy: Network with cache fallback ────────────────
async function networkWithCacheFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || offlineFallback(request);
  }
}

// ─── Offline fallback ─────────────────────────────────────
async function offlineFallback(request) {
  // For page navigations, serve the cached homepage
  if (request.destination === 'document') {
    const cached = await caches.match('/index.html')
      || await caches.match('/');
    if (cached) return cached;
  }
  return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
}
