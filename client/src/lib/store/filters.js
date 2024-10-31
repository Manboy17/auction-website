import {derived, writable} from "svelte/store";

export const query = writable("")

export const filters = writable({
    types: {},
    processors: {},
    graphicsCards: {}
});

const extractCheckedValues = (obj) => {
    return Object.entries(obj).filter(([_name, isChecked]) => isChecked).map(([name, _isChecked]) => name);
}

export const selectedFilters = derived(filters, ($filters) => {
    const types = extractCheckedValues($filters.types);
    const processors = extractCheckedValues($filters.processors);
    const graphicsCards = extractCheckedValues($filters.graphicsCards);
    return {types, processors, graphicsCards};
})

export const setFilters = (data) => {
    filters.update(($filters) => ({
        types: Object.fromEntries(data.types.map(name => ([name, $filters.types[name]]))),
        processors: Object.fromEntries(data.processors.map(name => ([name, $filters.processors[name]]))),
        graphicsCards: Object.fromEntries(data.graphicsCards.map(name => ([name, $filters.graphicsCards[name]])))
    }));
};

export const searchQueryString = derived([query, selectedFilters], ([$query, $selectedFilters]) => {
    const params = new URLSearchParams({
        search: $query,
        type: $selectedFilters.types.join(','),
        processor: $selectedFilters.processors.join(','),
        graphicsCard: $selectedFilters.graphicsCards.join(',')
    });
    return params.toString();
})
