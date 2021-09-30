<script lang="ts">
	import Select from '$lib/components/Select/Select.svelte';
	import type { PlayerContent, SelectMenuOption } from '$lib/types';
	import { createEventDispatcher, onMount, tick } from 'svelte';

	export let width = 'auto';
	const options: SelectMenuOption[] = [
		{ text: 'Career Stats', value: 'career-stats', optionNumber: 1, active: false },
		{ text: 'Pitch Mix', value: 'pitch-mix', optionNumber: 2, active: false },
		{ text: 'Pitch Type Percentiles', value: 'pitch-type-percentiles', optionNumber: 3, active: false }
	];
	const dispatch = createEventDispatcher();
	const menuId = 'player-pitching-content';
	let selectedValue: PlayerContent = 'career-stats';
	let selectedOption: SelectMenuOption;

	$: selectedOption = options.filter((l) => l.value === selectedValue)?.[0];
	$: menuLabel = selectedOption.text;

	onMount(async () => {
		await tick();
		options.map((l) => (l.active = l.value === selectedValue));
	});

	function handleChanged(content: PlayerContent) {
		selectedValue = content;
		dispatch('changed', content);
	}
</script>

<Select {menuLabel} {options} {menuId} {width} on:changed={(e) => handleChanged(e.detail)} />
