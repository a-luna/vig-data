<script lang="ts">
	import Scoreboard from '$lib/components/Scoreboard/Scoreboard.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { formatDateString, getSeasonDates, getStringFromDate } from '$lib/util/datetime';
	import { onMount } from 'svelte';

	let mounted: boolean = false;
	let currentDate: Date = $scoreboardDate;

	$: if (mounted) changePageAddress($scoreboardDate);
	$: currentYear = $scoreboardDate !== null ? $scoreboardDate.getFullYear() : 0;
	$: pageTitle = `MLB Scoreboard for ${formatDateString(currentDate)}`;

	function handleSeasonChanged(year: number) {
		if (currentYear !== year) {
			const matches = $allSeasons.filter((s) => s.year === year);
			if (matches.length == 1) {
				const season = matches[0];
				const [season_start, _] = getSeasonDates(season.start_date, season.end_date).value;
				scoreboardDate.changeDate(season_start);
				currentDate = $scoreboardDate;
			}
		}
	}

	function changePageAddress(date: Date) {
		if (getStringFromDate(currentDate) !== getStringFromDate(date)) {
			window.history.pushState({}, `${pageTitle} | Vigorish`, `/scoreboard?date=${getStringFromDate(date)}`);
			currentDate = date;
		}
	}

	onMount(() => {
		mounted = true;
	});
</script>

<div class="mb-5 sm:w-full">
	<Scoreboard bind:value={currentDate} on:changed={(e) => handleSeasonChanged(e.detail)} />
</div>
