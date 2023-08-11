<script lang="ts">
	import Icon from '@iconify/svelte';
	import { formatPopulation, getDetailURL } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	//  reactive destructuring for smooth client side routing when country name  changes
	$: ({
		countryDetail: {
			flags,
			name,
			region,
			subregion,
			population,
			capital,
			tld,
			currencies,
			languages,
			borders
		}
	} = data);

	$: nativeName = Object.values(name.nativeName)[0].official;
	$: currency = Object.values(currencies)
		.map((el) => el.name)
		.join(', ')
		.trim();
	$: languageString = Object.values(languages).join(', ').trim();
</script>

<svelte:head>
	<title>Country Details | {name.common}</title>
</svelte:head>

<div class="min-h-[80dvh] h-full grid lg:place-items-center">
	<section class="grid gap-8 lg:grid-cols-6 h-auto lg:gap-10 max-w-5xl mx-auto w-full">
		<div class="grid gap-y-4 lg:col-start-1 lg:col-end-4 lg:h-fit">
			<button
				on:click={() => history.back()}
				class="btn w-fit h-fit inline-flex items-center gap-1"
			>
				<Icon icon="line-md:arrow-left" />
				<span> back </span>
			</button>

			<figure class="md:col-span-full grid place-items-start lg:h-96">
				<img
					src={flags.svg}
					alt="{name.common} official flag"
					class="h-full w-full max-h-60 sm:max-h-80 object-cover drop-shadow-2xl block md:max-w-lg lg:h-max-h-max"
				/>
			</figure>
		</div>

		<div class="grid w-full h-auto gap-8 lg:col-start-4 lg:col-end-7 lg:h-fit md:grid-cols-2">
			<h1 class="text-2xl font-extrabold col-span-full lg:h-fit">{name.common}</h1>

			<ul class="md:">
				<li>
					<strong>Native name:</strong>
					<span>
						{nativeName}
					</span>
				</li>
				<li><strong>Population:</strong><span>{formatPopulation(population)}</span></li>
				<li><strong>region:</strong><span>{region}</span></li>
				<li><strong>subregion:</strong><span>{subregion}</span></li>
				<li><strong>capital:</strong><span>{capital}</span></li>
			</ul>

			<ul>
				<li><strong>Top level domain:</strong><span>{tld}</span></li>
				<li><strong>Currencies:</strong><span>{currency}</span></li>
				<li><strong>languages:</strong><span>{languageString}</span></li>
			</ul>

			{#if borders}
				<section class="grid gap-y-4 w-full md:col-span-full">
					<h2 class="capitalize font-semibold">border countries:</h2>
					<div class="flex flex-wrap gap-2 w-full">
						{#each borders as border}
							<a class="btn" href={getDetailURL(border.cca3)}> {border.name}</a>
						{/each}
					</div>
				</section>
			{/if}
		</div>
	</section>
</div>

<style lang="postcss">
	.btn {
		@apply py-1.5 px-3.5 text-xs drop-shadow-md capitalize font-semibold hover:drop-shadow-lg
		 bg-dark-text dark:bg-dark-el rounded opacity-80 hover:opacity-100 transition-all;
	}
	ul {
		@apply flex flex-col gap-y-2 text-sm opacity-75;
	}
	li {
		@apply flex items-start justify-start gap-x-3 w-full;
	}
	li > strong {
		@apply capitalize font-semibold;
	}

	li > span {
		@apply font-light truncate;
	}
</style>
