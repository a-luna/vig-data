<script lang="ts">
	import type { PlayerPitchStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/Util/SortableColumnHeader.svelte';
	import { describeSortSetting, getFixedColumnWidth, getSortFunction, getVariableColumnWidth } from '$lib/dataTables';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { getDummyObject } from '$lib/util/dummy';
	import { formatPosNegValue } from '$lib/util/format';
	import { getHomeTeamIdFromGameId } from '$lib/util/gameData';
	import { tick } from 'svelte';

	export let pitchStats: PlayerPitchStats[] = [];
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc';
	export let currentPage: number;
	export let startRow: number;
	export let endRow: number;
	export let tableId: string = '';
	let playerColWidth: number;
	let statLineColWidth: number;
	const cellPadding: number = 8;

	$: dummyPlayerPitchStats = getDummyObject('playerPitchStats') as PlayerPitchStats;
	$: sortedPitchStats = pitchStats.sort(getSortFunction(dummyPlayerPitchStats, sortBy, sortDir));
	$: currentPagePitchStats = sortedPitchStats.slice(startRow, endRow);
	$: if (currentPagePitchStats) updateColumnWidths();

	async function updateColumnWidths() {
		await tick();
		playerColWidth = getVariableColumnWidth(tableId, 'player_name', 'a', cellPadding);
		statLineColWidth = getVariableColumnWidth(tableId, 'summary_stat_line', 'span', cellPadding);
	}

	function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
		currentPage = 1;
	}

	function getTableCaption(): string {
		const pitcherRole = pitchStats.every((p) => p.is_sp === 1)
			? 'Starting Pitcher'
			: pitchStats.every((p) => p.is_rp === 1)
			? 'Relief Pitcher'
			: 'All Pitching';
		return `${pitcherRole} Stats`;
	}

	function isHomeTeam(stats: PlayerPitchStats): boolean {
		const result = getHomeTeamIdFromGameId(stats.bbref_game_id);
		if (result.success) {
			const homeTeamId = result.value;
			return stats.player_team_id_bbref === homeTeamId;
		}
	}

	function getOppTeamId(stats: PlayerPitchStats): string {
		return isHomeTeam(stats) ? `vs${stats.opponent_team_id_bbref}` : `@${stats.opponent_team_id_bbref}`;
	}
</script>

<div class="flex flex-col items-baseline flex-nowrap table-captions">
	<div
		class="table-caption flex-col justify-start mb-1.5 text-lg leading-none sm:leading-none tracking-wide flex-nowrap sm:text-xl"
	>
		{getTableCaption()}
	</div>
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
					tooltip={'player_name'}
					width={playerColWidth}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>Player</SortableColumnHeader
				>
				<SortableColumnHeader
					colStat={'opponent_team_id_bbref'}
					tooltip={'opponent_team_id_bbref'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'opponent_team_id_bbref', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>Opp</SortableColumnHeader
				>
				<SortableColumnHeader
					colStat={'innings_pitched'}
					tooltip={'innings_pitched'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'innings_pitched', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>IP</SortableColumnHeader
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
					on:sortTable={(e) => sortTableByStat(e.detail)}
				>
					BB
				</SortableColumnHeader>
				<SortableColumnHeader
					colStat={'strikeouts'}
					tooltip={'Strikeouts'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'strikeouts', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}
				>
					K
				</SortableColumnHeader>
				<SortableColumnHeader
					colStat={'strikes_swinging'}
					tooltip={'Strikes (Swinging)'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'strikes_swinging', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}
				>
					StS
				</SortableColumnHeader>
				<SortableColumnHeader
					colStat={'csw'}
					tooltip={'Called Strikes + Swinging'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'csw', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}
				>
					CSW
				</SortableColumnHeader>
				{#if pitchStats.some((p) => p.is_sp === 1)}
					<SortableColumnHeader
						colStat={'game_score'}
						tooltip={'Game Score'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'game_score', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}
					>
						GS
					</SortableColumnHeader>
				{/if}
				{#if pitchStats.some((p) => p.is_rp === 1)}
					<SortableColumnHeader
						colStat={'inherited_runners'}
						tooltip={'Inherited Runners'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'inherited_runners', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}
					>
						IR
					</SortableColumnHeader>
					<SortableColumnHeader
						colStat={'inherited_scored'}
						tooltip={'Inherited Scored'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'inherited_scored', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}
					>
						IS
					</SortableColumnHeader>
					<SortableColumnHeader
						colStat={'avg_lvg_index'}
						tooltip={'Average Leverage Index'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'avg_lvg_index', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}
					>
						aLI
					</SortableColumnHeader>
				{/if}
				<SortableColumnHeader
					colStat={'wpa_pitch'}
					tooltip={'Win Probability Added by Pitcher'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'wpa_pitch', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}
				>
					WPA
				</SortableColumnHeader>
				<SortableColumnHeader
					colStat={'re24_pitch'}
					tooltip={'Run Expectancy Based on 24 Base Outs'}
					width={getFixedColumnWidth($pageBreakPoints.current, 're24_pitch', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}
				>
					RE24
				</SortableColumnHeader>
				<div class="table-header-cell" data-stat-name="summary_stat_line" style={`width: ${statLineColWidth}px`}>
					Stat Line
				</div>
			</div>
			<div class="resp-table-body">
				{#each currentPagePitchStats as p}
					<div class="text-right resp-table-row">
						<div
							class="text-left table-body-cell"
							class:highlight-stat={sortBy === 'player_name'}
							data-stat-name="player_name"
						>
							<a sveltekit:prefetch href="/player/{p.player_id_mlb}/pitching"
								>{p.player_name} ({p.player_team_id_bbref})</a
							>
						</div>
						<div
							class="text-center table-body-cell"
							class:highlight-stat={sortBy === 'opponent_team_id_bbref'}
							data-stat-name="opponent_team_id_bbref"
						>
							<a sveltekit:prefetch href="/game?id={p.bbref_game_id}&show=box">{getOppTeamId(p)}</a>
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'innings_pitched'}
							data-stat-name="innings_pitched"
						>
							{p.innings_pitched}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'hits'} data-stat-name="hits">{p.hits}</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'bases_on_balls'}
							data-stat-name="bases_on_balls"
						>
							{p.bases_on_balls}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'strikeouts'} data-stat-name="strikeouts">
							{p.strikeouts}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'strikes_swinging'}
							data-stat-name="strikes_swinging"
						>
							{p.strikes_swinging}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'csw'} data-stat-name="csw">{p.csw}</div>
						{#if pitchStats.some((p) => p.is_sp === 1)}
							<div class="table-body-cell" class:highlight-stat={sortBy === 'game_score'} data-stat-name="game_score">
								{p.game_score}
							</div>
						{/if}
						{#if pitchStats.some((p) => p.is_rp === 1)}
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'inherited_runners'}
								data-stat-name="inherited_runners"
							>
								{p.inherited_runners}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'inherited_scored'}
								data-stat-name="inherited_scored"
							>
								{p.inherited_scored}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'avg_lvg_index'}
								data-stat-name="avg_lvg_index"
							>
								{p.avg_lvg_index}
							</div>
						{/if}
						<div class="table-body-cell" class:highlight-stat={sortBy === 'wpa_pitch'} data-stat-name="wpa_pitch">
							{formatPosNegValue(p.wpa_pitch, 2)}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 're24_pitch'} data-stat-name="re24_pitch">
							{p.re24_pitch}
						</div>
						<div class="tracking-wider table-body-cell" data-stat-name="summary_stat_line">
							<span>{p.summary_stat_line}</span>
						</div>
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
