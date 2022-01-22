<script lang="ts">
	import type { Linescore, PitcherResults, PlayerPitchStats } from '$lib/api/types';
	import { TEAM_ID_TO_CITY_MAP, TEAM_ID_TO_NAME_MAP } from '$lib/constants';
	import { shortenPlayerName } from '$lib/util';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';
	import { onMount, tick } from 'svelte';

	export let linescore: Linescore;
	export let extra_innings: boolean = false;
	export let pitcher_results: PitcherResults;
	export let game_id: string = '';
	export let pitchStats: PlayerPitchStats[];
	let mounted: boolean = false;
	const { away_team_id, away_team_totals, home_team_id, home_team_totals, inning_numbers } = linescore;
	const { wp, lp, sv } = pitcher_results;

	$: total_innings = inning_numbers.slice(-1)?.[0];
	$: tiny_screen = $pageWidth.current < 350;
	$: gameWidth = getGameWidth($pageWidth.current);
	$: away_runs_scored = away_team_totals[0];
	$: home_runs_scored = home_team_totals[0];
	$: away_team_won = away_runs_scored > home_runs_scored;
	$: home_team_won = home_runs_scored > away_runs_scored;

	onMount(async () => {
		await tick();
		mounted = true;
	});

	function getGameWidth(pageWidth: number): number {
		return pageWidth < 350
			? Math.max(pageWidth * 0.5 - 38.5, 130)
			: pageWidth < 640
			? 175
			: pageWidth < 1024
			? 195
			: 230;
	}

	function getTeamName(team_id: string, isMobile: boolean): string {
		return isMobile ? TEAM_ID_TO_CITY_MAP[team_id] : TEAM_ID_TO_NAME_MAP[team_id];
	}

	function getPlayerName(name: string, isMobile: boolean): string {
		return isMobile ? shortenPlayerName(name) : name;
	}

	function getPitchingStatsForPlayer(mlb_id: number): PlayerPitchStats {
		const match = pitchStats.filter((p) => p.player_id_mlb == mlb_id);
		if (match.length == 1) {
			return match[0];
		}
	}

	function getPitchingRecordForPlayer(mlb_id: number): string {
		const pitchStats = getPitchingStatsForPlayer(mlb_id);
		if (pitchStats) {
			return `(${pitchStats.wins}-${pitchStats.losses})`;
		}
		return '(0-0)';
	}

	function getTotalSavesForPlayer(mlb_id: number): string {
		const pitchStats = getPitchingStatsForPlayer(mlb_id);
		if (pitchStats) {
			return `(${pitchStats.saves})`;
		}
		return '(0)';
	}
</script>

{#if mounted}
	<div
		class="flex flex-col justify-start shadow-lg place-self-start game-result flex-nowrap"
		style={`width: ${gameWidth}px`}
	>
		<div class="flex flex-col justify-start flex-grow-0 p-2 game-result-top flex-nowrap">
			<div class="flex flex-row items-baseline justify-start away-team flex-nowrap">
				<span class="flex-grow overflow-ellipsis whitespace-nowrap">
					{getTeamName(away_team_id, tiny_screen)}
				</span>
				<div class="flex flex-row justify-end right flex-nowrap">
					<span class="away-team-runs" class:font-bold={away_team_won}>{away_runs_scored}</span>
					<a class="w-8 ml-2" sveltekit:prefetch href="/game?id={game_id}&show=box">Final</a>
				</div>
			</div>
			<div class="flex flex-row items-baseline justify-start home-team flex-nowrap">
				<span class="flex-grow overflow-ellipsis whitespace-nowrap">
					{getTeamName(home_team_id, tiny_screen)}
				</span>
				<div class="flex flex-row justify-end text-right flex-nowrap">
					<span class="home-team-runs" class:font-bold={home_team_won}>{home_runs_scored}</span>
					<span class="w-8 ml-2 text-right extra-innings">{@html extra_innings ? `(${total_innings})` : '&nbsp;'}</span>
				</div>
			</div>
		</div>
		<div class="flex flex-col justify-start flex-grow-0 p-2 game-result-bottom flex-nowrap">
			<div class="flex flex-row justify-start wp flex-nowrap">
				<span class="w-3 mr-1.5 font-bold text-center">W</span>
				<span class="mr-2 overflow-ellipsis whitespace-nowrap"
					><a sveltekit:prefetch href={`/player/${wp.mlb_id}/pitching`}>
						{getPlayerName(wp.name, tiny_screen)}
					</a></span
				>
				<span class="overflow-ellipsis whitespace-nowrap">{getPitchingRecordForPlayer(wp.mlb_id)}</span>
			</div>
			<div class="flex flex-row justify-start lp flex-nowrap">
				<span class="w-3 mr-1.5 font-bold text-center">L</span>
				<span class="mr-2 overflow-ellipsis whitespace-nowrap"
					><a sveltekit:prefetch href={`/player/${lp.mlb_id}/pitching`}>
						{getPlayerName(lp.name, tiny_screen)}
					</a></span
				>
				<span class="overflow-ellipsis whitespace-nowrap">{getPitchingRecordForPlayer(lp.mlb_id)}</span>
			</div>
			{#if sv}
				<div class="flex flex-row justify-start sv flex-nowrap">
					<span class="w-3 mr-1.5 font-bold text-center">S</span>
					<span class="mr-2 overflow-ellipsis whitespace-nowrap"
						><a sveltekit:prefetch href={`/player/${sv.mlb_id}/pitching`}>
							{getPlayerName(sv.name, tiny_screen)}
						</a></span
					>
					<span class="overflow-ellipsis whitespace-nowrap">{getTotalSavesForPlayer(sv.mlb_id)}</span>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.game-result {
		color: var(--body-text-color);
		background-color: var(--game-result-bg-color);
	}

	.game-result-top {
		border-left: 1px dotted var(--game-result-border-color);
		border-top: 1px dotted var(--game-result-border-color);
		border-right: 1px dotted var(--game-result-border-color);
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}

	.game-result-bottom {
		border: 1px dotted var(--game-result-border-color);
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.game-result-bottom {
		height: 57px;
	}

	@media screen and (min-width: 640px) {
		.game-result {
			color: var(--body-text-color);
			background-color: var(--game-result-bg-color);
		}

		.game-result-top {
			border-left: 2px dotted var(--game-result-border-color);
			border-top: 2px dotted var(--game-result-border-color);
			border-right: 2px dotted var(--game-result-border-color);
		}

		.game-result-bottom {
			border: 2px dotted var(--game-result-border-color);
		}

		.game-result-bottom {
			height: 71px;
		}
	}

	@media screen and (min-width: 1024px) {
		.game-result-bottom {
			height: 78px;
		}
	}
</style>
