<script lang="ts">
	import type { CareerPitchStats, TeamPitchStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/Util/SortableColumnHeader.svelte';
	import { describeSortSetting, getFixedColumnWidth, getSortFunction } from '$lib/dataTables';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { formatPercentStat, formatPosNegValue, getDummyTeamPitchStats } from '$lib/util';
	import FaMinusCircle from 'svelte-icons/fa/FaMinusCircle.svelte';
	import FaPlusCircle from 'svelte-icons/fa/FaPlusCircle.svelte';
	import { flip } from 'svelte/animate';
	import { quintInOut } from 'svelte/easing';

	export let careerPitchStats: CareerPitchStats;
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc' = 'desc';
	const tableId: string = 'career-pitch-stats';
	const heading: string = 'Career Pitching Stats';
	let statsTableRows: TeamPitchStats[] = [];
	let expanded: boolean = true;
	const options = { delay: 100, duration: 500, easing: quintInOut };

	$: sortedPitchStats = sortSeasonPitchStats(sortBy, sortDir, expanded);
	$: statsTableRows = [...sortedPitchStats, careerPitchStats.career, ...careerPitchStats.by_team];
	$: headingFontSize = $pageBreakPoints.width < 640 ? '24px' : $pageBreakPoints.width < 768 ? '24px' : '28px';

	function sortSeasonPitchStats(sortStat: string, dir: 'asc' | 'desc', isExpanded: boolean): TeamPitchStats[] {
		const combinedSeasonStats = [];
		careerPitchStats.by_team_by_year
			.filter((s) => s.all_stats_for_season)
			.sort(getSortFunction(getDummyTeamPitchStats(), sortStat, dir))
			.map((s) => {
				combinedSeasonStats.push(s);
				if (isExpanded) {
					const currentYear = s.year;
					careerPitchStats.by_team_by_year
						.filter((s) => s.all_stats_for_stint && s.year === currentYear)
						.sort((a, b) => a.stint_number - b.stint_number)
						.map((s) => {
							combinedSeasonStats.push(s);
						});
				}
			});
		return combinedSeasonStats;
	}

	function getYearForTableRow(stats: TeamPitchStats): string | number {
		return !stats.career_stats_all_teams && !stats.career_stats_for_team ? stats.year : '';
	}

	function getPlayerAgeForTableRow(stats: TeamPitchStats): string | number {
		return !stats.career_stats_all_teams && !stats.career_stats_for_team ? stats.age : '';
	}

	function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
	}
</script>

<div class="flex flex-col items-baseline mt-2 flex-nowrap">
	<div class="table-caption" style="font-size: {headingFontSize}">{heading}</div>
	<div class="mb-1 text-sm italic sort-description">{describeSortSetting(sortBy, sortDir)}</div>
