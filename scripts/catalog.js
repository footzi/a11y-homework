class Catalog {
    constructor() {
        this.catalog = document.querySelector('.j-catalog');
        this.countContainer = document.querySelector('.j-catalog-count');
        this.countValue = document.querySelector('.j-catalog-count-value');
        this.initalItems = this.getItems();
    }

    getItems() {
        return Array.from(this.catalog.querySelectorAll('.j-catalog-item'));
    }

    filter(value) {
        if (value === "house" || value === "board" || value === "sofa" || value === "baggage") {
            this.filterByCategory(value);
        }

        if (value === "asc" || value === "desc") {
            this.filterByPrice(value);
        }

        if (value === "rate") {
            this.filterByRate();
        }

        if (value === "none") {
            this.resetFilter();
        }
    }

    filterByPrice(value) {
        const items = this.getItems();

        const filteredItems = items.sort((a, b) => {
           if (value === "asc") {
               return Number(a.dataset.price) - Number(b.dataset.price);
           }

           return Number(b.dataset.price) - Number(a.dataset.price);
       })

        this.paint(filteredItems);
    }

    filterByRate() {
        const items = this.getItems();

        const filteredItems = items.sort((a, b) => {
            return Number(b.dataset.rate) - Number(a.dataset.rate);
        })

        this.paint(filteredItems);
    }

    filterByCategory(value) {
        const items = this.initalItems.map((item) => item);

        const filteredItems = items.filter((item) => item.dataset.category === value);

        this.paint(filteredItems);
    }

    resetFilter() {
        this.paint(this.initalItems)
    }

    paint(items) {
        this.catalog.innerHTML = "";

        items.forEach((item) => {
            this.catalog.appendChild(item);
        })

        this.countValue.innerHTML = items.length;
        this.countContainer.setAttribute('aria-live', 'polite');
    }
}

window.Catalog = Catalog;
