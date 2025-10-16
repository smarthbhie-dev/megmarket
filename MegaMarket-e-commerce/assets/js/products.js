//products
import { getData, truncateText } from '/assets/js/utils.js';
import { addToCart } from '/assets/js/Cart.js';
import { addTOWishlist } from '/assets/js/Wishlist.js';

async function getAllProducts() {
  const dataProducts = await getData('../data/products.json');
  //Start Today’s Deals of the
  function startCountdown(element, days, hours = 0, minutes = 0, seconds = 0) {
    let totalSeconds =
      days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    function updateTimer() {
      if (totalSeconds <= 0) {
        element.innerHTML = 'Expired!';
        clearInterval(timerInterval);
        return;
      }
      let d = Math.floor(totalSeconds / (24 * 60 * 60));
      let h = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      let m = Math.floor((totalSeconds % (60 * 60)) / 60);
      let s = totalSeconds % 60;

      element.innerHTML = `${d}d:${h}h:${m}m:${s}s`;
      totalSeconds--;
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
  }

  startCountdown(document.querySelector('.time'), 16, 21, 57, 23);

  const flashDeals = dataProducts.filter(p => p.isFlashDeal);
  const productsBoxToday = document.querySelector('.product-cards');
  let cardproduct = '<div class="swiper-wrapper">';
  flashDeals.forEach(p => {
    let hours = p.flashTime;
    let widthPercent = Math.min((hours / 24) * 100, 100);
    let color = '#0c59b6';
    if (hours <= 3) {
      color = 'red';
    } else if (hours <= 8) {
      color = '#f5a914';
    } else {
      color = 'blue';
    }
    cardproduct += `
          <div class="product-card swiper-slide">
            <div class="image">
              <img
                src="${p.mainImage}"
                alt="${p.title}"
              />
              <span style="display:${p.new ? 'flex' : 'none'}">New</span>
              <div class="cart-add">
                <i class="fa-solid fa-cart-plus add-to-cart"></i>
                <i class="fa-solid fa-eye view-btn-info"></i>
                <i class="fa-regular fa-heart add-to-wish"></i>
              </div>
            </div>
            <div class="info">
              <span>Flash Deal Ends in ${p.flashTime} Hours !</span>
                  <div class="slid">
            <div style="
              width:${widthPercent}%;
              background:${color};
             ">
            </div>
          </div>
              <b>${truncateText(p.title, 4)}</b>
              <button class="buy-btn">BUY NOW - <span>$${
                p.price
              }</span></button>
            </div>
          </div>
          `;
  });
  cardproduct += `</div>`;
  productsBoxToday.innerHTML = cardproduct;

  const todaySwiper = new Swiper('.product-cards', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    allowTouchMove: true,
    pagination: false,
    navigation: false,
  });
  const btnDeals = document.querySelector('.deals-section-btn');
  btnDeals.addEventListener('click', () => {
    window.location.href = 'pages/marketPlace.html';
  });

  const buyBtns = productsBoxToday.querySelectorAll('.buy-btn');
  buyBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const product = flashDeals[index];
      window.location.href = `pages/product-details.html?id=${product.id}`;
    });
  });
  const viewBtn=productsBoxToday.querySelectorAll('.view-btn-info');
  viewBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const product = flashDeals[index];
      window.location.href = `pages/product-details.html?id=${product.id}`;
    });
  });

  const addToCartBtn = productsBoxToday.querySelectorAll('.add-to-cart');
  addToCartBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const product = flashDeals[index];
      addToCart(product);
    });
  });

  const addToWishListBtn = productsBoxToday.querySelectorAll('.add-to-wish');
  addToWishListBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const product = flashDeals[index];
      addTOWishlist(product)
    });
  });

  //end Today’s Deals of the day

  //Start frequently bought together
  const allProductsBtn = document.getElementById('viewAllBtn');
  allProductsBtn.addEventListener('click', () => {
    window.location.href = 'pages/marketPlace.html';
  });
  const freqBoughtTogether = document.querySelector('.right-together-products');
  let ferqProductCard = '';
  let dataFreq = dataProducts.filter(f => !f.isFlashDeal);
  dataFreq.slice(0, 8).forEach(p => {
    ferqProductCard += `
      <div class="prodcut-card">
              <img
                src="${p.mainImage}"
                alt="${p.title}"
              />
              <p>${p.title}</p>
              <span>$2,300</span>
              <div class="btns">
                <i class="fa-solid fa-eye view-product"></i>
                <i class="fa-solid fa-cart-plus add-to-cart"></i>
                <i class="fa-solid fa-heart add-to-wishlist"></i>
              </div>
            </div>
      `;
  });

  freqBoughtTogether.innerHTML = ferqProductCard;
  const addToCartBtnFromfreq =
    freqBoughtTogether.querySelectorAll('.add-to-cart');

  addToCartBtnFromfreq.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const product = dataFreq[index];
      addToCart(product);
    });
  });

  const viewProduct = freqBoughtTogether.querySelectorAll('.view-product');
  viewProduct.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const product = dataFreq[index];
      window.location.href = `pages/product-details.html?id=${product.id}`;
    });
  });

  const addToWishListBtnFromFreq = freqBoughtTogether.querySelectorAll('.add-to-wishlist');
  addToWishListBtnFromFreq.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const product = dataFreq[index];
      addTOWishlist(product)
    });
  });
  //End frequently bought together
}
//products
getAllProducts();
