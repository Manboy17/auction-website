<script>
    export let bids;
    export let isEnded;

</script>

<div class="w-full flex flex-col gap-3 h-70">
    {#if bids.length > 0}
        {#each bids as bid (bid.id)}
            <div
                class="flex items-center justify-between border-[1px] border-gray-200 p-2.5 rounded-md text-sm font-medium">
                <span>{bid.creator}</span>
                <p>{bid.price}</p>
            </div>
        {/each}
    {:else}
        {#if !isEnded}
            <p class="text-center text-md mt-10">No place bids!</p>
        {/if}
    {/if}
</div>
