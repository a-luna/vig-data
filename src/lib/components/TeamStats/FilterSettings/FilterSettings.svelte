<script lang="ts">
	import BatStatSplitDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/BatStatSplitDropDown.svelte';
	import PitchStatSplitDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/PitchStatSplitDropDown.svelte';
	import TeamStatTypeDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/TeamStatTypeDropDown.svelte';
	import SelectedBatOrderNumbers from '$lib/components/TeamStats/FilterSettings/SelectedBatOrderNumbers.svelte';
	import SelectedDefPositions from '$lib/components/TeamStats/FilterSettings/SelectedDefPositions.svelte';
	import LeagueDropDown from '$lib/components/Util/LeagueDropDown.svelte';
	import SeasonDropDown from '$lib/components/Util/SeasonDropDown.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import { teamStatFilterSettingsAreInvalid } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	let showFilters: boolean = false;
	const key = 'vig_filter_settings';
	const dispatch = createEventDispatcher();
	const showFilterSlideOptions = { duration: 500, easing: cubicInOut };
	const showErrorSlideOptions = { duration: 1000, easing: cubicInOut };
	let invalid: boolean = false;
	let error: string;

	$: teamBatStatsShown = $teamStatFilter.statType === 'bat';
	$: teamPitchStatsShown = $teamStatFilter.statType === 'pitch';
	$: defposSelected = $teamStatFilter.batStatSplit === 'defpos';
	$: batorderSelected = $teamStatFilter.batStatSplit === 'batorder';

	export function handleShowFilters() {
		const previousSettings = {
			season: $teamStatFilter.season,
			league: $teamStatFilter.league,
			teamStatType: $teamStatFilter.statType,
			batStatSplit: $teamStatFilter.batStatSplit,
			pitchStatSplit: $teamStatFilter.pitchStatSplit,
			defPositions: $teamStatFilter.defPosition,
			batOrderNumbers: $teamStatFilter.batOrder
		};
		sessionStorage.setItem(key, JSON.stringify(previousSettings));
		showFilters = true;
	}

	function handleSettingsChanged() {
		invalid = false;
		error = '';
		({ invalid, error } = teamStatFilterSettingsAreInvalid(
			$teamStatFilter.statType,
			$teamStatFilter.batStatSplit,
			$teamStatFilter.defPosition,
			$teamStatFilter.batOrder
		));
		if (!invalid) {
			dispatch('changed');
			showFilters = false;
		}
	}

	function handleUserCanceled() {
		restorePreviousSettings();
		invalid = false;
		error = '';
		showFilters = false;
	}

	function restorePreviousSettings() {
		const previousSettings = JSON.parse(sessionStorage.getItem(key));
		teamStatFilter.changeSeason(previousSettings.season);
		teamStatFilter.changeLeague(previousSettings.league);
		teamStatFilter.changeStatType(previousSettings.teamStatType);
		teamStatFilter.changeBatStatSplit(previousSettings.batStatSplit);
		teamStatFilter.changePitchStatSplit(previousSettings.pitchStatSplit);
		teamStatFilter.changeDefPosition(previousSettings.defPositions);
		teamStatFilter.changeBatOrder(previousSettings.batOrderNumbers);
	}
</script>

{#if showFilters}
	<div transition:slide={showFilterSlideOptions} id="stat-filters" class="flex flex-col p-2 mx-auto mb-5">
		<div class="flex flex-wrap justify-center">
			<div class="flex-grow w-5/12 m-2 team-filter md:m-1 md:w-auto">
				<SeasonDropDown
					currentSeason={$teamStatFilter.season}
					width={'auto'}
					on:changed={(e) => teamStatFilter.changeSeason(e.detail)}
				/>
			</div>
			<div class="flex-grow w-5/12 m-2 team-filter md:m-1 md:w-auto">
				<LeagueDropDown width={'auto'} />
			</div>
			<div class="flex-grow w-5/12 m-2 team-filter md:m-1 md:w-auto">
				<TeamStatTypeDropDown width={'auto'} />
			</div>
			{#if teamPitchStatsShown}
				<div class="flex-grow w-5/12 m-2 team-filter md:m-1 md:w-auto">
					<PitchStatSplitDropDown width={'auto'} />
				</div>
			{:else if teamBatStatsShown}
				<div class="flex-grow w-5/12 m-2 team-filter md:m-1 md:w-auto">
					<BatStatSplitDropDown width={'100%'} />
				</div>
			{/if}
		</div>
		{#if $teamStatFilter.statType === 'bat' && defposSelected}
			<SelectedDefPositions />
		{:else if $teamStatFilter.statType === 'bat' && batorderSelected}
			<SelectedBatOrderNumbers />
		{/if}
		{#if invalid}
			<div
				transition:slide={showErrorSlideOptions}
				class="flex justify-center text-sm italic text-red-700 sm:text-base"
			>
				<strong class="mr-1">ERROR!</strong><span>{error}</span>
			</div>
		{/if}
		<div class="flex justify-center mt-2 md:justify-end">
			<button
				class="flex-grow w-5/12 m-2 md:flex-grow-0 md:w-auto md:m-1 btn btn-secondary"
				on:click={() => handleSettingsChanged()}>Update</button
			>
			<button
				class="flex-grow w-5/12 m-2 md:flex-grow-0 md:w-auto md:m-1 btn btn-secondary"
				on:click={() => handleUserCanceled()}>Cancel</button
			>
		</div>
	</div>
{/if}

<style lang="postcss">
	#stat-filters {
		background-color: var(--team-stat-filter-bg-color);
		border: 2px solid var(--team-stat-filter-border-color);
		border-radius: 4px;
	}

	.team-filter,
	button {
		max-width: 45%;
	}

	@media screen and (min-width: 768px) {
		.team-filter,
		button {
			max-width: 25%;
		}
	}
</style>
