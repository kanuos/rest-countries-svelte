<!-- +layout.svelte -->
<script>
	import '@fontsource-variable/nunito-sans';
	import '../app.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	import { themeStore } from '$lib/stores/ThemeToggler';
	import { onMount } from 'svelte';

	onMount(() => {
		themeStore.init();
	});
</script>

<div class="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text min-h-screen">
	<Navbar />
	<main class="p-6">
		<slot />
	</main>
</div>

<style>
	:global(body) {
		font-family: 'Nunito Sans Variable', sans-serif;
	}
</style>
