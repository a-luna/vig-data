<script lang="ts">
	import type { PlayerPitchStats } from '$lib/api/types';
	import SortableColumnHeader from '$lib/components/HomePage/PlayerStatsForDate/SortableColumnHeader.svelte';
	import { formatPosNegValue, getHomeTeamIdFromGameId } from '$lib/util';

	export let pitchStats: PlayerPitchStats[] = [];
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc';
	export let startRow: number;
	export let endRow: number;
	export let tableId: string = '';

	function getTableCaption(): string {
		const pitcherRole = pitchStats.every((p) => p.is_sp === 1)
			? 'Starting Pitcher'
			: pitchStats.every((p) => p.is_rp === 1)
			? 'Relief Pitcher'
			: 'All Pitching';
		return `${pitcherRole} Stats`;
	}

	function getSortDescription(sortStat: string, dir: 'asc' | 'desc'): string {
		const STAT_DISPLAY_NAME_MAP = {
			hits: 'hits',
			bases_on_balls: 'walks',
			strikeouts: 'strikeouts',
			strikes_swinging: 'swinging strikes',
			csw: 'called strikes + whiffs',
			game_score: 'game score',
			inherited_runners: 'inherited runners',
			inherited_scored: 'inherited scored',
			avg_lvg_index: 'average leverage index',
			wpa_pitch: 'win probabilty added',
			re24_pitch: 'run expectancy'
		};
		const STAT_SORT_TYPE_MAP = {
			hits: ['fewest', 'most'],
			bases_on_balls: ['fewest', 'most'],
			strikeouts: ['fewest', 'most'],
			strikes_swinging: ['fewest', 'most'],
			csw: ['fewest', 'most'],
			game_score: ['worst', 'best'],
			inherited_runners: ['fewest', 'most'],
			inherited_scored: ['fewest', 'most'],
			avg_lvg_index: ['lowest', 'highest'],
			wpa_pitch: ['lowest', 'highest'],
			re24_pitch: ['lowest', 'highest']
		};
		const sortType = dir === 'asc' ? STAT_SORT_TYPE_MAP[sortStat][0] : STAT_SORT_TYPE_MAP[sortStat][1];
		return `Sorted by: ${sortType} ${STAT_DISPLAY_NAME_MAP[sortStat]}`;
	}

	function isHomeTeam(pitchStats: PlayerPitchStats): boolean {
		const result = getHomeTeamIdFromGameId(pitchStats.bbref_game_id);
		if (result.success) {
			const homeTeamId = result.value;
			return pitchStats.player_team_id_bbref === homeTeamId;
		}
	}

	function getOppTeamId(pitchStats: PlayerPitchStats): string {
		return isHomeTeam(pitchStats) ? `vs${pitchStats.opponent_team_id_bbref}` : `@${pitchStats.opponent_team_id_bbref}`;
	}
</script>

<section class="datatable">
	<div class="flex flex-col items-baseline flex-nowrap table-captions">
		<div class="table-caption m-0 text-lg tracking-wide sm:text-xl">{getTableCaption()}</div>
		<div class="mb-1 text-sm italic sort-description">{getSortDescription(sortBy, sortDir)}</div>
	</div>
	<article class="dt-table" style="overflow-x: auto">
		<div id={tableId} class="resp-table w-full text-sm leading-5">
			<div class="resp-table-header col-header text-center">
				<div class="table-header-cell" data-stat-name="player_name">Player</div>
				<div class="table-header-cell" data-stat-name="opponent_team_id_bbref">Opp</div>
				<SortableColumnHeader sortProp={'hits'} tooltip={'Hits'} bind:sortBy bind:sortDir on:sortTable
					>H</SortableColumnHeader
				>
				<SortableColumnHeader sortProp={'bases_on_balls'} tooltip={'Walks'} bind:sortBy bind:sortDir on:sortTable>
					BB
				</SortableColumnHeader>
				<SortableColumnHeader sortProp={'strikeouts'} tooltip={'Strikeouts'} bind:sortBy bind:sortDir on:sortTable>
					K
				</SortableColumnHeader>
				<SortableColumnHeader
					sortProp={'strikes_swinging'}
					tooltip={'Strikes (Swinging)'}
					bind:sortBy
					bind:sortDir
					on:sortTable
				>
					StS
				</SortableColumnHeader>
				<SortableColumnHeader
					sortProp={'csw'}
					tooltip={'Called Strikes + Swinging'}
					bind:sortBy
					bind:sortDir
					on:sortTable
				>
					CSW
				</SortableColumnHeader>
				{#if pitchStats.some((p) => p.is_sp === 1)}
					<SortableColumnHeader sortProp={'game_score'} tooltip={'Game Score'} bind:sortBy bind:sortDir on:sortTable>
						GS
					</SortableColumnHeader>
				{/if}
				{#if pitchStats.some((p) => p.is_rp === 1)}
					<SortableColumnHeader
						sortProp={'inherited_runners'}
						tooltip={'Inherited Runners'}
						bind:sortBy
						bind:sortDir
						on:sortTable
					>
						IR
					</SortableColumnHeader>
					<SortableColumnHeader
						sortProp={'inherited_scored'}
						tooltip={'Inherited Scored'}
						bind:sortBy
						bind:sortDir
						on:sortTable
					>
						IS
					</SortableColumnHeader>
					<SortableColumnHeader
						sortProp={'avg_lvg_index'}
						tooltip={'Average Leverage Index'}
						bind:sortBy
						bind:sortDir
						on:sortTable
					>
						aLI
					</SortableColumnHeader>
				{/if}
				<SortableColumnHeader
					sortProp={'wpa_pitch'}
					tooltip={'Win Probability Added by Pitcher'}
					bind:sortBy
					bind:sortDir
					on:sortTable
				>
					WPA
				</SortableColumnHeader>
				<SortableColumnHeader
					sortProp={'re24_pitch'}
					tooltip={'Run Expectancy Based on 24 Base Outs'}
					bind:sortBy
					bind:sortDir
					on:sortTable
				>
					RE24
				</SortableColumnHeader>
				<div class="table-header-cell" data-stat-name="summary_stat_line">Stat Line</div>
			</div>
			<div class="resp-table-body">
				{#each pitchStats.slice(startRow, endRow) as p}
					<div class="resp-table-row text-right">
						<div class="text-left table-body-cell" data-stat-name="player_name">
							<a sveltekit:prefetch href="/player/{p.player_id_mlb}/pitching"
								>{p.player_name} ({p.player_team_id_bbref})</a
							>
						</div>
						<div class="text-center table-body-cell" data-stat-name="opponent_team_id_bbref">
							<a sveltekit:prefetch href="/game?id={p.bbref_game_id}&show=box">{getOppTeamId(p)}</a>
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
						<div class="tracking-wider table-body-cell" data-stat-name="innings_pitched">{p.summary_stat_line}</div>
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
