class Tabs {
    constructor(target) {
        this.container = document.querySelector(target);
        this.buttons = Array.from(this.container.querySelectorAll('.j-tabs-button'));
        this.panels = Array.from(this.container.querySelectorAll('.j-tabs-panel'));

        this.currentIndexFocusButton = 0;

        this.bindEvents()
    }

    bindEvents() {
        this.buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                this.changeTab(event.target);
            })

            button.addEventListener('keyup', (event) => {
                const {code} = event;
                const isArrowRight = this.getIsArrowRightKey(code);
                const isArrowLeft = this.getIsArrowLeftKey(code);

                if (isArrowRight || isArrowLeft) {
                    this.setCurrentIndexFocusButton(isArrowRight, isArrowLeft)
                    this.setFocusOnButton();
                }
            })
        })
    }

    changeTab(target) {
        const buttonId = target.dataset.tabButton;

        this.panels.forEach((panel) => {
            panel.hidden = panel.dataset.tabPanel !== buttonId;
        })

        this.buttons.forEach((button, index) => {
            const isChecked = button.dataset.tabButton === buttonId;
            button.setAttribute('aria-checked', isChecked);

            if (isChecked) {
                button.removeAttribute('tabindex');
                button.classList.remove('button_theme_secondary');
                this.currentIndexFocusButton = index;
            } else {
                button.tabIndex = -1;
                button.classList.add('button_theme_secondary');
            }
        })
    }

    setCurrentIndexFocusButton(isArrowRight, isArrowLeft) {
        if (isArrowRight) {
            if (this.currentIndexFocusButton + 1 < this.buttons.length) {
                this.currentIndexFocusButton = this.currentIndexFocusButton + 1;
            } else {
                this.currentIndexFocusButton = 0;
            }
        }

        if (isArrowLeft) {
            if (this.currentIndexFocusButton <= 0) {
                this.currentIndexFocusButton = this.buttons.length - 1
            } else {
                this.currentIndexFocusButton = this.currentIndexFocusButton - 1;
            }
        }
    }

    setFocusOnButton() {
        const currentButton = this.buttons[this.currentIndexFocusButton];

        currentButton.focus();
    }

    getIsArrowRightKey(code) {
        return code === "ArrowRight" || code === 39
    }

    getIsArrowLeftKey(code) {
        return code === "ArrowLeft" || code === 37
    }
}


window.Tabs = Tabs;
