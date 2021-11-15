<script lang="ts">
	import type { BatStats } from '$lib/api/types';

	export let batStats: BatStats;

	$: batOrder = batStats.is_starter ? batStats.bat_order.toString() : '';
</script>

<div class="flex flex-row flex-nowrap justify-start items-baseline">
	<span class="bat-order">{batOrder}</span>
	<a class="player-name" sveltekit:prefetch href="/player/{batStats.mlb_id}/batting">{batStats.name}</a>
	<span class="def-position">{batStats.position_changes}</span>
</div>

<style lang="postcss">
	.bat-order {
		font-size: 0.8rem;
		width: 13px;
		margin: 0 0 0 5px;
	}

	.def-position {
		font-size: 0.7rem;
		margin: 3px 0 0 3px;
	}
</style>
