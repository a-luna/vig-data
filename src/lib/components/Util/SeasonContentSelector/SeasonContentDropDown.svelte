<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { seasonSettings } from '$lib/stores/seasonSettings';
	import type { SelectMenuOption } from '$lib/types';

	export let width = '100%';
	const options: SelectMenuOption[] = [
		{ text: 'Scoreboard', value: 'scoreboard', optionNumber: 1, active: false },
		{ text: 'Standings', value: 'standings', optionNumber: 2, active: false },
		{ text: 'Team Batting Stats', value: 'team-bat', optionNumber: 3, active: false },
		{ text: 'Team Pitching Stats', value: 'team-pitch', optionNumber: 4, active: false }
	];
	const menuId = 'season-content';
	let selectedOption: SelectMenuOption;

	$: selectedOption = options.filter((item) => item.value === $seasonSettings.show)?.[0];
	$: menuLabel = selectedOption?.text || '';

	function findActiveItem() {
		const match = options.filter((item) => item.value === $seasonSettings.show);
		if (match?.length === 1) {
			match['active'] = true;
		}
	}

	findActiveItem();

</script>

<Select
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(event) => seasonSettings.changeContent(event.detail)}
/>
