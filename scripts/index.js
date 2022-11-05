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

const sortSelect = new window.Select(".j-sort-select", sortOptions);
const categorySelect = new window.Select(".j-category-select", categoryOptions);

const items = new window.Catalog();

sortSelect.onChange = ((option) => {
    items.filter(option.value)
})

categorySelect.onChange = ((option) => {
    items.filter(option.value)
})
