<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import ScatterPlot from '../ScatterPlot/ScatterPlot.svelte';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';

	export let pfx: PitchFx[];
	const width = 350;
	const height = 350;
</script>

{#if !pfx || pfx.length == 0}
	<div class="pending"><SyncLoader size="40" color="#5000e6" /></div>
{:else}
	<ScatterPlot data={pfx} {width} {height} />
{/if}
