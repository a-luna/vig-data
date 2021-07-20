<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { SelectMenuOption } from '$lib/types';

	export let width = 'auto';
	const options: SelectMenuOption[] = [
		{ text: 'All At Bats', value: 'all', optionNumber: 1, active: false },
		{ text: 'Starting Lineup', value: 'starters', optionNumber: 2, active: false },
		{ text: 'Bench Players', value: 'subs', optionNumber: 3, active: false },
		{ text: 'By Def. Position', value: 'defpos', optionNumber: 4, active: false },
		{ text: 'By Batting Order', value: 'batorder', optionNumber: 5, active: false }
	];
	const menuId = 'teamBatStats';
	let selectedOption: SelectMenuOption;

	$: selectedOption = options.filter((l) => l.value === $teamStatFilter.batStatSplit)?.[0];
	$: menuLabel = selectedOption?.text || 'Team Batting Splits';
</script>

<Select
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(event) => teamStatFilter.changeBatStatSplit(event.detail)}
/>
