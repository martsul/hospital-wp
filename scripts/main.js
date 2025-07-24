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

class HomePage {
    #videoModal = document.querySelector(".video-modal");
    #previewVideos = Array.from(
        document.querySelectorAll(".home-preview__video")
    );

    constructor() {
        this.#startStopVideo(0);
        this.#initHandlers();
    }

    #initHandlers() {
        document.body.addEventListener("click", (event) => {
            const target = event.target;

            if (target.closest(".ms-video-card")) {
                this.#openVideoModal(target.closest(".ms-video-card"));
            } else if (target.closest(".ms-modal-close")) {
                this.#closeVideoModal(event);
            } else if (
                target.closest(".home-preview-swiper-button-next") ||
                target.closest(".home-preview-swiper-button-prev")
            ) {
                this.#changeActiveVideo();
            }
        });
    }

    #startStopVideo(activeVideoIndex) {
        const currentActiveVideo = this.#previewVideos.find((v) =>
            v.classList.contains("active")
        );
        currentActiveVideo?.pause();
        currentActiveVideo?.classList?.remove("active");
        this.#previewVideos[activeVideoIndex]?.classList?.add("active");
        this.#previewVideos[activeVideoIndex]?.play();
    }

    #changeActiveVideo() {
        const activeVideo = document.querySelector(
            ".home-preview-swiper .swiper-slide-active"
        );
        const activeVideoIndex =
            activeVideo.getAttribute("aria-label").split(" / ")[0] - 1;
        this.#startStopVideo(activeVideoIndex);
    }

    #closeVideoModal(event) {
        event.target.closest(".ms-modal")?.classList.remove("active");
        this.#videoModal.querySelector("iframe").remove()
    }

    #openVideoModal(slide) {
        this.#createIframe(slide);
        this.#videoModal.classList.add("active");
    }

    #createIframe(slide) {
        const videoLink = this.#parseVideoLink(slide.dataset.link)
        const iframe = document.createElement("iframe");
        iframe.src = videoLink;
        iframe.classList.add("ms-video-modal-iframe");
        this.#videoModal.append(iframe);
    }

    #parseVideoLink(link) {
        const id = link.split("=").slice(-1)[0];
        return `https://www.youtube.com/embed/${id}`
    }
}

new HomePage();
