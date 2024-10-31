<script>
    import {Edit} from "svelte-feather/components/Edit";
    import {Trash} from "svelte-feather/components/Trash"
    import page from "page";
    import {createEventDispatcher} from "svelte";
    import {isAdminStore, tokenStore} from "../lib/store/auth.js";

    export let item;

    const handleClick = () => {
        page(`/edit/${item.id}`);
    }

    const dispatch = createEventDispatcher();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/computers/${item.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${$tokenStore}`
                }
            });
            if(!response.ok) {
                throw new Error("Failed to delete");
            }

            dispatch("deleted", {id: item.id});
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleRoute = () => {
        page(`/computers/${item.id}`);
    };

    const handleKeyDown = (e) => {
        if(e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        e.target.click();
    };
</script>

<div class="flex flex-col justify-between items-center border border-black p-4 cursor-pointer relative bg-white shadow-md rounded-md">
    <div class="relative w-full aspect-w-4 aspect-h-3 overflow-hidden rounded-md" on:click={handleRoute} on:keydown={handleKeyDown} role="button" tabindex="0">
        <img src={item.images[0]} alt="item_image" class="object-cover w-full h-full"/>
    </div>
    <div class="flex flex-col items-center w-full pt-2 text-center" on:click={handleRoute} on:keydown={handleKeyDown} role="button" tabindex="0">
        <span class="text-base font-medium pb-1">{item.name}</span>
        <span class="text-sm font-bold border-t-2 border-black pt-1">{item.price}€</span>
    </div>
    {#if $isAdminStore}
        <div class="flex space-x-2">
            <button on:click={handleClick} class="bg-blue-500 rounded-md p-1 absolute top-2 right-10">
                <Edit size="small" color="white" />
            </button>

            <button on:click={handleDelete} class="bg-blue-500 rounded-md p-1 absolute top-2 right-2">
                <Trash size="small" color="white" />
            </button>
        </div>
    {/if}
</div>