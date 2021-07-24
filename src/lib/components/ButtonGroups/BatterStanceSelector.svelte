<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	let stanceSelected: 'all' | 'rhb' | 'lhb' = 'all';
	const dispatch = createEventDispatcher();

	$: bothSelected = stanceSelected === 'all';
	$: rhbSelected = stanceSelected === 'rhb';
	$: lhbSelected = stanceSelected === 'lhb';

	function changeStance(stance: 'all' | 'rhb' | 'lhb') {
		stanceSelected = stance;
		dispatch('changed', stance);
	}
</script>

<div class="mb-5 btn-group">
	<button
		type="button"
		class={bothSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => changeStance('all')}>Both</button
	>
	<button
		type="button"
		class={rhbSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => changeStance('rhb')}>RHB</button
	>
	<button
		type="button"
		class={lhbSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => changeStance('lhb')}>LHB</button
	>
</div>
