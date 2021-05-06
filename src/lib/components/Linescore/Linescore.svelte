<script lang="ts">
	import type { LinescoreColumn } from '$lib/api/types';

	export let linescore: LinescoreColumn[];
	export let extra_innings: boolean = false;
	export let linescore_complete: LinescoreColumn[] = [];
	export let expanded: boolean = false;

	$: displayColumns = extra_innings ? (expanded ? linescore_complete : linescore) : linescore;
</script>

<div class="linescore">
	<ul on:click={() => (expanded = !expanded)}>
		{#each displayColumns as { css_class, col_header, away_team, home_team }}
			<li class={css_class}>
				<div class="col-header">{@html col_header}</div>
				<div class="away-team">{away_team}</div>
				<div class="home-team">{home_team}</div>
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.linescore {
		display: flex;
		justify-content: center;
	}

	.team-id {
		width: 40px;
		margin: 0;
		padding: 0;
	}

	.team-id .away-team,
	.team-id .home-team {
		text-align: left;
		padding: 0 0 0 5px;
	}

	.inning-runs-scored,
	.game-total {
		width: 22px;
	}

	ul {
		display: flex;
		padding: 0;
		list-style-type: none;
		border: 1px solid var(--table-outer-border-color);
	}

	li {
		text-align: center;
	}

	.game-total .away-team,
	.game-total .home-team {
		font-weight: 700;
	}
</style>
