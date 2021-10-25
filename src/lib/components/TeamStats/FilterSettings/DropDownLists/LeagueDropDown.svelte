<script lang="ts">
	import Select from '$lib/components/Util/Select/Select.svelte';
	import type { League, SelectMenuOption } from '$lib/types';
	import { onMount, tick } from 'svelte';

	export let width = '100%';
	export let selectedLeague: League = 'both';
	const options: SelectMenuOption[] = [
		{ text: 'AL & NL', value: 'both', optionNumber: 1, active: false },
		{ text: 'AL', value: 'al', optionNumber: 2, active: false },
		{ text: 'NL', value: 'nl', optionNumber: 3, active: false }
	];
	const menuId = 'league-menu';
	const menuLabel = 'League';
	let selectedOption: SelectMenuOption;
	let selectComponent: Select;

	onMount(async () => {
		await tick();
		selectComponent.handleOptionClicked(selectedOption.optionNumber);
	});

	$: selectedOption = options.filter((l) => l.value === selectedLeague)?.[0];
</script>

<Select
	bind:this={selectComponent}
	{menuLabel}
	{options}
	{menuId}
	{width}
	on:changed={(e) => (selectedLeague = e.detail)}
/>
