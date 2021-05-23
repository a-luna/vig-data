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

<div class="resp-table-caption">{teamData.team_name}</div>
<div class="responsive mt-0">
	<div id={getCaptionId()} class="resp-table">
		<div class="resp-table-header col-header">
			<div class="table-header-cell align-left">Batting</div>
			<div class="table-header-cell">AB</div>
			<div class="table-header-cell">H</div>
			<div class="table-header-cell">R</div>
			<div class="table-header-cell">RBI</div>
			<div class="table-header-cell">BB</div>
			<div class="table-header-cell">K</div>
			<div class="table-header-cell">PA</div>
			<div class="table-header-cell">AVG</div>
			<div class="table-header-cell">OBP</div>
			<div class="table-header-cell">SLG</div>
			<div class="table-header-cell">OPS</div>
			<div class="table-header-cell stat-line" />
		</div>
		<div class="resp-table-body">
			{#each teamData.batting as batStats}
				<div class="at-bat resp-table-row">
					<div class="table-body-cell"><BatterDetails {batStats} /></div>
					<div class="table-body-cell num-stat">{batStats.at_bats}</div>
					<div class="table-body-cell num-stat">{batStats.hits}</div>
					<div class="table-body-cell num-stat">{batStats.runs_scored}</div>
					<div class="table-body-cell num-stat">{batStats.rbis}</div>
					<div class="table-body-cell num-stat">{batStats.bases_on_balls}</div>
					<div class="table-body-cell num-stat">{batStats.strikeouts}</div>
					<div class="table-body-cell num-stat">{batStats.plate_appearances}</div>
					<div class="table-body-cell num-stat">{statFormat(batStats.avg_to_date)}</div>
					<div class="table-body-cell num-stat">{statFormat(batStats.obp_to_date)}</div>
					<div class="table-body-cell num-stat">{statFormat(batStats.slg_to_date)}</div>
					<div class="table-body-cell num-stat">{statFormat(batStats.ops_to_date)}</div>
					<div class=" stat-line table-body-cell">
						<BatterStatLine {batStats} on:viewAtBatResultsClicked />
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
