<!-- +layout.svelte -->
<script>
	import '@fontsource-variable/nunito-sans';
	import '../app.css';
</script>

<slot />

<style>
	:global(body) {
		font-family: 'Nunito Sans Variable', sans-serif;
	}
</style>
