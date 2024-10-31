<script>
    import {filters} from "../lib/store/filters.js";

    const handleCheckbox = (kind, name) => {
        $filters[kind][name] = !$filters[kind][name];
    }
</script>

<div class="w-1/3">
    <div class="mb-[20px] pr-[20px]">
        <h3 class="mb-[10px] mt-0 text-md font-semibold">Types</h3>
        {#each Object.entries($filters.types) as [name, isChecked]}
            <label class="block mb-2">
                <input type="checkbox" checked={isChecked} on:change={() => handleCheckbox('types', name)} class="mr-2" /> {name}
            </label>
        {/each}
        <h3 class="mb-[10px] mt-0 text-md font-semibold">Processors</h3>
        {#each Object.entries($filters.processors) as [name, isChecked]}
            <label class="block mb-2">
                <input type="checkbox" checked={isChecked} on:change={() => handleCheckbox('processors', name)} class="mr-2" /> {name}
            </label>
        {/each}
        <h3 class="mb-[10px] mt-0 text-md font-semibold">Graphics Cards</h3>
        {#each Object.entries($filters.graphicsCards) as [name, isChecked]}
            <label class="block mb-2">
                <input type="checkbox" checked={isChecked} on:change={() => handleCheckbox('graphicsCards', name)} class="mr-2" /> {name}
            </label>
        {/each}
    </div>
</div>

