// ═══════════════════════════════════════════════════════════
//   MK SHOP – Product Catalog
//   All products with categories, prices in FCFA
// ═══════════════════════════════════════════════════════════

const WHATSAPP_NUMBER = '237682513941'; // ← Remplacez par votre vrai numéro

const PRODUCTS = {

  // ──────────────────────────────────────
  //  WOMEN'S CLOTHING
  // ──────────────────────────────────────
  women: [
    {
      id: 'w01',
      name: 'Robe Maxi Africaine Luxe',
      category: 'Robe',
      desc: 'Magnifique robe maxi en tissu imprimé africain. Parfaite pour les mariages et cérémonies.',
      price: 25000,
      oldPrice: 35000,
      badge: 'hot',
      badgeText: 'Trending',
      rating: 4.9,
      reviews: 124,
      filter: 'robe',
      icon: 'fas fa-female',
      gradient: 'linear-gradient(135deg, #8b1a4a, #c9366e, #e91e8c)',
    },
    {
      id: 'w02',
      name: 'Ensemble 2 Pièces Chic',
      category: 'Ensemble',
      desc: 'Ensemble top et jupe assorti, coupe moderne et élégante. Idéal pour le bureau ou les sorties.',
      price: 18500,
      oldPrice: 24000,
      badge: 'new',
      badgeText: 'Nouveau',
      rating: 4.8,
      reviews: 89,
      filter: 'ensemble',
      icon: 'fas fa-female',
      gradient: 'linear-gradient(135deg, #3d0f2a, #6e1a4e, #9c2674)',
    },
    {
      id: 'w03',
      name: 'Robe Bodycon Soirée',
      category: 'Robe',
      desc: 'Robe moulante élégante pour vos soirées. Tissu stretchy confortable, finitions premium.',
      price: 22000,
      oldPrice: 30000,
      badge: 'sale',
      badgeText: '-27%',
      rating: 4.7,
      reviews: 67,
      filter: 'soiree',
      icon: 'fas fa-star',
      gradient: 'linear-gradient(135deg, #1a0a0a, #4a1020, #7a1835)',
    },
    {
      id: 'w04',
      name: 'Blouse Bohème Romantique',
      category: 'Top',
      desc: 'Blouse légère style bohème avec détails brodés. Très confortable par temps chaud.',
      price: 12000,
      oldPrice: null,
      badge: 'new',
      badgeText: 'Nouveau',
      rating: 4.6,
      reviews: 45,
      filter: 'top',
      icon: 'fas fa-leaf',
      gradient: 'linear-gradient(135deg, #2d4a1a, #4a7a2a, #6aaa3a)',
    },
    {
      id: 'w05',
      name: 'Jupe Pagne Kabba Modern',
      category: 'Jupe',
      desc: 'Jupe mi-longue en pagne de qualité supérieure. Coupe asymétrique tendance 2026.',
      price: 15000,
      oldPrice: 19000,
      badge: 'trending',
      badgeText: 'Tendance',
      rating: 4.9,
      reviews: 203,
      filter: 'top',
      icon: 'fas fa-tshirt',
      gradient: 'linear-gradient(135deg, #1a2a4a, #2a4a8a, #3a6ac0)',
    },
    {
      id: 'w06',
      name: 'Robe Longue Imprimé Floral',
      category: 'Robe',
      desc: 'Magnifique robe longue à motif floral tropical. Légère et parfaite pour les cérémonies.',
      price: 20000,
      oldPrice: 28000,
      badge: 'hot',
      badgeText: 'Populaire',
      rating: 4.8,
      reviews: 156,
      filter: 'robe',
      icon: 'fas fa-spa',
      gradient: 'linear-gradient(135deg, #4a1a0a, #8a3010, #c05020)',
    },
    {
      id: 'w07',
      name: 'Combinaison Pantalon Élégante',
      category: 'Combinaison',
      desc: 'Combinaison pantalon chic pour femme moderne. Coupe cintrée, tissu haut de gamme.',
      price: 28000,
      oldPrice: null,
      badge: 'new',
      badgeText: 'Nouveau',
      rating: 4.7,
      reviews: 38,
      filter: 'ensemble',
      icon: 'fas fa-female',
      gradient: 'linear-gradient(135deg, #0a0a1a, #1a1a3a, #2a2a5a)',
    },
    {
      id: 'w08',
      name: 'Robe de Soirée Dorée',
      category: 'Soirée',
      desc: 'Robe de soirée avec détails dorés scintillants. La tenue parfaite pour briller!',
      price: 35000,
      oldPrice: 50000,
      badge: 'sale',
      badgeText: '-30%',
      rating: 5.0,
      reviews: 72,
      filter: 'soiree',
      icon: 'fas fa-crown',
      gradient: 'linear-gradient(135deg, #3a2a0a, #6a4a10, #9a6a20)',
    },
  ],

  // ──────────────────────────────────────
  //  MEN'S CLOTHING
  // ──────────────────────────────────────
  men: [
    {
      id: 'm01',
      name: 'Costume Agbada Traditionnel',
      category: 'Traditionnel',
      desc: 'Costume agbada brodé 3 pièces, tissu damassé de luxe. Parfait pour les cérémonies.',
      price: 45000,
      oldPrice: 60000,
      badge: 'hot',
      badgeText: 'Best-seller',
      rating: 4.9,
      reviews: 87,
      icon: 'fas fa-male',
      gradient: 'linear-gradient(135deg, #0f1f3d, #1a3d6e, #2d5fa0)',
    },
    {
      id: 'm02',
      name: 'Chemise Classique Premium',
      category: 'Chemise',
      desc: 'Chemise habillée en coton égyptien premium. Coupe ajustée moderne.',
      price: 15000,
      oldPrice: 20000,
      badge: 'new',
      badgeText: 'Nouveau',
      rating: 4.7,
      reviews: 52,
      icon: 'fas fa-tshirt',
      gradient: 'linear-gradient(135deg, #1a2a1a, #2a4a2a, #3a6a3a)',
    },
    {
      id: 'm03',
      name: 'Ensemble Pagne Homme',
      category: 'Pagne',
      desc: 'Ensemble complet en pagne imprimé africain. Chemise + pantalon assortis.',
      price: 32000,
      oldPrice: 40000,
      badge: 'trending',
      badgeText: 'Tendance',
      rating: 4.8,
      reviews: 109,
      icon: 'fas fa-male',
      gradient: 'linear-gradient(135deg, #2a1a0a, #4a3010, #6a4a20)',
    },
    {
      id: 'm04',
      name: 'Tshirt Oversize Fashion',
      category: 'Casual',
      desc: 'T-shirt oversize streetwear avec imprimé artistique. 100% coton premium.',
      price: 8500,
      oldPrice: null,
      badge: 'new',
      badgeText: 'Nouveau',
      rating: 4.5,
      reviews: 34,
      icon: 'fas fa-tshirt',
      gradient: 'linear-gradient(135deg, #0a0a0a, #2a2a2a, #3a3a3a)',
    },
  ],

  // ──────────────────────────────────────
  //  CHILDREN'S CLOTHING
  // ──────────────────────────────────────
  kids: [
    {
      id: 'k01',
      name: 'Robe Princesse Fillette',
      category: 'Fille',
      desc: 'Adorable robe de princesse avec tutu et broderies. Pour les 2-10 ans.',
      price: 9500,
      oldPrice: 13000,
      badge: 'hot',
      badgeText: 'Adorable',
      rating: 4.9,
      reviews: 143,
      icon: 'fas fa-child',
      gradient: 'linear-gradient(135deg, #3d0f2a, #8b1a6a, #c93696)',
    },
    {
      id: 'k02',
      name: 'Ensemble Africain Bébé',
      category: 'Bébé',
      desc: 'Ensemble complet en pagne doux pour bébés. Tenues de cérémonie pour les 3-24 mois.',
      price: 7500,
      oldPrice: null,
      badge: 'new',
      badgeText: 'Nouveau',
      rating: 5.0,
      reviews: 67,
      icon: 'fas fa-baby',
      gradient: 'linear-gradient(135deg, #0f3d1a, #1a6e2d, #35a050)',
    },
    {
      id: 'k03',
      name: 'Tenue Garçon Smart Casual',
      category: 'Garçon',
      desc: 'Tenue élégante chemise + pantalon pour garçon. Parfaite pour les fêtes et cérémonies.',
      price: 11000,
      oldPrice: 15000,
      badge: 'sale',
      badgeText: '-27%',
      rating: 4.7,
      reviews: 89,
      icon: 'fas fa-child',
      gradient: 'linear-gradient(135deg, #0f1f3d, #1a3d6e, #2d5fa0)',
    },
    {
      id: 'k04',
      name: 'Robe Communion Blanche',
      category: 'Cérémonie',
      desc: 'Robe blanche de communion avec détails en dentelle. Magnifique tenue pour les grandes occasions.',
      price: 18000,
      oldPrice: 25000,
      badge: 'trending',
      badgeText: 'Populaire',
      rating: 4.8,
      reviews: 52,
      icon: 'fas fa-star',
      gradient: 'linear-gradient(135deg, #2a2a2a, #4a4a4a, #6a6a6a)',
    },
  ],

  // ──────────────────────────────────────
  //  SHOES
  // ──────────────────────────────────────
  shoes: [
    {
      id: 's01',
      name: 'Escarpins Talons Aiguilles',
      category: 'Talons',
      desc: 'Escarpins élégants à talons aiguilles 10cm. Parfaits pour soirées et cérémonies.',
      price: 18000,
      oldPrice: 25000,
      badge: 'hot',
      badgeText: 'Glamour',
      rating: 4.8,
      reviews: 176,
      icon: 'fas fa-shoe-prints',
      gradient: 'linear-gradient(135deg, #1a0a0a, #4a1a1a, #8a2a2a)',
    },
    {
      id: 's02',
      name: 'Sandales Plates Dorées',
      category: 'Sandales',
      desc: 'Sandales plates avec détails dorés tendance. Confortables pour toute la journée.',
      price: 12000,
      oldPrice: null,
      badge: 'new',
      badgeText: 'Nouveau',
      rating: 4.7,
      reviews: 94,
      icon: 'fas fa-walking',
      gradient: 'linear-gradient(135deg, #3a2a0a, #6a4a1a, #9a6a2a)',
    },
    {
      id: 's03',
      name: 'Sneakers Mode Femme',
      category: 'Sneakers',
      desc: 'Sneakers tendance ultra-légères, idéales pour un look casual chic au quotidien.',
      price: 22000,
      oldPrice: 28000,
      badge: 'trending',
      badgeText: 'Tendance',
      rating: 4.9,
      reviews: 211,
      icon: 'fas fa-running',
      gradient: 'linear-gradient(135deg, #0a1a3a, #1a3a6a, #2a5a9a)',
    },
    {
      id: 's04',
      name: 'Mules Plateformes Stylées',
      category: 'Mules',
      desc: 'Mules à plateforme haute, ultra tendance. Très portées par les fashionistas.',
      price: 16000,
      oldPrice: 20000,
      badge: 'sale',
      badgeText: '-20%',
      rating: 4.6,
      reviews: 58,
      icon: 'fas fa-shoe-prints',
      gradient: 'linear-gradient(135deg, #2a0a3a, #5a1a6a, #8a2a9a)',
    },
  ],

  // ──────────────────────────────────────
  //  HANDBAGS
  // ──────────────────────────────────────
  bags: [
    {
      id: 'b01',
      name: 'Sac à Main Cuir Premium',
      category: 'Cuir',
      desc: 'Sac à main en cuir véritable, grande contenance. Idéal pour le bureau et les sorties.',
      price: 35000,
      oldPrice: 50000,
      badge: 'hot',
      badgeText: 'Luxe',
      rating: 4.9,
      reviews: 134,
      icon: 'fas fa-shopping-bag',
      gradient: 'linear-gradient(135deg, #1a0a0a, #4a2010, #7a3520)',
    },
    {
      id: 'b02',
      name: 'Pochette Soirée Dorée',
      category: 'Pochette',
      desc: 'Pochette de soirée avec chaîne dorée. Parfaite pour compléter votre look de gala.',
      price: 15000,
      oldPrice: 20000,
      badge: 'new',
      badgeText: 'Nouveau',
      rating: 4.8,
      reviews: 87,
      icon: 'fas fa-star',
      gradient: 'linear-gradient(135deg, #2a1a0a, #5a3a10, #8a5a20)',
    },
    {
      id: 'b03',
      name: 'Tote Bag Fashion XL',
      category: 'Cabas',
      desc: 'Grand tote bag tendance, parfait pour les courses ou une journée au bureau.',
      price: 12000,
      oldPrice: null,
      badge: 'trending',
      badgeText: 'Tendance',
      rating: 4.6,
      reviews: 72,
      icon: 'fas fa-shopping-bag',
      gradient: 'linear-gradient(135deg, #0a1a0a, #1a3a1a, #2a5a2a)',
    },
    {
      id: 'b04',
      name: 'Sac Bandoulière Tendance',
      category: 'Bandoulière',
      desc: 'Sac crossbody multi-poches, pratique et stylé. Bandoulière réglable.',
      price: 18000,
      oldPrice: 22000,
      badge: 'sale',
      badgeText: '-18%',
      rating: 4.7,
      reviews: 95,
      icon: 'fas fa-bag-shopping',
      gradient: 'linear-gradient(135deg, #1a1a2a, #2a2a4a, #3a3a6a)',
    },
  ],

  // ──────────────────────────────────────
  //  WIGS
  // ──────────────────────────────────────
  wigs: [
    {
      id: 'wg01',
      name: 'Lace Front Wig Naturelle',
      category: 'Lace Front',
      desc: 'Perruque lace front cheveux naturels HD ultra-réaliste. Ligne de cheveux invisible et naturelle.',
      price: 85000,
      oldPrice: 120000,
      badge: 'hot',
      badgeText: 'Premium',
      rating: 5.0,
      reviews: 287,
      icon: 'fas fa-spa',
      gradient: 'linear-gradient(135deg, #1a0a0a, #3a1010, #6a2020)',
    },
    {
      id: 'wg02',
      name: 'Bob Wig Lisse Noir',
      category: 'Bob',
      desc: 'Bob lisse ultra brillant, coupe tendance. Facile à coiffer, très légère.',
      price: 45000,
      oldPrice: 60000,
      badge: 'trending',
      badgeText: 'Populaire',
      rating: 4.9,
      reviews: 193,
      icon: 'fas fa-spa',
      gradient: 'linear-gradient(135deg, #0a0a0a, #1a1a1a, #2a2a2a)',
    },
    {
      id: 'wg03',
      name: 'Perruque Bouclée Longue',
      category: 'Bouclée',
      desc: 'Longue perruque aux boucles voluptueuses. Cheveux synthétiques premium résistants à la chaleur.',
      price: 35000,
      oldPrice: 45000,
      badge: 'new',
      badgeText: 'Nouveau',
      rating: 4.8,
      reviews: 124,
      icon: 'fas fa-spa',
      gradient: 'linear-gradient(135deg, #2a0a1a, #5a1a3a, #8a2a5a)',
    },
    {
      id: 'wg04',
      name: 'Closure Wig Braids Style',
      category: 'Tressée',
      desc: 'Perruque style tresses africaines avec closure. Protège vos vrais cheveux tout en restant stylée.',
      price: 55000,
      oldPrice: 75000,
      badge: 'sale',
      badgeText: '-27%',
      rating: 4.9,
      reviews: 167,
      icon: 'fas fa-spa',
      gradient: 'linear-gradient(135deg, #1a0a2a, #3a1a5a, #5a2a8a)',
    },
    {
      id: 'wg05',
      name: 'Perruque Blonde Ombré',
      category: 'Colorée',
      desc: 'Magnifique perruque ombré noir-blonde, look glamour assuré. La tendance de 2025.',
      price: 65000,
      oldPrice: 85000,
      badge: 'hot',
      badgeText: 'Glamour',
      rating: 4.8,
      reviews: 98,
      icon: 'fas fa-star',
      gradient: 'linear-gradient(135deg, #3a2a0a, #6a5a1a, #9a8a2a)',
    },
    {
      id: 'wg06',
      name: 'Wig Afro Naturelle 4C',
      category: 'Afro',
      desc: 'Perruque afro volumineuse style naturel 4C. Célébrez votre beauté naturelle!',
      price: 28000,
      oldPrice: null,
      badge: 'new',
      badgeText: 'Afro Pride',
      rating: 4.9,
      reviews: 214,
      icon: 'fas fa-spa',
      gradient: 'linear-gradient(135deg, #1a0a0a, #4a2010, #8a4020)',
    },
  ],
};

