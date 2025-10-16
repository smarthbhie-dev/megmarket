import { getData, animateElement, truncateText } from '/assets/js/utils.js';

import { addToCart } from '/assets/js/Cart.js';
import { addTOWishlist } from '/assets/js/Wishlist.js';

async function loadProductDetails() {
  let loder = document.querySelector('#loader');
  loder.classList.add('active');
  // === Get product ID from URL ===
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  if (!productId) return;

  try {
    // ===  Fetch local data ===
    const products = await getData('../data/products.json');
    await new Promise(resolve => setTimeout(resolve, 2000));
    const selectedProduct = products.find(p => p.id == productId);
    if (!selectedProduct) return;

    // ===  Select DOM elements ===
    const mainImage = document.querySelector('#productImage');
    const modalContainer = document.querySelector('.show-large-img');
    const modalImage = document.querySelector('#LargeImage');
    const closeModalBtn = document.querySelector('.close-btn-large-image');

    const galleryContainer = document.querySelector('.list-image');

    const titleEl = document.querySelector('#title');
    const descriptionEl = document.querySelector('#description');
    const oldPriceEl = document.querySelector('#old-price');
    const discountEl = document.querySelector('#productDiscount');
    const priceEl = document.querySelector('#productPrice');
    const ratingEl = document.querySelector('.rating');
    const addToCartBtn = document.getElementById('add-to-cart');
    const addToWishBtn = document.getElementById('add-to-wishlist');
    const increaseQuantityBtn = document.querySelector('.fa-plus');
    const decreaseQuantityBtn = document.querySelector('.fa-minus');
    const quantityDisplay = document.querySelector('#quantity');

    let relatedProductsBox = document.querySelector('.related-items');

    // ===  Set product info ===
    titleEl.textContent = selectedProduct.title;
    descriptionEl.textContent = selectedProduct.description;
    oldPriceEl.textContent = `${selectedProduct.oldPrice} $`;
    discountEl.textContent = `${selectedProduct.discount} off`;
    priceEl.textContent = `${selectedProduct.price} $`;

    // ===  Rating stars ===
    const fullStars = Math.floor(selectedProduct.rating);
    const hasHalfStar = selectedProduct.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = '';
    for (let i = 0; i < fullStars; i++)
      starsHTML += `<i class="fa-solid fa-star"></i>`;
    if (hasHalfStar)
      starsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
    for (let i = 0; i < emptyStars; i++)
      starsHTML += `<i class="fa-regular fa-star"></i>`;

    ratingEl.innerHTML = `
      ${starsHTML}
      <b>${selectedProduct.rating.toFixed(1)} (21,671 User feedback)</b>
    `;

    // ===  Quantity control ===
    let productQuantityValue = 1;
    if (quantityDisplay) quantityDisplay.textContent = productQuantityValue;

    increaseQuantityBtn?.addEventListener('click', () => {
      productQuantityValue++;
      quantityDisplay.textContent = productQuantityValue;
    });

    decreaseQuantityBtn?.addEventListener('click', () => {
      if (productQuantityValue > 1) {
        productQuantityValue--;
        quantityDisplay.textContent = productQuantityValue;
      }
    });

    // ===  Main image & modal ===
    mainImage.src = selectedProduct.mainImage;
    modalImage.src = selectedProduct.mainImage;

    mainImage.addEventListener('click', () => {
      modalContainer.classList.add('active');
      animateElement(modalContainer, 'animate__fadeIn');
    });

    closeModalBtn.addEventListener('click', () => {
      modalContainer.classList.remove('active');
    });

    // === Render gallery ===
    galleryContainer.innerHTML = selectedProduct.gallery
      .map(
        (imgSrc, i) => `
        <img 
          src="${imgSrc}" 
          alt="Gallery image ${i + 1}" 
          class="thumbnail-img" 
          data-index="${i}" 
        />`,
      )
      .join('');

    document.querySelectorAll('.thumbnail-img').forEach(img => {
      img.addEventListener('click', e => {
        const newSrc = e.target.src;
        mainImage.src = newSrc;
        modalImage.src = newSrc;
        animateElement(mainImage, 'animate__fadeIn');
      });
    });

    //add to Cart & wishlist

    addToCartBtn.addEventListener('click', () => {
      addToCart(selectedProduct);
    });

    addToWishBtn.addEventListener('click', () => {
      addTOWishlist(selectedProduct);
    });
    // ===  Related products ===
    const relatedProducts = products.filter(
      p =>
        p.category === selectedProduct.category && p.id != selectedProduct.id,
    );

    let prodcutCard = '';
    relatedProducts.map(p => {
      prodcutCard += `
    <div class="product-card swiper-slide">
                <div class="image">
                  <img
                    src="${p.mainImage}"
                    alt="${p.title}"
                  />
                  <span style="display:${p.new ? 'flex' : 'none'}">New</span>
                  <div class="cart-add">
                    <i class="fa-solid fa-cart-plus add-to-cart"></i>
                    <i class="fa-solid fa-eye view-btn"></i>
                    <i class="fa-regular fa-heart add-to-wishlist"></i>
                  </div>
                </div>
                <div class="info">
                  <b>${truncateText(p.title, 3)}</b>
                  <button class="buy-now-btn" data-id="${
                    p.id
                  }">BUY NOW - <span>$${p.price}</span></button>
                </div>
              </div>
              `;
    });
    relatedProductsBox.innerHTML = prodcutCard;

    document.querySelectorAll('.buy-now-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.closest('.buy-now-btn').dataset.id;
        window.location.href = `../pages/product-details.html?id=${id}`;
      });
    });

    document.querySelectorAll('.add-to-cart').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const product = relatedProducts[index];
        addToCart(product);
      });
    });

    document.querySelectorAll('.view-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const product = relatedProducts[index];
        window.location.href = `../pages/product-details.html?id=${product.id}`;
      });
    });

    document.querySelectorAll('.add-to-wishlist').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const product = relatedProducts[index];
        addTOWishlist(product);
      });
    });
  } catch (error) {
    console.error('Error loading product details:', error);
  } finally {
    loder?.classList.remove('active');
  }
}

// ===  Run ===
loadProductDetails();
