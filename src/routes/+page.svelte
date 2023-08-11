<script lang="ts">
	import Card from '$lib/components/CountryCard/Card.svelte';
	import Controller from '$lib/components/SearchFilter/Controller.svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import { getFilteredList } from '$lib/utils';

	export let data: PageData;

	const { regions, countryList } = data;

	let searchKeyword = '';
	let selectedRegion = '';

	$: filteredCountryList = getFilteredList(countryList, selectedRegion, searchKeyword);
</script>

<svelte:head>
	<title>Rest countries | Home</title>
</svelte:head>

<div class="w-full max-w-5xl mx-auto">
	<Controller {regions} bind:searchKeyword bind:selectedRegion />

	{#if filteredCountryList.length > 0}
		<p class="text-xs font-light opacity-50">
			Showing results - {filteredCountryList.length}
		</p>
	{/if}
</div>
<div
	aria-label="country-list"
	class="grid grid-cols-1 gap-y-12 my-10 gap-x-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full max-w-5xl 2xl:max-w-7xl mx-auto"
>
	{#if filteredCountryList.length > 0}
		{#each filteredCountryList as props}
			<Card {...props} />
		{/each}
	{:else}
		<div class="flex flex-col items-center justify-center gap-2 col-span-full">
			<Icon icon="mdi:emoji-poop-outline" height="60" class="text-rose-300 m-8" />
			{#if selectedRegion}
				<p class="text-sm text-center">
					Country named <strong class="capitalize underline px-1 break-words text-rose-400">
						{searchKeyword}
					</strong>
					was not found in
					<strong class="capitalize underline px-1 text-red-400">{selectedRegion}</strong>.
				</p>
			{:else}
				<p class="text-sm text-center">
					Country named <strong class="capitalize underline px-1 break-words text-rose-400">
						{searchKeyword}
					</strong> was not found.
				</p>
			{/if}
		</div>
	{/if}
</div>