// ───── Helper: Format price ─────
function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

// ───── Helper: Badge HTML ─────
function getBadgeHTML(badge, text) {
  if (!badge) return '';
  return `<span class="badge badge-${badge}">${text}</span>`;
}

// ───── Build WhatsApp order URL ─────
function buildWhatsAppURL(product) {
  const lines = [
    `Bonjour MK Shop!`,
    ``,
    `Je souhaite commander:`,
    ``,
    `Produit: ${product.name}`,
    `Categorie: ${product.category}`,
    product.price ? `Prix: ${formatPrice(product.price)}` : `Prix: Sur demande`,
    product.oldPrice ? `Prix normal: ${formatPrice(product.oldPrice)}` : null,
    product.desc ? `Description: ${product.desc}` : null,
    // Include image URL so shop owner can see the product
    product.mediaUrl ? `\nImage du produit:\n${product.mediaUrl}` : null,
    ``,
    `Merci de me confirmer la disponibilite et les details de livraison a Douala.`,
  ].filter(l => l !== null);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

// ───── Render a product card ─────
function renderProductCard(product) {
  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    i < Math.floor(product.rating) ? '★' : '☆'
  ).join('');

  return `
    <div class="product-card reveal" data-id="${product.id}" data-filter="${product.filter || ''}">
      <div class="product-img-wrapper">
        <div class="product-img-inner">
          <div class="product-placeholder" style="background: ${product.gradient}">
            <i class="${product.icon}"></i>
            <span>${product.name}</span>
          </div>
        </div>
        <div class="product-badges">
          ${getBadgeHTML(product.badge, product.badgeText)}
        </div>
        <button class="wishlist-btn" data-id="${product.id}" aria-label="Ajouter aux favoris">
          <i class="far fa-heart"></i>
        </button>
        <div class="product-actions">
          <button class="btn-quick-view" data-id="${product.id}"><i class="fas fa-eye"></i> Voir</button>
          <button class="btn-add-cart" data-id="${product.id}" data-section="${getSection(product.id)}">
            <i class="fas fa-shopping-bag"></i> Ajouter
          </button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.desc.substring(0, 70)}...</p>
        <div class="product-bottom">
          <div class="product-price">
            <span class="price-current">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
            ${discountPct ? `<span class="price-discount">-${discountPct}%</span>` : ''}
          </div>
          <div class="product-rating">
            <span class="stars-mini">${starsHTML}</span>
            <span class="rating-count">(${product.reviews})</span>
          </div>
        </div>
        <a href="${buildWhatsAppURL(product)}" target="_blank" class="btn-order-wa" rel="noopener">
          <i class="fab fa-whatsapp"></i> Commander via WhatsApp
        </a>
      </div>
    </div>
  `;
}