</div>
<article class="resp-table-container">
	<div class="resp-table-wrapper">
		<div id={tableId} class="text-sm leading-5 table-fixed resp-table">
			<div class="text-center resp-table-header col-header">
				<SortableColumnHeader
					colStat={'year'}
					tooltip={'Year'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'year', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>Year</SortableColumnHeader
				>
				<SortableColumnHeader
					colStat={'age'}
					tooltip={"Player's age at midnight at June 30 on midnight of each season"}
					width={getFixedColumnWidth($pageBreakPoints.current, 'age', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>Age</SortableColumnHeader
				>
				<SortableColumnHeader
					colStat={'player_team_id_bbref'}
					tooltip={'Team'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'player_team_id_bbref', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>Team</SortableColumnHeader
				>
				<SortableColumnHeader
					colStat={'league'}
					tooltip={'American or National League'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'league', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>Lg</SortableColumnHeader
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
					colStat={'hits'}
					tooltip={'Hits'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'hits', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>H</SortableColumnHeader
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
					colStat={'homeruns'}
					tooltip={'Homeruns'}
					width={getFixedColumnWidth($pageBreakPoints.current, 'homeruns', sortBy)}
					bind:sortBy
					{sortDir}
					on:sortTable={(e) => sortTableByStat(e.detail)}>HR</SortableColumnHeader
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
				{#each statsTableRows as stats (stats.row_id)}
					<div
						animate:flip={options}
						class="text-right resp-table-row"
						class:season-stats={!stats.changed_teams_midseason && stats.all_stats_for_season}
						class:combined-team-stats={stats.changed_teams_midseason && stats.all_stats_for_season}
						class:separate-team-stats={stats.all_stats_for_stint}
						class:career-stats-all-teams={stats.career_stats_all_teams}
						class:career-stats-for-team={stats.career_stats_for_team}
					>
						{#if stats.career_stats_all_teams}
							<div
								class="overflow-x-visible table-body-cell"
								style="width: {getFixedColumnWidth($pageBreakPoints.current, 'year', sortBy)}px"
							>
								{stats.total_seasons} seasons
							</div>
						{:else if stats.career_stats_for_team}
							<div
								class="overflow-x-visible table-body-cell"
								style="width: {getFixedColumnWidth($pageBreakPoints.current, 'year', sortBy)}px"
							>
								{stats.player_team_id_bbref} ({stats.total_seasons} yrs)
							</div>
						{:else}
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'year'}
								data-stat-name="year"
								style="width: {getFixedColumnWidth($pageBreakPoints.current, 'year', sortBy)}px"
							>
								{#if stats.changed_teams_midseason && stats.all_stats_for_season}
									<div class="flex flex-row justify-end flex-nowrap gap-x-1.5 leading-none">
										<div
											class="my-auto cursor-pointer stroke-current stroke-2 show-separate-season-stats-button asc"
											title={expanded ? 'Click to show only full season stats' : 'Click to show separate team stats'}
											on:click={() => (expanded = !expanded)}
										>
											{#if expanded}
												<FaMinusCircle />
											{:else}
												<FaPlusCircle />
											{/if}
										</div>
										<span>{getYearForTableRow(stats)}</span>
									</div>
								{:else}
									{getYearForTableRow(stats)}
								{/if}
							</div>
						{/if}
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'age'}
							data-stat-name="age"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'age', sortBy)}px"
						>
							{getPlayerAgeForTableRow(stats)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'player_team_id_bbref'}
							data-stat-name="player_team_id_bbref"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'player_team_id_bbref', sortBy)}px"
						>
							{#if !stats.career_stats_all_teams && !stats.career_stats_for_team}
								{#if stats.player_team_id_bbref !== 'TOT'}
									<a sveltekit:prefetch href="/team/{stats.player_team_id_bbref}/{stats.year}"
										>{stats.player_team_id_bbref}</a
									>
								{:else}
									{stats.player_team_id_bbref}
								{/if}
							{/if}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'league'}
							data-stat-name="league"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'league', sortBy)}px"
						>
							{stats.league}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'wins'}
							data-stat-name="wins"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'wins', sortBy)}px"
						>
							{stats.wins}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'losses'}
							data-stat-name="losses"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'losses', sortBy)}px"
						>
							{stats.losses}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'total_games'}
							data-stat-name="total_games"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'total_games', sortBy)}px"
						>
							{stats.total_games}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'games_as_sp'}
							data-stat-name="games_as_sp"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'games_as_sp', sortBy)}px"
						>
							{stats.games_as_sp}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'games_as_rp'}
							data-stat-name="games_as_rp"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'games_as_rp', sortBy)}px"
						>
							{stats.games_as_rp}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'saves'}
							data-stat-name="saves"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'saves', sortBy)}px"
						>
							{stats.saves}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'innings_pitched'}
							data-stat-name="innings_pitched"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'innings_pitched', sortBy)}px"
						>
							{stats.innings_pitched.toFixed(1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'era'}
							data-stat-name="era"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'era', sortBy)}px"
						>
							{stats.era.toFixed(2)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'whip'}
							data-stat-name="whip"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'whip', sortBy)}px"
						>
							{stats.whip.toFixed(2)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'hits'}
							data-stat-name="hits"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'hits', sortBy)}px"
						>
							{stats.hits}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'runs_allowed'}
							data-stat-name="runs_allowed"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'runs_allowed', sortBy)}px"
						>
							{stats.runs}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'earned_runs'}
							data-stat-name="earned_runs"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'earned_runs', sortBy)}px"
						>
							{stats.earned_runs}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'strikeouts'}
							data-stat-name="strikeouts"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'strikeouts', sortBy)}px"
						>
							{stats.strikeouts}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'bases_on_balls'}
							data-stat-name="bases_on_balls"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'bases_on_balls', sortBy)}px"
						>
							{stats.bases_on_balls}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'homeruns'}
							data-stat-name="homeruns"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'homeruns', sortBy)}px"
						>
							{stats.homeruns}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'batters_faced'}
							data-stat-name="batters_faced"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'batters_faced', sortBy)}px"
						>
							{stats.batters_faced}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'k_per_nine'}
							data-stat-name="k_per_nine"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'k_per_nine', sortBy)}px"
						>
							{stats.k_per_nine.toFixed(1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'bb_per_nine'}
							data-stat-name="bb_per_nine"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'bb_per_nine', sortBy)}px"
						>
							{stats.bb_per_nine.toFixed(1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'hr_per_nine'}
							data-stat-name="hr_per_nine"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'hr_per_nine', sortBy)}px"
						>
							{stats.hr_per_nine.toFixed(1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'k_per_bb'}
							data-stat-name="k_per_bb"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'k_per_bb', sortBy)}px"
						>
							{stats.k_per_bb.toFixed(1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'k_rate'}
							data-stat-name="k_rate"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'k_rate', sortBy)}px"
						>
							{formatPercentStat(stats.k_rate.toString(), 1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'bb_rate'}
							data-stat-name="bb_rate"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'bb_rate', sortBy)}px"
						>
							{formatPercentStat(stats.bb_rate.toString(), 1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'k_minus_bb'}
							data-stat-name="k_minus_bb"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'k_minus_bb', sortBy)}px"
						>
							{formatPercentStat(stats.k_minus_bb.toString(), 1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'hr_per_fb'}
							data-stat-name="hr_per_fb"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'hr_per_fb', sortBy)}px"
						>
							{stats.hr_per_fb.toFixed(1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'inherited_runners'}
							data-stat-name="inherited_runners"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'inherited_runners', sortBy)}px"
						>
							{stats.inherited_runners}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'inherited_scored'}
							data-stat-name="inherited_scored"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'inherited_scored', sortBy)}px"
						>
							{stats.inherited_scored}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'wpa_pitch'}
							data-stat-name="wpa_pitch"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'wpa_pitch', sortBy)}px"
						>
							{formatPosNegValue(stats.wpa_pitch, 2)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 're24_pitch'}
							data-stat-name="re24_pitch"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 're24_pitch', sortBy)}px"
						>
							{formatPosNegValue(stats.re24_pitch, 1)}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</article>

