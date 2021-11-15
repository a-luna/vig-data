<script lang="ts">
	import BatStatSplitDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/BatStatSplitDropDown.svelte';
	import LeagueDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/LeagueDropDown.svelte';
	import PitchStatSplitDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/PitchStatSplitDropDown.svelte';
	import SelectedBatOrderNumbers from '$lib/components/TeamStats/FilterSettings/SelectedBatOrderNumbers.svelte';
	import SelectedDefPositions from '$lib/components/TeamStats/FilterSettings/SelectedDefPositions.svelte';
	import SeasonSelector from '$lib/components/Util/Selectors/SeasonSelector.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import type { TeamStatFilter } from '$lib/types';
	import { teamStatFilterSettingsAreInvalid } from '$lib/util/ui';
	import { createEventDispatcher } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let showFilters: boolean = false;
	export let batting: boolean = true;
	export let pitching: boolean = false;
	export let settings: TeamStatFilter;
	let invalid: boolean = false;
	let error: string;
	const dispatch = createEventDispatcher();
	const showFilterSlideOptions = { duration: 500, easing: cubicInOut };
	const showErrorSlideOptions = { duration: 1000, easing: cubicInOut };
	let prevSettings: TeamStatFilter;

	$: season = $allSeasons.find((s) => s.year === settings.season);
	$: defposSelected = settings.batStatSplit === 'defpos';
	$: batorderSelected = settings.batStatSplit === 'batorder';
	$: ({ invalid, error } = checkFilterSettings(settings));

	function checkFilterSettings(checkSettings: TeamStatFilter) {
		if (checkSettings) {
			return teamStatFilterSettingsAreInvalid(
				checkSettings.statType,
				checkSettings.batStatSplit,
				checkSettings.defPosition,
				checkSettings.batOrder
			);
		}
		return { invalid: false, error: '' };
	}

	function saveCurrentSettings(_el: HTMLElement) {
		prevSettings = Object.assign({}, settings);
	}

	function handleSettingsChanged() {
		dispatch('changed');
		showFilters = false;
	}

	function handleUserCanceled() {
		settings = Object.assign({}, prevSettings);
		showFilters = false;
	}
</script>

{#if showFilters}
	<div
		transition:slide={showFilterSlideOptions}
		use:saveCurrentSettings
		id="stat-filters"
		class="flex flex-col justify-center mt-1 mb-2 mr-auto sm:justify-start flex-nowrap"
		class:invalid
	>
		<div class="grid grid-cols-2 gap-2 px-2 pt-2">
			<SeasonSelector selectedSeason={season} on:changed={(e) => (settings.season = e.detail)} width={'100%'} />
			<LeagueDropDown bind:selectedLeague={settings.league} width={'100%'} />
			{#if pitching}
				<PitchStatSplitDropDown bind:selectedValue={settings.pitchStatSplit} width={'100%'} />
			{:else if batting}
				<BatStatSplitDropDown bind:selectedValue={settings.batStatSplit} width={'100%'} />
			{/if}
			{#if batting && defposSelected}
				<SelectedDefPositions bind:selections={settings.defPosition} />
			{/if}
			{#if batting && batorderSelected}
				<SelectedBatOrderNumbers bind:selections={settings.batOrder} />
			{/if}
		</div>
		{#if invalid}
			<div transition:slide={showErrorSlideOptions} class="col-span-2 mx-auto text-sm italic text-red-700 sm:text-base">
				<span>{error}</span>
			</div>
		{/if}
		<div class="grid grid-cols-2 gap-2 p-2">
			<button disabled={invalid} class="w-full btn btn-secondary" on:click={() => handleSettingsChanged()}
				>Update</button
			>
			<button class="w-full btn btn-secondary" on:click={() => handleUserCanceled()}>Cancel</button>
		</div>
	</div>
{/if}

<style lang="postcss">
	#stat-filters {
		width: 100%;
		max-width: 440px;
		background-color: var(--team-stat-filter-bg-color);
		border: 2px solid var(--team-stat-filter-border-color);
		border-radius: 4px;
	}

	#stat-filters.invalid {
		color: var(--red2);
	}
</style>
