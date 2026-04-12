// ═══════════════════════════════════════════════════════════
//   MK SHOP – Service Worker v3
//   Bump version to force reinstall and clear old caches
// ═══════════════════════════════════════════════════════════

const CACHE_NAME = 'mkshop-v4';
const IMAGE_CACHE = 'mkshop-images-v4';

// App shell — cached on install, served instantly forever
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/sheet-loader.js',
  '/js/products.js',
  '/js/main.js',
  '/logo.jpeg',
];

// ─── Install ──────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ─── Activate: wipe ALL old caches ───────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== IMAGE_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch ────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // 1. Google Sheets CSV + proxy APIs → always network, never cache
  if (
    url.hostname.includes('docs.google.com') ||
    url.hostname.includes('allorigins.win') ||
    url.hostname.includes('codetabs.com')
  ) {
    event.respondWith(
      fetch(request).catch(() => new Response('', { status: 503 }))
    );
    return;
  }

  // 2. Fonts + Font Awesome → cache-first (they never change)
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('cdn.jsdelivr.net')
  ) {
    event.respondWith(cacheFirst(request, CACHE_NAME));
    return;
  }

  // 3. Product images — catch ALL image-like requests
  //    (destination='image' misses JS-injected imgs on some mobile browsers)
  const isImage =
    request.destination === 'image' ||
    /\.(jpg|jpeg|png|gif|webp|avif|svg)(\?.*)?$/i.test(url.pathname) ||
    url.hostname.includes('unsplash.com') ||
    url.hostname.includes('pexels.com') ||
    url.hostname.includes('ibb.co') ||
    url.hostname.includes('cloudinary.com') ||
    url.hostname.includes('drive.google.com');

  if (isImage) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // 4. Own app shell (HTML/CSS/JS) → stale-while-revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // 5. Everything else → network with cache fallback
  event.respondWith(networkWithCacheFallback(request));
});

// ─── Cache-first ──────────────────────────────────────────
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503 });
  }
}

// ─── Stale-while-revalidate ───────────────────────────────
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkFetch = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  return cached || await networkFetch || new Response('Offline', { status: 503 });
}

// ─── Network with cache fallback ─────────────────────────
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
    if (cached) return cached;
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    return new Response('Offline', { status: 503 });
  }
}
