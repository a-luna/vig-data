<script lang="ts">
	import type { PlayerSearchResult } from '$lib/api/types';
	import PlayerMatch from '$lib/components/PlayerSearch/PlayerMatch.svelte';
	export let searchResults: PlayerSearchResult[];

	$: endIndex = searchResults.length <= 10 ? searchResults.length - 1 : 10;

</script>

<ul>
	{#each searchResults.slice(0, endIndex) as player}
		<li>
			<PlayerMatch {...player} />
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

</style>
