<script lang="ts">
	import { page } from '$app/stores';

	$: errorMsg = $page.error?.message;
	$: errorStatus = $page.status;
</script>

<section class="min-h-[50dvh] flex flex-col justify-center">
	<h1 class="text-rose-400 font-extrabold text-3xl">Error {errorStatus}</h1>
	<p class="text-sm opacity-75 mt-2 mb-8">
		Country with cca3 code
		<strong class="font-semibold px-1 py-0.5 rounded bg-rose-200 text-rose-600">
			{errorMsg}
		</strong>
		not found
	</p>
	<a href="/" class="hover:underline transition-all">Go to home</a>
</section>
