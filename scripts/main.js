const homePreviewSwiper = new Swiper(".home-preview-swiper", {
    slidesPerView: 1,

    spaceBetween: 167,

    loop: true,

    navigation: {
        nextEl: ".home-preview-swiper-button-next",
        prevEl: ".home-preview-swiper-button-prev",
    },
});

const homeNewsSwiper = new Swiper(".swiper-main-news", {
    slidesPerView: 3,

    spaceBetween: 40,

    loop: true,

    navigation: {
        nextEl: ".swiper-main-news-button-next",
        prevEl: ".swiper-main-news-button-prev",
    },

    pagination: {
        el: ".swiper-main-news-pagination",
    },
});
