<script lang="ts">
	import { getSeasonStandings } from '$lib/api/season';
	import type { ApiResponse, SeasonData } from '$lib/api/types';
	import SeasonStandingsTable from '$lib/components/Standings/SeasonStandingsTable.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { season } from '$lib/stores/singleValueStores';

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

	$: if ($season) {
		getStandingsRequest = getStandings($season);
	}
</script>

<div class="mb-2">
	<h3 class="m-0 text-center">{$season} Season Standings</h3>
</div>
<div class="flex flex-col flex-nowrap">
	<div class="flex flex-row flex-wrap justify-center flex-auto mx-auto mt-0 mb-4 season-standings">
		{#if getStandingsRequest}
			{#await getStandingsRequest}
				<Spinner />
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
