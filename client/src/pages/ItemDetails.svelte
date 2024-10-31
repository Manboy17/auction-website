<script>
    import Bids from "../components/Bids.svelte";
    import BidPopover from "../components/BidPopover.svelte";
    import page from "page";
    import {tokenStore, userStore} from "../lib/store/auth.js";
    import {onMount} from "svelte";

    export let params;
    console.log(params);
    let item = {
        name: null,
        type: null,
        price: null,
        processor: null,
        graphicsCard: null,
        description: null,
        images: [null, null, null, null],
        bids: [],
        endTime: null,
    };
    let itemId = params.id;
    let bids = [];
    let mainImage = "";
    let countdown = "";
    let isEnded = false;
    let endTime = null;
    let showPopup = false;

    const fetchItem = async () => {
        try {
            const response = await fetch(`http://localhost:3000/computers/${itemId}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            item = data;
            endTime = new Date(data.endTime);
            if (data.images.length > 0) {
                mainImage = data.images[0];
            }

            startCountdown();
            return data;
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchBids = async () => {
        try {
            const response = await fetch(`http://localhost:3000/bids/computers/${itemId}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            bids = data;
            return data;
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSetMainImage = (image) => {
        mainImage = image;
    };

    const handlePlaceBidClick = () => {
        if($tokenStore) {
            showPopup = true;
        } else {
            page("/login");
        }
    };

    const handleClosePopup = () => {
        showPopup = false;
    };

    const startCountdown = () => {
        let interval;

        const updateCountdown = () => {
            const now = new Date();
            const timeRemaining = Number(endTime) - Number(now);
            if (timeRemaining <= 0) {
                countdown = "Auction ended";
                isEnded = true;
                clearInterval(interval);
            } else {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                isEnded = false;
            }
        };

        updateCountdown();
        interval = setInterval(updateCountdown, 1000);
    };

    const handleKeydown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.currentTarget.click();
        }
    };

    const handleBidCreated = async (e) => {
        bids = [...bids, e.detail];

        fetchBids();
    }

    const handleClick = () => {
        page("/wins");
    }

    onMount(() => {
        fetchBids();

        const eventSource = new EventSource(`http://localhost:3000/bids/computers/${itemId}/monitor`);
        eventSource.onmessage = (event) => {
            const newBid = JSON.parse(event.data);
            bids = [...bids, newBid];
        };

        return () => {
            eventSource.close();
        };
    });
</script>

<div class="flex flex-col gap-4 mt-8 px-2 md:flex-row md:gap-8 lg:gap-10 lg:px-6">
    <div class="flex flex-col items-center gap-4 p-4 md:w-1/3">
        <div class="w-full">
            <img src={mainImage} alt="Main Image" class="w-full h-auto max-w-full" />
        </div>
        <div class="flex flex-wrap gap-4 justify-center mt-4">
            {#each item.images as image, index}
                {#if index > 0}
                    <div class="w-24 h-auto cursor-pointer" on:click={() => handleSetMainImage(image)} on:keydown={handleKeydown} role="button" tabindex="0">
                        <img src={image} alt="Thumbnail {index}" class="w-full h-auto" />
                    </div>
                {/if}
            {/each}
        </div>
    </div>

    <div class="flex flex-col gap-4 p-4 md:w-1/3">
        {#await fetchItem()}
            <div class="flex items-center justify-center mt-[6rem]">
                <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        {:then item}
            <h2 class="text-2xl font-bold text-gray-800 mb-4 lg:text-3xl">{item.name}</h2>
            <div class="flex flex-col gap-2">
                <p class="text-base text-gray-700 lg:text-lg"><strong>Type:</strong> {item.type}</p>
                <p class="text-base text-gray-700 lg:text-lg"><strong>Price:</strong> {item.price}€</p>
                <p class="text-base text-gray-700 lg:text-lg"><strong>Processor:</strong> {item.processor}</p>
                <p class="text-base text-gray-700 lg:text-lg"><strong>Graphics Card:</strong> {item.graphicsCard}</p>
                <p class="text-base text-gray-700 lg:text-lg"><strong>Description:</strong> {item.description}</p>
            </div>
        {:catch error}
            <p class="flex items-center justify-center mt-20 text-md lg:text-lg">Error fetching item: {error.message}</p>
        {/await}
    </div>

    <div class="flex flex-col gap-4 p-4 md:w-1/3">
        <h2 class="text-2xl font-bold text-center text-gray-800 lg:text-3xl">Bids</h2>
        <p class="text-lg font-semibold text-center text-red-500 bg-gray-100 py-2 px-4 rounded-md lg:text-xl">
            Time left: {countdown}
        </p>
        <div class="flex flex-col items-center gap-4">
            {#if !isEnded}
                <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-sm rounded-lg transition" on:click={handlePlaceBidClick}>
                    Place a bid
                </button>
            {:else}
                {#if $userStore}
                    <button class="bg-black text-white max-w-max py-2 px-5 rounded-md mt-7 hover:bg-white hover:text-black border-[2px] border-transparent hover:border-black transition" on:click={handleClick}>See Results</button>
                {/if}
            {/if}
            <Bids {bids} {isEnded} />
        </div>
    </div>
</div>

<BidPopover itemId={itemId} show={showPopup} onClose={handleClosePopup} on:bidCreated={handleBidCreated} />
