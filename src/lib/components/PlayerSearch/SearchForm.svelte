<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FaSearch from 'svelte-icons/fa/FaSearch.svelte';

	export let disabled: boolean = false;
	let query: string;
	const dispatch = createEventDispatcher();

	function performSearch() {
		dispatch('searchRequest', query);
	}
</script>

<form method="GET" class="w-full mt-1 sm:mt-0 sm:ml-4" on:submit|preventDefault={() => performSearch()}>
	<div class="relative w-full">
		<span class="absolute py-0 pl-1 search-icon">
			<button type="submit" class="p-0 focus:outline-none focus:shadow-outline">
				<FaSearch />
			</button>
		</span>
		<input
			type="search"
			name="query"
			class="py-1.5 text-base leading-none w-full rounded-md pl-9 focus:outline-none"
			placeholder="Player Search"
			autocomplete="off"
			{disabled}
			bind:value={query}
		/>
	</div>
</form>

<style lang="postcss">
	.search-icon {
		color: var(--search-icon-color);
		top: 0.45rem;
		left: 0.3rem;
		width: 1.3rem;
		height: 1.3rem;
	}

	input {
		background-color: var(--search-bg-color);
		color: var(--search-text-color);
	}

	input:focus {
		background-color: var(--search-bg-color-focus);
		color: var(--search-text-color-focus);
		outline: 2px solid var(--search-focus-outline-color);
		offset: 0;
	}
</style>
