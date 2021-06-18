<script lang="ts">
	import type { TeamBatStats } from '$lib/api/types';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import { formatPercentStat, formatRateStat } from '$lib/util';
	import Datatable from '../../../../node_modules/svelte-simple-datatables/src/Datatable.svelte';
	import { rows } from '../../../../node_modules/svelte-simple-datatables/src/stores/data';

	const settings = {
		rowPerPage: 15,
		scrollY: false,
		pagination: true,
		columnFilter: false,
		blocks: {
			searchInput: false
		}
	};

	export let teamBatStats: TeamBatStats[];

	$: data =
		$seasonStatFilter.league === 'both'
			? Object.values<TeamBatStats>(teamBatStats).filter((t) => t.league === 'AL' || t.league === 'NL')
			: Object.values<TeamBatStats>(teamBatStats).filter((t) => t.league === $seasonStatFilter.league.toUpperCase());

</script>

<Datatable {settings} {data}>
	<thead>
		<tr>
			<th class="sortable asc desc" data-key="team_id_bbref">Team<span /></th>
			<th class="sortable asc desc" data-key="avg">AVG<span /></th>
			<th class="sortable asc desc" data-key="obp">OBP<span /></th>
			<th class="sortable asc desc" data-key="slg">SLG<span /></th>
			<th class="sortable asc desc" data-key="ops">OPS<span /></th>
			<th class="sortable asc desc" data-key="bb_rate">BB%<span /></th>
			<th class="sortable asc desc" data-key="k_rate">K%<span /></th>
			<th class="sortable asc desc" data-key="at_bats">AB<span /></th>
			<th class="sortable asc desc" data-key="hits">H<span /></th>
			<th class="sortable asc desc" data-key="runs_scored">R<span /></th>
			<th class="sortable asc desc" data-key="rbis">RBI<span /></th>
			<th class="sortable asc desc" data-key="bases_on_balls">BB<span /></th>
			<th class="sortable asc desc" data-key="strikeouts">K<span /></th>
			<th class="sortable asc desc" data-key="doubles">2B<span /></th>
			<th class="sortable asc desc" data-key="triples">3B<span /></th>
			<th class="sortable asc desc" data-key="homeruns">HR<span /></th>
			<th class="sortable asc desc" data-key="stolen_bases">SB<span /></th>
			<th class="sortable asc desc" data-key="caught_stealing">CS<span /></th>
			<th class="sortable asc desc" data-key="wpa_bat">WPA<span /></th>
			<th class="sortable asc desc" data-key="re24_bat">RE24<span /></th>
		</tr>
	</thead><tbody>
		{#each $rows as row}
			<tr>
				<td>{row.team_id_bbref}</td>
				<td>{formatRateStat(row.avg, 3)}</td>
				<td>{formatRateStat(row.obp, 3)}</td>
				<td>{formatRateStat(row.slg, 3)}</td>
				<td>{formatRateStat(row.ops, 3)}</td>
				<td>{formatPercentStat(row.bb_rate, 0)}</td>
				<td>{formatPercentStat(row.k_rate, 0)}</td>
				<td>{row.at_bats}</td>
				<td>{row.hits}</td>
				<td>{row.runs_scored}</td>
				<td>{row.rbis}</td>
				<td>{row.bases_on_balls}</td>
				<td>{row.strikeouts}</td>
				<td>{row.doubles}</td>
				<td>{row.triples}</td>
				<td>{row.homeruns}</td>
				<td>{row.stolen_bases}</td>
				<td>{row.caught_stealing}</td>
				<td>{formatRateStat(row.wpa_bat, 2)}</td>
				<td>{formatRateStat(row.re24_bat, 2)}</td>
			</tr>
		{/each}
	</tbody>
</Datatable>
