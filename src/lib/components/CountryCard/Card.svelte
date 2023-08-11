<!-- CountryCard/Card.svelte-->

<script lang="ts">
	import { formatPopulation, getDetailURL } from '$lib/utils';
	import type { CountryCardProps } from './Card.types';

	import { crossfade } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	// props

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: linear,
				css: (t) => `
					transform: ${transform};
					opacity: ${t}
				`
			};
		}
	});

	export let { flagURL, country, population, region, capital, cca3 } = <CountryCardProps>$$props;

	$: href = getDetailURL(cca3);
</script>

<a
	in:receive={{ key: country }}
	out:send={{ key: country }}
	aria-label="country-card"
	{href}
	class="h-full w-full max-w-xs mx-auto overflow-hidden rounded-lg drop-shadow-2xl bg-dark-text dark:bg-dark-el
grid grid-rows-2 hover:scale-105 hover:shadow-2xl transition-all group auto-rows-auto gap-4 outline-none focus:outline-none"
>
	<figure class="h-full max-h-44 w-full grid place-items-center overflow-hidden">
		<img
			aria-label="flag-image"
			src={flagURL}
			alt="Official flag of {country}"
			class="object-cover block h-full w-full object-center group-hover:scale-110 transition-transform"
		/>
	</figure>
	<section class="p-4 flex flex-col items-start gap-y-2 h-full w-full overflow-hidden">
		<h2 class="font-extrabold text-lg lg:text-xl transition-all leading-tight capitalize">
			{country}
		</h2>
		<ul class="flex flex-col opacity-75 group-hover:opacity-100 transition-all w-full">
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
					{capital || 'Not available'}
				</span>
			</li>
		</ul>
	</section>
</a>

<style lang="postcss">
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
