class Form {
    constructor(target, config) {
        this.form = document.querySelector(target);
        this.config = config ?? []
        this.isValid = false;
        this.textFields = [];
        this.radios = [];

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
        })
    }

    bindEvents() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.submitForm();
        })

        this.textFields.forEach((field) => {
            field.addEventListener('blur', (event) => {
                this.validateText(event.target);
            });

            field.addEventListener('focus', (event) => {
                this.clearValidateText(event.target);
            })
        })

        this.radios.forEach((radioGroup) => {
            radioGroup.fields.forEach((field) => {
                field.addEventListener('focus', (event) => {
                    this.clearValidateRadio(event.target);
                })
            })
        })
    }

    validateText(target) {
        const config = this.config.find((config) => config.name === target.name);

        if (config.isRequired) {
            const value = target.value.trim();
            const text = this.form.querySelector(`#${config.name}-error`);

            if (!value) {
                target.classList.add('is-error');
                target.setAttribute('aria-valid', "false");
                text.innerHTML = config.requiredMessageError;
            } else {
                this.clearValidateText(target);
            }
        }
    }

    validateRadio(radioGroup) {
        const config = this.config.find((config) => config.name === radioGroup.name);

        if (config.isRequired) {
            const isChecked = Boolean(this.form.querySelector(`[name="${config.name}"]:checked`)?.value);
            const container = this.form.querySelector(config.selector);
            const text = this.form.querySelector(`#${config.name}-error`);

            if (!isChecked) {
                container.classList.add('is-error');
                container.setAttribute('aria-valid', 'false');
                text.innerHTML = config.requiredMessageError;
            } else {
               this.clearValidateText(radioGroup.fields[0]);
            }
        }
    }

    clearValidateText(target) {
        const config = this.config.find((config) => config.name === target.name);
        const text = this.form.querySelector(`#${config.name}-error`);

        target.classList.remove('is-error');
        target.removeAttribute('aria-valid');
        text.innerHTML = "";
    }

    clearValidateRadio(target) {
        const config = this.config.find((config) => config.name === target.name);
        const container = this.form.querySelector(config.selector);
        const text = this.form.querySelector(`#${config.name}-error`);

        container.classList.remove('is-error');
        container.removeAttribute('aria-valid');
        text.innerHTML = "";
    }

    validateAll() {
        this.textFields.forEach((field) => {
            this.validateText(field);
        });

        this.radios.forEach((radioGroup) => {
            this.validateRadio(radioGroup);
        })
    }

    submitForm() {
        this.validateAll();
        // this.onSubmit();
    }
}

window.Form = Form;

