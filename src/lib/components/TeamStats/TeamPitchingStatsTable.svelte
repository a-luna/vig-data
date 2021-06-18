<script lang="ts">
	import type { TeamPitchStats } from '$lib/api/types';
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

	export let teamPitchStats: TeamPitchStats[];

	$: data =
		teamPitchStats && $seasonStatFilter.league === 'both'
			? Object.values<TeamPitchStats>(teamPitchStats).filter((t) => t.league === 'AL' || t.league === 'NL')
			: Object.values<TeamPitchStats>(teamPitchStats).filter(
					(t) => t.league === $seasonStatFilter.league.toUpperCase()
			  );

</script>

<Datatable {settings} {data}>
	<thead>
		<tr>
			<th class="sortable asc desc" data-key="team_id_bbref">Team<span /></th>
			<th class="sortable asc desc" data-key="total_games" title="Total Games">G<span /></th>
			<th class="sortable asc desc" data-key="games_as_sp" title="Total Games as SP">GS<span /></th>
			<th class="sortable asc desc" data-key="games_as_rp" title="Total Games as RP">GR<span /></th>
			<th class="sortable asc desc" data-key="wins">W<span /></th>
			<th class="sortable asc desc" data-key="losses">L<span /></th>
			<th class="sortable asc desc" data-key="saves">SV<span /></th>
			<th class="sortable asc desc" data-key="innings_pitched">IP<span /></th>
			<th class="sortable asc desc" data-key="total_outs">Outs<span /></th>
			<th class="sortable asc desc" data-key="batters_faced">BF<span /></th>
			<th class="sortable asc desc" data-key="runs">R<span /></th>
			<th class="sortable asc desc" data-key="earned_runs">ER<span /></th>
			<th class="sortable asc desc" data-key="hits">H<span /></th>
			<th class="sortable asc desc" data-key="homeruns">HR<span /></th>
			<th class="sortable asc desc" data-key="strikeouts">K<span /></th>
			<th class="sortable asc desc" data-key="bases_on_balls">BB<span /></th>
			<th class="sortable asc desc" data-key="era">ERA<span /></th>
			<th class="sortable asc desc" data-key="whip">WHIP<span /></th>
			<th class="sortable asc desc" data-key="k_per_nine">K/9<span /></th>
			<th class="sortable asc desc" data-key="bb_per_nine">BB/9<span /></th>
			<th class="sortable asc desc" data-key="hr_per_nine">HR/9<span /></th>
			<th class="sortable asc desc" data-key="k_per_bb">K/BB<span /></th>
			<th class="sortable asc desc" data-key="k_rate">K%<span /></th>
			<th class="sortable asc desc" data-key="bb_rate">BB%<span /></th>
			<th class="sortable asc desc" data-key="k_minus_bb">K%-BB%<span /></th>
			<th class="sortable asc desc" data-key="hr_per_fb">HR/FB<span /></th>
			<th class="sortable asc desc" data-key="pitch_count" title="total pitches">Pit.<span /></th>
			<th class="sortable asc desc" data-key="strikes" title="total strikes"><span />Str.</th>
			<th class="sortable asc desc" data-key="strikes_contact" title="strikes (contact)">Str. Cn<span /></th>
			<th class="sortable asc desc" data-key="strikes_swinging" title="strikes (swinging)">Str. Sw<span /></th>
			<th class="sortable asc desc" data-key="strikes_looking" title="strikes (looking)">Str. Lk<span /></th>
			<th class="sortable asc desc" data-key="ground_balls">GB<span /></th>
			<th class="sortable asc desc" data-key="fly_balls">FB<span /></th>
			<th class="sortable asc desc" data-key="line_drives">LD<span /></th>
			<th class="sortable asc desc" data-key="unknown_type">Unk<span /></th>
			<th class="sortable asc desc" data-key="inherited_runners" title="inherited runners">IR<span /></th>
			<th class="sortable asc desc" data-key="inherited_scored" title="inherited runners (scored)">IR Scr<span /></th>
			<th class="sortable asc desc" data-key="wpa_pitch">WPA<span /></th>
			<th class="sortable asc desc" data-key="re24_pitch">RE24<span /></th>
		</tr>
	</thead><tbody>
		{#each $rows as row}
			<tr>
				<td>{row.team_id_bbref}</td>
				<td>{row.total_games}</td>
				<td>{row.games_as_sp}</td>
				<td>{row.games_as_rp}</td>
				<td>{row.wins}</td>
				<td>{row.losses}</td>
				<td>{row.saves}</td>
				<td>{formatRateStat(row.innings_pitched, 1)}</td>
				<td>{row.total_outs}</td>
				<td>{row.batters_faced}</td>
				<td>{row.runs}</td>
				<td>{row.earned_runs}</td>
				<td>{row.hits}</td>
				<td>{row.homeruns}</td>
				<td>{row.strikeouts}</td>
				<td>{row.bases_on_balls}</td>
				<td>{formatRateStat(row.era, 2)}</td>
				<td>{formatRateStat(row.whip, 2)}</td>
				<td>{formatRateStat(row.k_per_nine, 1)}</td>
				<td>{formatRateStat(row.bb_per_nine, 1)}</td>
				<td>{formatRateStat(row.hr_per_nine, 1)}</td>
				<td>{formatRateStat(row.k_per_bb, 1)}</td>
				<td>{formatPercentStat(row.k_rate, 0)}</td>
				<td>{formatPercentStat(row.bb_rate, 0)}</td>
				<td>{formatPercentStat(row.k_minus_bb, 0)}</td>
				<td>{formatRateStat(row.hr_per_fb, 1)}</td>
				<td>{row.pitch_count}</td>
				<td>{row.strikes}</td>
				<td>{row.strikes_contact}</td>
				<td>{row.strikes_swinging}</td>
				<td>{row.strikes_looking}</td>
				<td>{row.ground_balls}</td>
				<td>{row.fly_balls}</td>
				<td>{row.line_drives}</td>
				<td>{row.unknown_type}</td>
				<td>{row.inherited_runners}</td>
				<td>{row.inherited_scored}</td>
				<td>{formatRateStat(row.wpa_pitch, 2)}</td>
				<td>{formatRateStat(row.re24_pitch, 2)}</td>
			</tr>
		{/each}
	</tbody>
</Datatable>
