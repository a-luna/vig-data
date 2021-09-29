<script lang="ts">
	import { batStanceSplit } from '$lib/stores/singleValueStores';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';

	$: bothSelected = $batStanceSplit === 'all';
	$: rhbSelected = $batStanceSplit === 'rhb';
	$: lhbSelected = $batStanceSplit === 'lhb';
</script>

<div class="mb-5 btn-group btn-group-secondary">
	<button
		type="button"
		class={`btn btn-${color}`}
		class:active={bothSelected}
		on:click={() => ($batStanceSplit = 'all')}>Both</button
	>
	<button type="button" class={`btn btn-${color}`} class:active={rhbSelected} on:click={() => ($batStanceSplit = 'rhb')}
		>RHB</button
	>
	<button type="button" class={`btn btn-${color}`} class:active={lhbSelected} on:click={() => ($batStanceSplit = 'lhb')}
		>LHB</button
	>
</div>