// ───── Get product by ID ─────
function getProductById(id) {
  for (const section of Object.values(PRODUCTS)) {
    const found = section.find(p => p.id === id);
    if (found) return found;
  }
  return null;
}

// ───── Get section key from product id ─────
function getSection(id) {
  const prefix = id[0];
  const map = { w: 'women', m: 'men', k: 'kids', s: 'shoes', b: 'bags' };
  if (id.startsWith('wg')) return 'wigs';
  return map[prefix] || 'women';
}

// ───── Render all product sections ─────
function renderAllProducts() {
  const grids = {
    womenGrid: PRODUCTS.women,
    menGrid: PRODUCTS.men,
    kidsGrid: PRODUCTS.kids,
    shoesGrid: PRODUCTS.shoes,
    bagsGrid: PRODUCTS.bags,
    wigsGrid: PRODUCTS.wigs,
  };

  for (const [gridId, products] of Object.entries(grids)) {
    const el = document.getElementById(gridId);
    if (el) {
      el.innerHTML = products.map(renderProductCard).join('');
    }
  }
}

// ───── Modal content ─────
// ─── Media type helpers ───────────────────────────────────

function _getMediaType(url) {
  if (!url) return 'placeholder';
  const u = url.toLowerCase().split('?')[0];
  if (/youtube\.com\/watch|youtu\.be\/|youtube\.com\/shorts/.test(url)) return 'youtube';
  if (/tiktok\.com/.test(url)) return 'tiktok';
  if (/\.(mp4|webm|ogg|mov)$/.test(u)) return 'video';
  if (/\.(jpg|jpeg|png|gif|webp|avif|svg)$/.test(u)) return 'image';
  // Default: treat as image (Google Drive, Cloudinary, etc.)
  return 'image';
}

