<script lang="ts">
	import type { CareerBatStats, TeamBatStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/Util/SortableColumnHeader.svelte';
	import { describeSortSetting, getFixedColumnWidth, getSortFunction } from '$lib/dataTables';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { formatPercentStat, formatRateStat, getDummyTeamBatStats } from '$lib/util';
	import FaMinusCircle from 'svelte-icons/fa/FaMinusCircle.svelte';
	import FaPlusCircle from 'svelte-icons/fa/FaPlusCircle.svelte';
	import { flip } from 'svelte/animate';
	import { quintInOut } from 'svelte/easing';

	export let careerBatStats: CareerBatStats;
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc' = 'desc';
	const tableId: string = 'career-bat-stats';
	const heading: string = 'Career Batting Stats';
	let statsTableRows: TeamBatStats[] = [];
	let expanded: boolean = true;
	const options = { delay: 100, duration: 500, easing: quintInOut };

	$: sortedBatStats = sortSeasonBatStats(sortBy, sortDir, expanded);
	$: statsTableRows = [...sortedBatStats, careerBatStats.career, ...careerBatStats.by_team];
	$: headingFontSize = $pageBreakPoints.width < 640 ? '28px' : $pageBreakPoints.width < 768 ? '30px' : '32px';

	function sortSeasonBatStats(sortStat: string, dir: 'asc' | 'desc', isExpanded: boolean): TeamBatStats[] {
		const combinedSeasonStats = [];
		careerBatStats.by_team_by_year
			.filter((s) => s.all_stats_for_season)
			.sort(getSortFunction(getDummyTeamBatStats(), sortStat, dir))
			.map((s) => {
				combinedSeasonStats.push(s);
				if (isExpanded) {
					const currentYear = s.year;
					careerBatStats.by_team_by_year
						.filter((s) => s.all_stats_for_stint && s.year === currentYear)
						.sort((a, b) => a.stint_number - b.stint_number)
						.map((s) => {
							combinedSeasonStats.push(s);
						});
				}
			});
		return combinedSeasonStats;
	}

	function getYearForTableRow(stats: TeamBatStats): string | number {
		return !stats.career_stats_all_teams && !stats.career_stats_for_team ? stats.year : '';
	}

	function getPlayerAgeForTableRow(stats: TeamBatStats): string | number {
		return !stats.career_stats_all_teams && !stats.career_stats_for_team ? stats.age : '';
	}

	function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
	}
</script>

<div class="flex flex-col items-baseline flex-nowrap">
	<div class="table-caption m-0 tracking-wide overflow-ellipsis" style="font-size: {headingFontSize}">{heading}</div>
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
							class:highlight-stat={sortBy === 'total_games'}
							data-stat-name="total_games"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'total_games', sortBy)}px"
						>
							{stats.total_games}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'avg'}
							data-stat-name="avg"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'avg', sortBy)}px"
						>
							{formatRateStat(stats.avg.toString(), 3)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'obp'}
							data-stat-name="obp"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'obp', sortBy)}px"
						>
							{formatRateStat(stats.obp.toString(), 3)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'slg'}
							data-stat-name="slg"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'slg', sortBy)}px"
						>
							{formatRateStat(stats.slg.toString(), 3)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'ops'}
							data-stat-name="ops"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'ops', sortBy)}px"
						>
							{formatRateStat(stats.ops.toString(), 3)}
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
							class:highlight-stat={sortBy === 'k_rate'}
							data-stat-name="k_rate"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'k_rate', sortBy)}px"
						>
							{formatPercentStat(stats.k_rate.toString(), 1)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'at_bats'}
							data-stat-name="at_bats"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'at_bats', sortBy)}px"
						>
							{stats.at_bats}
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
							class:highlight-stat={sortBy === 'runs_scored'}
							data-stat-name="runs_scored"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'runs_scored', sortBy)}px"
						>
							{stats.runs_scored}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'rbis'}
							data-stat-name="rbis"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'rbis', sortBy)}px"
						>
							{stats.rbis}
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
							class:highlight-stat={sortBy === 'strikeouts'}
							data-stat-name="strikeouts"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'strikeouts', sortBy)}px"
						>
							{stats.strikeouts}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'doubles'}
							data-stat-name="doubles"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'doubles', sortBy)}px"
						>
							{stats.doubles}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'triples'}
							data-stat-name="triples"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'triples', sortBy)}px"
						>
							{stats.triples}
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
							class:highlight-stat={sortBy === 'stolen_bases'}
							data-stat-name="stolen_bases"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'stolen_bases', sortBy)}px"
						>
							{stats.stolen_bases}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'caught_stealing'}
							data-stat-name="caught_stealing"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'caught_stealing', sortBy)}px"
						>
							{stats.caught_stealing}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 'wpa_bat'}
							data-stat-name="wpa_bat"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 'wpa_bat', sortBy)}px"
						>
							{stats.wpa_bat.toFixed(2)}
						</div>
						<div
							class="table-body-cell"
							class:highlight-stat={sortBy === 're24_bat'}
							data-stat-name="re24_bat"
							style="width: {getFixedColumnWidth($pageBreakPoints.current, 're24_bat', sortBy)}px"
						>
							{stats.re24_bat.toFixed(2)}
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
	}

	.separate-team-stats .table-body-cell {
		background-color: var(--table-separate-team-stats-bg-color);
	}

	.resp-table-row.season-stats:last-child .table-body-cell,
	.resp-table-row.combined-team-stats:last-child .table-body-cell {
		border-bottom: none;
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

	.show-separate-season-stats-button {
		color: var(--pri-color);
		flex: 0 0 0.75rem;
	}
</style>
