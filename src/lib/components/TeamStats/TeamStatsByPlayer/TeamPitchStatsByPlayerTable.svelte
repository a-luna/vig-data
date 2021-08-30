<script lang="ts">
	import type { TeamPitchStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/HomePage/PlayerStatsForDate/SortableColumnHeader.svelte';
	import { TEAM_ID_TO_NAME_MAP } from '$lib/constants';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { TeamID } from '$lib/types';
	import { formatPercentStat, formatPosNegValue } from '$lib/util';

	export let teamPitchStats: TeamPitchStats[];
	export let team: TeamID;
	export let backgroundColorRule: string;
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc';
	export let startRow: number;
	export let endRow: number;
	export let tableId: string = '';

	$: split = $teamStatFilter.pitchStatSplit;
	$: year = $teamStatFilter.season;
	$: heading = getTableHeading(team);

	function getTableHeading(teamId) {
		let heading = `${year} ${TEAM_ID_TO_NAME_MAP[teamId]} Pitching Stats by Player `;
		if (split !== 'all') {
			heading += `(${split.toUpperCase()} Only)`;
		}
		return heading;
	}

	function getTableSubheading(sortStat: string, dir: 'asc' | 'desc'): string {
		const STAT_DISPLAY_NAME_MAP = {
			player_name: 'name',
			total_games: 'games played',
			games_as_sp: 'games as SP',
			games_as_rp: 'games as RP',
			wins: 'wins',
			losses: 'losses',
			saves: 'saves',
			innings_pitched: 'innings pitched',
			total_outs: 'total outs',
			batters_faced: 'batters faced',
			runs: 'runs',
			earned_runs: 'earned runs',
			hits: 'hits',
			homeruns: 'homeruns',
			strikeouts: 'strikeouts',
			bases_on_balls: 'walks',
			era: 'ERA',
			whip: 'WHIP',
			k_per_nine: 'K/9',
			bb_per_nine: 'BB/9',
			hr_per_nine: 'HR/9',
			k_per_bb: 'K/BB',
			k_rate: 'K%',
			bb_rate: 'BB%',
			k_minus_bb: 'K%-BB%',
			hr_per_fb: 'HR/FB',
			pitch_count: 'Pitch Count',
			strikes: 'strikes',
			strikes_contact: 'strikes (contact)',
			strikes_swinging: 'strikes (swinging)',
			strikes_looking: 'strikes (looking)',
			line_drives: 'line drives',
			ground_balls: 'ground balls',
			fly_balls: 'fly balls',
			unknown_type: 'unknown type',
			inherited_runners: 'inherited runners',
			inherited_scored: 'inherited scored',
			wpa_pitch: 'win probability added',
			re24_pitch: 'run expectancy'
		};
		const STAT_SORT_TYPE_MAP = {
			player_name: ['(ascending)', '(descending)'],
			total_games: ['fewest', 'most'],
			games_as_sp: ['fewest', 'most'],
			games_as_rp: ['fewest', 'most'],
			wins: ['fewest', 'most'],
			losses: ['fewest', 'most'],
			saves: ['fewest', 'most'],
			innings_pitched: ['fewest', 'most'],
			total_outs: ['fewest', 'most'],
			batters_faced: ['fewest', 'most'],
			runs: ['fewest', 'most'],
			earned_runs: ['fewest', 'most'],
			hits: ['fewest', 'most'],
			homeruns: ['fewest', 'most'],
			strikeouts: ['fewest', 'most'],
			bases_on_balls: ['fewest', 'most'],
			era: ['lowest', 'highest'],
			whip: ['lowest', 'highest'],
			k_per_nine: ['lowest', 'highest'],
			bb_per_nine: ['lowest', 'highest'],
			hr_per_nine: ['lowest', 'highest'],
			k_per_bb: ['lowest', 'highest'],
			k_rate: ['lowest', 'highest'],
			bb_rate: ['lowest', 'highest'],
			k_minus_bb: ['lowest', 'highest'],
			hr_per_fb: ['lowest', 'highest'],
			pitch_count: ['lowest', 'highest'],
			strikes: ['fewest', 'most'],
			strikes_contact: ['fewest', 'most'],
			strikes_swinging: ['fewest', 'most'],
			strikes_looking: ['fewest', 'most'],
			line_drives: ['fewest', 'most'],
			ground_balls: ['fewest', 'most'],
			fly_balls: ['fewest', 'most'],
			unknown_type: ['fewest', 'most'],
			inherited_runners: ['fewest', 'most'],
			inherited_scored: ['fewest', 'most'],
			wpa_pitch: ['lowest', 'highest'],
			re24_pitch: ['lowest', 'highest']
		};

		const sortType = dir === 'asc' ? STAT_SORT_TYPE_MAP[sortStat][0] : STAT_SORT_TYPE_MAP[sortStat][1];
		return sortStat === 'player_name'
			? `Sorted by: ${STAT_DISPLAY_NAME_MAP[sortStat]} ${sortType}`
			: `Sorted by: ${sortType} ${STAT_DISPLAY_NAME_MAP[sortStat]}`;
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
				<SortableColumnHeader sortProp={'player_name'} tooltip={'Name'} bind:sortBy bind:sortDir on:sortTable
					>Player</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'total_games'} tooltip={'Total Games'} bind:sortBy bind:sortDir on:sortTable
					>G</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'games_as_sp'}
					tooltip={'Total Games as SP'}
					bind:sortBy
					bind:sortDir
					on:sortTable>GS</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'games_as_rp'}
					tooltip={'Total Games as RP'}
					bind:sortBy
					bind:sortDir
					on:sortTable>GR</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'wins'} tooltip={'Wins'} bind:sortBy bind:sortDir on:sortTable
					>W</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'losses'} tooltip={'Losses'} bind:sortBy bind:sortDir on:sortTable
					>L</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'saves'} tooltip={'Saves'} bind:sortBy bind:sortDir on:sortTable
					>SV</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'innings_pitched'}
					tooltip={'Innings Pitched'}
					bind:sortBy
					bind:sortDir
					on:sortTable>IP</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'total_outs'} tooltip={'Total Outs'} bind:sortBy bind:sortDir on:sortTable
					>Outs</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'batters_faced'} tooltip={'Batters Faced'} bind:sortBy bind:sortDir on:sortTable
					>BF</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'runs'} tooltip={'Runs'} bind:sortBy bind:sortDir on:sortTable
					>R</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'earned_runs'} tooltip={'Earned Runs'} bind:sortBy bind:sortDir on:sortTable
					>ER</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'hits'} tooltip={'Hits'} bind:sortBy bind:sortDir on:sortTable
					>H</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'homeruns'} tooltip={'Homeruns'} bind:sortBy bind:sortDir on:sortTable
					>HR</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'strikeouts'} tooltip={'Strikeouts'} bind:sortBy bind:sortDir on:sortTable
					>K</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'bases_on_balls'} tooltip={'Walks'} bind:sortBy bind:sortDir on:sortTable
					>BB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'era'} tooltip={'ERA'} bind:sortBy bind:sortDir on:sortTable
					>ERA</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'whip'} tooltip={'WHIP'} bind:sortBy bind:sortDir on:sortTable
					>WHIP</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'k_per_nine'} tooltip={'K/9'} bind:sortBy bind:sortDir on:sortTable
					>K/9</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'bb_per_nine'} tooltip={'BB/9'} bind:sortBy bind:sortDir on:sortTable
					>BB/9</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'hr_per_nine'} tooltip={'HR/9'} bind:sortBy bind:sortDir on:sortTable
					>HR/9</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'k_per_bb'} tooltip={'K/BB'} bind:sortBy bind:sortDir on:sortTable
					>K/BB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'k_rate'} tooltip={'K%'} bind:sortBy bind:sortDir on:sortTable
					>K%</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'bb_rate'} tooltip={'BB%'} bind:sortBy bind:sortDir on:sortTable
					>BB%</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'k_minus_bb'} tooltip={'K%-BB%'} bind:sortBy bind:sortDir on:sortTable
					>K%-BB%</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'hr_per_fb'} tooltip={'HR/FB'} bind:sortBy bind:sortDir on:sortTable
					>HR/FB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'pitch_count'} tooltip={'Pitch Count'} bind:sortBy bind:sortDir on:sortTable
					>Pit</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'strikes'} tooltip={'Strikes'} bind:sortBy bind:sortDir on:sortTable
					>Str
				</SortableColumnHeader>
				<SortableColumnHeader
					sortProp={'strikes_contact'}
					tooltip={'Strikes (Contact)'}
					bind:sortBy
					bind:sortDir
					on:sortTable>Str Cn</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'strikes_swinging'}
					tooltip={'Strikes (Swinging)'}
					bind:sortBy
					bind:sortDir
					on:sortTable>Str Sw</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'strikes_looking'}
					tooltip={'Strikes (Looking)'}
					bind:sortBy
					bind:sortDir
					on:sortTable>Str Lk</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'line_drives'} tooltip={'Line Drives'} bind:sortBy bind:sortDir on:sortTable
					>LD</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'ground_balls'} tooltip={'Ground Balls'} bind:sortBy bind:sortDir on:sortTable
					>GB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'fly_balls'} tooltip={'Fly Balls'} bind:sortBy bind:sortDir on:sortTable
					>FB</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'unknown_type'}
					tooltip={'Unknown Batted Ball Type'}
					bind:sortBy
					bind:sortDir
					on:sortTable>Unk</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'inherited_runners'}
					tooltip={'Inherited Runners'}
					bind:sortBy
					bind:sortDir
					on:sortTable>IR</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'inherited_scored'}
					tooltip={'Inherited Runners that Scored'}
					bind:sortBy
					bind:sortDir
					on:sortTable>IR Scr</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'wpa_pitch'}
					tooltip={'Win Probability Added by Hitter'}
					bind:sortBy
					bind:sortDir
					on:sortTable>WPA</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'re24_pitch'}
					tooltip={'Run Expectancy Based on 24 Base Outs'}
					bind:sortBy
					bind:sortDir
					on:sortTable>RE24</SortableColumnHeader
				>
			</div>
			<div class="resp-table-body">
				{#each teamPitchStats.slice(startRow, endRow) as stats}
					<div class="resp-table-row text-right">
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
						<div class="table-body-cell" class:highlight-stat={sortBy === 'runs'} data-stat-name="runs">
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
							{formatPercentStat(stats.k_rate.toString(), 0)}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'bb_rate'} data-stat-name="bb_rate">
							{formatPercentStat(stats.bb_rate.toString(), 0)}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'k_minus_bb'} data-stat-name="k_minus_bb">
							{formatPercentStat(stats.k_minus_bb.toString(), 0)}
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
						<div class="table-body-cell" class:highlight-stat={sortBy === 'ground_balls'} data-stat-name="ground_balls">
							{stats.ground_balls}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'fly_balls'} data-stat-name="fly_balls">
							{stats.fly_balls}
						</div>
						<div class="table-body-cell" class:highlight-stat={sortBy === 'unknown_type'} data-stat-name="unknown_type">
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
							{stats.re24_pitch}
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
