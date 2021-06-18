<script lang="ts">
	import { playerNameSearch } from '$lib/api/player';
	import type { ApiResponse, PlayerSearchResult } from '$lib/api/types';
	import SearchForm from '$lib/components/PlayerSearch/SearchForm.svelte';
	import SearchResults from '$lib/components/PlayerSearch/SearchResults.svelte';
	import { Pulse } from '../../../../node_modules/svelte-loading-spinners/src';

	let playerSearchRequest: Promise<ApiResponse<PlayerSearchResult[]>>;

</script>

<SearchForm on:searchRequest={(event) => (playerSearchRequest = playerNameSearch(event.detail))} />
{#if playerSearchRequest}
	{#await playerSearchRequest}
		<div class="pending"><Pulse size="20" color="#5000e6" /></div>
	{:then result}
		{#if result.success}
			<SearchResults searchResults={result.value} />
		{:else}
			<div class="error">Error: {result.message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error.message}</div>
	{/await}
{/if}
