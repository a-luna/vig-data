<script lang="ts">
	import type { TeamData } from '$lib/api/types';
	import PitcherDetails from '$lib/components/Util/PitcherDetails.svelte';
	import PitcherStatLine from '$lib/components/Util/PitcherStatLine.svelte';

	export let teamData: TeamData;

	function getCaptionId() {
		return `${teamData.team_id.toLowerCase()}-pitching`;
	}
</script>

<div class="scrolling-wrapper">
	<div class="table-wrapper">
		<h4>{teamData.team_name}</h4>
		<table>
			<thead>
				<tr class="col-header">
					<th class="align-left">Pitching</th>
					<th>IP</th>
					<th>H</th>
					<th>R</th>
					<th>ER</th>
					<th>BB</th>
					<th>K</th>
					<th>HR</th>
					<th>BF</th>
					<th>Pit</th>
					<th class="stat-line" />
				</tr>
			</thead>
			<tbody>
				{#each teamData.pitching as pitchStats}
					<tr>
						<td>
							<PitcherDetails {pitchStats} />
						</td>
						<td class="num-stat">{pitchStats.innings_pitched}</td>
						<td class="num-stat">{pitchStats.hits}</td>
						<td class="num-stat">{pitchStats.runs}</td>
						<td class="num-stat">{pitchStats.earned_runs}</td>
						<td class="num-stat">{pitchStats.bases_on_balls}</td>
						<td class="num-stat">{pitchStats.strikeouts}</td>
						<td class="num-stat">{pitchStats.homeruns}</td>
						<td class="num-stat">{pitchStats.batters_faced}</td>
						<td class="num-stat">{pitchStats.pitch_count}</td>
						<td>
							<PitcherStatLine {pitchStats} on:viewPitcherInningTotalsClicked />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
