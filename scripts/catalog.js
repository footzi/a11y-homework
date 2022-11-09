const pluralize = (count, words) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return count + ' ' + words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ];
}

class Catalog {
    constructor() {
        this.catalog = document.querySelector('.j-catalog');
        this.countValue = document.querySelector('.j-catalog-count');
        this.countValueContainer = document.querySelector('.j-catalog-count-container');
        this.initalItems = this.getItems();

        this.bindEvents(this.initalItems);
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

        this.updateCountText(items);
        this.bindEvents(items);
    }

    updateCountText(items) {
        const plural = pluralize(items.length, ['товар', 'товара', 'товаров']);

        // Удаляем из дома, чтобы скринридер прочитывал всегда заново (когда кол-во товаров не изменилось)
        this.countValue.innerHTML = `Найдено ${plural}`;
        this.countValue.remove();
        this.countValueContainer.appendChild(this.countValue);
    }

    bindEvents(items) {
        items.forEach((item) => {
            const button = item.querySelector('.j-catalog-button');

            button.addEventListener('click', () => {
                const name = item.querySelector('.j-catalog-item-name').textContent;
                this.onClick({
                    name
                });
            })
        })
    }
}

window.Catalog = Catalog;