function _getYouTubeEmbedUrl(url) {
  let id = '';
  const m1 = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  const m2 = url.match(/youtu\.be\/([^?]+)/);
  const m3 = url.match(/youtube\.com\/shorts\/([^?]+)/);
  if (m1) id = m1[1];
  else if (m2) id = m2[1];
  else if (m3) id = m3[1];
  return id ? `https://www.youtube.com/embed/${id}?autoplay=0&rel=0` : null;
}

function _renderMediaSlide(url, label, placeholderHTML, isActive) {
  const type = _getMediaType(url);
  const activeClass = isActive ? 'active' : '';

  if (type === 'youtube') {
    const embedUrl = _getYouTubeEmbedUrl(url);
    if (!embedUrl) return `<div class="modal-slide ${activeClass}">${placeholderHTML}</div>`;
    return `
      <div class="modal-slide modal-slide-video ${activeClass}">
        <iframe src="${embedUrl}" title="${label}" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen style="width:100%;height:100%;border:none;"></iframe>
      </div>`;
  }

  if (type === 'tiktok') {
    // TikTok doesn't allow iframe embeds easily — show a link overlay instead
    return `
      <div class="modal-slide modal-slide-video ${activeClass}" style="position:relative;">
        ${placeholderHTML}
        <a href="${url}" target="_blank" rel="noopener" class="modal-video-overlay">
          <i class="fab fa-tiktok"></i>
          <span>Voir sur TikTok</span>
        </a>
      </div>`;
  }

  if (type === 'video') {
    return `
      <div class="modal-slide modal-slide-video ${activeClass}">
        <video controls playsinline preload="metadata"
               style="width:100%;height:100%;object-fit:cover;">
          <source src="${url}" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>`;
  }

  // Default: image
  return `
    <div class="modal-slide ${activeClass}">
      <img src="${url}" alt="${label}" loading="lazy"
           width="600" height="800"
           style="width:100%;height:100%;object-fit:cover;"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
      ${placeholderHTML}
    </div>`;
}

