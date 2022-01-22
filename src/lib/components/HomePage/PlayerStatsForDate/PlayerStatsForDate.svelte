<script lang="ts">
	import type { PitchFx, PlayerBatStats, PlayerPitchStats } from '$lib/api/types';
	import BarrelsForDate from '$lib/components/HomePage/PlayerStatsForDate/BarrelsForDate/BarrelsForDate.svelte';
	import BatStatsForDate from '$lib/components/HomePage/PlayerStatsForDate/BatStatsForDate/BatStatsForDate.svelte';
	import PitchStatsForDate from '$lib/components/HomePage/PlayerStatsForDate/PitchStatsForDate/PitchStatsForDate.svelte';
	import PageSection from '$lib/components/Util/PageSection.svelte';

	export let pitchStats: PlayerPitchStats[] = [];
	export let batStats: PlayerBatStats[] = [];
	export let pfxBarrels: PitchFx[] = [];
</script>

<PageSection id={'player-stats-for-date'}>
	<PitchStatsForDate
		pitchStats={pitchStats.filter((p) => p.is_sp == 1)}
		tableHeading={'Starting Pitcher Stats'}
		tableId={`sp-stats`}
		sortBy={'game_score'}
	/>
	<PitchStatsForDate
		pitchStats={pitchStats.filter((p) => p.is_rp == 1)}
		tableHeading={'Relief Pitcher Stats'}
		tableId={`rp-stats`}
		sortBy={'wpa_pitch'}
	/>
	<BatStatsForDate {batStats} tableHeading={'Batting Stats'} tableId={`all-bat-stats`} sortBy={'total_bases'} />
	<BarrelsForDate {pfxBarrels} tableHeading={'Barrels'} tableId={'all-barrels'} sortBy={'launch_speed'} />
</PageSection>
