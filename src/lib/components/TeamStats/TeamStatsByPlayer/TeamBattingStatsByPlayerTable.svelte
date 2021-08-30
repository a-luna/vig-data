<script lang="ts">
	import type { TeamBatStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/HomePage/PlayerStatsForDate/SortableColumnHeader.svelte';
	import { DEF_POS_NUM_TO_ABBREV_MAP, TEAM_ID_TO_NAME_MAP } from '$lib/constants';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { TeamID } from '$lib/types';
	import { formatPercentStat, formatRateStat } from '$lib/util';

	export let teamBatStats: TeamBatStats[];
	export let team: TeamID;
	export let backgroundColorRule: string;
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc';
	export let startRow: number;
	export let endRow: number;
	export let tableId: string = '';

	$: split = $teamStatFilter.batStatSplit;
	$: defPosition = $teamStatFilter.defPosition;
	$: batOrder = $teamStatFilter.batOrder;
	$: year = $teamStatFilter.season;
	$: heading = getTableHeading(team);

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

	function getTableSubheading(sortStat: string, dir: 'asc' | 'desc'): string {
		const STAT_DISPLAY_NAME_MAP = {
			player_name: 'name',
			def_position: 'defensive position',
			bat_order: 'bat order',
			total_games: 'games played',
			avg: 'batting average',
			obp: 'on base percentage',
			slg: 'slugging percentage',
			ops: 'on base plus slugging percentage',
			bb_rate: 'walk rate',
			k_rate: 'strikeout rate',
			at_bats: 'at bats',
			hits: 'hits',
			runs_scored: 'runs scored',
			rbis: 'RBIs',
			bases_on_balls: 'walks',
			strikeouts: 'strikeouts',
			doubles: 'doubles',
			triples: 'triples',
			homeruns: 'homeruns',
			stolen_bases: 'stolen bases',
			caught_stealing: 'caught stealing',
			wpa_bat: 'win probabilty added',
			re24_bat: 'run expectancy'
		};
		const STAT_SORT_TYPE_MAP = {
			player_name: ['(ascending)', '(descending)'],
			def_position: ['(ascending)', '(descending)'],
			bat_order: ['lowest', 'highest'],
			total_games: ['fewest', 'most'],
			avg: ['lowest', 'highest'],
			obp: ['lowest', 'highest'],
			slg: ['lowest', 'highest'],
			ops: ['lowest', 'highest'],
			bb_rate: ['lowest', 'highest'],
			k_rate: ['lowest', 'highest'],
			at_bats: ['fewest', 'most'],
			hits: ['fewest', 'most'],
			runs_scored: ['fewest', 'most'],
			rbis: ['fewest', 'most'],
			bases_on_balls: ['fewest', 'most'],
			strikeouts: ['fewest', 'most'],
			doubles: ['fewest', 'most'],
			triples: ['fewest', 'most'],
			homeruns: ['fewest', 'most'],
			stolen_bases: ['fewest', 'most'],
			caught_stealing: ['fewest times', 'most times'],
			wpa_bat: ['lowest', 'highest'],
			re24_bat: ['lowest', 'highest']
		};
		const sortType = dir === 'asc' ? STAT_SORT_TYPE_MAP[sortStat][0] : STAT_SORT_TYPE_MAP[sortStat][1];
		return sortStat === 'def_position' || sortStat === 'player_name'
			? `Sorted by: ${STAT_DISPLAY_NAME_MAP[sortStat]} ${sortType}`
			: `Sorted by: ${sortType} ${STAT_DISPLAY_NAME_MAP[sortStat]}`;
	}

	function getDefPositionFromNumber(pos: number): string {
		if (pos < 1 || pos > 10) {
			return '';
		}
		return DEF_POS_NUM_TO_ABBREV_MAP[pos];
	}
</script>

<section class="datatable" style={backgroundColorRule}>
	<div class="flex flex-col items-baseline flex-nowrap">
		<div class="table-caption m-0 text-xl sm:text-lg overflow-ellipsis tracking-wide">{heading}</div>
		<div class="mb-1 text-sm italic sort-description">{getTableSubheading(sortBy, sortDir)}</div>
	</div>
	<article class="dt-table mb-2" style="overflow-x: auto">
		<div id={tableId} class="resp-table w-full text-sm leading-5">
			<div class="resp-table-header col-header text-center">
				<SortableColumnHeader sortProp={'player_name'} bind:sortBy bind:sortDir on:sortTable
					>Player</SortableColumnHeader
				>
				{#if split === 'defpos'}
					<SortableColumnHeader
						sortProp={'def_position'}
						tooltip={'Defensive Position'}
						bind:sortBy
						bind:sortDir
						on:sortTable>Pos</SortableColumnHeader
					>
				{/if}
				{#if split === 'batorder'}
					<SortableColumnHeader sortProp={'bat_order'} tooltip={'Bat Order'} bind:sortBy bind:sortDir on:sortTable
						>Bat #</SortableColumnHeader
					>
				{/if}
				<SortableColumnHeader sortProp={'total_games'} tooltip={'Total Games'} bind:sortBy bind:sortDir on:sortTable
					>G</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'avg'} tooltip={'Batting Average'} bind:sortBy bind:sortDir on:sortTable
					>AVG</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'obp'} tooltip={'On Base Percentage'} bind:sortBy bind:sortDir on:sortTable
					>OBP</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'slg'} tooltip={'Slugging Percentage'} bind:sortBy bind:sortDir on:sortTable
					>SLG</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'ops'}
					tooltip={'On Base Plus Slugging Percentage'}
					bind:sortBy
					bind:sortDir
					on:sortTable>OPS</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'bb_rate'} tooltip={'Walk Rate'} bind:sortBy bind:sortDir on:sortTable
					>BB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'k_rate'} tooltip={'Strikeout Rate'} bind:sortBy bind:sortDir on:sortTable
					>K</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'at_bats'} tooltip={'At Bats'} bind:sortBy bind:sortDir on:sortTable
					>AB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'hits'} tooltip={'Hits'} bind:sortBy bind:sortDir on:sortTable
					>H</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'runs_scored'} tooltip={'Runs Scored'} bind:sortBy bind:sortDir on:sortTable
					>R</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'rbis'} tooltip={'RBIs'} bind:sortBy bind:sortDir on:sortTable
					>RBI</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'bases_on_balls'} tooltip={'Walks'} bind:sortBy bind:sortDir on:sortTable
					>BB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'strikeouts'} tooltip={'Strikeouts'} bind:sortBy bind:sortDir on:sortTable
					>K</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'doubles'} tooltip={'Doubles'} bind:sortBy bind:sortDir on:sortTable
					>2B</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'triples'} tooltip={'Triples'} bind:sortBy bind:sortDir on:sortTable
					>3B</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'homeruns'} tooltip={'Homeruns'} bind:sortBy bind:sortDir on:sortTable
					>HR</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'stolen_bases'} tooltip={'Stolen Bases'} bind:sortBy bind:sortDir on:sortTable
					>SB</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'caught_stealing'}
					tooltip={'Caught Stealing'}
					bind:sortBy
					bind:sortDir
					on:sortTable>CS</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'wpa_bat'}
					tooltip={'Win Probability Added by Hitter'}
					bind:sortBy
					bind:sortDir
					on:sortTable>WPA</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'re24_bat'}
					tooltip={'Run Expectancy Based on 24 Base Outs'}
					bind:sortBy
					bind:sortDir
					on:sortTable>RE24</SortableColumnHeader
				>
			</div>
			<div class="resp-table-body">
				{#each teamBatStats.slice(startRow, endRow) as stats}
					<div class="resp-table-row text-right">
						<div class="table-body-cell" class:highlight-stat={sortBy === 'player_name'} data-stat-name="player_name">
							<a sveltekit:prefetch href="/player/{stats.mlb_id}/pitching">{stats.player_name}</a>
						</div>
						{#if split === 'defpos'}
							<div
								class="table-body-cell"
								class:highlight-stat={sortBy === 'def_position'}
								data-stat-name="def_position"
							>
								{getDefPositionFromNumber(stats.def_position)}
							</div>
						{/if}
						{#if split === 'batorder'}
							<div class="table-body-cell" class:highlight-stat={sortBy === 'bat_order'} data-stat-name="bat_order">
								{stats.bat_order}
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
							{formatPercentStat(stats.bb_rate.toString(), 0)}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'k_rate'} data-stat-name="k_rate">
							{formatPercentStat(stats.k_rate.toString(), 0)}
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
						<div class="table-body-cell" class:highlight-stat={sortBy === 'stolen_bases'} data-stat-name="stolen_bases">
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