function renderModalContent(product) {
  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    i < Math.floor(product.rating) ? '★' : '☆'
  ).join('');

  // Build full media array
  const mediaItems = (product.images && product.images.length)
    ? product.images
    : (product.mediaUrl ? [product.mediaUrl] : []);

  const hasGallery = mediaItems.length > 1;

  const placeholderHTML = `
    <div class="product-placeholder" style="background:${product.gradient || '#1a1a1a'};width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;">
      <i class="${product.icon || 'fas fa-tag'}" style="font-size:8rem;opacity:0.4;color:white;"></i>
      <span style="color:rgba(255,255,255,0.5);font-size:0.9rem;">${product.name}</span>
    </div>`;

  const slidesHTML = mediaItems.length
    ? mediaItems.map((url, i) =>
        _renderMediaSlide(url, `${product.name} - ${i + 1}`, placeholderHTML, i === 0)
      ).join('')
    : `<div class="modal-slide active">${placeholderHTML}</div>`;

  // Dot icons: show video icon for video slides
  const dotsHTML = hasGallery
    ? `<div class="modal-gallery-dots">
        ${mediaItems.map((url, i) => {
          const type = _getMediaType(url);
          const icon = (type === 'youtube' || type === 'tiktok' || type === 'video')
            ? '<i class="fas fa-play" style="font-size:0.5rem;"></i>'
            : '';
          return `<button class="modal-dot ${i === 0 ? 'active' : ''}" data-index="${i}" title="${type}">${icon}</button>`;
        }).join('')}
       </div>`
    : '';

  const arrowsHTML = hasGallery
    ? `<button class="modal-gallery-prev"><i class="fas fa-chevron-left"></i></button>
       <button class="modal-gallery-next"><i class="fas fa-chevron-right"></i></button>`
    : '';

  const counterHTML = hasGallery
    ? `<span class="modal-gallery-counter">1 / ${mediaItems.length}</span>`
    : '';

  const ratingHTML = product.rating
    ? `<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
         <span style="color:#fbbf24;font-size:1.1rem;">${starsHTML}</span>
         <span style="color:#888;font-size:0.85rem;">${product.rating}/5 (${product.reviews} avis)</span>
       </div>` : '';

  const desc = product.desc || product.description || '';

  return `
    <div class="modal-img modal-gallery-wrap" style="background:${product.gradient || '#1a1a1a'}">
      <div class="modal-slides-track">${slidesHTML}</div>
      ${arrowsHTML}
      ${dotsHTML}
      ${counterHTML}
    </div>
    <div class="modal-info">
      <p class="modal-category">${product.category}</p>
      <h2 class="modal-name">${product.name}</h2>
      ${ratingHTML}
      ${desc ? `<p class="modal-desc">${desc}</p>` : ''}
      <div class="modal-price">
        <span class="modal-price-current">${product.price ? formatPrice(product.price) : 'Sur demande'}</span>
        ${product.oldPrice ? `<span class="modal-price-old">${formatPrice(product.oldPrice)}</span>` : ''}
      </div>
      <div style="background:#f9f7f4;border-radius:10px;padding:1rem;font-size:0.82rem;color:#666;">
        <p style="margin-bottom:0.3rem;"><i class="fab fa-whatsapp" style="color:#25d366;"></i> <strong>Commande via WhatsApp</strong></p>
        <p>Cliquez sur "Commander" pour ouvrir WhatsApp avec les détails du produit pré-remplis.</p>
      </div>
      <div class="modal-actions">
        <button class="btn-modal-add" data-id="${product.id}">
          <i class="fas fa-shopping-bag"></i> Ajouter au Panier
        </button>
        <a href="${buildWhatsAppURL(product)}" target="_blank" class="btn-modal-wa" rel="noopener">
          <i class="fab fa-whatsapp"></i> Commander Directement sur WhatsApp
        </a>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
//   GOOGLE SHEET INTEGRATION
//   ↓ Only edit the URL below when you want to switch sheets
// ═══════════════════════════════════════════════════════════

/**
 * Paste your Google Sheet CSV export URL here.
 *
 * How to get it:
 *   1. Open your Google Sheet
 *   2. File → Share → Publish to web
 *   3. Choose the sheet tab, select "Comma-separated values (.csv)"
 *   4. Click "Publish" and copy the URL
 *   5. Paste it below (replace the empty string)
 */
const PRODUCTS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9Wfu_JOm8_7HiVKWIfLzEYF7chs2qeN5-IH0LjFNGzHIAP07NhYw4SjfwT0lTohSz5VVsYGZdNPfx/pub?gid=0&single=true&output=csv';

// ─── Category → grid ID map ───────────────────────────────
// Maps the "Category" column value in your sheet to the
// correct HTML grid on the page. Add/rename as needed.
const CATEGORY_GRID_MAP = {
  'femme':      'womenGrid',
  'women':      'womenGrid',
  'woman':      'womenGrid',
  'homme':      'menGrid',
  'men':        'menGrid',
  'man':        'menGrid',
  'enfants':    'kidsGrid',
  'kids':       'kidsGrid',
  'children':   'kidsGrid',
  'chaussures': 'shoesGrid',
  'shoes':      'shoesGrid',
  'sacs':       'bagsGrid',
  'bags':       'bagsGrid',
  'handbags':   'bagsGrid',
  'perruques':  'wigsGrid',
  'wigs':       'wigsGrid',
};

// ─── Gradient palette (used when no image is provided) ────
const SHEET_GRADIENTS = [
  'linear-gradient(135deg, #8b1a4a, #c9366e, #e91e8c)',
  'linear-gradient(135deg, #0f1f3d, #1a3d6e, #2d5fa0)',
  'linear-gradient(135deg, #0f3d1a, #1a6e2d, #35a050)',
  'linear-gradient(135deg, #2d1a0f, #6e3d1a, #a06030)',
  'linear-gradient(135deg, #1a0f3d, #3d1a6e, #6030a0)',
  'linear-gradient(135deg, #3d0f0f, #8b1a1a, #c93636)',
  'linear-gradient(135deg, #3a2a0a, #6a4a1a, #9a6a2a)',
  'linear-gradient(135deg, #1a0a2a, #3a1a5a, #5a2a8a)',
];

function _sheetGradient(index) {
  return SHEET_GRADIENTS[index % SHEET_GRADIENTS.length];
}

// ─── Convert a sheet product → card-compatible object ─────
function _sheetProductToCard(sheetProduct, index) {
  // Determine badge from flags or explicit badge column
  let badge     = sheetProduct.badge     || null;
  let badgeText = sheetProduct.badgeText || null;

  if (!badge) {
    if (sheetProduct.flags.isHot)      { badge = 'hot';      badgeText = badgeText || 'Hot'; }
    else if (sheetProduct.flags.isNew) { badge = 'new';      badgeText = badgeText || 'Nouveau'; }
    else if (sheetProduct.flags.isSale){ badge = 'sale';     badgeText = badgeText || 'Promo'; }
    else if (sheetProduct.flags.isTrending) { badge = 'trending'; badgeText = badgeText || 'Tendance'; }
  }

  // Pick icon based on category
  const catLower = (sheetProduct.category || '').toLowerCase();
  let icon = 'fas fa-tag';
  if (catLower.includes('femme') || catLower.includes('women') || catLower.includes('robe')) icon = 'fas fa-female';
  else if (catLower.includes('homme') || catLower.includes('men'))  icon = 'fas fa-male';
  else if (catLower.includes('enfant') || catLower.includes('kid'))  icon = 'fas fa-child';
  else if (catLower.includes('chaussure') || catLower.includes('shoe')) icon = 'fas fa-shoe-prints';
  else if (catLower.includes('sac') || catLower.includes('bag'))    icon = 'fas fa-shopping-bag';
  else if (catLower.includes('perruque') || catLower.includes('wig')) icon = 'fas fa-spa';

  return {
    id:        sheetProduct.id,
    name:      sheetProduct.name,
    category:  sheetProduct.category,
    desc:      sheetProduct.description || sheetProduct.name,
    price:     sheetProduct.price,
    oldPrice:  sheetProduct.oldPrice,
    badge,
    badgeText,
    rating:    typeof sheetProduct.rating === 'number' ? sheetProduct.rating : null,
    reviews:   typeof sheetProduct.reviews === 'number' ? sheetProduct.reviews : null,
    mediaUrl:  sheetProduct.mediaUrl || null,
    images:    [sheetProduct.mediaUrl, ...(sheetProduct.extraImages || [])].filter(Boolean),
    icon,
    gradient:  _sheetGradient(index),
    filter:    catLower,
    _fromSheet: true,
  };
}

// ─── Render a card that supports real images ───────────────
function renderSheetProductCard(product, index) {
  const cardProduct = _sheetProductToCard(product, index);

  const discountPct = cardProduct.oldPrice && cardProduct.price
    ? Math.round(((cardProduct.oldPrice - cardProduct.price) / cardProduct.oldPrice) * 100)
    : null;

  const starsHTML = cardProduct.rating
    ? Array.from({ length: 5 }, (_, i) => i < Math.floor(cardProduct.rating) ? '★' : '☆').join('')
    : '★★★★★';

  const mediaHTML = cardProduct.mediaUrl
    ? `<img src="${cardProduct.mediaUrl}" alt="${cardProduct.name}"
            loading="lazy" decoding="async"
            width="480" height="640"
            style="width:100%;height:100%;object-fit:cover;"
            onload="this.classList.add('img-loaded')"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
       <div class="product-placeholder" style="background:${cardProduct.gradient};display:none;">
         <i class="${cardProduct.icon}"></i><span>${cardProduct.name}</span>
       </div>`
    : `<div class="product-placeholder" style="background:${cardProduct.gradient};">
         <i class="${cardProduct.icon}"></i><span>${cardProduct.name}</span>
       </div>`;

  const priceHTML = cardProduct.price
    ? `<span class="price-current">${formatPrice(cardProduct.price)}</span>
       ${cardProduct.oldPrice ? `<span class="price-old">${formatPrice(cardProduct.oldPrice)}</span>` : ''}
       ${discountPct ? `<span class="price-discount">-${discountPct}%</span>` : ''}`
    : `<span class="price-current" style="color:var(--gold);">Sur demande</span>`;

  const descText = cardProduct.desc
    ? cardProduct.desc.substring(0, 70) + (cardProduct.desc.length > 70 ? '...' : '')
    : '';

  return `
    <div class="product-card reveal" data-id="${cardProduct.id}" data-filter="${cardProduct.filter}">
      <div class="product-img-wrapper">
        <div class="product-img-inner">${mediaHTML}</div>
        <div class="product-badges">
          ${cardProduct.badge ? `<span class="badge badge-${cardProduct.badge}">${cardProduct.badgeText || ''}</span>` : ''}
        </div>
        <button class="wishlist-btn" data-id="${cardProduct.id}" aria-label="Ajouter aux favoris">
          <i class="far fa-heart"></i>
        </button>
        <div class="product-actions">
          <button class="btn-quick-view" data-id="${cardProduct.id}"><i class="fas fa-eye"></i> Voir</button>
          <button class="btn-add-cart" data-id="${cardProduct.id}">
            <i class="fas fa-shopping-bag"></i> Ajouter
          </button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-category">${cardProduct.category}</p>
        <h3 class="product-name">${cardProduct.name}</h3>
        ${descText ? `<p class="product-desc">${descText}</p>` : ''}
        <div class="product-bottom">
          <div class="product-price">${priceHTML}</div>
          <div class="product-rating">
            <span class="stars-mini">${starsHTML}</span>
            ${cardProduct.reviews ? `<span class="rating-count">(${cardProduct.reviews})</span>` : ''}
          </div>
        </div>
        <a href="${buildWhatsAppURL(cardProduct)}" target="_blank" class="btn-order-wa" rel="noopener">
          <i class="fab fa-whatsapp"></i> Commander via WhatsApp
        </a>
      </div>
    </div>
  `;
}

// ─── Loading state helpers ─────────────────────────────────
function _showGridLoading(gridId) {
  const el = document.getElementById(gridId);
  if (!el) return;
  el.innerHTML = `
    <div class="sheet-loading" style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--gray);">
      <i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--gold);margin-bottom:1rem;display:block;"></i>
      Chargement des produits...
    </div>`;
}

function _showGridError(gridId) {
  const el = document.getElementById(gridId);
  if (!el) return;
  // Only show error if grid is still showing the loading state (not already populated)
  if (el.querySelector('.sheet-loading')) {
    el.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--gray);">
        <i class="fas fa-exclamation-circle" style="font-size:2rem;color:#ff4444;margin-bottom:1rem;display:block;"></i>
        Impossible de charger les produits depuis la fiche.<br>
        <small>Les produits par défaut sont affichés.</small>
      </div>`;
  }
}

