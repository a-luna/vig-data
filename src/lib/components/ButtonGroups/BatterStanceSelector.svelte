<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	let stanceSelected: 'both' | 'rhb' | 'lhb' = 'both';
	const dispatch = createEventDispatcher();

	$: bothSelected = stanceSelected === 'both';
	$: rhbSelected = stanceSelected === 'rhb';
	$: lhbSelected = stanceSelected === 'lhb';

	function changeStance(stance: 'both' | 'rhb' | 'lhb') {
		stanceSelected = stance;
		dispatch('changed', stance);
	}

</script>

<div class="mb-5 btn-group">
	<button
		type="button"
		class={bothSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => changeStance('both')}>Both</button
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
