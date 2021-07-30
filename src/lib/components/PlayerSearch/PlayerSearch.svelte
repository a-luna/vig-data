<script lang="ts">
	import { goto } from '$app/navigation';
	import { getPlayerDetails } from '$lib/api/player';
	import Autocomplete from '$lib/components/PlayerSearch/Autocomplete.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { searchResults } from '$lib/stores/singleValueStores';

	const inputElementName: string = 'query';
	const minSearchLength = 2;
	const maxItems = 5;
	let query: string;
	let loading = false;

	async function showListOfPlayers(mlbIds: number[]) {
		loading = true;
		let playerDetails = [];
		for (const mlbId of mlbIds) {
			const result = await getPlayerDetails(mlbId);
			if (result.success) {
				playerDetails.push(result.value);
			}
		}
		$searchResults = playerDetails;
		loading = false;
		goto(`/search?q=${query}`);
	}

	async function goToPlayerPage(mlb_id: number) {
		loading = true;
		const result = await getPlayerDetails(mlb_id);
		if (result.success) {
			const playerDetails = result.value;
			const currentTeam = playerDetails.all_teams.slice(-1)?.[0];
			if (currentTeam !== undefined) {
				goto(`/player/${mlb_id}/${currentTeam.role}`);
			}
		}
		loading = false;
	}
</script>

<LoadingScreen {loading} />

<Autocomplete
	bind:query
	name={inputElementName}
	{minSearchLength}
	{maxItems}
	classList="py-1.5 text-base leading-none w-full rounded-md pl-9 focus:outline-none"
	placeholder="Player Search"
	on:showSearchResults={(e) => showListOfPlayers(e.detail)}
	on:showPlayerPage={(e) => goToPlayerPage(e.detail)}
/>
