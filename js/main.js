// ═══════════════════════════════════════════════════════════
//   MK SHOP – Main JavaScript
//   Interactions, Cart, WhatsApp Integration
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ───── Render static products first (instant, no flash) ─────
  renderAllProducts();
  initRevealAnimations();

  // ───── Then try to load from Google Sheet (replaces grids if URL is set) ─────
  initSheetProducts();

  // ───── Initialize all modules ─────
  initHeader();
  initHeroSlider();
  initCountdown();
  initMobileMenu();
  initSearchBar();
  initCart();
  initProductActions();
  initProductModal();
  initFilterButtons();
  initBackToTop();
  initWishlist();

  // ───── Refresh reveal after render ─────
  setTimeout(initRevealAnimations, 200);
});

// ═══════════════════════════════════════════════════════════
//   HEADER SCROLL BEHAVIOR
// ═══════════════════════════════════════════════════════════
function initHeader() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = current;
  }, { passive: true });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

// ═══════════════════════════════════════════════════════════
//   HERO SLIDER
// ═══════════════════════════════════════════════════════════
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');

  if (!slides.length) return;

  let current = 0;
  let autoInterval;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startAuto() {
    autoInterval = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(autoInterval);
    startAuto();
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
  });

  // Touch/swipe support
  let touchStartX = 0;
  const slider = document.getElementById('heroSlider');

  slider?.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slider?.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) {
      goTo(dx > 0 ? current + 1 : current - 1);
      resetAuto();
    }
  }, { passive: true });

  startAuto();
}

