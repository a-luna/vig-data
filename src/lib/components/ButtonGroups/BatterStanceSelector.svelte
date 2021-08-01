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
		class={bothSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => ($batStanceSplit = 'all')}>Both</button
	>
	<button
		type="button"
		class={rhbSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => ($batStanceSplit = 'rhb')}>RHB</button
	>
	<button
		type="button"
		class={lhbSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => ($batStanceSplit = 'lhb')}>LHB</button
	>
</div>
