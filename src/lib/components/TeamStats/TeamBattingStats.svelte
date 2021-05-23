<script lang="ts">
	import type { TeamBatStats } from '$lib/api/types';
	import { Datatable, rows } from 'svelte-simple-datatables';
	const settings = {
		rowPerPage: 10,
		scrollY: false,
		pagination: false,
		columnFilter: false,
		blocks: {
			searchInput: false,
			paginationButtons: false,
			paginationRowCount: false
		}
	};
	// import DataTable from '@fouita/data-table';

	export let selectedLeague: 'al' | 'nl' | 'both' = 'al';
	export let teamBatStats: TeamBatStats[];

	$: data = Object.values(teamBatStats).filter((t) => t.league === selectedLeague.toUpperCase());

	// const head = {
	// 	team_id_bbref: 'Team',
	// 	avg: 'AVG',
	// 	obp: 'OBP',
	// 	slg: 'SLG',
	// 	ops: 'OPS',
	// 	bb_rate: 'BB%',
	// 	k_rate: 'K%',
	// 	hits: 'H',
	// 	runs_scored: 'R',
	// 	rbis: 'RBI',
	// 	bases_on_balls: 'BB',
	// 	strikeouts: 'K',
	// 	doubles: '2B',
	// 	triples: '3B',
	// 	homeruns: 'HR',
	// 	stolen_bases: 'SB',
	// 	caught_stealing: 'CS'
	// };

</script>

<!-- <DataTable {head} rows={data} hover stripped /> -->

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
		</tr>
	</thead><tbody>
		{#each $rows as row}
			<tr>
				<td>{row.team_id_bbref}</td>
				<td>{row.avg}</td>
				<td>{row.obp}</td>
				<td>{row.slg}</td>
				<td>{row.ops}</td>
				<td>{row.bb_rate}</td>
				<td>{row.k_rate}</td>
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
			</tr>
		{/each}
	</tbody>
</Datatable>

<style lang="postcss">
	th:first-child {
		width: 72px;
	}
	th {
		padding: 8px 0px 8px 16px;
		text-align: center;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	th.sortable {
		cursor: pointer;
	}
	th.sortable span {
		padding-right: 16px;
		position: relative;
	}
	th.sortable span:before,
	th.sortable span:after {
		border: 4px solid transparent;
		content: '';
		display: block;
		height: 0;
		right: 0;
		top: 50%;
		position: absolute;
		width: 0;
	}
	th.sortable span:before {
		border-bottom-color: #e0e0e0;
		margin-top: -9px;
	}
	th.sortable span:after {
		border-top-color: #e0e0e0;
		margin-top: 1px;
	}
	th.sortable.asc:not(.desc) span:before {
		border-bottom-color: #9e9e9e;
	}
	th.sortable.desc:not(.asc) span:after {
		border-top-color: #9e9e9e;
	}
	td {
		text-align: center;
		padding: 4px 0;
	}

</style>
