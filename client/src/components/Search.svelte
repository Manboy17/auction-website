<script>

    import page from "page";
    import {isAdminStore} from "../lib/store/auth.js";

    export let handleInput;

    const handleClick = () => {
        page("/create");
    }
</script>

<div class="flex items-center gap-[15px]">
    <div class="w-3/4 border-[1px] border-[#111] p-[5px] rounded-md">
        <input type="text" placeholder="Search..." class="w-full border-none outline-none" on:input={handleInput} />
    </div>
    {#if $isAdminStore}
        <button class="w-1/4 p-[5px] cursor-pointer bg-[#111] text-white rounded-md hover:bg-white hover:text-[#111] hover:border-[1px] hover:border-[#111] transition" on:click={handleClick}>Add auction</button>
        {/if}
</div>