// ─── handleProducts: MK Shop renderer ─────────────────────
// This is the per-site function. It receives the parsed sheet
// products and routes them into the correct HTML grids.
// ─── Skeleton card HTML ───────────────────────────────────
function renderSkeletonCards(count = 4) {
  return Array.from({ length: count }, () => `
    <div class="product-card skeleton-card">
      <div class="skeleton-img"></div>
      <div class="skeleton-info">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line medium"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>`).join('');
}

// ─── Infinite scroll renderer ─────────────────────────────
// Renders first `batchSize` items immediately, loads more on scroll
function renderWithInfiniteScroll(gridEl, items, batchSize = 8) {
  let rendered = 0;

  function renderBatch() {
    const batch = items.slice(rendered, rendered + batchSize);
    if (!batch.length) {
      // Remove sentinel if nothing left
      const sentinel = gridEl.querySelector('.scroll-sentinel');
      if (sentinel) sentinel.remove();
      return;
    }

    // Remove skeleton cards before first real render
    gridEl.querySelectorAll('.skeleton-card').forEach(el => el.remove());

    // Remove old sentinel
    const oldSentinel = gridEl.querySelector('.scroll-sentinel');
    if (oldSentinel) oldSentinel.remove();

    // Append new cards
    const fragment = document.createDocumentFragment();
    batch.forEach(({ product, index }) => {
      const div = document.createElement('div');
      div.innerHTML = renderSheetProductCard(product, index);
      fragment.appendChild(div.firstElementChild);
    });
    gridEl.appendChild(fragment);
    rendered += batch.length;

    // Re-init reveal animations for new cards
    if (typeof initRevealAnimations === 'function') {
      setTimeout(initRevealAnimations, 50);
    }

    // Add sentinel for next batch if more remain
    if (rendered < items.length) {
      const sentinel = document.createElement('div');
      sentinel.className = 'scroll-sentinel';
      sentinel.style.cssText = 'height:1px;width:100%;grid-column:1/-1;';
      gridEl.appendChild(sentinel);

      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          renderBatch();
        }
      }, { rootMargin: '200px' });

      obs.observe(sentinel);
    }
  }

  // Show skeletons immediately
  gridEl.innerHTML = renderSkeletonCards(Math.min(batchSize, items.length || 4));

  // Render first batch
  renderBatch();
}

