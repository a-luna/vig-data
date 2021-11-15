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
	let menuId = 'season-menu';

	$: menuLabel = selectedSeason?.year ? `MLB ${selectedSeason.year}` : 'Select Season';

	function handleSelectionChanged(year: number) {
		if (selectedSeason.year !== year) {
			selectedSeason = $allSeasons.find((s) => s.year === selectedSeason.year);
			dispatch('changed', selectedSeason.year);
		}
	}
</script>

<Select {menuLabel} {options} {menuId} {width} on:changed={(e) => handleSelectionChanged(e.detail)} />
