<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { DEF_POS_ABBREV_TO_NUM_MAP, DEF_POS_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { DefPositionNumber, SelectMenuOption } from '$lib/types';

	export let width = 'auto';
	const options: SelectMenuOption[] = [
		{ text: 'P', value: 'P', optionNumber: 1, active: false },
		{ text: 'C', value: 'C', optionNumber: 2, active: false },
		{ text: '1B', value: '1B', optionNumber: 3, active: false },
		{ text: '2B', value: '2B', optionNumber: 4, active: false },
		{ text: '3B', value: '3B', optionNumber: 5, active: false },
		{ text: 'SS', value: 'SS', optionNumber: 6, active: false },
		{ text: 'LF', value: 'LF', optionNumber: 7, active: false },
		{ text: 'CF', value: 'CF', optionNumber: 8, active: false },
		{ text: 'RF', value: 'RF', optionNumber: 9, active: false },
		{ text: 'DH', value: 'DH', optionNumber: 10, active: false }
	];
	const menuId = 'def-pos';
	let selectedOption: SelectMenuOption;

	$: selectedOption = options.filter(
		(item) => item.value === DEF_POS_NUM_TO_ABBREV_MAP[$seasonStatFilter.defPosition]
	)?.[0];
	$: menuLabel = selectedOption?.text || 'Def. Position';

	function getDefPosition(selectedItemValue: string): DefPositionNumber {
		return DEF_POS_ABBREV_TO_NUM_MAP[selectedItemValue];
	}

</script>

<Select
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(event) => seasonStatFilter.changeDefPosition(getDefPosition(event.detail))}
/>
