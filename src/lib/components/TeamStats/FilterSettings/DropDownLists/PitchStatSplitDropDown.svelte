<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { SelectMenuOption } from '$lib/types';

	export let width = 'auto';
	const options: SelectMenuOption[] = [
		{ text: 'All', value: 'all', optionNumber: 1, active: false },
		{ text: 'SP', value: 'sp', optionNumber: 2, active: false },
		{ text: 'RP', value: 'rp', optionNumber: 3, active: false }
	];
	const menuId = 'teamPitchStats';
	let selectedOption: SelectMenuOption;

	$: selectedOption = options.filter((l) => l.value === $teamStatFilter.pitchStatSplit)?.[0];
	$: menuLabel = selectedOption?.text || 'Team Pitching Splits';
</script>

<Select
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(event) => teamStatFilter.changePitchStatSplit(event.detail)}
/>
