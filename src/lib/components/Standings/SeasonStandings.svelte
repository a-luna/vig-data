<script lang="ts">
	import { onMount } from 'svelte';
	import LeagueStandings from './LeagueStandings.svelte';
	import type { ApiResponse, MlbSeason, SeasonData } from '$lib/api/types';
	import { getSeasonStandings, getAllValidSeasons } from '$lib/api/season';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';

	let success: boolean;
	let message: string;
	let season_options: { text: string; value: number }[] = [];
	let selectedSeason: number;
	let getStandingsRequest: Promise<ApiResponse<SeasonData>>;

	onMount(async () => {
		const result = await getAllValidSeasons();
		success = result.success;
		if (!success) {
			message = result.message;
		} else {
			season_options = [];
			result.value.map((s) => season_options.push({ text: s.year.toString(), value: s.year }));
			selectedSeason = season_options[season_options.length - 1].value;
		}
	});

	$: if (selectedSeason) getStandingsRequest = getSeasonStandings(selectedSeason);
</script>

<div class="season-standings">
	<div class="standings-top">
		{#if success}
			<select bind:value={selectedSeason}>
				{#each season_options as year}
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
						<LeagueStandings {league} {leagueData} />
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

	.pending {
		margin: auto;
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
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
	}
</style>
