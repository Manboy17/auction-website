<script>
    import page from "page";
    import {isAdminStore, tokenStore} from "../lib/store/auth.js";

    let error = "";

    if(!$isAdminStore) {
            page("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch("http://localhost:3000/computers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${$tokenStore}`
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            })

            if(!response.ok) {
                const errorData = await response.json();
                error = errorData.message;
                throw new Error(response.statusText);
            };

            e.target.reset();
            page("/");
        } catch (error) {
            console.error(error.message);
        }
    }

</script>

<div class="max-w-md mx-auto p-6 rounded-lg border-[1px] border-black bg-white mt-10">
    <h2 class="text-center text-2xl font-bold mb-6 text-gray-800">Create a New Auction</h2>
    <form on:submit={handleSubmit}>
        <div class="mb-4">
            <label for="name" class="block text-gray-700 font-semibold mb-2">Name</label>
            <input type="text" id="name" name="name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        <div class="mb-4">
            <label for="type" class="block text-gray-700 font-semibold mb-2">Type</label>
            <select id="type" name="type" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select a type</option>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="workstation">Workstation</option>
            </select>
        </div>
        <div class="mb-4">
            <label for="price" class="block text-gray-700 font-semibold mb-2">Price</label>
            <input type="number" id="price" name="price" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        <div class="mb-4">
            <label for="processor" class="block text-gray-700 font-semibold mb-2">Processor</label>
            <input type="text" id="processor" name="processor" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        <div class="mb-4">
            <label for="graphicsCard" class="block text-gray-700 font-semibold mb-2">Graphics Card</label>
            <input type="text" id="graphicsCard" name="graphicsCard" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        <div class="mb-4">
            <label for="description" class="block text-gray-700 font-semibold mb-2">Description</label>
            <input type="text" id="description" name="description" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        <div class="mb-4">
            <label for="endTime" class="block text-gray-700 font-semibold mb-2">End Time</label>
            <input type="date" id="endTime" name="endTime" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        {#if error.length > 0}
            <p class="text-red-500 py-2 text-sm">{error}</p>
        {/if}
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">Create</button>
    </form>
</div>
