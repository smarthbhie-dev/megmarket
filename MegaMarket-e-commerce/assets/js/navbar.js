import { getData } from '/assets/js/utils.js';

import { getCartItemCount } from '../../assets/js/Cart.js';
import { getWishlistCount } from '../../assets/js/Wishlist.js';

// Start-NavBar
document.addEventListener('DOMContentLoaded', () => {
  // Create a placeholder for navbar
  const navPlaceholder = document.createElement('div');
  navPlaceholder.id = 'navbar-container';
  document.body.prepend(navPlaceholder);

  // Fetch and inject navbar HTML
  fetch('/components/navbar.html')
    .then(res => res.text())
    .then(data => {
      navPlaceholder.innerHTML = data;
      //logo
      const btnLogo = document.querySelector('#logo');
      btnLogo.onclick = () => {
        window.location.href = '/index.html';
      };
      // count
      const counters = [
        { el: document.getElementById('cart-count'), value: getCartItemCount },
        { el: document.getElementById('cart-count-res'), value: getCartItemCount },
        { el: document.getElementById('wishlist-Count'), value: getWishlistCount },
        { el: document.getElementById('wishlist-count-res'), value: getWishlistCount }
      ];
      
      counters.forEach(counter => {
        if (counter.el) counter.el.textContent = counter.value();
      });
      

      // Handle menu button (toggle slide menu)
      const MenuBTn = document.querySelector('#menu');
      const SlidMenu = document.querySelector('.slid-menu');
      const closeBtnMenu = document.querySelector('.close-btn');
      closeBtnMenu.onclick = () => {
        slideMenu.classList.remove('active');
      };
      if (MenuBTn && SlidMenu) {
        MenuBTn.onclick = () => {
          SlidMenu.classList.toggle('active');
        };
      }

      // Handle close welcome message
      const MessageWelcomme = document.querySelector('#close-m-welcome');
      const NavUpSec = document.querySelector('.up-sec');
      if (MessageWelcomme && NavUpSec) {
        MessageWelcomme.onclick = () => {
          NavUpSec.style.display = 'none';
        };
      }

      // Load categories from JSON
      async function loadCategories() {
        try {
          const categories = await getData('/data/categories.json');

          const catContainer = document.querySelector('.cat');
          if (!catContainer) {
            console.error('cat container not found!');
            return;
          }

          // Create category blocks
          categories.forEach(cat => {
            const selection = document.createElement('div');
            selection.className = 'selection';
            selection.innerHTML = `
              <div class="title hoverable">
                ${cat.title}
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <div class="item">
                ${cat.items
                  .map(item => `<a class="link" href="#">${item}</a>`)
                  .join('')}
              </div>
            `;
            catContainer.appendChild(selection);
          });

          // Toggle categories open/close
          const SelectGroceries = document.querySelectorAll('.selection');
          SelectGroceries.forEach(selection => {
            const title = selection.querySelector('.title');
            const item = selection.querySelector('.item');
            title.onclick = () => {
              const rect = title.getBoundingClientRect();
              const itemRect = item.getBoundingClientRect();
              const screenWidth = window.innerWidth;
              let left = rect.left;

              // Adjust position if overflowing
              if (left + itemRect.width > screenWidth - 30) {
                left = screenWidth - itemRect.width - 30;
              }
              if (left < 10) {
                left = 10;
              }

              item.style.top = rect.bottom + 'px';
              item.style.left = left + 'px';

              // Toggle active class
              if (selection.classList.contains('active')) {
                selection.classList.remove('active');
              } else {
                SelectGroceries.forEach(el => el.classList.remove('active'));
                selection.classList.add('active');
              }
            };
          });

          // Add right arrow icon to each link
          const catLink = document.querySelectorAll('.link');
          catLink.forEach(
            li => (li.innerHTML += `<i class="fa-solid fa-chevron-right"></i>`),
          );

          // Scroll buttons
          const CatLeftBtn = document.querySelector('#left-nav-btn');
          const CatRightBtn = document.querySelector('#right-nav-btn');
          if (CatLeftBtn) {
            CatLeftBtn.onclick = () => {
              catContainer.scrollBy({
                left: -300,
                behavior: 'smooth',
              });
            };
          }
          if (CatRightBtn) {
            CatRightBtn.onclick = () => {
              catContainer.scrollBy({
                left: 300,
                behavior: 'smooth',
              });
            };
          }
        } catch (err) {
          console.error('Error loading categories:', err);
        }
      }
      loadCategories();

      // ==============================
      // SEARCH SYSTEM
      // ==============================
      const searchInput = document.getElementById('search-input');
      const searchBtn = document.getElementById('search-btn');
      const searchResultsContainer = document.getElementById('search-results');
      const searcInputMain = document.getElementById('search-nav');
      const mainSearchBox = document.querySelector('.main-box-search');

      let productsData = [];

      // Load products once
      async function loadProducts() {
        productsData = await getData('../data/products.json');
      }
      loadProducts();

      function performSearch(query, container) {
        query = query.toLowerCase().trim();
        if (!query) {
          container.innerHTML = '';
          container.classList.remove('show');
          return;
        }

        const results = productsData.filter(p =>
          p.title.toLowerCase().includes(query),
        );

        container.innerHTML =
          results.length > 0
            ? results
                .map(
                  p =>
                    `<a href="product-details.html?id=${p.id}" class="search-item">${p.title}</a>`,
                )
                .join('')
            : `<p class="no-results">No results found</p>`;

        container.classList.add('show');
      }

      //  Search 1 (Top search bar)
      if (searchInput && searchBtn && searchResultsContainer) {
        searchInput.addEventListener('input', () => {
          performSearch(searchInput.value, searchResultsContainer);
        });

        searchBtn.addEventListener('click', () => {
          performSearch(searchInput.value, searchResultsContainer);
        });
      }

      //  Search 2 (Main search box)
      if (searcInputMain && mainSearchBox) {
        searcInputMain.addEventListener('input', () => {
          mainSearchBox.classList.add('active');
          performSearch(searcInputMain.value, mainSearchBox);
        });

        searcInputMain.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            mainSearchBox.classList.add('active');
            performSearch(searcInputMain.value, mainSearchBox);
          }
        });

        searcInputMain.addEventListener('blur', () => {
          setTimeout(() => mainSearchBox.classList.remove('active'), 200);
        });
      }

      document.addEventListener('click', e => {
        if (
          !searchResultsContainer.contains(e.target) &&
          e.target !== searchInput &&
          e.target !== searcInputMain
        ) {
          searchResultsContainer.classList.remove('show');
          mainSearchBox.classList.remove('active');
        }
      });

      // Handle bars menu
      const barsBtn = document.querySelector('#bars-menu');
      const slideMenu = document.querySelector('.slid-menu');
      if (barsBtn && slideMenu) {
        barsBtn.onclick = () => {
          slideMenu.classList.toggle('active');
        };
      }
    });
});
// End-NavBar
