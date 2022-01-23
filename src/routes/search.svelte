<script lang="ts">
	import PlayerCard from '$lib/components/Player/PlayerCard.svelte';
	import { searchResults } from '$lib/stores/singleValueStores';
	import type { PlayerCardLink } from '$lib/types';
	import { getQueryStringParameter } from '$lib/util/ui';

	$: query = getQueryStringParameter('q');
	$: endIndex = $searchResults.length <= 10 ? $searchResults.length : 11;

	function createPlayerCardLinks(mlb_id: number): PlayerCardLink[] {
		return [
			{ text: 'Pitch Stats', url: `/player/${mlb_id}/pitching` },
			{ text: 'Bat Stats', url: `/player/${mlb_id}/batting` }
		];
	}
</script>

<h2>Search Results for: <span class="italic font-bold">{query}</span></h2>
<div class="container mx-auto mt-4">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each $searchResults.slice(0, endIndex) as details}
			<PlayerCard {details} links={createPlayerCardLinks(details.mlb_id)} />
		{/each}
	</div>
</div>
