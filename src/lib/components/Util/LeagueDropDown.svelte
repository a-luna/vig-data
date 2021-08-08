<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import type { League, SelectMenuOption } from '$lib/types';
	import { createEventDispatcher, onMount, tick } from 'svelte';

	export let width = '100%';
	export let selectedLeague: League = 'both';
	const options: SelectMenuOption[] = [
		{ text: 'AL & NL', value: 'both', optionNumber: 1, active: false },
		{ text: 'AL', value: 'al', optionNumber: 2, active: false },
		{ text: 'NL', value: 'nl', optionNumber: 3, active: false }
	];
	const menuId = 'league';
	const dispatch = createEventDispatcher();

	$: selectedOption = options.filter((l) => l.value === selectedLeague)?.[0];
	$: menuLabel = selectedOption?.text || 'Select League';

	onMount(async () => {
		await tick();
		options.map((l) => (l.active = l.value === selectedLeague));
	});

	function handleChanged(league: League) {
		selectedLeague = league;
		dispatch('changed', league);
	}
</script>

<Select {menuLabel} {options} {menuId} {width} on:changed={(e) => handleChanged(e.detail)} />
