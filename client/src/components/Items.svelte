<script>
    import Search from "../components/Search.svelte";
    import Item from "../components/Item.svelte";
    import {query, searchQueryString, setFilters} from "../lib/store/filters.js";

    let itemsPromise

    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/computers?${$searchQueryString}`, {
                method: "GET"
            });

            if(!response.ok) {
                throw new Error(response.statusText);
            };

            const data = await response.json();
            const uniqueTypes = [...new Set(data.map(item => item.type.toLowerCase().charAt(0).toUpperCase() + item.type.slice(1)))];
            const uniqueProcessors = [...new Set(data.map(item => item.processor.toLowerCase().charAt(0).toUpperCase() + item.processor.slice(1)))];
            const uniqueGraphicsCards = [...new Set(data.map(item => item.graphicsCard.toLowerCase().charAt(0).toUpperCase() + item.graphicsCard.slice(1)))];

            setFilters({
                types: uniqueTypes,
                processors: uniqueProcessors,
                graphicsCards: uniqueGraphicsCards
            });

            return data;
        } catch (error) {
            console.error(error.message);
            return [];
        }
    };

    const handleSearchOrFilterChange = () => {
        itemsPromise = fetchItems();
    };

    const handleItemDeleted = () => {
        itemsPromise = fetchItems();
    }

    const handleInput = (e) => {
        $query = e.target.value;
        handleSearchOrFilterChange();
    }

    searchQueryString.subscribe(handleSearchOrFilterChange);

</script>

<div class="w-3/4 mx-auto md:w-9/10 sm:w-full">
    <Search {handleInput} />
    {#await itemsPromise}
        <div class="flex items-center justify-center mt-[6rem]">
            <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    {:then items}
        {#if items.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5 w-full">
                {#each items as item (item.id)}
                    <Item {item} on:deleted={handleItemDeleted}/>
                {/each}
            </div>
        {:else}
            <p class="flex items-center justify-center mt-20 text-md lg:text-lg">No Items Found! 😧</p>
        {/if}
    {:catch error}
        <p class="flex items-center justify-center mt-20 text-md lg:text-lg">Error fetching items: {error.message}</p>
    {/await}
</div>