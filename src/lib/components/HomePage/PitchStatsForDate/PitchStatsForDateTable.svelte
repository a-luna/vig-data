<script lang="ts">
	import type { PlayerPitchStats } from '$lib/api/types';
	import { syncWidth } from '$lib/stores/elementWidth';
	import { formatRateStat, getHomeTeamIdFromGameId } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let pitchStats: PlayerPitchStats[] = [];
	export let startRow: number;
	export let endRow: number;
	export let tableId: string = '';
	export let tableCaption: string = '';
	export let tableWidth: number;
	const dispatch = createEventDispatcher();
	let tableElement: HTMLElement;

	$: widthStore = syncWidth(tableElement);
	$: tableWidth = $widthStore;

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

<div class="responsive p-2 mt-0">
	<div id={tableId} class="text-sm leading-5 resp-table table" bind:this={tableElement}>
		<div class="resp-table-caption" style="font-size: 1rem">{tableCaption}</div>
		<div class="text-center resp-table-header col-header">
			<div class="table-header-cell" data-stat-name="player_name">Player</div>
			<div class="table-header-cell" data-stat-name="opponent_team_id_bbref">Opp</div>
			<div class="table-header-cell" data-stat-name="summary_stat_line">Stat Line</div>
			<div
				class="table-header-cell cursor-pointer hover:underline"
				data-stat-name="strikes_swinging"
				title="Strikes (Swinging)"
				on:click={() => dispatch('sortTable', 'hits')}
			>
				H
			</div>
			<div
				class="table-header-cell cursor-pointer hover:underline"
				data-stat-name="strikes_swinging"
				title="Strikes (Swinging)"
				on:click={() => dispatch('sortTable', 'bases_on_balls')}
			>
				BB
			</div>
			<div
				class="table-header-cell cursor-pointer hover:underline"
				data-stat-name="strikes_swinging"
				title="Strikes (Swinging)"
				on:click={() => dispatch('sortTable', 'strikeouts')}
			>
				K
			</div>
			<div
				class="table-header-cell cursor-pointer hover:underline"
				data-stat-name="strikes_swinging"
				title="Strikes (Swinging)"
				on:click={() => dispatch('sortTable', 'strikes_swinging')}
			>
				StS
			</div>
			<div
				class="table-header-cell cursor-pointer hover:underline"
				data-stat-name="csw"
				title="Called Strikes + Swinging"
				on:click={() => dispatch('sortTable', 'csw')}
			>
				CSW
			</div>
			<div
				class="table-header-cell cursor-pointer hover:underline"
				data-stat-name="game_score"
				title="Game Score"
				on:click={() => dispatch('sortTable', 'game_score')}
			>
				GS
			</div>
			<div
				class="table-header-cell cursor-pointer hover:underline"
				data-stat-name="wpa_pitch"
				title="Win Probability Added by Pitcher"
				on:click={() => dispatch('sortTable', 'wpa_pitch')}
			>
				WPA
			</div>
			<div
				class="table-header-cell cursor-pointer hover:underline"
				data-stat-name="re24_pitch"
				title="Run Expectancy Based on 24 Base Outs"
				on:click={() => dispatch('sortTable', 're24_pitch')}
			>
				RE24
			</div>
		</div>
		<div class="resp-table-body">
			{#each pitchStats.slice(startRow, endRow) as p}
				<div class="text-right resp-table-row">
					<div class="text-center table-body-cell" data-stat-name="player_name">
						<a sveltekit:prefetch href="/player/{p.player_id_mlb}/pitching">{p.player_name}</a>
					</div>
					<div class="text-center table-body-cell" data-stat-name="opponent_team_id_bbref">
						<a sveltekit:prefetch href="/game?id={p.bbref_game_id}&show=box">{getOppTeamId(p)}</a>
					</div>
					<div class="table-body-cell" data-stat-name="innings_pitched">{p.summary_stat_line}</div>
					<div class="table-body-cell" data-stat-name="csw">{p.hits}</div>
					<div class="table-body-cell" data-stat-name="csw">{p.bases_on_balls}</div>
					<div class="table-body-cell" data-stat-name="csw">{p.strikeouts}</div>
					<div class="table-body-cell" data-stat-name="strikes_swinging">{p.strikes_swinging}</div>
					<div class="table-body-cell" data-stat-name="csw">{p.csw}</div>
					<div class="table-body-cell" data-stat-name="game_score">{p.game_score}</div>
					<div class="table-body-cell" data-stat-name="wpa_pitch">{formatRateStat(p.wpa_pitch.toString(), 2)}</div>
					<div class="table-body-cell" data-stat-name="re24_pitch">{p.re24_pitch}</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	:global(.highlight-stat) {
		background-color: var(--sec-color-hov);
	}

	.table-header-cell,
	.table-body-cell {
		padding: 2px 4px;
	}
</style>
