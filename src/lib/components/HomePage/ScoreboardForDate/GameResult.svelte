<script lang="ts">
	import type { Linescore, PitcherResults, PlayerPitchStats } from '$lib/api/types';
	import { TEAM_ID_TO_MOBILE_NAME_MAP, TEAM_ID_TO_NAME_MAP } from '$lib/constants';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { shortenPlayerName } from '$lib/util';
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
	$: away_runs_scored = away_team_totals[0];
	$: home_runs_scored = home_team_totals[0];
	$: away_team_won = away_runs_scored > home_runs_scored;
	$: home_team_won = home_runs_scored > away_runs_scored;
	$: awayTeamName = getTeamName(away_team_id, $pageBreakPoints.isDefault);
	$: homeTeamName = getTeamName(home_team_id, $pageBreakPoints.isDefault);
	$: wpName = getPlayerName(wp.name, $pageBreakPoints.isDefault);
	$: lpName = getPlayerName(lp.name, $pageBreakPoints.isDefault);
	$: svName = sv ? getPlayerName(sv.name, $pageBreakPoints.isDefault) : '';

	onMount(async () => {
		await tick();
		mounted = true;
	});

	function getTeamName(team_id: string, isMobile: boolean): string {
		return isMobile ? TEAM_ID_TO_MOBILE_NAME_MAP[team_id] : TEAM_ID_TO_NAME_MAP[team_id];
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
	}

	function getTotalSavesForPlayer(mlb_id: number): string {
		const pitchStats = getPitchingStatsForPlayer(mlb_id);
		if (pitchStats) {
			return `(${pitchStats.saves})`;
		}
	}
</script>

{#if mounted}
	<div class="flex flex-col justify-start flex-grow shadow-lg place-self-start game-result flex-nowrap">
		<div class="flex flex-col justify-start flex-grow-0 p-2 game-result-top flex-nowrap">
			<div class="flex flex-row items-baseline justify-start away-team flex-nowrap">
				<span class="flex-grow overflow-ellipsis whitespace-nowrap">{awayTeamName}</span>
				<div class="flex flex-row justify-end text-right flex-nowrap">
					<span class="away-team-runs" class:font-bold={away_team_won}>{away_runs_scored}</span>
					<a class="w-8 ml-1" sveltekit:prefetch href="/game?id={game_id}&show=box">Final</a>
				</div>
			</div>
			<div class="flex flex-row items-baseline justify-start home-team flex-nowrap">
				<span class="flex-grow overflow-ellipsis whitespace-nowrap">{homeTeamName}</span>
				<div class="flex flex-row justify-end text-right flex-nowrap">
					<span class="home-team-runs" class:font-bold={home_team_won}>{home_runs_scored}</span>
					<span class="w-8 ml-1 text-right extra-innings">{@html extra_innings ? `(${total_innings})` : '&nbsp;'}</span>
				</div>
			</div>
		</div>
		<div class="flex flex-col justify-start flex-grow-0 p-2 game-result-bottom flex-nowrap">
			<div class="flex flex-row justify-start wp flex-nowrap">
				<span class="w-3 mr-1.5 font-bold text-center">W</span>
				<span class="mr-2"><a sveltekit:prefetch href={`/player/${wp.mlb_id}/pitching`}>{wpName}</a></span>
				<span>{getPitchingRecordForPlayer(wp.mlb_id)}</span>
			</div>
			<div class="flex flex-row justify-start lp flex-nowrap">
				<span class="w-3 mr-1.5 font-bold text-center">L</span>
				<span class="mr-2"><a sveltekit:prefetch href={`/player/${lp.mlb_id}/pitching`}>{lpName}</a></span>
				<span>{getPitchingRecordForPlayer(lp.mlb_id)}</span>
			</div>
			{#if sv}
				<div class="flex flex-row justify-start sv flex-nowrap">
					<span class="w-3 mr-1.5 font-bold text-center">S</span>
					<span class="mr-2"><a sveltekit:prefetch href={`/player/${sv.mlb_id}/pitching`}>{svName}</a></span>
					<span>{getTotalSavesForPlayer(sv.mlb_id)}</span>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.game-result {
		width: 150px;
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
		height: 58px;
	}

	@media screen and (min-width: 640px) {
		.game-result {
			width: 180px;
		}

		.game-result-bottom {
			height: 67px;
		}
	}

	@media screen and (min-width: 768px) {
		.game-result {
			width: 210px;
		}

		.game-result-bottom {
			height: 71px;
		}
	}

	@media screen and (min-width: 1024px) {
		.game-result {
			width: 230px;
		}

		.game-result-bottom {
			height: 78px;
		}
	}
</style>
