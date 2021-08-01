<script lang="ts">
	import { allPlayerSeasons, playerSeason } from '$lib/stores/singleValueStores';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';
</script>

<div class="mb-2 sm:mb-5 btn-group btn-group-secondary">
	<button
		type="button"
		class={$playerSeason === 0 ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => ($playerSeason = 0)}>Career</button
	>
	{#each $allPlayerSeasons as year}
		{#if year > 0}
			<button
				type="button"
				class={$playerSeason === year ? `btn btn-${color}` : `btn btn-outline-${color}`}
				on:click={() => ($playerSeason = year)}>{year}</button
			>
		{/if}
	{/each}
</div>
