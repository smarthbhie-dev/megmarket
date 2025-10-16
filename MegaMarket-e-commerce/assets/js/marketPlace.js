import { getData, truncateText, animateElement } from '/assets/js/utils.js';

import { addToCart } from '/assets/js/Cart.js';
import { addTOWishlist } from '/assets/js/Wishlist.js';


async function getAllProducts() {
  const loader = document.getElementById('loader');
  try {
    loader.classList.remove('hidden');

    const localProducts = await getData('../data/products.json');

    await new Promise(resolve => setTimeout(resolve, 2000));

    loader.classList.add('hidden');

    const productsBox = document.querySelector('.products-section');
    const paginationBox = document.querySelector('.pagination');

    const sortedProducts = [
      ...localProducts.filter(p => p.isFlashDeal),
      ...localProducts.filter(p => !p.isFlashDeal),
    ];

    const productsPerPage = 9;
    let currentPage = 1;
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    function renderProducts(page) {
      productsBox.innerHTML = '';
      const start = (page - 1) * productsPerPage;
      const end = start + productsPerPage;
      const productsToShow = sortedProducts.slice(start, end);

      productsToShow.forEach(p => {
        const fullStars = Math.floor(p.rating || 0);
        const halfStar = (p.rating || 0) % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        const starsHTML =
          '<i class="fa-solid fa-star"></i>'.repeat(fullStars) +
          (halfStar ? '<i class="fa-solid fa-star-half-stroke"></i>' : '') +
          '<i class="fa-regular fa-star"></i>'.repeat(emptyStars);

        const card = document.createElement('div');
        card.classList.add(
          'product-card',
          'animate__animated',
          'animate__fadeIn',
        );
        card.style.setProperty('--animate-duration', '0.6s');
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
        card.innerHTML = `
          <div class="image">
            <img src="${p.mainImage}" alt="${p.title}" />
            <span style="display:${
              p.new ? 'flex' : 'none'
            }" class="new-tag">New</span>
            <div class="cart-add">
              <i  class="fa-solid fa-cart-plus addToCart"></i>
              <i class="fa-solid fa-eye view-btn"></i>
              <i class="fa-regular fa-heart add-to-wishList"></i>
            </div>
          </div>
          <div class="info">
   ${
     p.isFlashDeal
       ? ` 
           <span>Flash Deal Ends in ${p.flashTime} Hours !</span>
            <div class="slid">
            <div style="
              width:${widthPercent}%;
              background:${color};">
            </div>
          </div>`
       : ''
   }
            <b>${truncateText(p.title, 4)}</b>
            <div class="rating">${starsHTML} <span>(${(p.rating || 0).toFixed(
          1,
        )})</span></div>
            ${
              p.isFlashDeal
                ? `<button class="deal-btn"><i class="fa-solid fa-bolt"></i> GET DEAL - <span>$${p.discount}</span></button>`
                : ''
            }
            <button class="buy-btn">BUY NOW - <span>$${p.price}</span></button>
          </div>
        `;
        card.querySelector('.addToCart').addEventListener('click', () => {
          addToCart(p);
        });
        card.querySelector('.buy-btn').addEventListener('click', () => {
          window.location.href = `product-details.html?id=${p.id}`;
        });

        card.querySelector('.view-btn').addEventListener('click', () => {
          window.location.href = `product-details.html?id=${p.id}`;
        });
        card.querySelector('.add-to-wishList').addEventListener('click',()=>{
          addTOWishlist(p)
        })

        productsBox.appendChild(card);
      });
      animateElement(productsBox, 'animate__fadeIn');
    }

    function renderPagination() {
      paginationBox.innerHTML = '';

      const maxVisible = 4;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let endPage = startPage + maxVisible - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '«';
        prevBtn.classList.add('page-btn');
        prevBtn.addEventListener('click', () => {
          currentPage--;
          renderProducts(currentPage);
          renderPagination();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationBox.appendChild(prevBtn);
      }

      for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('page-btn');
        if (i === currentPage) btn.classList.add('active');

        btn.addEventListener('click', () => {
          currentPage = i;
          renderProducts(currentPage);
          renderPagination();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        paginationBox.appendChild(btn);
      }

      if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '»';
        nextBtn.classList.add('page-btn');
        nextBtn.addEventListener('click', () => {
          currentPage++;
          renderProducts(currentPage);
          renderPagination();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationBox.appendChild(nextBtn);
      }
    }

    renderProducts(currentPage);
    renderPagination();
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

getAllProducts();

//================================================//
const filters = document.querySelectorAll('.filter-item');
filters.forEach(filter => {
  const header = filter.querySelector('.drop-menu');
  const content = filter.querySelector('.drop-content');
  const icon = header.querySelector('i');

  header.addEventListener('click', () => {
    const isActive = content.classList.toggle('active');
    icon.classList.toggle('rotate');

    if (isActive) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = 0;
    }
  });
});

const filterToggleButton = document.querySelector('#filterToggleBtn');
const filtersPanel = document.querySelector('.filters-section');

filterToggleButton.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    filtersPanel.style.display =
      filtersPanel.style.display === 'block' ? 'none' : 'block';

    animateElement(filtersPanel, 'animate__fadeIn');
  }
});
