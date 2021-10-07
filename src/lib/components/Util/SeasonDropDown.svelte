<script lang="ts">
	import type { MlbSeason } from '$lib/api/types';
	import Select from '$lib/components/Select/Select.svelte';
	import { allSeasons, mostRecentSeason } from '$lib/stores/allMlbSeasons';
	import { createEventDispatcher } from 'svelte';

	export let width = 'auto';
	export let selectedValue: number = $mostRecentSeason.year;
	export let selectedSeason: MlbSeason = $mostRecentSeason;
	let selectComponent: Select;
	const options = $allSeasons.map((s, i) => ({
		text: s.year.toString(),
		value: s.year,
		optionNumber: i + 1,
		active: false
	}));
	const dispatch = createEventDispatcher();
	let menuId = 'season-menu';

	$: menuLabel = selectedValue ? `MLB ${selectedValue}` : 'Select Season';

	function handleSelectionChanged(year: number) {
		if (selectedValue !== year) {
			selectedValue = year;
			const matches = $allSeasons.filter((s) => s.year === selectedValue);
			if (matches.length > 0) {
				selectedSeason = matches[0];
				dispatch('changed', selectedSeason.start_date);
			}
		}
	}
</script>

<Select
	bind:this={selectComponent}
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(e) => handleSelectionChanged(e.detail)}
/>
