<script lang="ts">
	import { goto } from '$app/navigation';
	import { getPlayerDetails } from '$lib/api/player';
	import type { PlayerDetails, PlayerId } from '$lib/api/types';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { searchResults } from '$lib/stores/singleValueStores';
	import type { SearchResult } from '$lib/types';
	import fuzzy from 'fuzzy';
	import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
	import { allPlayers } from './player_search';

	export let maxItems = 10;
	let query: string;
	let loading = false;
	const extract = (pid: PlayerId): string => pid.name;

	const fuzzySearch = (q: string): SearchResult<PlayerId>[] =>
		fuzzy
			.filter(query, allPlayers, { pre: '<mark>', post: '</mark>', extract })
			.filter(({ score }) => score > 0)
			.slice(0, maxItems)
			.map((result) => ({ ...result }));

	async function getAllPlayerDetails(playerIds: number[]): Promise<PlayerDetails[]> {
		const allRequests = await Promise.all(playerIds.map((mlb_id) => getPlayerDetails(mlb_id)));
		return allRequests.filter((response) => response.success).map((response) => response.value);
	}

	async function handleSubmit(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			const results = fuzzySearch(query);
			if (results) {
				loading = true;
				const playerIds = results.map((result) => result.original.mlb_id);
				$searchResults = await getAllPlayerDetails(playerIds);
				loading = false;
				if ($searchResults) {
					goto(`/search?q=${query}`);
				}
			}
		}
	}
</script>

<LoadingScreen bind:loading />

<div id="player-search" class="w-full mt-1 md:mt-0 md:ml-4">
	<div class="relative w-full">
		<span class="absolute py-0 pl-1 search-icon">
			<div class="p-0 focus:outline-none focus:shadow-outline">
				<FaSearch />
			</div>
		</span>
		<input placeholder={'Player Search'} bind:value={query} on:keydown={(e) => handleSubmit(e)} />
	</div>
</div>

<style lang="postcss">
	#player-search {
		background-color: var(--header-bg-color);
	}

	#player-search input {
		@apply py-1.5 leading-none w-full rounded-md pl-9 border-0;
		font-size: 16px;
		background-color: var(--search-bg-color);
		color: var(--search-text-color);
		line-height: 1.4;
	}

	#player-search input:focus {
		background-color: var(--search-bg-color-focus);
		color: var(--search-text-color-focus);
		outline: 2px solid var(--search-focus-outline-color);
		offset: 0;
		outline: 2px solid transparent;
		outline-offset: 2px;
	}

	.search-icon {
		color: var(--search-icon-color);
		top: 9px;
		left: 5px;
		width: 18px;
		height: 18px;
		z-index: 1;
	}
</style>
