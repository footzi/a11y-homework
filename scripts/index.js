// Select
const categoryOptions = [
    {
        value: "none",
        label: "Все"
    },
    {
        value: "house",
        label: "Домики"
    },
    {
        value: "board",
        label: "Когтеточки"
    },
    {
        value: "sofa",
        label: "Лежанки"
    },
    {
        value: "baggage",
        label: "Переноски"
    },
]

const sortOptions = [
    {
        value: "none",
        label: "Нет сортировки"
    },
    {
        value: "asc",
        label: "По возрастанию цены"
    },
    {
        value: "desc",
        label: "По убыванию цены"
    },
    {
        value: "rate",
        label: "По популярности"
    },
]

const sortSelect = new window.Select(".j-sort-select", 'sort-select', sortOptions);
const categorySelect = new window.Select(".j-category-select", 'category-select', categoryOptions);

// Catalog
const items = new window.Catalog();

sortSelect.onChange = ((option) => {
    items.filter(option.value)
})

categorySelect.onChange = ((option) => {
    items.filter(option.value)
})

// Tabs
new window.Tabs('.j-tabs');

// Modals
const subscribeModal = new window.SubscribeModal();
const catalogModal = new window.CatalogModal();

// Form
const subscribeForm = new window.Form('.j-subscribe-form', [
    {
        name: "email",
        isRequired: true,
        requiredMessageError: "Введите адрес электронной почты",
        type: "text"
    },
    {
        name: "agreement",
        isRequired: true,
        requiredMessageError: "Для продолжения примите соглашение",
        type: "checkbox"
    },
]);

subscribeForm.onSubmit = () => {
    subscribeModal.open();
}

items.onClick = (data) => {
    catalogModal.open(data);

    const catalogForm = new window.Form('.j-catalog-form', [
        {
            name: "name",
            isRequired: true,
            requiredMessageError: "Введите имя",
            type: "text",
        },
        {
            name: "order-email",
            isRequired: true,
            requiredMessageError: "Введите адрес электронной почты",
            type: "text"
        },
        {
            name: "address",
            isRequired: true,
            requiredMessageError: "Введите адрес доставки",
            type: "text"
        },
        {
            name: "payments",
            isRequired: true,
            requiredMessageError: "Выберите способ оплаты",
            type: "radio",
            selector: ".j-catalog-radio"
        }
    ]);

    catalogForm.onSubmit = () => {
        catalogModal.success();
    }
}

