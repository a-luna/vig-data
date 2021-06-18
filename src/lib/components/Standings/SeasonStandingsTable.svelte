<script lang="ts">
	import type { SeasonData } from '$lib/api/types';
	import DivisionStandings from '$lib/components/Standings/DivisionStandings.svelte';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';

	export let seasonStandings: SeasonData;

</script>

<div class="overflow-x-auto season-wrapper">
	{#if $seasonStatFilter.league === 'both' || $seasonStatFilter.league === 'al'}
		<div class={$seasonStatFilter.league === 'both' ? 'league-wrapper' : 'solo-wrapper'}>
			<DivisionStandings division={'e'} teamStandings={seasonStandings['al']['e']} />
			<DivisionStandings division={'c'} teamStandings={seasonStandings['al']['c']} />
			<DivisionStandings division={'w'} teamStandings={seasonStandings['al']['w']} />
		</div>
	{/if}
	{#if $seasonStatFilter.league === 'both' || $seasonStatFilter.league === 'nl'}
		<div class={$seasonStatFilter.league === 'both' ? 'league-wrapper' : 'solo-wrapper'}>
			<DivisionStandings division={'e'} teamStandings={seasonStandings['nl']['e']} />
			<DivisionStandings division={'c'} teamStandings={seasonStandings['nl']['c']} />
			<DivisionStandings division={'w'} teamStandings={seasonStandings['nl']['w']} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.season-wrapper {
		@apply flex flex-row flex-wrap justify-center items-start;
	}

	.league-wrapper {
		@apply flex flex-col flex-nowrap justify-start items-center w-full text-lg;
	}

	.solo-wrapper {
		@apply flex flex-row flex-wrap justify-center items-start w-full text-lg;
	}

	@media screen and (min-width: 473px) {
		.season-wrapper {
			@apply flex-nowrap justify-between;
		}

		.solo-wrapper {
			@apply justify-between;
		}
	}

	@media screen and (min-width: 585px) {
		.season-wrapper {
			width: 85%;
		}
	}

	@media screen and (min-width: 735px) {
		.season-wrapper {
			@apply flex-col justify-start items-center;
			width: 100%;
		}

		.league-wrapper {
			@apply flex-row justify-around items-start text-base;
		}

		.solo-wrapper {
			@apply justify-around text-base;
		}
	}

</style>
