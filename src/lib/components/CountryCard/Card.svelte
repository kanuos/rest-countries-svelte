<!-- CountryCard/Card.svelte-->

<script lang="ts">
	import { formatPopulation, getDetailURL } from '$lib/utils';
	import type { CountryCardProps } from './Card.types';

	// props
	export let { flagURL, country, population, region, capital } = <CountryCardProps>$$props;
</script>

<a
	aria-label="country-card"
	href={getDetailURL(country)}
	class="h-full w-full max-w-xs mx-auto overflow-hidden rounded-lg drop-shadow-lg bg-light-bg dark:bg-dark-el
flex flex-col hover:scale-105 hover:drop-shadow-2xl transition-all group"
>
	<img
		aria-label="flag-image"
		src={flagURL}
		alt="Official flag of {country}"
		class="object-cover block h-1/2 sm:h-[45%] w-full object-center"
	/>
	<section class="p-4 flex flex-col items-start gap-y-2 h-1/2 sm:h-[55%] mt-4">
		<h2 class="font-extrabold text-lg lg:text-xl transition-all leading-tight capitalize">
			{country}
		</h2>
		<ul class="flex flex-col opacity-75 group-hover:opacity-100 transition-all">
			<li>
				<strong> population: </strong>
				<span aria-label="population">
					{formatPopulation(population)}
				</span>
			</li>
			<li>
				<strong> region: </strong>
				<span aria-label="region">
					{region}
				</span>
			</li>
			<li>
				<strong> capital: </strong>
				<span aria-label="capital">
					{capital}
				</span>
			</li>
		</ul>
	</section>
</a>

<style lang="postcss">
	li {
		@apply flex items-center justify-start gap-x-3;
	}
	li > strong {
		@apply capitalize font-semibold;
	}

	li > span {
		@apply capitalize font-light;
	}
</style>
