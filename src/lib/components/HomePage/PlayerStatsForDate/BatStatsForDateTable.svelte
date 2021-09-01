<script lang="ts">
	import type { PlayerBatStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/HomePage/PlayerStatsForDate/SortableColumnHeader.svelte';
	import { formatPosNegValue, getHomeTeamIdFromGameId } from '$lib/util';

	export let batStats: PlayerBatStats[] = [];
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc';
	export let startRow: number;
	export let endRow: number;
	export let tableId: string = '';

	function getSortDescription(sortStat: string, dir: 'asc' | 'desc'): string {
		const STAT_DISPLAY_NAME_MAP = {
			at_bats: 'at bats',
			hits: 'hits',
			bases_on_balls: 'walks',
			runs_scored: 'runs scored',
			rbis: 'RBIs',
			extra_base_hits: 'extra base hits',
			homeruns: 'homeruns',
			total_bases: 'total bases',
			stolen_bases: 'stolen bases',
			wpa_bat: 'win probabilty added',
			re24_bat: 'run expectancy'
		};
		const STAT_SORT_TYPE_MAP = {
			at_bats: ['fewest', 'most'],
			hits: ['fewest', 'most'],
			bases_on_balls: ['fewest', 'most'],
			runs_scored: ['fewest', 'most'],
			rbis: ['fewest', 'most'],
			extra_base_hits: ['fewest', 'most'],
			homeruns: ['fewest', 'most'],
			total_bases: ['fewest', 'most'],
			stolen_bases: ['fewest', 'most'],
			wpa_bat: ['lowest', 'highest'],
			re24_bat: ['lowest', 'highest']
		};
		const sortType = dir === 'asc' ? STAT_SORT_TYPE_MAP[sortStat][0] : STAT_SORT_TYPE_MAP[sortStat][1];
		return `Sorted by: ${sortType} ${STAT_DISPLAY_NAME_MAP[sortStat]}`;
	}

	function isHomeTeam(batStats: PlayerBatStats): boolean {
		const result = getHomeTeamIdFromGameId(batStats.bbref_game_id);
		if (result.success) {
			const homeTeamId = result.value;
			return batStats.player_team_id_bbref === homeTeamId;
		}
	}

	function getOppTeamId(batStats: PlayerBatStats): string {
		return isHomeTeam(batStats) ? `vs${batStats.opponent_team_id_bbref}` : `@${batStats.opponent_team_id_bbref}`;
	}
</script>

<section class="datatable">
	<div class="flex flex-col items-baseline flex-nowrap table-captions">
		<div class="table-caption m-0 text-lg tracking-wide sm:text-xl">Batting Stats</div>
		<div class="mb-1 text-sm italic sort-description">{getSortDescription(sortBy, sortDir)}</div>
	</div>
	<article class="dt-table" style="overflow-x: auto">
		<div id={tableId} class="resp-table w-full text-sm leading-5">
			<div class="resp-table-header col-header text-center">
				<div class="table-header-cell" data-stat-name="player_name">Player</div>
				<div class="table-header-cell" data-stat-name="opponent_team_id_bbref">Opp</div>
				<SortableColumnHeader sortProp={'at_bats'} tooltip={'At Bats'} bind:sortBy bind:sortDir on:sortTable
					>AB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'hits'} tooltip={'Hits'} bind:sortBy bind:sortDir on:sortTable
					>H</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'bases_on_balls'} tooltip={'Walks'} bind:sortBy bind:sortDir on:sortTable
					>BB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'runs_scored'} tooltip={'Runs Scored'} bind:sortBy bind:sortDir on:sortTable
					>R</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'rbis'} tooltip={'RBIs'} bind:sortBy bind:sortDir on:sortTable
					>RBI</SortableColumnHeader
				>
				<SortableColumnHeader
					sortProp={'extra_base_hits'}
					tooltip={'Extra Base Hits'}
					bind:sortBy
					bind:sortDir
					on:sortTable>XBH</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'homeruns'} tooltip={'Homeruns'} bind:sortBy bind:sortDir on:sortTable
					>HR</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'total_bases'} tooltip={'Total Bases'} bind:sortBy bind:sortDir on:sortTable
					>TB</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'stolen_bases'} tooltip={'Stolen Bases'} bind:sortBy bind:sortDir on:sortTable
					>SB</SortableColumnHeader
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
				<div class="table-header-cell" data-stat-name="stat_line">Stat Line</div>
			</div>
			<div class="resp-table-body">
				{#each batStats.slice(startRow, endRow) as b}
					<div class="resp-table-row text-right">
						<div class="text-left table-body-cell" data-stat-name="player_name">
							<a sveltekit:prefetch href="/player/{b.player_id_mlb}/pitching"
								>{b.player_name} ({b.player_team_id_bbref})</a
							>
						</div>
						<div class="text-center table-body-cell" data-stat-name="opponent_team_id_bbref">
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
						<div class="tracking-wider table-body-cell" data-stat-name="stat_line">{b.stat_line}</div>
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
