class Page {
    #openedSelect = undefined;

    constructor() {
        this.#initHandlers();
    }

    #initHandlers() {
        document.body.addEventListener("click", (event) => {
            const { target } = event;

            if (target.closest(".ms-active-filter-remove")) {
                this.#removeFilter(target.closest(".ms-active-filter-remove"));
            } else if (target.closest(".ms-select-choice-button")) {
                this.#toggleSelect(target.closest(".ms-select-choice-button"));
            } else if (target.closest(".ms-select-btn ")) {
                this.#closeSelect();
            } else if (
                !target.closest(".ms-select-result") &&
                this.#openedSelect
            ) {
                this.#closeSelect();
            }
        });
    }

    #removeFilter(btn) {
        const filter = btn.closest(".ms-active-filter");
        filter.remove();
    }

    #toggleSelect(btn) {
        const select = btn.closest(".ms-select");
        select.classList.toggle("active");
        if (select !== this.#openedSelect && this.#openedSelect) {
            this.#openedSelect.classList.remove("active");
        }
        this.#openedSelect = select;
    }

    #closeSelect() {
        this.#openedSelect.classList.remove("active");
        this.#openedSelect = undefined;
    }
}

new Page();
