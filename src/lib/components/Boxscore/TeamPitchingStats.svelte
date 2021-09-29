<script lang="ts">
	import type { TeamData } from '$lib/api/types';
	import PitcherDetails from '$lib/components/Util/PitcherDetails.svelte';
	import PitcherStatLine from '$lib/components/Util/PitcherStatLine.svelte';

	export let teamData: TeamData;

	function getCaptionId() {
		return `${teamData.team_id.toLowerCase()}-pitching`;
	}
</script>

<div class="resp-table-caption">{teamData.team_name}</div>
<section class="resp-table-container">
	<div class="resp-table-wrapper mt-0">
		<div id={getCaptionId()} class="resp-table">
			<div class="resp-table-header col-header">
				<div class="table-header-cell align-left">Pitching</div>
				<div class="table-header-cell">IP</div>
				<div class="table-header-cell">H</div>
				<div class="table-header-cell">R</div>
				<div class="table-header-cell">ER</div>
				<div class="table-header-cell">BB</div>
				<div class="table-header-cell">K</div>
				<div class="table-header-cell">HR</div>
				<div class="table-header-cell">BF</div>
				<div class="table-header-cell">Pit</div>
				<div class="table-header-cell stat-line" />
			</div>
			<div class="resp-table-body">
				{#each teamData.pitching as pitchStats}
					<div class="at-bat resp-table-row">
						<div class="table-body-cell"><PitcherDetails {pitchStats} /></div>
						<div class="table-body-cell num-stat">{pitchStats.innings_pitched}</div>
						<div class="table-body-cell num-stat">{pitchStats.hits}</div>
						<div class="table-body-cell num-stat">{pitchStats.runs}</div>
						<div class="table-body-cell num-stat">{pitchStats.earned_runs}</div>
						<div class="table-body-cell num-stat">{pitchStats.bases_on_balls}</div>
						<div class="table-body-cell num-stat">{pitchStats.strikeouts}</div>
						<div class="table-body-cell num-stat">{pitchStats.homeruns}</div>
						<div class="table-body-cell num-stat">{pitchStats.batters_faced}</div>
						<div class="table-body-cell num-stat">{pitchStats.pitch_count}</div>
						<div class="table-body-cell">
							<PitcherStatLine {pitchStats} on:viewPitcherInningTotalsClicked />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