<style lang="postcss">
	.season-stats .table-body-cell,
	.combined-team-stats .table-body-cell {
		background-color: var(--table-single-season-stats-bg-color);
		border-left: 1px solid var(--table-inner-border-vert-color);
		border-top: 1px dotted var(--table-inner-border-vert-color);
	}

	.season-stats .table-body-cell:first-child,
	.combined-team-stats .table-body-cell:first-child {
		border-left: 1px solid var(--table-outer-border-color);
	}
	.season-stats:first-child .table-body-cell,
	.combined-team-stats:first-child .table-body-cell {
		border-top: none;
	}

	.separate-team-stats .table-body-cell {
		background-color: var(--table-separate-team-stats-bg-color);
	}

	.season-stats .highlight-stat,
	.combined-team-stats .highlight-stat {
		background-color: var(--sec-color-hov);
	}

	.separate-team-stats {
		font-style: italic;
		color: var(--player-separate-team-stats-text-color);
	}

	.table-body-cell {
		padding: 2px 4px;
	}

	.career-stats-all-teams .table-body-cell,
	.career-stats-for-team .table-body-cell {
		font-weight: 700;
		background-color: var(--table-totals-bg-color);
		border-left: 1px solid var(--table-totals-border-vert-color);
	}

	.career-stats-all-teams .table-body-cell:first-child,
	.career-stats-for-team .table-body-cell:first-child {
		border-left: 1px solid var(--table-outer-border-color);
	}

	.career-stats-all-teams [data-stat-name='age'],
	.career-stats-for-team [data-stat-name='age'] {
		border-left: none;
	}

	.career-stats-all-teams [data-stat-name='player_team_id_bbref'],
	.career-stats-for-team [data-stat-name='player_team_id_bbref'] {
		border-left: none;
	}

	.career-stats-all-teams .table-body-cell {
		border-top: 1px solid var(--table-body-color);
		border-bottom: 1px solid var(--table-body-color);
	}

	.table-caption {
		@apply mb-1 text-2xl leading-none tracking-normal overflow-ellipsis whitespace-nowrap;
		display: table-caption;
		color: var(--table-caption-color);
	}

	.sort-description {
		display: table-caption leading-none tracking-wide overflow-ellipsis whitespace-nowrap;
		color: var(--sec-color);
	}

	.show-separate-season-stats-button {
		color: var(--pri-color);
		flex: 0 0 0.75rem;
	}
</style>
