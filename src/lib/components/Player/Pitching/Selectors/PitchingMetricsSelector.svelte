<script lang="ts">
	import type { PitcherPieChart, ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	let selectedValue: PitcherPieChart = 'pitch-mix';
	const dispatch = createEventDispatcher();

	$: roleShown = selectedValue === 'role';
	$: pitchMixShown = selectedValue === 'pitch-mix';

	function handleChanged(content: PitcherPieChart) {
		selectedValue = content;
		dispatch('changed', content);
	}
</script>

<div class="btn-group btn-group-{color} mx-auto tex-base">
	<button type="button" class="btn btn-{color}" class:active={pitchMixShown} on:click={() => handleChanged('pitch-mix')}
		>Pitch Mix</button
	>
	<button type="button" class="btn btn-{color}" class:active={roleShown} on:click={() => handleChanged('role')}
		>Role</button
	>
</div>
