class Modal {
    constructor() {
        this.isOpen = false;
    }

    render(template) {
        document.body.insertAdjacentHTML('beforeend', template);

        this.findElements();
        this.bindEvents();
        this.isOpen = true;
        this.focusTrap.activate();
        document.body.classList.add('is-overflow');
    }

    findElements() {
        this.modal = document.querySelector('.j-modal');
        this.content = this.modal.querySelector('.j-modal-content');
        this.closeButtons = Array.from(this.modal.querySelectorAll('.j-modal-close'));

        this.focusTrap = window.focusTrap.createFocusTrap('.j-modal', {
            initialFocus: this.content
        });
        this.overlay = this.modal.querySelector('.j-modal-overlay');
    }

    bindEvents() {
        this.closeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.close();
            });
        })

        this.overlay.addEventListener('click', () => {
            this.close();
        });

        document.addEventListener('keydown', (event) => {
            const {code} = event;
            const isEsc = this.getIsEscKey(code);

            if (this.isOpen && isEsc) {
                this.close();
            }
        })
    }

    close() {
        this.isOpen = false;
        this.modal.remove();
        this.focusTrap.deactivate();
        document.body.classList.remove('is-overflow');
    }

    insertContent(template) {
        this.content.innerHTML = "";
        this.content.insertAdjacentHTML('afterbegin', template);
        this.updateElements();
    }

    updateElements() {
        this.closeButtons = Array.from(this.modal.querySelectorAll('.j-modal-close'));

        this.closeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.close();
            });
        })
    }

    focusToContent() {
        this.content.focus();
    }

    getIsEscKey(code) {
        return code === "Escape" || code === 27;
    }
}

class SubscribeModal extends Modal {
    constructor() {
        super();
    }

    open() {
        const template = `
            <div 
                class="modal j-modal"
                role="dialog"
            >
                <div class="modal__overlay j-modal-overlay"></div>
                <div class="modal__container">
                    <div 
                        class="modal__content j-modal-content"
                        aria-labelledby="submit-modal-label"
                        tabindex="-1"
                    >
                        <button class="modal__close j-modal-close" aria-label="?????????????? ?????????????????? ????????">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z"/>
                            </svg>
                        </button>
                        <h3 class="heading-h3" id="submit-modal-label">?????????? ?????????????? ????????????????????</h3>
                       
                        <div class="modal__success-icon">
                            <svg viewBox="0 0 50 50">
                                <circle cx="25" cy="25" r="25"/>
                                <polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="38,15 22,33 12,25 "/>
                            </svg>
                        </div>
                        <button class="button modal__submit-button j-modal-close">??????????????</button>
                    </div>
                </div>
            </div>
        `

        this.render(template);
    }
}

class CatalogModal extends Modal {
    constructor() {
        super();
    }

    open({name}) {
        const template = `
            <div 
                class="modal j-modal"
                role="dialog"
                aria-modal="true"
            >
                <div class="modal__overlay j-modal-overlay"></div>
                <div class="modal__container">
                    <button class="modal__close j-modal-close" aria-label="?????????????? ?????????????????? ????????">
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z"/>
                        </svg>
                    </button>
                    <div 
                        class="modal__content j-modal-content" 
                        aria-labelledby="catalog-modal-description catalog-modal-label"
                        tabindex="-1"
                    >
                        <h3 class="heading-h3" id="catalog-modal-label">${name}</h3>
                        <p class="modal__description" id="catalog-modal-description">???????????????????? ????????????</p>
                
                        <form class="modal__form j-catalog-form" aria-labelledby="catalog-modal-description">
                            <fieldset>
                                <legend hidden>???????????? ?? ????????????????</legend>
                                <div class="form-item">
                                    <label for="name" class="label">?????? ?? ??????????????</label>
                                    <input 
                                        id="name"
                                        class="input"
                                        name="name"
                                        type="text"
                                        placeholder="?????? ????????????????"
                                        aria-describedby="name-error"
                                    >
                                    <div class="form-error" id="name-error" aria-live="polite"></div>
                                </div>
                
                                <div class="form-item">
                                    <label for="order-email" class="label">E-mail</label>
                                    <input 
                                        id="order-email"
                                        class="input"
                                        name="order-email"
                                        type="email"
                                        placeholder="gmail@gmail.com"
                                        aria-describedby="order-email-error"
                                    >
                                    <div class="form-error" id="order-email-error" aria-live="polite"></div>
                                </div>
                
                                <div class="form-item">
                                    <label for="address" class="label">?????????? ????????????????</label>
                                    <textarea 
                                        id="address"
                                        name="address"
                                        placeholder="?????????????? ???????????? ???????????????? ?????????? ?? ????????????????"
                                        class="textarea"
                                        rows="4"
                                        aria-describedby="address-error"
                                    >
                                    </textarea>
                                    <div class="form-error" id="address-error" aria-live="polite"></div>
                                </div>
                            </fieldset>
                
                            <fieldset>
                                <legend class="label">???????????? ????????????</legend>
                                <div class="form-item">
                                    <div class="radio-groups j-catalog-radio">
                                        <div class="radio-groups__item">
                                            <input type="radio" id="cards" name="payments">
                                            <label for="cards">????????????</label>
                                        </div>
                
                                        <div class="radio-groups__item">
                                            <input type="radio" id="cash" name="payments">
                                            <label for="cash">??????????????????</label>
                                        </div>
                                    </div>
                                    <div class="form-error" id="payments-error" aria-live="polite"></div>
                                </div>
                            </fieldset>
                
                            <button class="button modal__submit-button" type="submit">??????????????????</button>
                        </form>
                    </div>
                </div>
            </div>
        `

        this.render(template);
    }

    success() {
        const template = `
             <div role="alert" aria-live="polite">
                 <h3 class="heading-h3" id="submit-modal-label">???????????? ?????????????? ????????????????????</h3>
                 <button class="button modal__submit-button j-modal-close">??????????????</button>
            </div>
        `
        this.insertContent(template);
        this.focusToContent();
    }
}

window.SubscribeModal = SubscribeModal;
window.CatalogModal = CatalogModal;
