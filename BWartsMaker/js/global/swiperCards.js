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
    480: { 
      slidesPerView: 2.5
    },
    640: {
      slidesPerView: 3
    },
    800: {
      slidesPerView: 3.5
    },
    1024: {
      slidesPerView: 4
    },
    1280: {
      slidesPerView: 5
    }
  }
});