// ═══════════════════════════════════════════════════════════
//   COUNTDOWN TIMER
// ═══════════════════════════════════════════════════════════
function initCountdown() {
  // Set target to end of today (midnight)
  const now = new Date();
  const target = new Date(now);
  target.setHours(23, 59, 59, 999);

  function update() {
    const diff = target - new Date();
    if (diff <= 0) {
      // Reset for next day
      target.setDate(target.getDate() + 1);
      return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const pad = n => String(n).padStart(2, '0');

    const cdH = document.getElementById('cd-h');
    const cdM = document.getElementById('cd-m');
    const cdS = document.getElementById('cd-s');

    if (cdH) cdH.textContent = pad(h);
    if (cdM) cdM.textContent = pad(m);
    if (cdS) cdS.textContent = pad(s);
  }

  update();
  setInterval(update, 1000);
}

// ═══════════════════════════════════════════════════════════
//   MOBILE MENU
// ═══════════════════════════════════════════════════════════
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const close = document.getElementById('menuClose');
  const overlay = document.getElementById('overlay');

  function openMenu() {
    menu.classList.add('open');
    toggle.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle?.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Close on nav link click
  document.querySelectorAll('[data-close]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ═══════════════════════════════════════════════════════════
//   SEARCH BAR
// ═══════════════════════════════════════════════════════════
function initSearchBar() {
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  // Build flat product list for search
  const allProducts = Object.values(PRODUCTS).flat();

  function openSearch() {
    searchBar.classList.add('active');
    searchInput?.focus();
  }

  function closeSearch() {
    searchBar.classList.remove('active');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }

  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
  });

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) { searchResults.innerHTML = ''; return; }

    const results = allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    ).slice(0, 8);

    if (results.length === 0) {
      searchResults.innerHTML = `<span class="search-result-item">Aucun résultat pour "${e.target.value}"</span>`;
      return;
    }

    searchResults.innerHTML = results.map(p =>
      `<span class="search-result-item" data-id="${p.id}">
        ${p.name} – ${formatPrice(p.price)}
      </span>`
    ).join('');

    searchResults.querySelectorAll('[data-id]').forEach(item => {
      item.addEventListener('click', () => {
        const product = getProductById(item.dataset.id);
        if (product) {
          closeSearch();
          openProductModal(product);
        }
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════
//   CART
// ═══════════════════════════════════════════════════════════
const cart = {
  items: JSON.parse(localStorage.getItem('mkshop_cart') || '[]'),

  save() {
    localStorage.setItem('mkshop_cart', JSON.stringify(this.items));
  },

  add(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const existing = this.items.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ id: productId, qty: 1 });
    }

    this.save();
    updateCartUI();
    showToast(`<i class="fas fa-check"></i> ${product.name} ajouté au panier`);
  },

  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
    updateCartUI();
  },

  updateQty(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    this.save();
    updateCartUI();
  },

  clear() {
    this.items = [];
    this.save();
    updateCartUI();
  },

  getTotal() {
    return this.items.reduce((total, item) => {
      const p = getProductById(item.id);
      return total + (p ? p.price * item.qty : 0);
    }, 0);
  },

  getCount() {
    return this.items.reduce((n, i) => n + i.qty, 0);
  },

  buildWhatsAppMessage() {
    if (this.items.length === 0) return '';

    let msg = `Bonjour MK Shop!\n\nJe voudrais commander les articles suivants:\n\n`;

    this.items.forEach((item, idx) => {
      const p = getProductById(item.id);
      if (p) {
        msg += `${idx + 1}. *${p.name}*\n   Qté: ${item.qty} × ${formatPrice(p.price)}\n\n`;
      }
    });

    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `TOTAL: ${formatPrice(this.getTotal())}\n\n`;
    msg += `Livraison a Douala\n\n`;
    msg += `Merci de confirmer ma commande!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }
};

function updateCartUI() {
  const count = cart.getCount();
  const countEl = document.getElementById('cartCount');
  const itemCountEl = document.getElementById('cartItemCount');
  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');

  // Update badge
  if (countEl) {
    countEl.textContent = count;
    countEl.classList.toggle('visible', count > 0);
  }

  if (itemCountEl) itemCountEl.textContent = `(${count})`;

  if (cart.items.length === 0) {
    cartEmpty?.style && (cartEmpty.style.display = 'flex');
    cartItems?.style && (cartItems.style.display = 'none');
    cartFooter?.style && (cartFooter.style.display = 'none');
    return;
  }

  cartEmpty?.style && (cartEmpty.style.display = 'none');
  cartItems?.style && (cartItems.style.display = 'flex');
  cartFooter?.style && (cartFooter.style.display = 'block');

  if (cartItems) {
    cartItems.innerHTML = cart.items.map(item => {
      const p = getProductById(item.id);
      if (!p) return '';
      return `
        <div class="cart-item">
          <div class="cart-item-img" style="background: ${p.gradient}">
            <i class="${p.icon}" style="color:rgba(255,255,255,0.4);font-size:1.2rem;"></i>
          </div>
          <div class="cart-item-details">
            <p class="cart-item-name">${p.name}</p>
            <p class="cart-item-price">${formatPrice(p.price * item.qty)}</p>
            <div class="cart-item-controls">
              <button class="qty-btn" data-action="dec" data-id="${p.id}">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" data-action="inc" data-id="${p.id}">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${p.id}" title="Supprimer">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
    }).join('');

    // Bind qty + remove buttons
    cartItems.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (btn.dataset.action === 'inc') cart.updateQty(id, 1);
        else cart.updateQty(id, -1);
      });
    });

    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => cart.remove(btn.dataset.id));
    });
  }

  if (cartTotal) cartTotal.textContent = formatPrice(cart.getTotal());
}

