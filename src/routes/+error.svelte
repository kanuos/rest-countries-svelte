<script>
	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>Oops!!</title>
</svelte:head>

<section class="grid place-items-center min-h-[80dvh]">
	<div class="flex flex-col items-center justify-center max-w-xs text-center gap-y-2">
		<Icon icon="mdi:emoji-poop-outline" height="60" class="text-rose-300" />
		<h1 class="text-3xl lg:text-5xl font-thin text-center">Error</h1>
		<p class="opacity-60 text-sm">
			Something went wrong as the countries' metadata could not be loaded. Please try again later
		</p>
	</div>
</section>
