<script lang="ts">
	import type { TeamPitchStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/Util/SortableColumnHeader.svelte';
	import { TEAM_ID_TO_NAME_MAP } from '$lib/constants';
	import { describeSortSetting, getFixedColumnWidth, getSortFunction, getVariableColumnWidth } from '$lib/dataTables';
	import { mostRecentSeason } from '$lib/stores/allMlbSeasons';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { TeamID, TeamStatFilter } from '$lib/types';
	import { formatPercentStat, formatPosNegValue, getDummyTeamPitchStats } from '$lib/util';
	import { tick } from 'svelte';

	export let settings: TeamStatFilter = {
		season: $mostRecentSeason.year,
		league: 'both',
		statType: 'pitch',
		batStatSplit: 'all',
		pitchStatSplit: 'all',
		defPosition: [],
		batOrder: []
	};
	export let pitchStats: TeamPitchStats[];
	export let team: TeamID;
	export let backgroundColorRule: string;
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc';
	export let currentPage: number;
	export let startRow: number;
	export let endRow: number;
	export let tableId: string = '';
	let playerColumnWidth: number;
	const cellPadding: number = 10;

	$: split = settings.pitchStatSplit;
	$: year = settings.season;
	$: heading = getTableHeading(team);
	$: sortedPitchStats = pitchStats.sort(getSortFunction(getDummyTeamPitchStats(), sortBy, sortDir));
	$: currentPagePitchStats = sortedPitchStats.slice(startRow, endRow);
	$: if (currentPagePitchStats) updateColumnWidths();

	async function updateColumnWidths() {
		await tick();
		playerColumnWidth = getVariableColumnWidth(tableId, 'player_name', 'a', cellPadding);
	}

	function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
		currentPage = 1;
	}

	function getTableHeading(teamId) {
		heading = `${year} ${TEAM_ID_TO_NAME_MAP[teamId]} Pitching Stats by Player `;
		if (split !== 'all') {
			heading += `(${split.toUpperCase()} Only)`;
		}
		return heading;
	}
</script>

