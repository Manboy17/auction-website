<script>
    import {setAuth, tokenStore} from "../lib/store/auth.js";
    import page from "page";

    let error = "";

    if($tokenStore) {
        page("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
            repeatedPassword: formData.get("password2")
        };

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if(!response.ok) {
                const errorData = await response.json();
                error = errorData.message;
                throw new Error(response.statusText);
            }

            const receivedData = await response.json();
            setAuth(receivedData.token);
            page("/");
        } catch (error) {
            console.error(error.message);
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-white px-4 py-6 sm:px-6 md:px-8 lg:px-10">
    <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 bg-white shadow-lg rounded-lg border border-blue-200">
        <h2 class="text-xl sm:text-2xl font-bold text-center text-blue-600 mb-4 sm:mb-6">Register</h2>
        <form on:submit={handleSubmit}>
            <div class="mb-4">
                <input name="email" type="text" placeholder="Email..." required class="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div class="mb-4">
                <input name="password" type="password" placeholder="Password..." required class="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div class="mb-6">
                <input name="password2" type="password" placeholder="Repeat password..." required class="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            {#if error.length > 0}
                <p class="text-red-500 py-2 text-sm">{error}</p>
            {/if}
            <button type="submit" class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Register</button>
            <p class="mt-4 text-center text-gray-600 text-sm sm:text-base">Already have an account? <a href="/login" class="text-blue-600 hover:underline">Login</a></p>
        </form>
    </div>
</div>