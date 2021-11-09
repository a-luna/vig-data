<script lang="ts">
	import type { MlbSeason } from '$lib/api/types';
	import Select from '$lib/components/Util/Select/Select.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import { createEventDispatcher } from 'svelte';

	export let width = 'auto';
	export let selectedSeason: MlbSeason;
	const options = $allSeasons.map((s, i) => ({
		text: s.year.toString(),
		value: s.year,
		optionNumber: i + 1,
		active: false
	}));
	const dispatch = createEventDispatcher();
  let selectedValue: number;
	let menuId = 'season-menu';

	$: if (selectedSeason) selectedValue = selectedSeason.year;
	$: menuLabel = selectedValue ? `MLB ${selectedValue}` : 'Select Season';

	function handleSelectionChanged(year: number) {
		if (selectedValue !== year) {
			selectedValue = year;
			const matches = $allSeasons.filter((s) => s.year === selectedValue);
			if (matches.length > 0) {
				selectedSeason = matches[0];
				dispatch('changed', selectedSeason.year);
			}
		}
	}
</script>

<Select {menuLabel} {options} {menuId} {width} on:changed={(e) => handleSelectionChanged(e.detail)} />
