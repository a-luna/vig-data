<script lang="ts">
	import Select from '$lib/components/Util/Select/Select.svelte';
	import type { BatStatSplit, SelectMenuOption } from '$lib/types';
	import { onMount, tick } from 'svelte';

	export let width = 'auto';
	export let selectedValue: BatStatSplit = 'all';
	const options: SelectMenuOption[] = [
		{ text: 'All At Bats', value: 'all', optionNumber: 1, active: false },
		{ text: 'Starting Lineup', value: 'starters', optionNumber: 2, active: false },
		{ text: 'Bench Players', value: 'subs', optionNumber: 3, active: false },
		{ text: 'By Def. Position', value: 'defpos', optionNumber: 4, active: false },
		{ text: 'By Batting Order', value: 'batorder', optionNumber: 5, active: false }
	];
	const menuId = 'teamBatStats';
	const menuLabel = 'Team Batting Splits';
	let selectedOption: SelectMenuOption;
	let selectComponent: Select;

	onMount(async () => {
		await tick();
		selectComponent.handleOptionClicked(selectedOption.optionNumber);
	});

	$: selectedOption = options.filter((l) => l.value === selectedValue)?.[0];
</script>

<Select
	bind:this={selectComponent}
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(e) => (selectedValue = e.detail)}
/>
