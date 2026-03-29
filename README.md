# 🛍️ MK Shop – Premium Fashion E-Commerce

> **Your premium fashion destination in Douala, Cameroon**  
> Women's clothing • Men's wear • Children's fashion • Shoes • Handbags • Wigs

---

## 🌟 Live Website Features

### ✅ Completed Features

#### 🎨 Design & UX
- **Premium dark luxury aesthetic** with gold accents and elegant typography
- **Fully responsive** – works perfectly on mobile, tablet, and desktop
- **Auto-scrolling announcement bar** with promotions
- **Sticky navigation** that transitions from transparent to dark on scroll
- **Hero slider** with 3 animated slides (Women, Flash Sale, Wigs)
- **Floating animations** and scroll-reveal effects throughout

#### 🛒 Shopping Features
- **6 product categories**: Women (8 products), Men (4), Kids (4), Shoes (4), Handbags (4), Wigs (6)
- **Smart shopping cart sidebar** with add/remove/quantity controls
- **Product quick-view modal** with full details
- **Product filter** buttons in the Women's section
- **Wishlist / favorites** system (saved in localStorage)
- **Search functionality** with real-time results

#### 📱 WhatsApp Integration (Core Feature)
- Every product has a **"Commander via WhatsApp"** button
- The shopping cart builds a **formatted order message** with all items, quantities, and total
- Clicking checkout opens WhatsApp with a pre-filled professional order message
- Multiple strategic WhatsApp CTAs throughout the site
- Navigation bar "Commander" button

#### 💫 Conversion Optimization
- **Trust bar** with delivery, quality, and support guarantees
- **Category showcase** grid with article counts
- **Flash Sale section** with live countdown timer
- **Customer testimonials** section (4 reviews from Douala)
- **"Why Choose Us" section** with benefits
- **Step-by-step WhatsApp ordering guide**
- **Floating WhatsApp button** always visible
- **Toast notifications** for cart actions
- **Back-to-top button**

---

## 📂 File Structure

```
index.html          ← Main page (single-page)
css/
  style.css         ← Complete stylesheet (responsive, animations)
js/
  products.js       ← Product catalog + card rendering functions
  main.js           ← All interactions, cart, WhatsApp, slider
README.md
```

---

## 🔗 Page Sections & Anchors

| Section | URL Anchor | Description |
|---------|-----------|-------------|
| Hero | `#hero` | Animated 3-slide hero carousel |
| Women | `#femme` | 8 women's clothing products |
| Promos | `#promos` | Flash sale banner with countdown |
| Men | `#homme` | 4 men's clothing products |
| Children | `#enfants` | 4 kids clothing products |
| Shoes | `#chaussures` | 4 shoe products |
| Bags | `#sacs` | 4 handbag products |
| Wigs | `#perruques` | 6 wig products |

---

## ⚙️ Configuration

### Change WhatsApp Number
In `js/products.js`, line 5:
```javascript
const WHATSAPP_NUMBER = '237600000000'; // ← Replace with your real number
```

### Add Real Product Images
In `js/products.js`, add an `image` field to each product:
```javascript
{
  id: 'w01',
  name: 'Robe Maxi Africaine Luxe',
  image: 'images/products/robe-maxi.jpg', // ← Add this
  ...
}
```

Then update the `renderProductCard()` function to use `<img>` tags.

---

## 📊 Product Catalog

| Category | # Products | Price Range |
|----------|-----------|-------------|
| Women's Clothing | 8 | 12,000 – 35,000 FCFA |
| Men's Clothing | 4 | 8,500 – 45,000 FCFA |
| Children's | 4 | 7,500 – 18,000 FCFA |
| Shoes | 4 | 12,000 – 22,000 FCFA |
| Handbags | 4 | 12,000 – 35,000 FCFA |
| Wigs | 6 | 28,000 – 85,000 FCFA |

---

## 🚀 Recommended Next Steps

1. **Replace placeholder gradients with real product photos** – Add actual product images in an `images/products/` folder
2. **Update WhatsApp number** – Change `237600000000` to your actual number in `js/products.js`
3. **Add more products** – Expand each category array in `js/products.js`
4. **Connect to Instagram** – Add your @handle to the Instagram social link in the footer
5. **Add Facebook page** – Update the Facebook social link
6. **Customize prices** – Update all prices to your actual pricing in FCFA
7. **Deploy** – Go to the **Publish tab** to make your website live with a shareable URL

---

## 💡 How the WhatsApp Ordering Works

1. Customer browses products on the website
2. Customer clicks **"Commander via WhatsApp"** on any product  
   — OR — adds items to cart and clicks "Commander sur WhatsApp"
3. WhatsApp opens automatically with a pre-filled message:
   ```
   Bonjour MK Shop! 👋

   Je souhaite commander:

   📦 Robe Maxi Africaine Luxe
   💰 Prix: 25 000 FCFA
   🏷️ Catégorie: Robe

   Merci de me confirmer la disponibilité et les détails de livraison à Douala.
   ```
4. You respond and complete the sale manually

---

*MK Shop – Mode Premium à Douala, Cameroun 🇨🇲*
