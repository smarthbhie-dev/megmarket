
import { getData } from '/assets/js/utils.js';

//StartHeader
async function headerBanner() {
    const dataBanner = await getData('/data/banners.json');
    const bannerCards = document.querySelector('.banner-cards');
    let cardHTML = `<div class="swiper-wrapper">`;
    dataBanner.forEach(bannner => {
      cardHTML += `
             <div class="swiper-slide banner-card  ">
              <div class="left-sec">
               <p>${bannner.title}</p>
               <b>${bannner.subtitle}</b>
               <p>${bannner.offer}</p>
              </div>
              <div class="right-sec">
               <img src=${bannner.image} alt="">
              </div>
           </div>
        
        `;
    });
    cardHTML += `</div>`;
    bannerCards.innerHTML = cardHTML;
  }
  headerBanner().then(() => {
    const swiper = new Swiper('.banner-cards', {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.banner-dots',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.right-btn-banner',
        prevEl: '.left-btn-banner',
      },
    });
  });
  //EndHeader