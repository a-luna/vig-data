<script lang="ts">
	import type { TeamPitchStats } from '$lib/api/types';
	import { formatPercentStat } from '$lib/util';

	export let teamPitchStats: TeamPitchStats[];
	export let backgroundColorRule: string;
	export let startRow: number;
	export let endRow: number;
</script>

<section class="datatable" style={backgroundColorRule}>
	<article class="dt-table mb-2" style="overflow-x: auto">
		<div class="resp-table w-full text-sm leading-5">
			<div class="resp-table-header col-header text-center">
				<div class="table-header-cell">Player</div>
				<div class="table-header-cell" title="Total Games">G</div>
				<div class="table-header-cell" title="Total Games as SP">GS</div>
				<div class="table-header-cell" title="Total Games as RP">GR</div>
				<div class="table-header-cell">W</div>
				<div class="table-header-cell">L</div>
				<div class="table-header-cell">SV</div>
				<div class="table-header-cell">IP</div>
				<div class="table-header-cell">Outs</div>
				<div class="table-header-cell">BF</div>
				<div class="table-header-cell">R</div>
				<div class="table-header-cell">ER</div>
				<div class="table-header-cell">H</div>
				<div class="table-header-cell">HR</div>
				<div class="table-header-cell">K</div>
				<div class="table-header-cell">BB</div>
				<div class="table-header-cell">ERA</div>
				<div class="table-header-cell">WHIP</div>
				<div class="table-header-cell">K/9</div>
				<div class="table-header-cell">BB/9</div>
				<div class="table-header-cell">HR/9</div>
				<div class="table-header-cell">K/BB</div>
				<div class="table-header-cell">K%</div>
				<div class="table-header-cell">BB%</div>
				<div class="table-header-cell">K%-BB%</div>
				<div class="table-header-cell">HR/FB</div>
				<div class="table-header-cell" title="total pitches">Pit.</div>
				<div class="table-header-cell" title="total strikes">Str.</div>
				<div class="table-header-cell" title="strikes (contact)">Str. Cn</div>
				<div class="table-header-cell" title="strikes (swinging)">Str. Sw</div>
				<div class="table-header-cell" title="strikes (looking)">Str. Lk</div>
				<div class="table-header-cell">LD</div>
				<div class="table-header-cell">GB</div>
				<div class="table-header-cell">FB</div>
				<div class="table-header-cell">Unk</div>
				<div class="table-header-cell" title="inherited runners">IR</div>
				<div class="table-header-cell" title="inherited runners (scored)">IR Scr</div>
				<div class="table-header-cell">WPA</div>
				<div class="table-header-cell">RE24</div>
			</div>
			<div class="resp-table-body">
				{#each teamPitchStats.slice(startRow, endRow) as stats}
					<div class="resp-table-row text-right">
						<div class="table-body-cell text-center">
							<a sveltekit:prefetch href="/player/{stats.mlb_id}/pitching">{stats.player_name}</a>
						</div>
						<div class="table-body-cell">{stats.total_games}</div>
						<div class="table-body-cell">{stats.games_as_sp}</div>
						<div class="table-body-cell">{stats.games_as_rp}</div>
						<div class="table-body-cell">{stats.wins}</div>
						<div class="table-body-cell">{stats.losses}</div>
						<div class="table-body-cell">{stats.saves}</div>
						<div class="table-body-cell">{stats.innings_pitched.toFixed(1)}</div>
						<div class="table-body-cell">{stats.total_outs}</div>
						<div class="table-body-cell">{stats.batters_faced}</div>
						<div class="table-body-cell">{stats.runs}</div>
						<div class="table-body-cell">{stats.earned_runs}</div>
						<div class="table-body-cell">{stats.hits}</div>
						<div class="table-body-cell">{stats.homeruns}</div>
						<div class="table-body-cell">{stats.strikeouts}</div>
						<div class="table-body-cell">{stats.bases_on_balls}</div>
						<div class="table-body-cell">{stats.era.toFixed(2)}</div>
						<div class="table-body-cell">{stats.whip.toFixed(2)}</div>
						<div class="table-body-cell">{stats.k_per_nine.toFixed(1)}</div>
						<div class="table-body-cell">{stats.bb_per_nine.toFixed(1)}</div>
						<div class="table-body-cell">{stats.hr_per_nine.toFixed(1)}</div>
						<div class="table-body-cell">{stats.k_per_bb.toFixed(1)}</div>
						<div class="table-body-cell">{formatPercentStat(stats.k_rate.toString(), 0)}</div>
						<div class="table-body-cell">{formatPercentStat(stats.bb_rate.toString(), 0)}</div>
						<div class="table-body-cell">{formatPercentStat(stats.k_minus_bb.toString(), 0)}</div>
						<div class="table-body-cell">{stats.hr_per_fb.toFixed(1)}</div>
						<div class="table-body-cell">{stats.pitch_count}</div>
						<div class="table-body-cell">{stats.strikes}</div>
						<div class="table-body-cell">{stats.strikes_contact}</div>
						<div class="table-body-cell">{stats.strikes_swinging}</div>
						<div class="table-body-cell">{stats.strikes_looking}</div>
						<div class="table-body-cell">{stats.line_drives}</div>
						<div class="table-body-cell">{stats.ground_balls}</div>
						<div class="table-body-cell">{stats.fly_balls}</div>
						<div class="table-body-cell">{stats.unknown_type}</div>
						<div class="table-body-cell">{stats.inherited_runners}</div>
						<div class="table-body-cell">{stats.inherited_scored}</div>
						<div class="table-body-cell">{stats.wpa_pitch.toFixed(2)}</div>
						<div class="table-body-cell">{stats.re24_pitch.toFixed(2)}</div>
					</div>
				{/each}
			</div>
		</div>
	</article>
</section>
