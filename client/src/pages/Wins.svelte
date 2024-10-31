<script>
    import {tokenStore, userStore} from "../lib/store/auth.js";
    import page from "page";

    let userId = $userStore.id;
    let total = 0;

    const fetchWins = async () => {
        const response = await fetch(`http://localhost:3000/wins/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${$tokenStore}`
            }
        });

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        total += data.totalAmount;
        return data.wins;
    };

    const handleClick = () => {
        page("/");
    };

</script>

<div class="max-w-3xl mx-auto my-12 p-6">
    {#await fetchWins()}
            <div class="flex items-center justify-center mt-[6rem]">
                <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
    {:then wins}
        {#if wins.length > 0}
            <h3 class="text-center text-lg pb-5 border-b border-gray-500 font-light">Discover what you have won in auctions</h3>
            <div class="flex flex-col gap-4 my-5">
                {#each wins as win (win.id)}
                    <div class="flex justify-between items-center p-4 bg-green-100 border border-green-200 rounded-md">
                        <h2 class="text-lg text-gray-800">{win.itemName}</h2>
                        <span class="text-lg font-bold text-gray-800">{win.price}€</span>
                        <p class="text-md text-green-500 font-semibold">YOU WON!</p>
                    </div>
                {/each}
            </div>
            <span class="block text-center text-xl font-medium text-gray-800 md:text-lg border-t border-gray-500 pt-5">Total amount you have to pay: {total}€</span>
        {:else}
            <div class="flex flex-col items-center gap-5">
                <p class="text-lg text-center mt-10 font-medium">It looks like you have no wins yet! 🥲</p>
                <button class="bg-black text-white max-w-max py-2 px-3 rounded-md hover:bg-white hover:text-black hover:border-[2px] transition" on:click={handleClick}>Discover all auctions</button>
            </div>
        {/if}
    {:catch error}
        <p class="flex items-center justify-center mt-20 text-md lg:text-lg">Error fetching wins: {error.message}</p>
    {/await}
</div>


