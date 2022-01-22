<script lang="ts">
	import Select from '$lib/components/Util/Select/Select.svelte';
	import { allPlayerSeasons } from '$lib/stores/pfxPitcherMetrics';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import type { SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let width = 'auto';
	export let disabled: boolean = false;
	let options: SelectMenuOption[];
	const menuId = 'select-player-season';
	const dispatch = createEventDispatcher();
	let selectComponent: Select;
	let selectedOption: SelectMenuOption;

	$: options = createMenuOptions($allPlayerSeasons);
	$: selectedOption = options ? options.filter((l) => l.value === $playerSeason)?.[0] : null;
	$: if (selectComponent && selectedOption) selectComponent.handleOptionClicked(selectedOption?.optionNumber);
	$: menuLabel = getMenuLabel(selectedOption);

	const createMenuOptions = (seasons: number[]): SelectMenuOption[] =>
		seasons.map((year, i) => ({
			text: year === 0 ? 'Career' : year.toString(),
			value: year,
			optionNumber: i + 1,
			active: false,
		}));

	const getMenuLabel = (selected: SelectMenuOption): string =>
		!selected ? 'Season' : selected.value === 0 ? selected.text : `MLB ${selected.value}`;

	const handleChanged = (value: number): void => {
		$playerSeason = value;
		dispatch('changed', $playerSeason);
	};
</script>

<Select
	bind:this={selectComponent}
	bind:menuLabel
	displaySelectedOptionText={false}
	{options}
	{menuId}
	{width}
	{disabled}
	on:changed={(e) => handleChanged(e.detail)}
/>
