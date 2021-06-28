<script lang="ts">
	import { page } from '$app/stores';
	import { searchResults } from '$lib/stores/searchResults';

	$: query = $page.query.get('q');
	$: endIndex = $searchResults.results.length <= 10 ? $searchResults.results.length - 1 : 10;
</script>

<h2>Search Results for: <span class="font-bold italic">{query}</span></h2>
<ul>
	{#each $searchResults.results.slice(0, endIndex) as { result, match }}
		<li>
			<a sveltekit:prefetch href="/player/{result}">{match}</a>
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
