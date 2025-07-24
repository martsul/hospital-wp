const homePreviewSwiper = new Swiper(".ms-home-preview-swiper", {
    slidesPerView: 1,

    spaceBetween: 167,

    loop: true,

    navigation: {
        nextEl: ".ms-home-preview-swiper-button-next",
        prevEl: ".ms-home-preview-swiper-button-prev",
    },
});

const homeNewsSwiper = new Swiper(".ms-swiper-main-news", {
    slidesPerView: 3,
    initialSlide: 2,

    spaceBetween: 40,

    loop: true,

    loopAdditionalSlides: 1,

    navigation: {
        nextEl: ".ms-swiper-main-news-button-next",
        prevEl: ".ms-swiper-main-news-button-prev",
    },

    pagination: {
        el: ".ms-swiper-main-news-pagination",
        clickable: true,
    },
});

const homeArticlesSwiper = new Swiper(".ms-swiper-main-articles", {
    slidesPerView: 3,
    initialSlide: 2,

    spaceBetween: 40,

    loopAdditionalSlides: 1,
    loop: true,

    navigation: {
        nextEl: ".ms-swiper-main-news-button-next",
        prevEl: ".ms-swiper-main-news-button-prev",
    },

    pagination: {
        el: ".ms-swiper-main-news-pagination",
        clickable: true,
    },
});

const homeVideoSwiper = new Swiper(".ms-swiper-main-video", {
    slidesPerView: 4,
    initialSlide: 2,

    spaceBetween: 20,

    loopAdditionalSlides: 1,

    loop: true,

    navigation: {
        nextEl: ".ms-ms-swiper-main-video-button-next",
        prevEl: ".ms-ms-swiper-main-video-button-prev",
    },

    pagination: {
        el: ".ms-swiper-main-video-pagination",
        clickable: true,
    },
});

class HomePage {
    #videoModal = document.querySelector(".video-modal");
    #previewVideos = Array.from(
        document.querySelectorAll(".ms-home-preview-video")
    );
    #asides = document.querySelectorAll(".ms-aside ");
    #previewSection = document.querySelector(".ms-home-preview");

    constructor() {
        this.#startStopVideo(0);
        this.#initHandlers();
        this.#asideObserver();
    }

    #asideObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    console.log(entry.isIntersecting)
                    if (entry.isIntersecting) {
                        this.#hideAsides();
                    } else {
                        this.#showAsides();
                    };
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(this.#previewSection);
    }

    #showAsides() {
        this.#asides.forEach((a) => a.classList.add("active"));
    }

    #hideAsides() {
        this.#asides.forEach((a) => a.classList.remove("active"));
    }

    #initHandlers() {
        document.body.addEventListener("click", (event) => {
            const target = event.target;

            if (target.closest(".ms-video-card")) {
                this.#openVideoModal(target.closest(".ms-video-card"));
            } else if (target.closest(".ms-modal-close")) {
                this.#closeVideoModal(event);
            } else if (
                target.closest(".ms-home-preview-swiper-button-next") ||
                target.closest(".ms-home-preview-swiper-button-prev")
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
            ".ms-home-preview-swiper .swiper-slide-active"
        );
        const activeVideoIndex =
            activeVideo.getAttribute("aria-label").split(" / ")[0] - 1;
        this.#startStopVideo(activeVideoIndex);
    }

    #closeVideoModal(event) {
        event.target.closest(".ms-modal")?.classList.remove("active");
        this.#videoModal.querySelector("iframe").remove();
    }

    #openVideoModal(slide) {
        this.#createIframe(slide);
        this.#videoModal.classList.add("active");
    }

    #createIframe(slide) {
        const videoLink = this.#parseVideoLink(slide.dataset.link);
        const iframe = document.createElement("iframe");
        iframe.src = videoLink;
        iframe.classList.add("ms-video-modal-iframe");
        this.#videoModal.append(iframe);
    }

    #parseVideoLink(link) {
        const id = link.split("=").slice(-1)[0];
        return `https://www.youtube.com/embed/${id}`;
    }
}

new HomePage();
