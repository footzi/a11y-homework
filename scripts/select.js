class Select {
    constructor(target, options) {
        this.options = options;
        this.select = document.querySelector(target);
        this.input = this.select.querySelector('.j-select-input');
        this.list = this.select.querySelector('.j-select-list');
        this.label = this.select.querySelector('.j-select-label');
        this.openIcon = this.select.querySelector('.j-select-open-icon')

        this.renderedOptions = [];
        this.isOpen = false;
        this.selectedOption = null;
        this.currentIndexFocusableOption = 0;
        this.isClickInList = false;

        this.paintOptions();
        this.setSelectedOption(this.options[0]);
        this.bindEvents()
    }

    paintOptions() {
        let items = '';

        this.options.forEach(({value, label}) => {
            const id = `option_${value}`
            items += `
                <div class="select__option j-select-option"
                    role="option"
                    data-value="${value}"
                    id="${id}"
                >
                    ${label}
                    <svg class="select__option-icon j-select-option-icon" viewBox="0 0 405.272 405.272">
                        <path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836
                            c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064
                            c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/>
                    </svg>
                </div>`
        })

        this.list.insertAdjacentHTML('afterbegin', items);
        this.renderedOptions = Array.from(this.select.querySelectorAll('.j-select-option'));
    }

    setSelectedOption(option) {
        this.label.innerHTML = option.label;
        this.selectedOption = option;

        this.renderedOptions.forEach((item) => {
            const value = item.dataset.value;

            if (value === option.value) {
                item.classList.add('is-checked');
                item.setAttribute("aria-selected", "true");
            } else {
                item.classList.remove('is-checked')
                item.setAttribute("aria-selected", "false");
            }
        })
    }

    bindEvents() {
        this.input.addEventListener('click', () => {
            this.toggleList();
        })

        this.input.addEventListener('blur', () => {
            if (!this.isClickInList) {
                this.closeList()
            }
        })

        this.input.addEventListener('keydown', (event) => {
            const {code} = event;
            const isSpace = this.getIsSpaceKey(code);
            const isArrowUp = this.getIsArrowUpKey(code);
            const isArrowDown = this.getIsArrowDownKey(code);

            if (isArrowUp || isArrowDown || isSpace) {
                event.preventDefault();
            }
        })

        this.input.addEventListener('keyup', (event) => {
            const {code} = event;
            const isEnter = this.getIsEnterKey(code);
            const isSpace = this.getIsSpaceKey(code);
            const isArrowUp = this.getIsArrowUpKey(code);
            const isArrowDown = this.getIsArrowDownKey(code);
            const isEsc = this.getIsEscKey(code);

            if (isEnter || isSpace) {
                if (!this.isOpen) {
                    this.setCurrentIndexFocusableOptionAtOpening();
                    this.openList();
                    this.setFocusInOptions();
                    return
                }
            }

            if (isArrowDown || isArrowUp) {
                if (!this.isOpen) {
                    this.resetCurrentIndexFocusableOption();
                    this.openList();
                    this.setFocusInOptions();
                    return
                }
            }

            if (isArrowUp || isArrowDown) {
                if (this.isOpen) {
                    this.setCurrentIndexFocusableOptionAtMoving(isArrowUp, isArrowDown);
                    this.setFocusInOptions()
                }
            }

            if (isSpace || isEnter) {
                if (this.isOpen) {
                    const renderedOption = this.renderedOptions[this.currentIndexFocusableOption];
                    this.changeOption(renderedOption);
                }
            }

            if (isEsc) {
                this.closeList();
            }
        })

        this.list.addEventListener("click", (event) => {
            this.changeOption(event.target);
            this.input.focus();
        })


        this.list.addEventListener("mousedown", () => {
            this.isClickInList = true;
        })
    }


    openList() {
        this.list.hidden = false;
        this.input.setAttribute("aria-expanded", "true");
        this.isOpen = true;
        this.openIcon.classList.add('is-open');
    }

    closeList() {
        this.list.hidden = true;
        this.input.setAttribute("aria-expanded", "false");
        this.isOpen = false;
        this.isClickInList = false;
        this.openIcon.classList.remove('is-open');

        this.clearAriaDescendant();
    }

    toggleList() {
        if (this.isOpen) {
            this.closeList()
        } else {
            this.openList()
        }
    }

    changeOption(target) {
        const value = target.dataset?.value;

        if (value) {
            const option = this.options.find((option) => option.value === value);

            this.setSelectedOption(option);
            this.closeList();

            this.onChange(option);
        }
    }

    setCurrentIndexFocusableOptionAtMoving(isArrowUp, isArrowDown) {
        if (isArrowDown) {
            if (this.currentIndexFocusableOption + 1 < this.renderedOptions.length) {
                this.currentIndexFocusableOption++
            } else {
                this.currentIndexFocusableOption = 0;
            }
        }

        if (isArrowUp) {
            if (this.currentIndexFocusableOption <= 0) {
                this.currentIndexFocusableOption = this.renderedOptions.length - 1
            } else {
                this.currentIndexFocusableOption--
            }
        }
    }

    setCurrentIndexFocusableOptionAtOpening() {
        this.currentIndexFocusableOption = this.renderedOptions.findIndex((option) => option.dataset.value === this.selectedOption.value)
    }

    resetCurrentIndexFocusableOption() {
        this.currentIndexFocusableOption = 0;
    }

    setFocusInOptions() {
        this.renderedOptions.forEach((option, index) => {
            if (index === this.currentIndexFocusableOption) {
                option.classList.add('focus');
            } else {
                option.classList.remove('focus');
            }
        })

        this.setAriaDescendant();
    }

    setAriaDescendant() {
        const optionId = this.renderedOptions[this.currentIndexFocusableOption]?.id

        if (optionId) {
            this.input.setAttribute('aria-activedescendant', optionId);
        }
    }

    clearAriaDescendant() {
        this.input.setAttribute('aria-activedescendant', '');
    }

    getIsArrowUpKey(code) {
        return code === "ArrowUp" || code === 38
    }

    getIsArrowDownKey(code) {
        return code === "ArrowDown" || code === 40
    }

    getIsSpaceKey(code) {
        return code === "Space" || code === 32;
    }

    getIsEnterKey(code) {
        return code === "Enter" || code === 13
    }

    getIsEscKey(code) {
        return code === "Escape" || code === 27;
    }
}


window.Select = Select;
