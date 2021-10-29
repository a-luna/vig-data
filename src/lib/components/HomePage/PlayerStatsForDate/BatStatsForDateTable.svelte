<script lang="ts">
	import type { PlayerBatStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/Util/SortableColumnHeader.svelte';
	import { describeSortSetting,getFixedColumnWidth,getSortFunction,getVariableColumnWidth } from '$lib/dataTables';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { PaginationStore } from '$lib/types';
	import { getDummyObject } from '$lib/util/dummy';
	import { formatPosNegValue } from '$lib/util/format';
	import { getHomeTeamIdFromGameId } from '$lib/util/gameData';
	import { tick } from 'svelte';

	export let batStats: PlayerBatStats[] = [];
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc';
	export let pagination: PaginationStore;
	export let tableId: string = '';
	let playerColWidth: number;
	let statLineColWidth: number;
	const cellPadding: number = 8;

	$: dummyPlayerBatStats = getDummyObject('playerBatStats') as PlayerBatStats;
	$: sortedBatStats = batStats.sort(getSortFunction(dummyPlayerBatStats, sortBy, sortDir));
	$: currentPageBatStats = sortedBatStats.slice($pagination.startRow, $pagination.endRow);
	$: if (currentPageBatStats) updateColumnWidths();

	async function updateColumnWidths() {
		await tick();
		playerColWidth = getVariableColumnWidth(tableId, 'player_name', 'a', cellPadding);
		statLineColWidth = getVariableColumnWidth(tableId, 'stat_line', 'span', cellPadding);
	}

	function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
		pagination.firstPage();
	}

	function isHomeTeam(stats: PlayerBatStats): boolean {
		const result = getHomeTeamIdFromGameId(stats.bbref_game_id);
		if (result.success) {
			const homeTeamId = result.value;
			return stats.player_team_id_bbref === homeTeamId;
		}
	}

	function getOppTeamId(stats: PlayerBatStats): string {
		return isHomeTeam(stats) ? `vs${stats.opponent_team_id_bbref}` : `@${stats.opponent_team_id_bbref}`;
	}
</script>

<svelte:window on:resize={() => updateColumnWidths()}/>

<div class="flex flex-col items-baseline flex-nowrap table-captions">
	<h3
		class="table-caption flex-col justify-start mb-1.5 text-lg leading-none sm:leading-none tracking-wide flex-nowrap sm:text-xl"
	>
		Batting Stats
	</h3>
	<div class="mb-1.5 text-sm italic leading-none sm:leading-none sort-description">
		{describeSortSetting(sortBy, sortDir)}
	</div>
</div>
<article class="resp-table-container">
	<div class="resp-table-wrapper">
		<div id={tableId} class="text-sm leading-5 table-fixed resp-table">
			<div class="text-center resp-table-header col-header">
				<SortableColumnHeader
					colStat={'player_name'}
					tooltip={'Player Name'}
					width={playerColWidth}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>Player</SortableColumnHeader
				>
				<SortableColumnHeader
					colStat={'opponent_team_id_bbref'}
					tooltip={'Opponent'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'opponent_team_id_bbref', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>Opp</SortableColumnHeader
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
					colStat={'bases_on_balls'}
					tooltip={'Walks'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'bases_on_balls', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>BB</SortableColumnHeader
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
					colStat={'extra_base_hits'}
					tooltip={'Extra Base Hits'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'extra_base_hits', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>XBH</SortableColumnHeader
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
					colStat={'total_bases'}
					tooltip={'Total Bases'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'total_bases', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>TB</SortableColumnHeader
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
				<div class="table-header-cell" data-stat-name="stat_line" style={`width: ${statLineColWidth}px`}>Stat Line</div>
			</div>
			<div class="resp-table-body">
				{#each currentPageBatStats as b}
					<div class="text-right resp-table-row">
						<div
							class="text-left table-body-cell"
							class:highlight-stat={sortBy === 'player_name'}
							data-stat-name="player_name"
						>
							<a sveltekit:prefetch href="/player/{b.player_id_mlb}/batting"
								>{b.player_name} ({b.player_team_id_bbref})</a
							>
						</div>
						<div
							class="text-center table-body-cell"
							class:highlight-stat={sortBy === 'opponent_team_id_bbref'}
							data-stat-name="opponent_team_id_bbref"
						>
							<a sveltekit:prefetch href="/game?id={b.bbref_game_id}&show=box">{getOppTeamId(b)}</a>
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'at_bats'} data-stat-name="at_bats">
							{b.at_bats}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'hits'} data-stat-name="hits">{b.hits}</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'bases_on_balls'}
							data-stat-name="bases_on_balls"
						>
							{b.bases_on_balls}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'runs_scored'} data-stat-name="runs_scored">
							{b.runs_scored}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'rbis'} data-stat-name="rbis">{b.rbis}</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'extra_base_hits'}
							data-stat-name="extra_base_hits"
						>
							{b.extra_base_hits}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'homeruns'} data-stat-name="homeruns">
							{b.homeruns}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'total_bases'} data-stat-name="total_bases">
							{b.total_bases}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'stolen_bases'} data-stat-name="stolen_bases">
							{b.stolen_bases}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'wpa_bat'} data-stat-name="wpa_bat">
							{formatPosNegValue(b.wpa_bat, 2)}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 're24_bat'} data-stat-name="re24_bat">
							{b.re24_bat}
						</div>
						<div class="tracking-wider table-body-cell" data-stat-name="stat_line"><span>{b.stat_line}</span></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</article>

<style lang="postcss">
	.highlight-stat {
		background-color: var(--sec-color-hov);
	}

	.table-header-cell,
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
