<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { allPlayerSeasons } from '$lib/stores/pfxPitcherMetrics';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import type { SelectMenuOption } from '$lib/types';
	import { onMount, tick } from 'svelte';

	export let width = 'auto';
	let options: SelectMenuOption[];
	let selectedOption: SelectMenuOption;
	const menuId = 'select-player-season';

	$: menuLabel = selectedOption?.text ?? 'Select Season';

	onMount(async () => {
		await tick();
		options = createMenuOptions();
		options.map((op) => (op.active = op.value === $playerSeason));
	});

	const createMenuOptions = (): SelectMenuOption[] =>
		$allPlayerSeasons.map((year, i) => ({
			text: year.toString(),
			value: year,
			optionNumber: i + 1,
			active: false
		}));

	const handleChanged = (year: number): void => ($playerSeason = year);
</script>

<Select {menuLabel} {options} {menuId} {width} on:changed={(e) => handleChanged(e.detail)} />