function handleSheetProducts(products) {
  console.log('[SheetLoader] handleSheetProducts called with', products.length, 'products');

  // Group products by their grid target
  const groups = {};

  products.forEach((p, i) => {
    const catKey = (p.category || '').toLowerCase().trim();
    const gridId = CATEGORY_GRID_MAP[catKey]
      || Object.entries(CATEGORY_GRID_MAP).find(([k]) => catKey.includes(k))?.[1]
      || null;

    if (!gridId) {
      console.warn(`[SheetLoader] No grid found for category "${p.category}" (row ${i + 1}). Skipping.`);
      return;
    }

    if (!groups[gridId]) groups[gridId] = [];
    groups[gridId].push({ product: p, index: i });
  });

  // Render each group with infinite scroll
  for (const [gridId, items] of Object.entries(groups)) {
    const el = document.getElementById(gridId);
    if (!el) continue;
    renderWithInfiniteScroll(el, items, 8);
  }

  // Register sheet products so cart/modal/search can find them
  _registerSheetProducts(products);
}

// ─── Register sheet products into the lookup system ───────
// Allows getProductById(), cart, and modal to work with
// sheet-sourced products alongside static ones.
const _sheetProductRegistry = {};

function _registerSheetProducts(products) {
  products.forEach((p, i) => {
    const card = _sheetProductToCard(p, i);
    _sheetProductRegistry[card.id] = card;
  });

  // Patch getProductById to also check sheet registry
  const _originalGetById = getProductById;
  window.getProductById = function(id) {
    return _sheetProductRegistry[id] || _originalGetById(id);
  };
}

