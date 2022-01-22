<script lang="ts">
	import type { GameData, PitchFx, PlayerBatStats, PlayerPitchStats, SeasonData } from '$lib/api/types';
	import PlayerStatsForDate from '$lib/components/HomePage/PlayerStatsForDate/PlayerStatsForDate.svelte';
	import ScoreboardForDate from '$lib/components/HomePage/ScoreboardForDate/ScoreboardForDate.svelte';
	import StandingsForDate from '$lib/components/HomePage/StandingsForDate/StandingsForDate.svelte';

	export let games_for_date: GameData[];
	export let pitchStats: PlayerPitchStats[] = [];
	export let batStats: PlayerBatStats[] = [];
	export let pfxBarrels: PitchFx[] = [];
	export let seasonStandings: SeasonData;
</script>

<div class="flex flex-col justify-center gap-10 m-0 flex-nowrap">
	<ScoreboardForDate {games_for_date} {pitchStats} />
	<div class="flex flex-row justify-center gap-3 flex-nowrap">
		<StandingsForDate {seasonStandings} />
		<PlayerStatsForDate {pitchStats} {batStats} {pfxBarrels} />
	</div>
</div>
