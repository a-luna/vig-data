<script lang="ts">
	import Select from '$lib/components/Util/Select/Select.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let width = 'auto';
	const dispatch = createEventDispatcher();
	const options: SelectMenuOption[] = [
		{ text: 'P', value: 1, optionNumber: 1, active: false },
		{ text: 'C', value: 2, optionNumber: 2, active: false },
		{ text: '1B', value: 3, optionNumber: 3, active: false },
		{ text: '2B', value: 4, optionNumber: 4, active: false },
		{ text: '3B', value: 5, optionNumber: 5, active: false },
		{ text: 'SS', value: 6, optionNumber: 6, active: false },
		{ text: 'LF', value: 7, optionNumber: 7, active: false },
		{ text: 'CF', value: 8, optionNumber: 8, active: false },
		{ text: 'RF', value: 9, optionNumber: 9, active: false },
		{ text: 'DH', value: 10, optionNumber: 10, active: false },
	];
	const menuId = 'def-pos';

	$: menuLabel = 'Select Positions';
</script>

<Select
	{menuLabel}
	{options}
	{menuId}
	{width}
	displaySelectedOptionText={false}
	on:changed={(e) => dispatch('defPosSelected', e.detail)}
/>
