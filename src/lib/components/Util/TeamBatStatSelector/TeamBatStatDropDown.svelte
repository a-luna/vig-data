<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { teamBatStat } from '$lib/stores/teamBatStatFilter';
	import type { SelectMenuOption } from '$lib/types';

	export let width = 'auto';
	const options: SelectMenuOption[] = [
		{ text: 'All At Bats', value: 'all', optionNumber: 1, active: false },
		{ text: 'Starting Lineup', value: 'starters', optionNumber: 2, active: false },
		{ text: 'Bench Players', value: 'bench', optionNumber: 3, active: false },
		{ text: 'By Def. Position', value: 'defpos', optionNumber: 4, active: false },
		{ text: 'By Lineup Slot', value: 'batorder', optionNumber: 5, active: false }
	];
	const menuId = 'teamBatStats';
	let selectedOption: SelectMenuOption;

	$: selectedOption = options.filter((l) => l.value === $teamBatStat.split)?.[0];
	$: menuLabel = selectedOption?.text || 'Team Batting Splits';

</script>

<Select
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(event) => teamBatStat.changeSplit(event.detail)}
/>
