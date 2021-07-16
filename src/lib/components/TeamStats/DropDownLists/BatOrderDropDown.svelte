<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { BatOrder, SelectMenuOption } from '$lib/types';

	export let width = 'auto';
	const options: SelectMenuOption[] = [
		{ text: '1', value: '1', optionNumber: 1, active: false },
		{ text: '2', value: '2', optionNumber: 2, active: false },
		{ text: '3', value: '3', optionNumber: 3, active: false },
		{ text: '4', value: '4', optionNumber: 4, active: false },
		{ text: '5', value: '5', optionNumber: 5, active: false },
		{ text: '6', value: '6', optionNumber: 6, active: false },
		{ text: '7', value: '7', optionNumber: 7, active: false },
		{ text: '8', value: '8', optionNumber: 8, active: false },
		{ text: '9', value: '9', optionNumber: 9, active: false }
	];
	const menuId = 'bat-order';
	let selectedOption: SelectMenuOption;

	$: selectedOption = options.filter((item) => item.value === $teamStatFilter.batOrder.toString())?.[0];
	$: menuLabel = selectedOption?.text || 'Bat Order';

	function getBatOrder(selectedItemValue: string): BatOrder {
		return parseInt(selectedItemValue) as BatOrder;
	}
</script>

<Select
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(event) => teamStatFilter.changeBatOrder(getBatOrder(event.detail))}
/>
