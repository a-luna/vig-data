<script lang="ts">
	import SeasonStandings from '$lib/components/Standings/SeasonStandings.svelte';
	import LeagueDropDown from '$lib/components/Util/LeagueDropDown.svelte';
	import SeasonDropDown from '$lib/components/Util/SeasonDropDown.svelte';
	import { season } from '$lib/stores/singleValueStores';
	import { onMount } from 'svelte';

	let mounted: boolean = false;

	$: if (mounted) changePageAddress($season);

	function getPageTitle() {
		return `${$season} MLB Standings`;
	}

	function changePageAddress(selectedSeason: number) {
		window.history.pushState({}, `${getPageTitle()} | Vigorish`, `?season=${selectedSeason}`);
	}

	onMount(() => (mounted = true));
</script>

<svelte:head>
	<title>{getPageTitle()} | Vigorish</title>
</svelte:head>

<div id="season-stats" class="flex flex-col mx-auto my-0 flex-nowrap">
	<div id="stat-filters" class="flex flex-row justify-center mb-5 flex-nowrap">
		<div class="flex-grow w-full sm:flex-grow-0 sm:w-auto">
			<SeasonDropDown width={'100%'} />
		</div>
		<div class="flex-grow w-full ml-4 sm:flex-grow-0 sm:w-auto">
			<LeagueDropDown width={'100%'} />
		</div>
	</div>
	<SeasonStandings />
</div>

<style lang="postcss">
	#season-stats {
		width: 100%;
	}

	@media screen and (min-width: 550px) {
		#season-stats {
			width: 95%;
		}
	}
</style>
