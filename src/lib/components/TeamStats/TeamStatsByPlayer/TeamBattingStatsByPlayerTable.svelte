<script lang="ts">
	import type { TeamBatStats } from '$lib/api/types';
	import { DEF_POS_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import { formatPercentStat, formatRateStat } from '$lib/util';

	export let teamBatStats: TeamBatStats[];
	export let backgroundColorRule: string;
	export let startRow: number;
	export let endRow: number;

	$: split = $teamStatFilter.batStatSplit;

	function getDefPositionFromNumber(pos: number): string {
		if (pos < 1 || pos > 10) {
			return '';
		}
		return DEF_POS_NUM_TO_ABBREV_MAP[pos];
	}
</script>

<section class="datatable" style={backgroundColorRule}>
	<article class="dt-table mb-2" style="overflow-x: auto">
		<div class="resp-table w-full text-sm leading-5">
			<div class="resp-table-header col-header text-center">
				<div class="table-header-cell">Player</div>
				{#if split === 'defpos'}
					<div class="table-header-cell">Pos</div>
				{/if}
				{#if split === 'batorder'}
					<div class="table-header-cell" title="Bat Order">Bat #</div>
				{/if}
				<div class="table-header-cell" title="Total Games">G</div>
				<div class="table-header-cell">AVG</div>
				<div class="table-header-cell">OBP</div>
				<div class="table-header-cell">SLG</div>
				<div class="table-header-cell">OPS</div>
				<div class="table-header-cell">BB</div>
				<div class="table-header-cell">K</div>
				<div class="table-header-cell">AB</div>
				<div class="table-header-cell">H</div>
				<div class="table-header-cell">R</div>
				<div class="table-header-cell">RBI</div>
				<div class="table-header-cell">BB</div>
				<div class="table-header-cell">K</div>
				<div class="table-header-cell">2B</div>
				<div class="table-header-cell">3B</div>
				<div class="table-header-cell">HR</div>
				<div class="table-header-cell">SB</div>
				<div class="table-header-cell">CS</div>
				<div class="table-header-cell">WPA</div>
				<div class="table-header-cell">RE24</div>
			</div>
			<div class="resp-table-body">
				{#each teamBatStats.slice(startRow, endRow) as stats}
					<div class="resp-table-row text-right">
						<div class="table-body-cell text-center">
							<a sveltekit:prefetch href="/player/{stats.mlb_id}/pitching">{stats.player_name}</a>
						</div>
						{#if split === 'defpos'}
							<div class="table-body-cell">{getDefPositionFromNumber(stats.def_position)}</div>
						{/if}
						{#if split === 'batorder'}
							<div class="table-body-cell">{stats.bat_order}</div>
						{/if}
						<div class="table-body-cell">{stats.total_games}</div>
						<div class="table-body-cell">{formatRateStat(stats.avg.toString(), 3)}</div>
						<div class="table-body-cell">{formatRateStat(stats.obp.toString(), 3)}</div>
						<div class="table-body-cell">{formatRateStat(stats.slg.toString(), 3)}</div>
						<div class="table-body-cell">{formatRateStat(stats.ops.toString(), 3)}</div>
						<div class="table-body-cell">{formatPercentStat(stats.bb_rate.toString(), 0)}</div>
						<div class="table-body-cell">{formatPercentStat(stats.k_rate.toString(), 0)}</div>
						<div class="table-body-cell">{stats.at_bats}</div>
						<div class="table-body-cell">{stats.hits}</div>
						<div class="table-body-cell">{stats.runs_scored}</div>
						<div class="table-body-cell">{stats.rbis}</div>
						<div class="table-body-cell">{stats.bases_on_balls}</div>
						<div class="table-body-cell">{stats.strikeouts}</div>
						<div class="table-body-cell">{stats.doubles}</div>
						<div class="table-body-cell">{stats.triples}</div>
						<div class="table-body-cell">{stats.homeruns}</div>
						<div class="table-body-cell">{stats.stolen_bases}</div>
						<div class="table-body-cell">{stats.caught_stealing}</div>
						<div class="table-body-cell">{stats.wpa_bat.toFixed(2)}</div>
						<div class="table-body-cell">{stats.re24_bat.toFixed(2)}</div>
					</div>
				{/each}
			</div>
		</div>
	</article>
</section>
