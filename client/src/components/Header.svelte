<script>
    import page from "page";
    import {clearAuth, userStore} from "../lib/store/auth.js";

    export let active;

    const handleLogout = () => {
        clearAuth();
    }

    const handleClick = () => {
        page("/");
    }

    const navigateToWins = () => {
        page("/wins");
    }
</script>

<nav class="flex justify-between items-center p-4 border border-gray-900">
    <div>
        <button
                class="bg-white border-none cursor-pointer text-lg font-semibold p-0"
                on:click={handleClick}
        >
            TechBid
        </button>
        <p class="line-clamp-1 overflow-hidden text-gray-700">
            Find your next computing upgrade with ease and competitive pricing. Join
            TechBid today to start bidding and winning!
        </p>
    </div>

    <ul class="list-none m-0 p-0 flex items-center">
        {#if $userStore}
            <div class="flex items-center gap-5">
                <div class="flex items-center gap-5">
                        <button class="border-none bg-transparent cursor-pointer text-base hover:underline" on:click={navigateToWins}>
                            Wins
                        </button>
                        <button class="bg-blue-500 text-white py-2 px-3 rounded-md text-sm" on:click={handleLogout}>Logout</button>
                </div>
                <div
                        class="bg-blue-100 h-12 w-12 flex items-center justify-center rounded-full font-medium"
                >
                    <span>{$userStore.email.toString().charAt(0).toUpperCase()}</span>
                </div>
            </div>
        {:else}
            <li class="ml-4">
                <a
                        class="bg-blue-500 text-white py-2 px-3 rounded-lg cursor-pointer text-sm hover:bg-blue-700 transition duration-300"
                        class:active={active === "/login"}
                        href="/login"
                >
                    Login
                </a>
            </li>
        {/if}
    </ul>
</nav>

