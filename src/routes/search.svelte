<script lang="ts">
	import { page } from '$app/stores';
	import PlayerCard from '$lib/components/Player/PlayerCard.svelte';
	import { searchResults } from '$lib/stores/searchResults';
	import type { PlayerCardLink } from '$lib/types';

	$: query = $page.query.get('q');
	$: endIndex = $searchResults.results.length <= 10 ? $searchResults.results.length - 1 : 10;

	function createPlayerCardLink(mlb_id: number): PlayerCardLink {
		return { text: 'PitchFX Career Stats', url: `/player/${mlb_id}/pitching` };
	}
</script>

<h2>Search Results for: <span class="font-bold italic">{query}</span></h2>
<div class="container mx-auto mt-4">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each $searchResults.results.slice(0, endIndex) as { result, details }}
			<PlayerCard {details} links={[createPlayerCardLink(result)]} />
		{/each}
	</div>
</div>
