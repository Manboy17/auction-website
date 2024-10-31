<script>
    import {X} from "svelte-feather/components/X";
    import {createEventDispatcher} from "svelte";
    import {tokenStore, userStore} from '../lib/store/auth.js'

    export let itemId;
    export let show = false;
    export let onClose = () => {};
    let error = "";

    const dispatch = createEventDispatcher();

    const handlePlaceBid = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const price = formData.get("bidPrice");

        try {
            const response = await fetch(`http://localhost:3000/bids/computers/${itemId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${$tokenStore}`
                },
                body: JSON.stringify({
                    creator: $userStore.email,
                    price
                })
            })

            if(!response.ok) {
                const errorData = await response.json();
                error = errorData.message;
                throw new Error(response.statusText);
            }

            const newBid = await response.json();
            dispatch("bidCreated", newBid);
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleKeydown = (e) => {
        if(e.target === "Escape") {
            onClose();
        }

        if(e.target === "Enter") {
            handlePlaceBid(e);
        }
    };
</script>

{#if show}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="button" on:click={handleOverlayClick} on:keydown={handleKeydown} tabindex="0">
        <form class="bg-white p-6 rounded-lg w-full max-w-sm relative shadow-lg" on:submit={handlePlaceBid}>
            <button type="button" class="absolute top-2 right-2 text-gray-900 hover:bg-gray-200 rounded-full p-1 text-lg" on:click={onClose}>
                <X size="medium" />
            </button>
            <h2 class="text-xl font-bold text-gray-800 mb-4">Place Your Bid</h2>
            <div class="mb-4 text-left">
                <label for="bidPrice" class="block text-gray-700 font-semibold mb-2">Price</label>
                <input type="number" id="bidPrice" name="bidPrice" min="0" placeholder="Enter bid amount" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
            </div>
            {#if error.length > 0}
                <p class="text-red-500 py-2 text-sm">{error}</p>
            {/if}
            <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">Submit Bid</button>
        </form>
    </div>
{/if}

