<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { allPlayerSeasons } from '$lib/stores/pfxPitcherMetrics';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import type { SelectMenuOption } from '$lib/types';

	export let width = 'auto';
	export let disabled: boolean = false;
	let options: SelectMenuOption[];
	const menuId = 'select-player-season';
	let selectComponent: Select;
	let selectedOption: SelectMenuOption;

	$: options = createMenuOptions($allPlayerSeasons);
	$: selectedOption = options ? options.filter((l) => l.value === $playerSeason)?.[0] : null;
	$: if (selectComponent && selectedOption) selectComponent.handleOptionClicked(selectedOption?.optionNumber);
	$: menuLabel = selectedOption?.text || 'Season';

	const createMenuOptions = (seasons: number[]): SelectMenuOption[] =>
		seasons.map((year, i) => ({
			text: year === 0 ? 'Career' : year.toString(),
			value: year,
			optionNumber: i + 1,
			active: false
		}));
</script>

<Select
	bind:this={selectComponent}
	{menuLabel}
	{options}
	{menuId}
	{width}
	{disabled}
	on:changed={(e) => ($playerSeason = e.detail)}
/>
