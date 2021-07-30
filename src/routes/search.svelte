<script lang="ts">
	import { page } from '$app/stores';
	import PlayerCard from '$lib/components/Player/PlayerCard.svelte';
	import { searchResults } from '$lib/stores/singleValueStores';
	import type { PlayerCardLink } from '$lib/types';

	$: query = $page.query.get('q');
	$: endIndex = $searchResults.length <= 10 ? $searchResults.length : 11;

	function createPlayerCardLink(mlb_id: number): PlayerCardLink {
		return { text: 'PitchFX Career Stats', url: `/player/${mlb_id}/pitching` };
	}
</script>

<h2>Search Results for: <span class="italic font-bold">{query}</span></h2>
<div class="container mx-auto mt-4">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
		{#each $searchResults.slice(0, endIndex) as details}
			<PlayerCard {details} links={[createPlayerCardLink(details.mlb_id)]} />
		{/each}
	</div>
</div>
