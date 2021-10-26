<script lang="ts">
	import type { BatterPieChart, ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	let selectedValue: BatterPieChart = 'start/bench';
	const dispatch = createEventDispatcher();

	$: startBenchShown = selectedValue === 'start/bench';
	$: defPosShown = selectedValue === 'defpos';
	$: batOrderShown = selectedValue === 'batorder';

	function handleChanged(content: BatterPieChart) {
		selectedValue = content;
		dispatch('changed', content);
	}
</script>

<div class="btn-group btn-group-{color} mx-auto mb-3 text-base sm:text-sm md:text-base">
	<button
		type="button"
		class="btn btn-{color}"
		class:active={startBenchShown}
		on:click={() => handleChanged('start/bench')}>Start/Sit</button
	>
	<button type="button" class="btn btn-{color}" class:active={defPosShown} on:click={() => handleChanged('defpos')}
		>Defense</button
	>
	<button type="button" class="btn btn-{color}" class:active={batOrderShown} on:click={() => handleChanged('batorder')}
		>Bat Order</button
	>
</div>
