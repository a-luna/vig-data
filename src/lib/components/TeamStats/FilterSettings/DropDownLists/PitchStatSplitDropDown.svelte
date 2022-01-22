<script lang="ts">
	import Select from '$lib/components/Util/Select/Select.svelte';
	import type { PitchStatSplit, SelectMenuOption } from '$lib/types';
	import { onMount, tick } from 'svelte';

	export let width = 'auto';
	export let selectedValue: PitchStatSplit = 'all';
	const options: SelectMenuOption[] = [
		{ text: 'All', value: 'all', optionNumber: 1, active: false },
		{ text: 'SP', value: 'sp', optionNumber: 2, active: false },
		{ text: 'RP', value: 'rp', optionNumber: 3, active: false },
	];
	const menuId = 'teamPitchStats';
	const menuLabel = 'Team Pitching Splits';
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
