new Swiper('.card-wrapper', {
  loop: false,
  spaceBetween: 30,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Define quantos cards aparecem por vez, dependendo do tamanho da tela
  breakpoints: {
    800: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    },
    1280: {
      slidesPerView: 4
    }
  }
});