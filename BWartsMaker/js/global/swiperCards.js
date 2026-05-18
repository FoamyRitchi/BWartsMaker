new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Define quantos cards aparecem por vez, dependendo do tamanho da tela
  breakpoints: {
    768:{
        slidesPerView: 3
    },
    1024: {
        slidesPerView: 4
    },
    1440: {
        slidesPerView: 4
    }
  }
});