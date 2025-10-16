//Start Top Items
import { getData } from '/assets/js/utils.js';
async function topItems() {
  const topCat = await getData('../data/top-items.json');

  const Ietms = document.querySelector('.items');
  const ItemElectronicBrands = document.querySelector('.top-electronic-cards');
  let itemElectronicBrandsCard = '<div class="swiper-wrapper">';
  //Start Top CateGories
  let itemCat = '';
  topCat.TopCateGories.forEach(i => {
    itemCat += `  
      <div class="item">
           <div class="image">
            <img src="${i.image}" alt="${i.title}">
           </div>
           <b>${i.title}</b>
          </div>
          `;
  });
  Ietms.innerHTML = itemCat;

  //End Top CateGories
  //Start Top Electronics Brands

  topCat.TopElectronicsBrands.forEach(i => {
    itemElectronicBrandsCard += `
              <div style="
              background:${i.bgColor};
             " class="electronic-card swiper-slide">
            <div class="info">
              <b  style="
              background:${i.colorBgTitle};
              color:${i.colorTitle};
             ">${i.title}</b>
              <img  style="
              background:${i.iconBgColor};
             " src="${i.icon}" alt="">
              <p style=" color:${i.offerColor}">${i.offer}</p>
            </div>
            <div class="image">
              <img src="${i.productImage}" alt="">
              <div style=" background:${i.circularBGColor};" class="circular"></div>
            </div>
          </div>
      `;
  });
  itemElectronicBrandsCard += `</div>`;
  ItemElectronicBrands.innerHTML = itemElectronicBrandsCard;
  const ElectronicBrandsSwiper = new Swiper('.top-electronic-cards', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    allowTouchMove: true,
    navigation: false,
    pagination: {
      el: '.top-electronic-cards-dots',
      clickable: true,
      dynamicBullets: true,
    },
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
  const btnTopElectronic = document.querySelector('.top-electronics-prands');
  btnTopElectronic.addEventListener('click', () => {
    window.location.href = 'pages/marketPlace.html';
  });
  const btnTopCateGories = document.querySelector('.top-cateGories-btn');
  btnTopCateGories.addEventListener('click', () => {
    window.location.href = 'pages/marketPlace.html';
  });
  //End Top Electronics Brands
}
topItems();

//End Top Items