// ─── Bootstrap: load from sheet or fall back to static ────
function initSheetProducts() {
  // If no URL is configured, use static data silently
  if (!PRODUCTS_SHEET_URL) return;

  const allGridIds = [...new Set(Object.values(CATEGORY_GRID_MAP))];

  loadProductsFromSheet(
    PRODUCTS_SHEET_URL,
    handleSheetProducts,
    {
      onLoading() {
        // Show skeleton cards immediately in all grids
        allGridIds.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.innerHTML = renderSkeletonCards(4);
        });
      },
      onSuccess(products) {
        console.info(`[SheetLoader] Loaded ${products.length} products from sheet.`);
      },
      onError(err) {
        console.warn('[SheetLoader] Sheet failed, falling back to static data.');
        allGridIds.forEach(_showGridError);
        // Static data is already rendered by renderAllProducts() on page load
      },
    }
  );
}

// ═══════════════════════════════════════════════════════════
//   HERO IMAGE LOADER – from Google Sheet
//   Reads rows where Category = "hero" and injects images
//   into the hero slide frames (heroFrame1, heroFrame2, heroFrame3)
// ═══════════════════════════════════════════════════════════

/**
 * Call this after sheet products are loaded.
 * It looks for rows with category "hero" (case-insensitive)
 * and injects their images into the hero frames in order.
 *
 * Google Sheet columns used:
 *   Category  → must be "hero"
 *   Image     → the image URL to show
 *   Name      → used as alt text (optional)
 */
function loadHeroImagesFromSheet(sheetProducts) {
  // Default Unsplash images — replace by adding "hero" rows in your sheet
  const HERO_DEFAULTS = [
    {
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fm=webp',
      alt: 'Mode Femme'
    },
    {
      url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80&fm=webp',
      alt: 'Promos & Offres'
    },
    {
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&fm=webp',
      alt: 'Perruques Premium'
    },
  ];

  // Use sheet hero rows if available, otherwise fall back to defaults
  const heroItems = sheetProducts.filter(p =>
    (p.category || '').toLowerCase().trim() === 'hero' && p.mediaUrl
  );

  const frameIds = ['heroFrame1', 'heroFrame2', 'heroFrame3'];

  frameIds.forEach((frameId, i) => {
    const frame = document.getElementById(frameId);
    if (!frame) return;

    const source = heroItems[i]
      ? { url: heroItems[i].mediaUrl, alt: heroItems[i].name || 'MK Shop' }
      : HERO_DEFAULTS[i];

    if (!source) return;

    const img = document.createElement('img');
    img.src = source.url;
    img.alt = source.alt;
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:inherit;transition:opacity 0.5s ease;';

    img.onerror = () => img.remove();

    frame.style.position = 'relative';
    frame.insertBefore(img, frame.firstChild);

    img.onload = () => {
      const placeholder = frame.querySelector('.hero-img-placeholder');
      if (placeholder) placeholder.style.opacity = '0';
    };
  });
}

// Hook into the existing sheet handler
const _origHandleSheetProducts = handleSheetProducts;
window.handleSheetProducts = function(products) {
  _origHandleSheetProducts(products);
  loadHeroImagesFromSheet(products);
};

// Also load defaults immediately on page load (before sheet responds)
document.addEventListener('DOMContentLoaded', () => loadHeroImagesFromSheet([]));
