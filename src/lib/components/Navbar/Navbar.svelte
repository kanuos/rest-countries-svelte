<script lang="ts">
	import Icon from '@iconify/svelte';
	import { themeStore } from '$lib/stores/ThemeToggler';
</script>

<nav class="p-6 grid place-items-center w-full bg-dark-text shadow-sm dark:bg-dark-el">
	<div class="flex items-center justify-between w-full max-w-5xl">
		<strong aria-label="site-logo" class="font-semibold"> Where in the world? </strong>

		<button
			aria-label="theme-toggler"
			on:click={themeStore.toggle}
			class="opacity-50 text-sm inline-flex items-center justify-center gap-x-1 hover:opacity-100 transition-opacity"
		>
			{#if $themeStore}
				<Icon icon="bi:moon-fill" aria-label="dark mode icon" />
				<span>Dark Mode</span>
			{:else}
				<Icon icon="bi:sun" aria-label="light mode icon" />
				<span>Light Mode</span>
			{/if}
		</button>
	</div>
</nav>
