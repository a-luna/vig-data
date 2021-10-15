<script lang="ts">
	import type { PlayerContent, ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	let selectedValue: PlayerContent = 'career-stats';
	const dispatch = createEventDispatcher();

	$: careerStatsShown = selectedValue === 'career-stats';
	$: pitchMixShown = selectedValue === 'pitch-mix';
	$: percentilesShown = selectedValue === 'pitch-type-percentiles';

	function handleChanged(content: PlayerContent) {
		selectedValue = content;
		dispatch('changed', content);
	}
</script>

<div class="btn-group btn-group-{color} mx-auto">
	<button
		type="button"
		class="btn btn-{color}"
		class:active={careerStatsShown}
		on:click={() => handleChanged('career-stats')}>Career Stats</button
	>
	<button type="button" class="btn btn-{color}" class:active={pitchMixShown} on:click={() => handleChanged('pitch-mix')}
		>Pitch Mix</button
	>
	<button
		type="button"
		class="btn btn-{color}"
		class:active={percentilesShown}
		on:click={() => handleChanged('pitch-type-percentiles')}>Pitch Type Percentiles</button
	>
</div>
