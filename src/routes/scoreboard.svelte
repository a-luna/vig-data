<script lang="ts">
	import Scoreboard from '$lib/components/Scoreboard/Scoreboard.svelte';
	import SeasonDropDown from '$lib/components/Util/SeasonDropDown.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import { gameDate, season } from '$lib/stores/singleValueStores';
	import { formatDateString, getSeasonDates, getStringFromDate } from '$lib/util';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	let mounted: boolean = false;
	const displayDateformat: string = 'P';
	let currentDate: Date = new Date();

	$: if (mounted) changePageAddress($gameDate);
	$: formatted = currentDate ? format(currentDate, displayDateformat) : '';
	$: handleSeasonChanged($season);
	$: pageTitle = `MLB Scoreboard for ${formatDateString(currentDate)}`;

	function handleSeasonChanged(year: number) {
		const matches = $allSeasons.seasons.filter((s) => s.year === year);
		if (matches.length == 1) {
			const season = matches[0];
			const [season_start, _] = getSeasonDates(season.start_date, season.end_date).value;
			$gameDate = season_start;
			currentDate = $gameDate;
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

<div class="flex flex-col mx-auto my-0 flex-nowrap w-">
	<div class="flex flex-row justify-center mb-5 flex-nowrap">
		<div class="flex-grow w-full sm:flex-grow-0 sm:w-auto">
			<SeasonDropDown width={'100%'} />
		</div>
	</div>
	<div class="mb-5 sm:w-full">
		<Scoreboard bind:value={currentDate} bind:formatted />
	</div>
</div>
