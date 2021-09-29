<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	let contentSelected: 'percentiles' | 'velo-loc' = 'percentiles';
	const dispatch = createEventDispatcher();

	$: percentilesSelected = contentSelected === 'percentiles';
	$: veloLocSelected = contentSelected === 'velo-loc';

	function changeContentShown(content: 'percentiles' | 'velo-loc') {
		contentSelected = content;
		dispatch('changed', content);
	}
</script>

<div class="mb-5 btn-group btn-group-secondary">
	<button
		type="button"
		class={`btn btn-${color}`}
		class:active={percentilesSelected}
		on:click={() => changeContentShown('percentiles')}>Percentiles</button
	>
	<button
		type="button"
		class={`btn btn-${color}`}
		class:active={veloLocSelected}
		on:click={() => changeContentShown('velo-loc')}>Velo/Location</button
	>
</div>
