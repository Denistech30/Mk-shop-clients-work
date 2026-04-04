// ═══════════════════════════════════════════════════════════
//   SHEET LOADER – Reusable Google Sheets → Product Pipeline
//   Works on any static site (GitHub Pages, Netlify, etc.)
//   No backend, no build step, no dependencies.
// ═══════════════════════════════════════════════════════════

/**
 * loadProductsFromSheet(url, onProducts, options?)
 *
 * @param {string}   url         - Public Google Sheet CSV export URL
 * @param {Function} onProducts  - Called with (products[]) when ready
 * @param {Object}   [options]
 * @param {Function} [options.onLoading]  - Called when fetch starts
 * @param {Function} [options.onSuccess]  - Called with raw products[] on success
 * @param {Function} [options.onError]    - Called with (Error) on failure
 * @param {Array}    [options.fallback]   - Static products to use if fetch fails
 */
function loadProductsFromSheet(url, onProducts, options = {}) {
  const {
    onLoading = () => {},
    onSuccess = () => {},
    onError   = () => {},
    fallback  = null,
  } = options;

  console.log('[SheetLoader] Fetching:', url);
  onLoading();

  // Proxy chain: try direct → allorigins → csv.pub fallback
  const PROXIES = [
    u => u,                                                                          // direct
    u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,             // allorigins
    u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,        // codetabs
  ];

  function tryNext(proxyIndex) {
    if (proxyIndex >= PROXIES.length) {
      const err = new Error('All fetch attempts failed');
      console.error('[SheetLoader] FETCH ERROR (all proxies failed):', err);
      onError(err);
      if (fallback && Array.isArray(fallback)) {
        console.info('[SheetLoader] Using fallback data.');
        onProducts(fallback);
      }
      return;
    }

    const targetUrl = PROXIES[proxyIndex](url);
    console.log(`[SheetLoader] Attempt ${proxyIndex + 1}:`, targetUrl);

    // 8-second timeout — abort and try next proxy if too slow
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.warn(`[SheetLoader] Attempt ${proxyIndex + 1} timed out after 8s`);
    }, 8000);

    fetch(targetUrl, { signal: controller.signal })
      .then(res => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(csvText => {
        console.log('[SheetLoader] Success on attempt', proxyIndex + 1);
        console.log('[SheetLoader] Raw CSV (first 300 chars):', csvText.slice(0, 300));
        const products = _parseCSV(csvText);
        console.log('[SheetLoader] Parsed', products.length, 'products:', products);
        onSuccess(products);
        onProducts(products);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        console.warn(`[SheetLoader] Attempt ${proxyIndex + 1} failed:`, err.message);
        tryNext(proxyIndex + 1);
      });
  }

  tryNext(0);
}

// ─── CSV Parser ───────────────────────────────────────────

/**
 * Parse raw CSV text into an array of normalized product objects.
 * Handles quoted fields, trims whitespace, converts types.
 */
function _parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = _splitCSVRow(lines[0]).map(h => h.trim());

  const products = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // skip empty rows

    const values = _splitCSVRow(line);

    // Build raw map: { originalHeader: value }
    const raw = {};
    headers.forEach((h, idx) => {
      raw[h] = _coerce(values[idx] !== undefined ? values[idx].trim() : '');
    });

    const product = _normalizeRow(raw, i);
    if (product.name) products.push(product); // skip rows with no name
  }

  return products;
}

/**
 * Split a single CSV row respecting quoted fields.
 */
function _splitCSVRow(row) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++; // escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

/**
 * Coerce a string value to its most natural JS type.
 * "123" → 123 | "TRUE" → true | "" → null | else string
 */
function _coerce(val) {
  if (val === '' || val === undefined) return null;
  if (val.toUpperCase() === 'TRUE')  return true;
  if (val.toUpperCase() === 'FALSE') return false;
  const num = Number(val.replace(/\s/g, '').replace(',', '.'));
  if (!isNaN(num) && val.trim() !== '') return num;
  return val;
}

// ─── Header Normalizer ────────────────────────────────────

/**
 * Maps flexible header names to canonical field names.
 * Case-insensitive, handles common variants.
 */
