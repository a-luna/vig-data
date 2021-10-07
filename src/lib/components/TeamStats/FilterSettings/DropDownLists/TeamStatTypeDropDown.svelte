<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { SelectMenuOption } from '$lib/types';
	import { onMount, tick } from 'svelte';

	export let width = '100%';
	const options: SelectMenuOption[] = [
		{ text: 'Team Batting', value: 'bat', optionNumber: 1, active: false },
		{ text: 'Team Pitching', value: 'pitch', optionNumber: 2, active: false }
	];
	const menuId = 'stat-type';
	const menuLabel = '';
	let selectedOption: SelectMenuOption;
	let selectComponent: Select;

	onMount(async () => {
		await tick();
		selectComponent.handleOptionClicked(selectedOption.optionNumber);
	});

	$: selectedOption = options.filter((item) => item.value === $teamStatFilter.statType)?.[0];
</script>

<Select
	bind:this={selectComponent}
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(e) => teamStatFilter.changeStatType(e.detail)}
/>