<section style={backgroundColorRule}>
	<div class="flex flex-col items-baseline flex-nowrap">
		<div class="m-0 text-xl tracking-wide resp-table-caption overflow-ellipsis">{heading}</div>
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
					<SortableColumnHeader
						colStat={'total_games'}
						tooltip={'Total Games'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'total_games', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>G</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'games_as_sp'}
						tooltip={'Total Games as SP'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'games_as_sp', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>GS</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'games_as_rp'}
						tooltip={'Total Games as RP'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'games_as_rp', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>GR</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'wins'}
						tooltip={'Wins'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'wins', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>W</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'losses'}
						tooltip={'Losses'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'losses', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>L</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'saves'}
						tooltip={'Saves'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'saves', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>SV</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'innings_pitched'}
						tooltip={'Innings Pitched'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'innings_pitched', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>IP</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'total_outs'}
						tooltip={'Total Outs'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'total_outs', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>Outs</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'batters_faced'}
						tooltip={'Batters Faced'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'batters_faced', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>BF</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'runs_allowed'}
						tooltip={'Runs Allowed'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'runs_allowed', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>R</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'earned_runs'}
						tooltip={'Earned Runs'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'earned_runs', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>ER</SortableColumnHeader
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
						colStat={'homeruns'}
						tooltip={'Homeruns'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'homeruns', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>HR</SortableColumnHeader
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
						colStat={'bases_on_balls'}
						tooltip={'Walks'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'bases_on_balls', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>BB</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'era'}
						tooltip={'ERA'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'era', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>ERA</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'whip'}
						tooltip={'WHIP'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'whip', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>WHIP</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'k_per_nine'}
						tooltip={'K/9'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'k_per_nine', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>K/9</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'bb_per_nine'}
						tooltip={'BB/9'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'bb_per_nine', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>BB/9</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'hr_per_nine'}
						tooltip={'HR/9'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'hr_per_nine', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>HR/9</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'k_per_bb'}
						tooltip={'K/BB'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'k_per_bb', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>K/BB</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'k_rate'}
						tooltip={'K%'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'k_rate', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>K%</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'bb_rate'}
						tooltip={'BB%'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'bb_rate', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>BB%</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'k_minus_bb'}
						tooltip={'K%-BB%'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'k_minus_bb', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>K%-BB%</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'hr_per_fb'}
						tooltip={'HR/FB'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'hr_per_fb', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>HR/FB</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'pitch_count'}
						tooltip={'Pitch Count'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'pitch_count', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>Pit</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'strikes'}
						tooltip={'Strikes'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'strikes', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}
						>Str
					</SortableColumnHeader>
					<SortableColumnHeader
						colStat={'strikes_contact'}
						tooltip={'Strikes (Contact)'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'strikes_contact', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>StC</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'strikes_swinging'}
						tooltip={'Strikes (Swinging)'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'strikes_swinging', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>StS</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'strikes_looking'}
						tooltip={'Strikes (Looking)'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'strikes_looking', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>StL</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'line_drives'}
						tooltip={'Line Drives'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'line_drives', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>LD</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'ground_balls'}
						tooltip={'Ground Balls'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'ground_balls', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>GB</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'fly_balls'}
						tooltip={'Fly Balls'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'fly_balls', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>FB</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'unknown_type'}
						tooltip={'Unknown Batted Ball Type'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'unknown_type', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>Unk</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'inherited_runners'}
						tooltip={'Inherited Runners'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'inherited_runners', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>IR</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'inherited_scored'}
						tooltip={'Inherited Runners that Scored'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'inherited_scored', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>IS</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'wpa_pitch'}
						tooltip={'Win Probability Added by Pitcher'}
						width={getFixedColumnWidth($pageBreakPoints.current, 'wpa_pitch', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>WPA</SortableColumnHeader
					>
					<SortableColumnHeader
						colStat={'re24_pitch'}
						tooltip={'Run Expectancy Based on 24 Base Outs'}
						width={getFixedColumnWidth($pageBreakPoints.current, 're24_pitch', sortBy)}
						bind:sortBy
						{sortDir}
						on:sortTable={(e) => sortTableByStat(e.detail)}>RE24</SortableColumnHeader
					>
				</div>
				<div class="resp-table-body">
					{#each currentPagePitchStats as stats}
						<div class="text-right resp-table-row">
							<div class="table-body-cell" class:highlight-stat={sortBy === 'player_name'} data-stat-name="player_name">
								<a sveltekit:prefetch href="/player/{stats.mlb_id}/pitching">{stats.player_name}</a>
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'total_games'} data-stat-name="total_games">
								{stats.total_games}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'games_as_sp'} data-stat-name="games_as_sp">
								{stats.games_as_sp}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'games_as_rp'} data-stat-name="games_as_rp">
								{stats.games_as_rp}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'wins'} data-stat-name="wins">
								{stats.wins}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'losses'} data-stat-name="losses">
								{stats.losses}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'saves'} data-stat-name="saves">
								{stats.saves}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'innings_pitched'}
								data-stat-name="innings_pitched"
							>
								{stats.innings_pitched.toFixed(1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'total_outs'} data-stat-name="total_outs">
								{stats.total_outs}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'batters_faced'}
								data-stat-name="batters_faced"
							>
								{stats.batters_faced}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'runs_allowed'}
								data-stat-name="runs_allowed"
							>
								{stats.runs}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'earned_runs'} data-stat-name="earned_runs">
								{stats.earned_runs}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'hits'} data-stat-name="hits">
								{stats.hits}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'homeruns'} data-stat-name="homeruns">
								{stats.homeruns}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'strikeouts'} data-stat-name="strikeouts">
								{stats.strikeouts}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'bases_on_balls'}
								data-stat-name="bases_on_balls"
							>
								{stats.bases_on_balls}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'era'} data-stat-name="era">
								{stats.era.toFixed(2)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'whip'} data-stat-name="whip">
								{stats.whip.toFixed(2)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'k_per_nine'} data-stat-name="k_per_nine">
								{stats.k_per_nine.toFixed(1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'bb_per_nine'} data-stat-name="bb_per_nine">
								{stats.bb_per_nine.toFixed(1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'hr_per_nine'} data-stat-name="hr_per_nine">
								{stats.hr_per_nine.toFixed(1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'k_per_bb'} data-stat-name="k_per_bb">
								{stats.k_per_bb.toFixed(1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'k_rate'} data-stat-name="k_rate">
								{formatPercentStat(stats.k_rate.toString(), 1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'bb_rate'} data-stat-name="bb_rate">
								{formatPercentStat(stats.bb_rate.toString(), 1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'k_minus_bb'} data-stat-name="k_minus_bb">
								{formatPercentStat(stats.k_minus_bb.toString(), 1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'hr_per_fb'} data-stat-name="hr_per_fb">
								{stats.hr_per_fb.toFixed(1)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'pitch_count'} data-stat-name="pitch_count">
								{stats.pitch_count}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'strikes'} data-stat-name="strikes">
								{stats.strikes}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'strikes_contact'}
								data-stat-name="strikes_contact"
							>
								{stats.strikes_contact}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'strikes_swinging'}
								data-stat-name="strikes_swinging"
							>
								{stats.strikes_swinging}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'strikes_looking'}
								data-stat-name="strikes_looking"
							>
								{stats.strikes_looking}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'line_drives'} data-stat-name="line_drives">
								{stats.line_drives}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'ground_balls'}
								data-stat-name="ground_balls"
							>
								{stats.ground_balls}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'fly_balls'} data-stat-name="fly_balls">
								{stats.fly_balls}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'unknown_type'}
								data-stat-name="unknown_type"
							>
								{stats.unknown_type}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'inherited_runners'}
								data-stat-name="inherited_runners"
							>
								{stats.inherited_runners}
							</div>
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'inherited_scored'}
								data-stat-name="inherited_scored"
							>
								{stats.inherited_scored}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 'wpa_pitch'} data-stat-name="wpa_pitch">
								{formatPosNegValue(stats.wpa_pitch, 2)}
							</div>
							<div class="table-body-cell" class:highlight-stat={sortBy === 're24_pitch'} data-stat-name="re24_pitch">
								{formatPosNegValue(stats.re24_pitch, 1)}
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
