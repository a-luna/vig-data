<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { SelectMenuOption } from '$lib/types';
	import { onMount } from 'svelte';

	export let width = '100%';
	const options: SelectMenuOption[] = [
		{ text: 'AL & NL', value: 'both', optionNumber: 1, active: false },
		{ text: 'AL', value: 'al', optionNumber: 2, active: false },
		{ text: 'NL', value: 'nl', optionNumber: 3, active: false }
	];
	const menuId = 'league';
	let selectedOption: SelectMenuOption;

	$: selectedOption = options.filter((l) => l.value === $seasonStatFilter.league)?.[0];
	$: menuLabel = selectedOption?.text || 'Select League';

	onMount(() => options.map((l) => (l.active = l.value === $seasonStatFilter.league)));

</script>

<Select {menuLabel} {options} {menuId} {width} on:changed={(event) => seasonStatFilter.changeLeague(event.detail)} />
