<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { teamStatType } from '$lib/stores/singleValueStores';
	import type { SelectMenuOption } from '$lib/types';

	export let width = '100%';
	const options: SelectMenuOption[] = [
		{ text: 'Team Batting', value: 'bat', optionNumber: 1, active: false },
		{ text: 'Team Pitching', value: 'pitch', optionNumber: 2, active: false }
	];
	const menuId = 'stat-type';
	let selectedOption: SelectMenuOption;

	$: selectedOption = options.filter((item) => item.value === $teamStatType)?.[0];
	$: menuLabel = selectedOption?.text || '';

	function findActiveItem() {
		const match = options.filter((item) => item.value === $teamStatType);
		if (match?.length === 1) {
			match['active'] = true;
		}
	}

	findActiveItem();
</script>

<Select {menuLabel} {options} {menuId} {width} on:changed={(event) => ($teamStatType = event.detail)} />
