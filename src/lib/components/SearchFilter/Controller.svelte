<script lang="ts">
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';
	import type { ControllerProps } from './Controller.types';

	// props
	export let { searchKeyword, selectedRegion, regions } = $$props as ControllerProps;

	let showMenu = false;

	function handleSelectOption(region = '') {
		showMenu = false;
		if (regions.includes(region)) {
			selectedRegion = region;
			return;
		}
		selectedRegion = '';
	}
</script>

<header class="min-h-[20vh] sm:min-h-[30vh] md:h-auto grid place-items-center">
	<div class="flex flex-col w-full gap-8 max-w-5xl 2xl:max-w-7xl md:flex-row md:justify-between">
		<div
			class="bg-dark-text dark:bg-dark-el drop-shadow-2xl rounded-md flex flex-row-reverse w-full max-w-lg items-center justify-between px-3 gap-2"
		>
			<input
				bind:value={searchKeyword}
				aria-label="country search box"
				type="text"
				autocomplete="off"
				maxlength="20"
				placeholder="Search for a country ..."
				class="py-4 bg-transparent grow outline-none select-none focus:outline-none font-semibold placeholder:font-normal peer"
			/>
			<Icon
				icon="ion:search"
				height="18"
				class="shrink-0 text-dark-bg dark:text-dark-text {searchKeyword.trim().length > 0
					? 'opacity-100'
					: 'opacity-50 peer-focus-visible:opacity-100'} transition-opacity"
			/>
		</div>
		<div class="flex flex-col w-fit shrink-0 items-center justify-between gap-2 relative">
			<button
				aria-label="region menu toggler"
				on:click={() => (showMenu = !showMenu)}
				class="bg-dark-text dark:bg-dark-el drop-shadow-2xl rounded-md px-3 py-4 flex items-center justify-between w-fit gap-x-10 text-sm"
			>
				{#if selectedRegion}
					<span class="font-semibold active inline-flex items-center justify-center gap-x-2">
						Region : {selectedRegion}
					</span>
				{:else}
					<span class="font-semibold"> Filter by Region </span>
				{/if}
				<Icon
					icon="mdi:chevron-down"
					height="18"
					class="transition-all {showMenu ? 'rotate-180 text-red-400' : 'rotate-0'}"
				/>
			</button>
			{#if showMenu}
				<ul
					aria-label="region menu"
					transition:fly
					class="bg-dark-text dark:bg-dark-el drop-shadow-2xl shadow-2xl overflow-hidden rounded-md flex flex-col z-10 w-full absolute top-full translate-y-2"
				>
					<li class="text-sm cursor-pointer transition-all">
						<button
							on:click={() => handleSelectOption()}
							class="outline-none focus:outline-none w-full px-6 py-4 text-left hover:text-rose-400"
						>
							All regions
						</button>
					</li>
					{#each regions as region}
						<li class="text-sm cursor-pointer transition-all">
							<button
								on:click={() => handleSelectOption(region)}
								class="outline-none focus:outline-none w-full px-6 py-2 flex items-center justify-start gap-x-2 {selectedRegion ===
								region
									? 'active'
									: 'inactive'}"
							>
								{region}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</header>

<style lang="postcss">
	.active {
		@apply opacity-100 after:h-1.5 after:w-1.5 after:block after:bg-red-300 after:rounded-full font-semibold;
	}
	.inactive {
		@apply opacity-70 hover:bg-rose-300/20 hover:opacity-100 hover:text-rose-400;
	}
</style>
