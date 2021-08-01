<script>
	import { goto } from '$app/navigation';
	import { getPlayerDetails } from '$lib/api/player';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
	import Typeahead from 'svelte-typeahead';
	import { allPlayers } from './player_search';

	const maxItems = 5;
	const hideLabel = true;
	let query;
	let loading = false;

	// async function showListOfPlayers(mlbIds) {
	// 	loading = true;
	// 	let playerDetails = [];
	// 	for (const mlbId of mlbIds) {
	// 		const result = await getPlayerDetails(mlbId);
	// 		if (result.success) {
	// 			playerDetails.push(result.value);
	// 		}
	// 	}
	// 	$searchResults = playerDetails;
	// 	loading = false;
	// 	goto(`/search?q=${query}`);
	// }

	async function goToPlayerPage(item) {
		loading = true;
		const result = await getPlayerDetails(item.mlb_id);
		if (result.success) {
			const playerDetails = result.value;
			const currentTeam = playerDetails.all_teams.slice(-1)?.[0];
			if (currentTeam) {
				goto(`/player/${item.mlb_id}/${currentTeam.role}`);
			}
		}
		loading = false;
	}
</script>

<LoadingScreen bind:loading />

<div id="player-search" class="w-full mt-1 sm:mt-0 sm:ml-4">
	<div class="relative w-full">
		<span class="absolute py-0 pl-1 search-icon">
			<div class="p-0 focus:outline-none focus:shadow-outline">
				<FaSearch />
			</div>
		</span>
		<Typeahead
			data={allPlayers}
			extract={(item) => item.name}
			limit={maxItems}
			placeholder={'player search'}
			inputAfterSelect={'clear'}
			{hideLabel}
			bind:value={query}
			on:select={(e) => goToPlayerPage(e.detail.original)}
		/>
	</div>
</div>

<style lang="postcss">
	#player-search :global([data-svelte-typeahead]) {
		background-color: var(--header-bg-color);
	}

	#player-search :global([data-svelte-typeahead] input) {
		@apply py-1.5 text-base leading-none w-full rounded-md pl-9 border-0 focus:outline-none;
		background-color: var(--search-bg-color);
		color: var(--search-text-color);
	}

	#player-search :global([data-svelte-typeahead] input:focus) {
		background-color: var(--search-bg-color-focus);
		color: var(--search-text-color-focus);
		outline: 2px solid var(--search-focus-outline-color);
		offset: 0;
	}
	#player-search :global([data-svelte-typeahead] ul) {
		top: 35px;
		z-index: 1;
		border-radius: 4px;
	}

	#player-search :global([data-svelte-typeahead] ul li) {
		@apply px-3 py-1.5;
		color: var(--nav-link-text-color);
		background-color: var(--nav-link-bg-color);
		border: none;
	}

	#player-search :global([data-svelte-typeahead] ul li:first-child) {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}

	#player-search :global([data-svelte-typeahead] ul li:last-child) {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	#player-search :global([data-svelte-typeahead] ul li.selected) {
		color: var(--nav-link-text-color-hov);
		background-color: var(--nav-link-bg-color-hov);
	}

	.search-icon {
		color: var(--search-icon-color);
		top: 0.45rem;
		left: 0.3rem;
		width: 1.3rem;
		height: 1.3rem;
		z-index: 1;
	}
</style>
