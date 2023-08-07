import { writable } from "svelte/store"
import { browser } from "$app/environment";

const THEME_STORE_KEY = 'rest_countries_sveltekit'

function createThemeStore() {

    const { subscribe, update, set } = writable<boolean>()

    function toggleThemeClass(darkMode: boolean) {
        if (!browser) {
            return
        }
        document.documentElement.classList.remove("dark");

        if (darkMode) {
            document.documentElement.classList.add("dark");
        }
    }

    return {
        subscribe,
        toggle: () => update((prev: boolean) => {
            const newTheme = !prev;
            sessionStorage.setItem(THEME_STORE_KEY, String(newTheme))
            toggleThemeClass(newTheme)
            return newTheme;
        }),
        init: () => {
            const cachedThemeValue = sessionStorage.getItem(THEME_STORE_KEY);
            let theme = false;
            if (cachedThemeValue) {
                theme = JSON.parse(cachedThemeValue)
            }
            set(theme)
            toggleThemeClass(theme)
        }
    }
}



export const themeStore = createThemeStore();