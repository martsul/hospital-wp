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
    initialSlide: 2,

    spaceBetween: 40,

    loop: true,

    loopAdditionalSlides: 1,

    navigation: {
        nextEl: ".swiper-main-news-button-next",
        prevEl: ".swiper-main-news-button-prev",
    },

    pagination: {
        el: ".swiper-main-news-pagination",
        clickable: true,
    },
});

const homeArticlesSwiper = new Swiper(".swiper-main-articles", {
    slidesPerView: 3,
    initialSlide: 2,

    spaceBetween: 40,

    loopAdditionalSlides: 1,
    loop: true,

    navigation: {
        nextEl: ".swiper-main-news-button-next",
        prevEl: ".swiper-main-news-button-prev",
    },

    pagination: {
        el: ".swiper-main-news-pagination",
        clickable: true,
    },
});

const homeVideoSwiper = new Swiper(".swiper-main-video", {
    slidesPerView: 4,
    initialSlide: 2,

    spaceBetween: 20,

    loopAdditionalSlides: 1,

    loop: true,

    navigation: {
        nextEl: ".swiper-main-video-button-next",
        prevEl: ".swiper-main-video-button-prev",
    },

    pagination: {
        el: ".swiper-main-video-pagination",
        clickable: true,
    },
});

const videoModal = document.querySelector(".ms-modal");
const previewVideos = Array.from(document.querySelectorAll(".home-preview__video"));

const startStopVideo = (activeVideoIndex) => {
    const currentActiveVideo = previewVideos.find(v => v.classList.contains("active"));
    currentActiveVideo?.pause();
    currentActiveVideo?.classList?.remove("active");
    previewVideos[activeVideoIndex]?.classList?.add("active");
    previewVideos[activeVideoIndex]?.play();
}
startStopVideo(0);

const changeActiveVideo = () => {
    const activeVideo = document.querySelector(".home-preview-swiper .swiper-slide-active");
    const activeVideoIndex = activeVideo.getAttribute("aria-label").split(" / ")[0] - 1;
    startStopVideo(activeVideoIndex);
}

const closeVideoModal = (event) => {
    event.target.closest(".ms-modal")?.classList.remove("active");
};

const openVideoModal = () => {
    videoModal.classList.add("active");
};

document.body.addEventListener("click", (event) => {
    const target = event.target

    if (target.closest(".ms-video-card")) {
        openVideoModal();
    } else if (target.closest(".ms-modal-close")) {
        closeVideoModal(event);
    } else if (target.closest(".home-preview-swiper-button-next") || target.closest(".home-preview-swiper-button-prev")) {
        changeActiveVideo();
    }
});
