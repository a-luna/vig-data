<script lang="ts">
	import type { TeamBatStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/Util/SortableColumnHeader.svelte';
	import { DEF_POS_NUM_TO_ABBREV_MAP, TEAM_ID_TO_NAME_MAP } from '$lib/constants';
	import { describeSortSetting, getFixedColumnWidth, getSortFunction, getVariableColumnWidth } from '$lib/dataTables';
	import { mostRecentSeason } from '$lib/stores/allMlbSeasons';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { TeamID, TeamStatFilter } from '$lib/types';
	import { formatPercentStat, formatRateStat, getDummyTeamBatStats } from '$lib/util';
	import { tick } from 'svelte';

	export let settings: TeamStatFilter = {
		season: $mostRecentSeason.year,
		league: 'both',
		statType: 'bat',
		batStatSplit: 'all',
		pitchStatSplit: 'all',
		defPosition: [],
		batOrder: []
	};
	export let batStats: TeamBatStats[];
	export let team: TeamID;
	export let backgroundColorRule: string;
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc';
	export let currentPage: number;
	export let startRow: number;
	export let endRow: number;
	export let tableId: string = '';
	let playerColumnWidth: number;
	let defPosColumnWidth: number;
	let batOrderColumnWidth: number;
	const cellPadding: number = 8;

	$: split = settings.batStatSplit;
	$: defPosition = settings.defPosition;
	$: batOrder = settings.batOrder;
	$: year = settings.season;
	$: heading = getTableHeading(team);
	$: sortedBatStats = batStats.sort(getSortFunction(getDummyTeamBatStats(), sortBy, sortDir));
	$: currentPageBatStats = sortedBatStats.slice(startRow, endRow);
	$: if (currentPageBatStats) updateColumnWidths();

	async function updateColumnWidths() {
		await tick();
		playerColumnWidth = getVariableColumnWidth(tableId, 'player_name', 'a', cellPadding);
		if (split === 'defpos') {
			const widthVar = getVariableColumnWidth(tableId, 'def_position', 'span', cellPadding);
			const widthFixed = getFixedColumnWidth($pageBreakPoints.current, 'def_position', sortBy);
			defPosColumnWidth = Math.max(widthVar, widthFixed);
		}
		if (split === 'batorder') {
			const widthVar = getVariableColumnWidth(tableId, 'bat_order', 'span', cellPadding);
			const widthFixed = getFixedColumnWidth($pageBreakPoints.current, 'bat_order', sortBy);
			batOrderColumnWidth = Math.max(widthVar, widthFixed);
		}
	}

	function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
		currentPage = 1;
	}

	function getTableHeading(teamId) {
		let heading = `${year} ${TEAM_ID_TO_NAME_MAP[teamId]} Batting Stats by Player `;
		if (split === 'all') {
			heading += '(Split: All Players)';
		} else if (split === 'starters') {
			heading += '(Split: Starting Lineup)';
		} else if (split === 'subs') {
			heading += '(Split: Bench Players)';
		} else if (split === 'defpos') {
			heading += `(Def. Position: ${getDefPosAbbreviations()})`;
		} else {
			heading += `(Bat Order: ${getBatOrderNumbers()})`;
		}
		return heading;
	}

	function getDefPosAbbreviations() {
		const defPosAbbrevs = defPosition.sort((a, b) => a - b).map((def) => DEF_POS_NUM_TO_ABBREV_MAP[def]);
		return defPosAbbrevs.join(', ');
	}

	function getBatOrderNumbers() {
		return batOrder.sort((a, b) => a - b).join(', ');
	}
</script>

<section style={backgroundColorRule}>
	<div class="flex flex-col items-baseline flex-nowrap">
		<div class="resp-table-caption m-0 text-xl tracking-wide overflow-ellipsis">{heading}</div>
		<div class="mb-1 text-sm italic sort-description">{describeSortSetting(sortBy, sortDir)}</div>
	</div>
	<article class="resp-table-container">
		<div class="resp-table-wrapper">
			<div id={tableId} class="text-sm leading-5 table-fixed resp-table">
				<div class="text-center resp-table-header col-header">
					<SortableColumnHeader
						colStat={'player_name'}
						tooltip={'Player Name'}
						width={playerColumnWidth}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>Player</SortableColumnHeader
					>
					{#if split === 'defpos'}
						<SortableColumnHeader
							colStat={'def_position'}
							tooltip={'Defensive Position'}
							width={defPosColumnWidth}
							bind:sortBy
							{sortDir}
							on:sortTable={(e) => sortTableByStat(e.detail)}>Pos</SortableColumnHeader
						>
					{/if}
					{#if split === 'batorder'}
						<SortableColumnHeader
							colStat={'bat_order'}
							tooltip={'Bat Order'}
							width={batOrderColumnWidth}
							bind:sortBy
							{sortDir}
							on:sortTable={(e) => sortTableByStat(e.detail)}>Bat #</SortableColumnHeader
						>
					{/if}
					<SortableColumnHeader
						colStat={'total_games'}
						tooltip={'Total Games'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'total_games', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>G</SortableColumnHeader
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
						<div class="text-right resp-table-row">
							<div class="table-body-cell" class:highlight-stat={sortBy === 'player_name'} data-stat-name="player_name">
								<a sveltekit:prefetch href="/player/{stats.mlb_id}/batting">{stats.player_name}</a>
							</div>
							{#if split === 'defpos'}
								<div
									class="table-body-cell"
									class:highlight-stat={sortBy === 'def_position'}
									data-stat-name="def_position"
								>
									<span>{stats.def_position}</span>
								</div>
							{/if}
							{#if split === 'batorder'}
								<div class="table-body-cell" class:highlight-stat={sortBy === 'bat_order'} data-stat-name="bat_order">
									<span>{stats.bat_order}</span>
								</div>
							{/if}
							<div class="table-body-cell" class:highlight-stat={sortBy === 'total_games'} data-stat-name="total_games">
								{stats.total_games}
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
								{stats.at_bats}
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
								{stats.wpa_bat.toFixed(2)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 're24_bat'} data-stat-name="re24_bat">
								{stats.re24_bat.toFixed(2)}
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

	.table-body-cell {
		padding: 2px 4px;
	}

	.table-caption {
		color: var(--table-caption-color);
	}

	.sort-description {
		color: var(--sec-color);
	}

	.table-caption,
	.sort-description {
		display: table-caption;
		white-space: nowrap;
	}
</style>
