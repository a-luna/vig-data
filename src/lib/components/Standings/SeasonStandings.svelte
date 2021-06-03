<script lang="ts">
	import { getSeasonStandings } from '$lib/api/season';
	import type { ApiResponse, SeasonData } from '$lib/api/types';
	import SeasonStandingsTable from '$lib/components/Standings/SeasonStandingsTable.svelte';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';
	import { selectedSeason } from '$lib/stores/singleValueStores';
	import { getSpinnerColor } from '$lib/util';

	let seasonStandings: SeasonData;
	let getStandingsRequest: Promise<ApiResponse<SeasonData>>;
	let getStandingsResult: ApiResponse<SeasonData>;

	async function getStandings(year: number): Promise<ApiResponse<SeasonData>> {
		getStandingsResult = await getSeasonStandings(year);
		if (!getStandingsResult.success) {
			return getStandingsResult;
		}
		seasonStandings = getStandingsResult.value;
		return getStandingsResult;
	}

	$: if ($selectedSeason) {
		getStandingsRequest = getStandings($selectedSeason);
	}

</script>

<div class="mb-2">
	<h3 class="m-0">Season Standings</h3>
</div>
<div class="flex flex-col flex-nowrap">
	<div class="season-standings flex flex-row flex-wrap flex-auto justify-center mb-4 mt-0 mx-auto">
		{#if getStandingsRequest}
			{#await getStandingsRequest}
				<div class="pending"><SyncLoader size="40" color={getSpinnerColor()} /></div>
			{:then result}
				{#if result.success}
					<SeasonStandingsTable bind:seasonStandings />
				{:else}
					<div class="error">Error: {result.message}</div>
				{/if}
			{:catch error}
				<div class="error">Error: {error.message}</div>
			{/await}
		{/if}
	</div>
</div>

<style lang="postcss">
	.season-standings {
		width: 95%;
	}

</style>