function initCart() {
  const cartToggle = document.getElementById('cartToggle');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartClose = document.getElementById('cartClose');
  const overlay = document.getElementById('overlay');
  const btnCheckout = document.getElementById('btnCheckout');
  const btnClearCart = document.getElementById('btnClearCart');

  function openCart() {
    cartSidebar?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartSidebar?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartToggle?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);

  btnCheckout?.addEventListener('click', () => {
    if (cart.items.length === 0) {
      showToast('Votre panier est vide');
      return;
    }
    const url = cart.buildWhatsAppMessage();
    window.open(url, '_blank', 'noopener');
    showToast('Redirection vers WhatsApp...');
  });

  btnClearCart?.addEventListener('click', () => {
    cart.clear();
    showToast('Panier vidé');
  });

  overlay?.addEventListener('click', () => {
    closeCart();
    // Also close mobile menu if open
    document.getElementById('mobileMenu')?.classList.remove('open');
    document.getElementById('menuToggle')?.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Initialize display
  updateCartUI();
}

// ═══════════════════════════════════════════════════════════
//   PRODUCT ACTIONS (Add to cart, Quick view)
// ═══════════════════════════════════════════════════════════
function initProductActions() {
  // Use event delegation for dynamically rendered cards
  document.addEventListener('click', (e) => {

    // Add to Cart button
    const addBtn = e.target.closest('.btn-add-cart');
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = addBtn.dataset.id;
      cart.add(id);

      // Visual feedback on button
      const originalHTML = addBtn.innerHTML;
      addBtn.innerHTML = '<i class="fas fa-check"></i> Ajouté!';
      addBtn.style.background = '#25d366';
      addBtn.style.color = 'white';
      setTimeout(() => {
        addBtn.innerHTML = originalHTML;
        addBtn.style.background = '';
        addBtn.style.color = '';
      }, 1500);
      return;
    }

    // Quick view button
    const quickBtn = e.target.closest('.btn-quick-view');
    if (quickBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = quickBtn.dataset.id;
      const product = getProductById(id);
      if (product) openProductModal(product);
      return;
    }

    // Modal add to cart
    const modalAddBtn = e.target.closest('.btn-modal-add');
    if (modalAddBtn) {
      const id = modalAddBtn.dataset.id;
      cart.add(id);
      closeProductModal();
      return;
    }
  });
}

// ═══════════════════════════════════════════════════════════
//   MODAL IMAGE GALLERY
// ═══════════════════════════════════════════════════════════
function initModalGallery(container) {
  const slides  = container.querySelectorAll('.modal-slide');
  const dots    = container.querySelectorAll('.modal-dot');
  const prev    = container.querySelector('.modal-gallery-prev');
  const next    = container.querySelector('.modal-gallery-next');
  const counter = container.querySelector('.modal-gallery-counter');

  if (!slides.length || slides.length < 2) return;

  let current = 0;

  function pauseSlide(index) {
    // Pause any playing video when leaving a slide
    const video = slides[index]?.querySelector('video');
    if (video) video.pause();
    // Pause YouTube by reloading src
    const iframe = slides[index]?.querySelector('iframe');
    if (iframe) {
      const src = iframe.src;
      iframe.src = '';
      iframe.src = src;
    }
  }

  function goTo(index) {
    pauseSlide(current);
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  }

  prev?.addEventListener('click', () => goTo(current - 1));
  next?.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Swipe support
  let touchStartX = 0;
  const track = container.querySelector('.modal-slides-track');
  track?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track?.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) goTo(dx > 0 ? current + 1 : current - 1);
  }, { passive: true });
}


function initProductModal() {
  const modal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');

  modalClose?.addEventListener('click', closeProductModal);
  modalOverlay?.addEventListener('click', closeProductModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProductModal();
  });
}

