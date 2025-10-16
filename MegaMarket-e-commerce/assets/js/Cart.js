import { truncateText } from '/assets/js/utils.js';
import { messageShow } from '/assets/js/message.js';

const CART_KEY = 'cart';

export function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += product.qty || 1;
    messageShow(
      true,
      'The quantity of this product has been increased in your cart',
      'https://lottie.host/f5635cf8-ec14-4e8f-9a74-4a3734b88dbf/usKDiZweeq.lottie',
    );
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
    messageShow(
      true,
      'The product has been added to your cart successfully',
      'https://lottie.host/bfbc8fca-aa25-46cf-8c38-3ceb8ccea986/9vVfGT6kV4.lottie',
    );
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  console.log('Product added to cart:', product);

  updateCartIcon();
}

export function getCartItemCount() {
  const CART_KEY = 'cart';
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  if (!Array.isArray(cart)) return 0;

  const totalQty = cart.reduce((sum, item) => {
    const qty = parseInt(item.qty) || 0;
    return sum + qty;
  }, 0);

  return totalQty;
}

function updateCartIcon() {
  const cartElements = ['#cart-count', '#cart-count-res'];

  cartElements.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.textContent = getCartItemCount();
  });
}


function getCartItems() {
  return JSON.parse(localStorage.getItem(CART_KEY) || []);
}

function renderCartItems() {
  const cartItems = getCartItems();
  const itemsBox = document.querySelector('.products-list');
  const totalPriceEl = document.querySelector('#cart-total');
  const totalSummary = document.querySelector('#cart-summary');

  if (!itemsBox) return;

  itemsBox.innerHTML = '';
  let totalPrice = 0;

  if (cartItems.length === 0) {
    itemsBox.innerHTML = `
      <div class="empty-cart-message">
      <dotlottie-wc
      src="https://lottie.host/c9ddb4ab-c818-471b-8b3c-40829898f8d0/9ayZ6sIIzg.lottie"
      style="width: 300px;height: 300px"
      autoplay
      loop
      ></dotlottie-wc>
      </div>
    `;
    if (totalPriceEl) totalPriceEl.textContent = `$0.00`;
    if (totalSummary) totalSummary.textContent = `$0.00`;
    return;
  }

  cartItems.forEach(item => {
    totalPrice += item.price * item.qty;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    itemDiv.innerHTML = `
      <img src="${item.mainImage}" alt="${item.title}" />
      <a href="product-details.html?id=${item.id}">${truncateText(
      item.title,
      3,
    )}</a>
      <b id="price">$${item.price}</b>
      <div class="quantity-control">
        <i class="fa-solid fa-minus decrease-btn"></i>
        <p id="quantity">${item.qty}</p>
        <i class="fa-solid fa-plus increase-btn"></i>
      </div>
      <b class="item-total-price">$${(item.price * item.qty).toFixed(2)}</b>
      <i class="fa-solid fa-trash-can delete-btn"></i>
    `;

    itemDiv.querySelector('.delete-btn').addEventListener('click', () => {
      removeFromCart(item.id);
    });

    itemDiv.querySelector('.increase-btn').addEventListener('click', () => {
      item.qty += 1;
      updateCartItem(item.id, item.qty);
    });

    itemDiv.querySelector('.decrease-btn').addEventListener('click', () => {
      if (item.qty > 1) {
        item.qty -= 1;
        updateCartItem(item.id, item.qty);
      } else {
        removeFromCart(item.id);
      }
    });

    itemsBox.appendChild(itemDiv);
  });

  if (totalPriceEl) totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
  if (totalSummary) totalSummary.textContent = `$${totalPrice.toFixed(2)}`;
}

function updateCartItem(productId, newQty) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = newQty;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartIcon();
    renderCartItems();
  }
}

renderCartItems();
export function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const updatedCart = cart.filter(item => item.id !== productId);

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  updateCartIcon();
  renderCartItems();
}
