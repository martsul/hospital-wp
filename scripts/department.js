class Page {
    #categories = Array.from(document.querySelectorAll(".ms-result-category"));

    constructor() {
        this.#initHandlers();
    }

    #initHandlers() {
        document.body.addEventListener("click", (event) => {
            const { target } = event;
            if (target.closest(".ms-active-filter-remove")) {
                this.#removeFilter(target.closest(".ms-active-filter-remove"));
            } else if (target.closest(".ms-result-category")) {
                this.#changeCategory(
                    target.closest(".ms-result-category")
                );
            }
        });
    }

    #removeFilter(btn) {
        const filter = btn.closest(".ms-active-filter");
        filter.remove();
    }

    #changeCategory(btn) {
        this.#categories
            .find((e) => e.classList.contains("active"))
            ?.classList?.remove("active");
        btn.classList.add("active");
    }
}

new Page();
