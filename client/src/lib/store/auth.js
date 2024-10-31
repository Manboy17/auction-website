import {parseJwt} from "../helper.js";
import {writable, derived} from "svelte/store";

const storedToken = localStorage.getItem("token");

export const tokenStore = writable(storedToken);

export const userStore = derived(
    tokenStore,
    (token) => token ? parseJwt(token): null,
)

export const isAdminStore = derived(userStore, (user) => {
    return user && user.isAdmin;
})

export function setAuth(token) {
    localStorage.setItem('token', token);
    tokenStore.set(token);
}

export function clearAuth() {
    localStorage.removeItem('token');
    tokenStore.set(null);
}