<script lang="ts">
	import { onMount } from 'svelte';
	import type { ApiResponse, SeasonData } from '$lib/api/types';
	import { getSeasonStandings, getAllValidSeasons } from '$lib/api/season';
	import DivisionStandings from './DivisionStandings.svelte';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';

	let success: boolean;
	let message: string;
	let seasonOptions: { text: string; value: number }[] = [];
	let selectedSeason: number;
	let getStandingsRequest: Promise<ApiResponse<SeasonData>>;

	onMount(async () => {
		const result = await getAllValidSeasons();
		success = result.success;
		if (!success) {
			message = result.message;
		} else {
			seasonOptions = [];
			result.value.map((s) => seasonOptions.push({ text: s.year.toString(), value: s.year }));
			selectedSeason = seasonOptions[seasonOptions.length - 1].value;
		}
	});

	$: if (selectedSeason) getStandingsRequest = getSeasonStandings(selectedSeason);
</script>

<div class="season-standings">
	<div class="standings-top">
		{#if success}
			<select bind:value={selectedSeason}>
				{#each seasonOptions as year}
					<option value={year.value}>{year.text}</option>
				{/each}
			</select>
		{:else}
			<select class="placeholder" />
		{/if}
	</div>
	<div class="standings-body responsive">
		{#if !success || !getStandingsRequest}
			<div class="pending"><SyncLoader size="40" color="#5000e6" /></div>
		{:else}
			{#await getStandingsRequest}
				<div class="pending"><SyncLoader size="40" color="#5000e6" /></div>
			{:then result}
				{#if result.success}
					{#each Object.entries(result.value) as [league, leagueData]}
						<div class="league-standings table-wrapper">
							{#each Object.entries(leagueData) as [division, teamStandings], divIndex}
								<DivisionStandings {divIndex} {league} {division} {teamStandings} />
							{/each}
						</div>
					{/each}
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
	select {
		margin: 10px;
	}

	.placeholder {
		width: 68px;
	}

	.season-standings {
		display: flex;
		flex-flow: column nowrap;
	}

	.standings-top {
		flex: 0 0 40px;
		line-height: 1;
	}

	.standings-body {
		flex: 1 0 auto;
		@apply flex flex-row flex-nowrap justify-start;
	}

	.league-standings {
		margin: 0 10px;
	}
</style>
