<script lang="ts">
	import type { TeamBatStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/Util/SortableColumnHeader.svelte';
	import { TEAM_ID_TO_CITY_MAP } from '$lib/constants';
	import { describeSortSetting, getFixedColumnWidth, getSortFunction, getVariableColumnWidth } from '$lib/dataTables';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { PaginationStore } from '$lib/types';
	import { getDummyObject } from '$lib/util/dummy';
	import { formatNumber, formatPercentStat, formatPosNegValue, formatRateStat } from '$lib/util/format';
	import { createEventDispatcher, tick } from 'svelte';

	export let batStats: TeamBatStats[] = [];
	export let year: number;
	export let backgroundColorRule: string = '';
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc';
	export let pagination: PaginationStore;
	export let tableId: string = '';
	let teamNameColWidth: number;
	const dispatch = createEventDispatcher();
	const cellPadding: number = 8;

	$: dummyTeamBatStats = getDummyObject('teamBatStats') as TeamBatStats;
	$: sortedBatStats = batStats.sort(getSortFunction(dummyTeamBatStats, sortBy, sortDir));
	$: currentPageBatStats = sortedBatStats.slice($pagination.startRow, $pagination.endRow);
	$: if (currentPageBatStats) updateColumnWidths();

	function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
		pagination.firstPage();
	}

	async function updateColumnWidths() {
		await tick();
		teamNameColWidth = getVariableColumnWidth(tableId, 'player_team_id_bbref', 'a', cellPadding);
	}
</script>

<section style={backgroundColorRule}>
	<div class="flex flex-col items-baseline flex-nowrap mb-0.5 ml-1">
		<div class="mb-1 text-sm italic font-medium tracking-wide sort-description">
			{describeSortSetting(sortBy, sortDir)}
		</div>
	</div>
	<article class="resp-table-container">
		<div class="resp-table-wrapper">
			<div id={tableId} class="text-sm leading-5 table-fixed resp-table">
				<div class="text-center resp-table-header col-header">
					<SortableColumnHeader
						colStat={'player_team_id_bbref'}
						tooltip={'Team'}
						width={teamNameColWidth}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>Team</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'avg'}
						tooltip={'Batting Average'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'avg', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>AVG</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'obp'}
						tooltip={'On Base Percentage'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'obp', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>OBP</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'slg'}
						tooltip={'Slugging Percentage'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'slg', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>SLG</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'ops'}
						tooltip={'On Base Plus Slugging Percentage'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'ops', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>OPS</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'bb_rate'}
						tooltip={'Walk Rate'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'bb_rate', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>BB%</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'k_rate'}
						tooltip={'Strikeout Rate'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'k_rate', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>K%</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'at_bats'}
						tooltip={'At Bats'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'at_bats', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>AB</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'hits'}
						tooltip={'Hits'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'hits', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>H</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'runs_scored'}
						tooltip={'Runs Scored'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'runs_scored', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>R</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'rbis'}
						tooltip={'RBIs'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'rbis', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>RBI</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'bases_on_balls'}
						tooltip={'Walks'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'bases_on_balls', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>BB</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'strikeouts'}
						tooltip={'Strikeouts'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'strikeouts', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>K</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'doubles'}
						tooltip={'Doubles'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'doubles', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>2B</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'triples'}
						tooltip={'Triples'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'triples', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>3B</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'homeruns'}
						tooltip={'Homeruns'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'homeruns', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>HR</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'stolen_bases'}
						tooltip={'Stolen Bases'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'stolen_bases', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>SB</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'caught_stealing'}
						tooltip={'Caught Stealing'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'caught_stealing', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>CS</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'wpa_bat'}
						tooltip={'Win Probability Added by Hitter'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'wpa_bat', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>WPA</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'re24_bat'}
						tooltip={'Run Expectancy Based on 24 Base Outs'}
						width={getFixedColumnWidth($pageBreakPoints.current, 're24_bat', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>RE24</SortableColumnHeader
					>
				</div>
				<div class="resp-table-body">
					{#each currentPageBatStats as stats}
						<div class="resp-table-row" on:click={() => dispatch('showPlayerStatsModal', stats.player_team_id_bbref)}>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'player_team_id_bbref'}
								data-stat-name="player_team_id_bbref"
							>
								<a sveltekit:prefetch href="/team/{stats.player_team_id_bbref}/{year}"
									>{TEAM_ID_TO_CITY_MAP[stats.player_team_id_bbref]}</a
								>
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'avg'} data-stat-name="avg">
								{formatRateStat(stats.avg.toString(), 3)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'obp'} data-stat-name="obp">
								{formatRateStat(stats.obp.toString(), 3)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'slg'} data-stat-name="slg">
								{formatRateStat(stats.slg.toString(), 3)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'ops'} data-stat-name="ops">
								{formatRateStat(stats.ops.toString(), 3)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'bb_rate'} data-stat-name="bb_rate">
								{formatPercentStat(stats.bb_rate.toString(), 1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'k_rate'} data-stat-name="k_rate">
								{formatPercentStat(stats.k_rate.toString(), 1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'at_bats'} data-stat-name="at_bats">
								{formatNumber(stats.at_bats)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'hits'} data-stat-name="hits">
								{stats.hits}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'runs_scored'} data-stat-name="runs_scored">
								{stats.runs_scored}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'rbis'} data-stat-name="rbis">
								{stats.rbis}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'bases_on_balls'}
								data-stat-name="bases_on_balls"
							>
								{stats.bases_on_balls}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'strikeouts'} data-stat-name="strikeouts">
								{stats.strikeouts}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'doubles'} data-stat-name="doubles">
								{stats.doubles}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'triples'} data-stat-name="triples">
								{stats.triples}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'homeruns'} data-stat-name="homeruns">
								{stats.homeruns}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'stolen_bases'}
								data-stat-name="stolen_bases"
							>
								{stats.stolen_bases}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'caught_stealing'}
								data-stat-name="caught_stealing"
							>
								{stats.caught_stealing}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'wpa_bat'} data-stat-name="wpa_bat">
								{formatPosNegValue(stats.wpa_bat, 2)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 're24_bat'} data-stat-name="re24_bat">
								{formatPosNegValue(stats.re24_bat, 1)}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</article>
</section>

<style lang="postcss">
	.highlight-stat {
		background-color: var(--sec-color-hov);
	}

	.resp-table-row:hover {
		background-color: var(--sec-color-hov);
	}

	.table-body-cell {
		cursor: pointer;
		padding: 2px 4px;
	}

	.sort-description {
		color: var(--sec-color);
	}

	.sort-description {
		display: table-caption;
		white-space: nowrap;
	}
</style>