function openProductModal(product) {
  const modal = document.getElementById('productModal');
  const modalBody = document.getElementById('modalBody');

  if (!modal || !modalBody) return;

  modalBody.innerHTML = renderModalContent(product);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Init gallery if multiple images
  initModalGallery(modalBody);
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  modal?.classList.remove('open');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════════════
//   FILTER BUTTONS
// ═══════════════════════════════════════════════════════════
function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const womenGrid = document.getElementById('womenGrid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = womenGrid?.querySelectorAll('.product-card');

      cards?.forEach(card => {
        if (filter === 'all' || card.dataset.filter === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════
//   WISHLIST
// ═══════════════════════════════════════════════════════════
function initWishlist() {
  let wishlist = JSON.parse(localStorage.getItem('mkshop_wishlist') || '[]');

  document.addEventListener('click', e => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const id = btn.dataset.id;
    const icon = btn.querySelector('i');

    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(i => i !== id);
      icon.className = 'far fa-heart';
      btn.classList.remove('active');
      showToast('Retiré des favoris');
    } else {
      wishlist.push(id);
      icon.className = 'fas fa-heart';
      btn.classList.add('active');
      showToast('Ajouté aux favoris');
    }

    localStorage.setItem('mkshop_wishlist', JSON.stringify(wishlist));
  });

  // Restore saved wishlist
  const saved = JSON.parse(localStorage.getItem('mkshop_wishlist') || '[]');
  saved.forEach(id => {
    const btn = document.querySelector(`.wishlist-btn[data-id="${id}"]`);
    if (btn) {
      btn.classList.add('active');
      const icon = btn.querySelector('i');
      if (icon) icon.className = 'fas fa-heart';
    }
  });
}

// ═══════════════════════════════════════════════════════════
//   REVEAL ANIMATIONS ON SCROLL
// ═══════════════════════════════════════════════════════════
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));

  // Also add reveal to section headers
  document.querySelectorAll('.section-header, .trust-item, .cat-card, .testimonial-card, .why-card').forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      observer.observe(el);
    }
  });
}

// ═══════════════════════════════════════════════════════════
//   BACK TO TOP
// ═══════════════════════════════════════════════════════════
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    btn?.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ═══════════════════════════════════════════════════════════
//   TOAST NOTIFICATION
// ═══════════════════════════════════════════════════════════
let toastTimeout;

function showToast(message) {
  let toast = document.querySelector('.toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ═══════════════════════════════════════════════════════════
//   SMOOTH SCROLL for internal links
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 130; // Header height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ═══════════════════════════════════════════════════════════
//   PARALLAX on hero (subtle)
// ═══════════════════════════════════════════════════════════
const hero = document.getElementById('hero');
if (hero) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════
//   FLOATING WHATSAPP – hide on scroll up, show on scroll down
// ═══════════════════════════════════════════════════════════
let lastScrollY = 0;
const floatingWA = document.getElementById('floatingWA');

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (floatingWA) {
    if (currentY > 300) {
      floatingWA.style.opacity = '1';
      floatingWA.style.pointerEvents = 'all';
    } else {
      floatingWA.style.opacity = '0.7';
    }
  }
  lastScrollY = currentY;
}, { passive: true });

// ═══════════════════════════════════════════════════════════
//   PRELOADER (optional fade-in)
// ═══════════════════════════════════════════════════════════
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ═══════════════════════════════════════════════════════════
//   ANNOUNCEMENT BAR PAUSE ON HOVER
// ═══════════════════════════════════════════════════════════
const annBar = document.querySelector('.announcement-inner');
if (annBar) {
  annBar.addEventListener('mouseenter', () => {
    annBar.style.animationPlayState = 'paused';
  });
  annBar.addEventListener('mouseleave', () => {
    annBar.style.animationPlayState = 'running';
  });
}

// ═══════════════════════════════════════════════════════════
//   SERVICE WORKER REGISTRATION + OFFLINE BANNER
// ═══════════════════════════════════════════════════════════
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('[SW] Registered, scope:', reg.scope))
      .catch(err => console.warn('[SW] Registration failed:', err));
  });
}

// Show/hide offline banner based on network status
(function initOfflineBanner() {
  const banner = document.getElementById('offlineBanner');
  if (!banner) return;

  function show() { banner.style.display = 'flex'; }
  function hide() { banner.style.display = 'none'; }

  if (!navigator.onLine) show();

  window.addEventListener('offline', show);
  window.addEventListener('online',  hide);
})();