const HEADER_MAP = {
  name:      ['name', 'product name', 'title', 'product title', 'nom', 'produit'],
  price:     ['price', 'prix', 'cost', 'amount', 'montant'],
  category:  ['category', 'catégorie', 'categorie', 'type', 'section'],
  mediaUrl:  ['mediaurl', 'media url', 'media_url', 'image', 'imageurl', 'image url',
               'image_url', 'photo', 'photo url', 'video', 'videourl', 'video url', 'url'],
  oldPrice:  ['oldprice', 'old price', 'ancien prix', 'original price', 'was'],
  description: ['description', 'desc', 'details', 'détails'],
  badge:     ['badge', 'label'],
  badgeText: ['badgetext', 'badge text', 'badge label'],
  rating:    ['rating', 'note', 'stars'],
  reviews:   ['reviews', 'avis', 'review count'],
  id:        ['id', 'sku', 'ref', 'reference'],
};

/**
 * Find the raw key that matches a canonical field name.
 */
function _findHeader(raw, canonical) {
  const variants = HEADER_MAP[canonical] || [canonical];
  const rawKeys = Object.keys(raw);
  for (const variant of variants) {
    const match = rawKeys.find(k => k.trim().toLowerCase() === variant.toLowerCase());
    if (match !== undefined) return match;
  }
  return null;
}

function _get(raw, canonical) {
  const key = _findHeader(raw, canonical);
  return key !== null ? raw[key] : null;
}

// ─── Row Normalizer ───────────────────────────────────────

/**
 * Convert a raw key→value map into a clean product object.
 */
function _normalizeRow(raw, rowIndex) {
  // Collect boolean flags from any "isSomething" columns
  const flags = {};
  for (const [key, val] of Object.entries(raw)) {
    if (key.toLowerCase().startsWith('is') && typeof val === 'boolean') {
      const flagName = key.charAt(0).toLowerCase() + key.slice(1); // camelCase
      flags[flagName] = val;
    }
  }

  const rawId = _get(raw, 'id');
  const price = _get(raw, 'price');

  // Collect extra images: Image2, Image3, Image4 ... Image9
  const extraImages = [];
  for (let n = 2; n <= 9; n++) {
    const key = Object.keys(raw).find(k =>
      k.trim().toLowerCase() === `image${n}` ||
      k.trim().toLowerCase() === `image ${n}` ||
      k.trim().toLowerCase() === `photo${n}` ||
      k.trim().toLowerCase() === `media${n}`
    );
    if (key && raw[key]) extraImages.push(_optimizeImageUrl(String(raw[key]).trim()));
  }

  return {
    id:          rawId !== null ? String(rawId) : `sheet-row-${rowIndex}`,
    name:        String(_get(raw, 'name') || '').trim(),
    price:       typeof price === 'number' ? price : null,
    oldPrice:    _get(raw, 'oldPrice'),
    category:    String(_get(raw, 'category') || '').trim(),
    mediaUrl:    _optimizeImageUrl(String(_get(raw, 'mediaUrl') || '').trim()),
    extraImages,
    description: String(_get(raw, 'description') || '').trim(),
    badge:       _get(raw, 'badge'),
    badgeText:   _get(raw, 'badgeText'),
    rating:      _get(raw, 'rating'),
    reviews:     _get(raw, 'reviews'),
    flags,
    raw,
  };
}

// ─── Image URL optimizer ──────────────────────────────────
/**
 * Appends compression params to known image CDN URLs.
 * Unsplash: adds ?w=600&q=80
 * Others passed through unchanged.
 */
function _optimizeImageUrl(url) {
  if (!url) return url;
  try {
    const u = new URL(url);

    // Unsplash
    if (u.hostname.includes('unsplash.com')) {
      u.searchParams.set('w', '480');
      u.searchParams.set('q', '75');
      u.searchParams.set('fm', 'webp');
      u.searchParams.set('fit', 'crop');
      return u.toString();
    }

    // Pexels
    if (u.hostname.includes('images.pexels.com')) {
      u.searchParams.set('w', '480');
      u.searchParams.set('h', '640');
      u.searchParams.set('fit', 'crop');
      return u.toString();
    }

    // Cloudinary – insert transformation before /upload/
    if (u.hostname.includes('cloudinary.com') && u.pathname.includes('/upload/')) {
      return url.replace('/upload/', '/upload/w_480,q_75,f_webp,c_fill/');
    }

    // Google Drive – convert share link to direct thumbnail
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) {
      return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w480`;
    }

    // imgbb / ibb.co – already optimized, pass through
    if (u.hostname.includes('ibb.co') || u.hostname.includes('i.ibb.co')) {
      return url;
    }

  } catch {
    // Not a valid URL, return as-is
  }
  return url;
}
