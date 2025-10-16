# MEGAMARKET - E-COMMERCE

> Professional and formal README file for a fully responsive e-commerce frontend project built with HTML, CSS, and JavaScript.

---

## Overview

**MEGAMARKET** is a fully responsive e-commerce frontend project designed to showcase products attractively, featuring product search, shopping cart, wishlist, product detail pages, and login/signup screens with input validation. The project is built entirely with **HTML**, **CSS**, and **Vanilla JavaScript**, and it currently uses **local data** (JSON) due to the absence of a backend. The site integrates animation and slider libraries like **WOW.js**, **Swiper.js**, and **LottieFiles** for modern, smooth user interactions.

**Goal:** To create a professional, portfolio-ready e-commerce frontend that can easily connect to any backend by changing the data-fetching endpoint without requiring structural changes.

---

## Key Features

- Fully responsive design (desktop, tablet, mobile)
- Beautiful landing page with banners, brand sections, featured products, deals, and “Bought Together” section
- Product search with basic filtering
- Product detail page with image gallery, description, rating, and add-to-cart/wishlist functionality
- Wishlist and shopping cart with data saved in localStorage
- Login and Signup pages with full form validation
- Integration with **WOW.js** (animations), **Swiper.js** (sliders), and **LottieFiles** (vector animations)
- Component-based structure for better code reusability
- Well-organized CSS and JS files by functionality

---

## Directory Structure

```
MEGAMARKET-E-COMMERCE/
│
├── assets/
│   ├── css/                # Component-specific styles
│   │   ├── style.css
│   │   ├── navbar.css
│   │   ├── footer.css
│   │   ├── header.css
│   │   ├── brands.css
│   │   ├── productCard.css
│   │   ├── deals.css
│   │   ├── top-items.css
│   │   ├── bought-together.css
│   │   ├── message.css
│   │   └── technical-support.css
│   ├── js/
│   │   ├── navbar.js
│   │   ├── footer.js
│   │   ├── header.js
│   │   ├── products.js        # Data-fetching functions (replaceable for backend connection)
│   │   ├── top-items.js
│   │   ├── message.js
│   │   └── technicalSupport.js
│   ├── images/
│   │   ├── banner/
│   │   ├── brands/
│   │   └── icons/
│   └── data/                 # Local JSON data for products
│
├── components/              # Reusable HTML parts
│   ├── navbar.html
│   ├── footer.html
│   ├── message.html
│   └── support.html
│
├── pages/                   # Website pages
│   ├── login.html
│   ├── signup.html
│   ├── product-details.html
│   ├── marketPlace.html
│   ├── wishlist.html
│   └── cart.html
│
├── index.html
└── README.md
```

---

## Technologies & Libraries

- **HTML5**
- **CSS3** (Responsive design using media queries)
- **Vanilla JavaScript**
- **WOW.js** – scroll-based animations
- **Swiper.js** – responsive sliders
- **LottieFiles** – lightweight vector animations
- _(Optional)_ Live Server (for local testing)

---

## Running the Project Locally

1. Clone or download the project.
2. Ensure all files are in place (especially `index.html` and the `pages/` directory).
3. Open `index.html` in a browser, or preferably use a local server (e.g., **VSCode Live Server**) for proper `fetch()` functionality.

>  Note: Browsers may block `fetch()` from `file://` URLs. Run via local server to properly load JSON data.

---

## Connecting to a Backend

Currently, the project uses **local data** from `assets/data/`. To connect it to a backend, simply update the data-fetching function in `assets/js/products.js`.

### Example — Before & After

**Before (local data):**

```js
export async function getData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Fetch failed: ' + res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
```

**After (backend API):**

```js
import { getData } from '../../assets/js/utils.js';
const res=getData('https://api.your-backend.com/products')
```

### Example JSON Format

```json
  {
    "id": 5,
    "title": "iPhone 15 Pro Max",
    "description": "The iPhone 15 Pro Max features a stunning display, powerful A17 chip, advanced camera system, and sleek design, offering unmatched performance, durability, and innovative technology for modern users",
    "price": 1399,
    "oldPrice": 1599,
    "discount": "12%",
    "rating": 4.9,
    "isFlashDeal": true,
    "flashTime": 4,
    "mainImage": "https://m.media-amazon.com/images/I/61rriyfRKwL._AC_SX679_.jpg",
    "gallery": [
      "https://m.media-amazon.com/images/I/61rriyfRKwL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/51UqcTOkGIL._AC_SY679_.jpg",
      "https://m.media-amazon.com/images/I/61buA0PubsL._AC_SX679_.jpg"
    ],
    "new": true,
    "category": "Smartphone"
  },
```

>  Make sure your backend supports **CORS** or use a proxy during development to avoid blocked requests.

---

## Technical Highlights for Reviewers / Recruiters

- Fully frontend-based structure, ready to connect with any API backend.
- Uses **localStorage** to temporarily save user data (cart, wishlist, etc.).
- Login and signup forms include client-side validation for input correctness.
- Fully responsive UI built with clean CSS and logical component separation.
- Modular and scalable structure, ready to be converted into a framework (React/Vue) if needed.

---

## Quick Summary — How to Change the Data Source

1. Open `assets/js/products.js`
2. Locate the `fetch('/assets/data/...')` call.
3. Replace it with your API endpoint.
4. Ensure your backend returns JSON fields matching the current structure.

---

## Future Improvements

- Add Admin Dashboard for managing products.
- Implement PWA features (offline caching, service workers).
- Integrate real payment gateways (Stripe, PayPal).
- Improve accessibility (WCAG compliance).
- Add automated testing for JS modules.

---

## Contribution

Developers are welcome to fork the repository and submit pull requests. Please create a separate feature branch and document all changes briefly in the PR description.

---

## License

Add your preferred license (e.g., MIT, Apache 2.0). A LICENSE file can be included later if needed.

---

## Contact

For README customization, English/Arabic translation, or presentation versions, feel free to reach out.

---

_This README was crafted to serve as a professional and technical guide for anyone reviewing or integrating with the MEGAMARKET frontend project._
