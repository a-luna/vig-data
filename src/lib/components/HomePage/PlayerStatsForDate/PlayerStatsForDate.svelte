<script lang="ts">
	import type { PlayerBatStats, PlayerPitchStats } from '$lib/api/types';
	import BatStatsForDate from '$lib/components/HomePage/PlayerStatsForDate/BatStatsForDate.svelte';
	import PitchStatsForDate from '$lib/components/HomePage/PlayerStatsForDate/PitchStatsForDate.svelte';
	import PageSection from '$lib/components/Util/PageSection.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';

	export let pitchStats: PlayerPitchStats[] = [];
	export let batStats: PlayerBatStats[] = [];
	const tableIdSuffix = $pageBreakPoints.isDefault ? '-mobile' : '';
</script>

<PageSection>
	<PitchStatsForDate
		pitchStats={pitchStats.filter((p) => p.is_sp == 1)}
		sortBy={'game_score'}
		tableId={`sp-stats${tableIdSuffix}`}
	/>
	<PitchStatsForDate
		pitchStats={pitchStats.filter((p) => p.is_rp == 1)}
		sortBy={'wpa_pitch'}
		tableId={`rp-stats${tableIdSuffix}`}
	/>
	<BatStatsForDate {batStats} sortBy={'total_bases'} tableId={`all-bat-stats${tableIdSuffix}`} />
</PageSection>
