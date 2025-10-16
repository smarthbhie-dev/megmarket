import { truncateText } from '/assets/js/utils.js';
import { messageShow } from '/assets/js/message.js';
import { addToCart } from '/assets/js/Cart.js';
const WishList_KEY = 'wishlist';

export function addTOWishlist(product) {
  const wishlist = JSON.parse(localStorage.getItem(WishList_KEY)) || [];

  const existing = wishlist.find(item => item.id === product.id);

  if (existing) {
    messageShow(
      true,
      'Item already saved!',
      'https://lottie.host/08b397df-2036-4cac-aacc-81acf5472a12/aM3FW8c1Ef.lottie',
    );
  } else {
    wishlist.push({ ...product, qty: product.qty || 1 });
    localStorage.setItem(WishList_KEY, JSON.stringify(wishlist));
    updateWishListICon();
    messageShow(
      true,
      'Item added to your wishlist successfully ',
      'https://lottie.host/578f88e3-17f7-4872-87ab-0ef2ef892361/cGhgJR3EfK.lottie',
    );
  }

  localStorage.setItem(WishList_KEY, JSON.stringify(wishlist));
  console.log('Product added to cart:', product);
  updateWishListICon();
}

export function getWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem(WishList_KEY)) || [];

  if (!Array.isArray(wishlist)) return 0;
  const totalQty = wishlist.reduce((Sum, item) => {
    const qty = parseInt(item.qty) || 0;
    return Sum + qty;
  }, 0);
  return totalQty;
}

function updateWishListICon() {
  const wishlistCount = document.getElementById('wishlist-Count');
  const wishListCountRes = document.getElementById('wishlist-count-res');

  if (wishlistCount) {
    wishlistCount.textContent = getWishlistCount();
  }
  if (wishListCountRes) {
    wishListCountRes.textContent = getWishlistCount();
  }
}

function getWishlistItems() {
  return JSON.parse(localStorage.getItem(WishList_KEY) || []);
}

function renderWishListItems() {
  const wishListItems = getWishlistItems();
  const itemsBox = document.querySelector('.products-Wishlist-list');

  if (!itemsBox) return;
  itemsBox.innerHTML = '';
  if (wishListItems.length === 0) {
    itemsBox.innerHTML = `
      <div class="empty-cart-message">
      <dotlottie-wc
      src="https://lottie.host/c9ddb4ab-c818-471b-8b3c-40829898f8d0/9ayZ6sIIzg.lottie"
      style="width: 300px;height: 300px"
      autoplay
      loop
      ></dotlottie-wc>
      </div>`;
    return;
  }

  wishListItems.forEach(item => {
    const wish = document.createElement('div');
    wish.classList.add('wish');
    wish.innerHTML = `
     <img
            src="${item.mainImage}"
            alt=""
          />

          <a href="product-details.html?id=${item.id}">
            ${truncateText(item.title, 4)}
          </a>

          <b id="price-wish"><span>${item.oldPrice}$</span>${item.price}$</b>
          <button class="solid-btn" id="add-to-cart">
            <i class="fa-solid fa-cart-arrow-down"></i>add to card
          </button>
          <i class="fa-solid fa-circle-xmark delet-wish"></i>
    
    `;
    wish.querySelector('.delet-wish').addEventListener('click', () => {
      removeFromWishList(item.id);
    });
    wish.querySelector('#add-to-cart').addEventListener('click', () => {
      addToCart(item);
    });
    itemsBox.appendChild(wish);
  });
}

renderWishListItems();
export function removeFromWishList(productId) {
  const wishlist = JSON.parse(localStorage.getItem(WishList_KEY)) || [];
  const updatedWish = wishlist.filter(item => item.id !== productId);
  localStorage.setItem(WishList_KEY, JSON.stringify(updatedWish));
  updateWishListICon();
  renderWishListItems();
}
