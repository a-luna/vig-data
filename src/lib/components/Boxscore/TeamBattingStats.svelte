<script lang="ts">
	import type { TeamData } from '$lib/api/types';
	import BatterDetails from '$lib/components/Util/BatterDetails.svelte';
	import BatterStatLine from '$lib/components/Util/BatterStatLine.svelte';

	export let teamData: TeamData;

	function statFormat(stat: number): string {
		const statFormatted = stat.toFixed(3);
		return parseInt(statFormatted.slice(0, 1)) == 0 ? statFormatted.slice(1) : statFormatted;
	}

	function getCaptionId() {
		return `${teamData.team_id.toLowerCase()}-batting`;
	}
</script>

<div class="scrolling-wrapper">
	<div class="table-wrapper">
		<h4>{teamData.team_name}</h4>
		<table>
			<thead>
				<tr class="col-header">
					<th class="align-left">Batting</th>
					<th>AB</th>
					<th>H</th>
					<th>R</th>
					<th>RBI</th>
					<th>BB</th>
					<th>K</th>
					<th>PA</th>
					<th>AVG</th>
					<th>OBP</th>
					<th>SLG</th>
					<th>OPS</th>
					<th class="stat-line" />
				</tr>
			</thead>
			<tbody>
				{#each teamData.batting as batStats}
					<tr>
						<td>
							<BatterDetails {batStats} />
						</td>
						<td class="num-stat">{batStats.at_bats}</td>
						<td class="num-stat">{batStats.hits}</td>
						<td class="num-stat">{batStats.runs_scored}</td>
						<td class="num-stat">{batStats.rbis}</td>
						<td class="num-stat">{batStats.bases_on_balls}</td>
						<td class="num-stat">{batStats.strikeouts}</td>
						<td class="num-stat">{batStats.plate_appearances}</td>
						<td class="num-stat">{statFormat(batStats.avg_to_date)}</td>
						<td class="num-stat">{statFormat(batStats.obp_to_date)}</td>
						<td class="num-stat">{statFormat(batStats.slg_to_date)}</td>
						<td class="num-stat">{statFormat(batStats.ops_to_date)}</td>
						<td>
							<BatterStatLine {batStats} on:viewAtBatResultsClicked />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
