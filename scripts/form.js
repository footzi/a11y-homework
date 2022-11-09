class Form {
    constructor(target, config) {
        this.form = document.querySelector(target);
        this.config = config ?? []
        this.textFields = [];
        this.radios = [];
        this.checkboxes = [];

        this.initFields();
        this.bindEvents();
    }

    initFields() {
        this.config.forEach((config) => {
            if (config.type === 'text') {
                const field = this.form.querySelector(`[name="${config.name}"]`);

                this.textFields.push(field);
            }

            if (config.type === 'radio') {
                const fields = this.form.querySelectorAll(`[name="${config.name}"]`);

                this.radios.push({
                    name: config.name,
                    fields
                })
            }

            if (config.type === 'checkbox') {
                const field = this.form.querySelector(`[name="${config.name}"]`);

                this.checkboxes.push(field);
            }
        })
    }

    bindEvents() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.submitForm();
        });

        this.textFields.forEach((field) => {
            field.addEventListener('blur', (event) => {
                this.validateText(event.target);
            });

            field.addEventListener('focus', (event) => {
                this.clearValidateText(event.target);
            });
        });

        this.radios.forEach((radioGroup) => {
            radioGroup.fields.forEach((field) => {
                field.addEventListener('focus', (event) => {
                    this.clearValidateRadio(event.target);
                })
            })
        });

        this.checkboxes.forEach((field) => {
            field.addEventListener('blur', (event) => {
                this.validateCheckbox(event.target);
            });

            field.addEventListener('focus', (event) => {
                this.clearValidateText(event.target);
            })
        })
    }

    validateText(target) {
        let isValid = true;
        const config = this.config.find((config) => config.name === target.name);

        if (config.isRequired) {
            const value = target.value.trim();
            const text = this.form.querySelector(`#${config.name}-error`);

            if (!value) {
                target.classList.add('is-error');
                target.setAttribute('aria-valid', "false");
                text.innerHTML = config.requiredMessageError;
                text.classList.add('is-visible');

                isValid = false;
            } else {
                this.clearValidateText(target);
            }
        }

        return isValid;
    }

    validateRadio(radioGroup) {
        let isValid = true;
        const config = this.config.find((config) => config.name === radioGroup.name);

        if (config.isRequired) {
            const isChecked = Boolean(this.form.querySelector(`[name="${config.name}"]:checked`)?.value);
            const container = this.form.querySelector(config.selector);
            const text = this.form.querySelector(`#${config.name}-error`);

            if (!isChecked) {
                container.classList.add('is-error');
                container.setAttribute('aria-valid', 'false');
                text.innerHTML = config.requiredMessageError;
                text.classList.add('is-visible');

                isValid = false;
            } else {
                this.clearValidateText(radioGroup.fields[0]);
            }
        }

        return isValid;
    }

    validateCheckbox(target) {
        let isValid = true;
        const config = this.config.find((config) => config.name === target.name);

        if (config.isRequired) {
            const isChecked = target.checked;
            const text = this.form.querySelector(`#${config.name}-error`);

            if (!isChecked) {
                target.classList.add('is-error');
                target.setAttribute('aria-valid', "false");
                text.innerHTML = config.requiredMessageError;
                text.classList.add('is-visible');

                isValid = false;
            } else {
                this.clearValidateText(target);
            }
        }

        return isValid;
    }

    clearValidateText(target) {
        const config = this.config.find((config) => config.name === target.name);
        const text = this.form.querySelector(`#${config.name}-error`);

        target.classList.remove('is-error');
        target.removeAttribute('aria-valid');
        text.innerHTML = "";
        text.classList.remove('is-visible');
    }

    clearValidateRadio(target) {
        const config = this.config.find((config) => config.name === target.name);
        const container = this.form.querySelector(config.selector);
        const text = this.form.querySelector(`#${config.name}-error`);

        container.classList.remove('is-error');
        container.removeAttribute('aria-valid');
        text.innerHTML = "";
        text.classList.remove('is-visible');
    }

    validateAll() {
        let isValid = true;

        this.textFields.forEach((field) => {
            const isValidText = this.validateText(field);

            if (!isValidText) {
                isValid = false;
            }
        });

        this.radios.forEach((radioGroup) => {
            const isValidRadio = this.validateRadio(radioGroup);

            if (!isValidRadio) {
                isValid = false;
            }
        });

        this.checkboxes.forEach((checkbox) => {
            const isValidCheckbox = this.validateCheckbox(checkbox);

            if (!isValidCheckbox) {
                isValid = false;
            }
        });

        return isValid
    }

    submitForm() {
        const isValid = this.validateAll();

        if (isValid) {
            this.getRequest();
        }
    }

    getRequest() {
        const button = this.form.querySelector('button[type="submit"]');
        const text = button.textContent;

        button.innerHTML = 'Отправка...'
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');

        setTimeout(() => {
            button.innerHTML = text
            button.disabled = false;
            button.removeAttribute('aria-busy');

            this.onSubmit();
        }, 1000)
    }
}

window.Form = Form;

