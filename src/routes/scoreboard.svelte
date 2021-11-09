<script lang="ts">
	import { getScoreboardForDate } from '$lib/api/game';
	import { getMostRecentScrapedDate } from '$lib/api/season';
	import type { GameData,MlbSeason } from '$lib/api/types';
	import Scoreboard from '$lib/components/Scoreboard/Scoreboard.svelte';
	import ErrorMessageModal from '$lib/components/Util/Modals/ErrorMessageModal.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import { scoreboardDate } from '$lib/stores/dateStore';
	import { formatDateString,getSeasonDates,getStringFromDate } from '$lib/util/datetime';
	import { onMount } from 'svelte';

	let season: MlbSeason;
	let games_for_date: GameData[];
	let loading: boolean = true;
	let error: string = null;

	$: pageTitle = `MLB Scoreboard for ${formatDateString($scoreboardDate)}`;

	onMount(async () => {
		const mostRecentDate = await getMostRecentScrapedDate();
		await handleDateChanged(mostRecentDate);
	});

	async function getScoreboard(date: Date) {
		let result = await getScoreboardForDate(getStringFromDate(date));
		if (!result.success) {
			error = result.message;
			loading = false;
			return result;
		}
		const scoreboard = result.value;
		season = getSeasonDates(scoreboard.season).value;
		games_for_date = scoreboard.games_for_date;
		loading = false;
	}

	async function handleDateChanged(date: Date) {
		console.log(`handleDateChanged: date=${date}`);
    console.log(`handleDateChanged: $scoreboardDate=${$scoreboardDate} (before)`);
		loading = true;
		scoreboardDate.changeDate(date);
    console.log(`handleDateChanged: $scoreboardDate=${$scoreboardDate} (after)`);
		changePageAddress(date);
		await getScoreboard(date);
	}

	function handleSeasonChanged(year: number) {
		console.log(`handleSeasonChanged: $scoreboardDate.getFullYear()=${$scoreboardDate.getFullYear()}`);
		console.log(`handleSeasonChanged: year=${year}`);
		if ($scoreboardDate.getFullYear() !== year) {
			season = $allSeasons.find((s) => s.year === year);
			console.log(`handleSeasonChanged: season=${season}`);
			if (season) {
				console.log(`handleSeasonChanged: season.start=${season.start}`);
				handleDateChanged(season.start);
			}
		}
	}

	function changePageAddress(date: Date) {
		if (getStringFromDate($scoreboardDate) !== getStringFromDate(date)) {
			window.history.pushState({}, `${pageTitle} | Vigorish`, `/scoreboard?date=${getStringFromDate(date)}`);
		}
	}
</script>

{#if error}
	<ErrorMessageModal {error} />
{/if}

<div class="mb-5 sm:w-full">
	<Scoreboard
		{loading}
		{games_for_date}
		{season}
		on:dateChanged={(e) => handleDateChanged(e.detail)}
		on:seasonChanged={(e) => handleSeasonChanged(e.detail)}
	/>
</div>
