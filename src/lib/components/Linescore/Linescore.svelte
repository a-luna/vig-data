<script lang="ts">
	import type { Linescore } from '$lib/api/types';

	export let linescore: Linescore;
	export let extra_innings: boolean = false;
	export let linescore_complete: Linescore = null;
	export let expanded: boolean = false;
	let displayColumns: Linescore;

	$: displayColumns =
		linescore_complete && extra_innings && expanded ? linescore_complete : linescore;

</script>

<div class="linescore responsive">
	<div class="resp-table" on:click={() => (expanded = !expanded)}>
		<div class="resp-table-header col-header">
			<div class="table-header-cell align-left" />
			{#each displayColumns.inning_numbers as num}
				<div class="table-header-cell">{num}</div>
			{/each}
			{#each displayColumns.game_totals as col}
				<div class="table-header-cell">{col}</div>
			{/each}
		</div>
		<div class="resp-table-body">
			<div class="at-bat resp-table-row">
				<div class="team-id table-body-cell">{displayColumns.away_team_id}</div>
				{#each displayColumns.away_team_runs as runs}
					<div class="table-body-cell num-stat">{runs}</div>
				{/each}
				{#each displayColumns.away_team_totals as total}
					<div class="game-total table-body-cell num-stat">{total}</div>
				{/each}
			</div>
			<div class="at-bat resp-table-row">
				<div class="team-id table-body-cell">{displayColumns.home_team_id}</div>
				{#each displayColumns.home_team_runs as runs}
					<div class="table-body-cell num-stat">{runs}</div>
				{/each}
				{#each displayColumns.home_team_totals as total}
					<div class="game-total table-body-cell num-stat">{total}</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.linescore .resp-table {
		width: auto;
		margin: 0 auto;
	}

	.linescore .table-body-cell {
		background-color: var(--linescore-row-bg-color);
		border-left: none;
	}

	.table-body-cell:first-child {
		border-left: 1px solid var(--table-outer-border-color);
	}

	.team-id,
	.game-total {
		font-weight: 700;
	}

</style>
