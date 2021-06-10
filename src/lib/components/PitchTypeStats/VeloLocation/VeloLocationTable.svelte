<script lang="ts">
	import type { PfxPitchingMetrics, PitchType } from '$lib/api/types';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';
	import MdLens from 'svelte-icons/md/MdLens.svelte';

	export let pitchTypeMetrics: Record<PitchType, PfxPitchingMetrics>;
	export let playerSeason: 'career' | number;
	let metrics: PfxPitchingMetrics[];

	$: {
		metrics = Object.values(pitchTypeMetrics);
		metrics.sort((a, b) => b.percent - a.percent);
	}

	$: tableCaption = playerSeason === 'career' ? 'Career' : playerSeason;

</script>

<div class="mb-8 responsive">
	<div class="resp-table">
		<div class="resp-table-caption">{tableCaption}</div>
		<div class="resp-table-header col-header">
			<div class="table-header-cell">Pitch Type</div>
			<div class="table-header-cell">Count</div>
			<div class="table-header-cell">%</div>
			<div class="table-header-cell">Speed</div>
			<div class="table-header-cell">H-Mov</div>
			<div class="table-header-cell">V-Mov</div>
			<div class="table-header-cell">H-Loc</div>
			<div class="table-header-cell">V-Loc</div>
		</div>
		<div class="resp-table-body">
			{#each metrics as pitchTypeMetrics}
				<div class="resp-table-row">
					<div class="font-bold table-body-cell">
						<div class="flex">
							<div
								class="my-auto mr-2 icon"
								style="color: var(--pitch-type-{pitchTypeMetrics.pitch_type})"
							>
								<MdLens />
							</div>
							{PITCH_TYPE_ABBREV_TO_NAME_MAP[pitchTypeMetrics.pitch_type]}
						</div>
					</div>
					<div class="table-body-cell">{pitchTypeMetrics.total_pitches}</div>
					<div class="table-body-cell">{(pitchTypeMetrics.percent * 100).toFixed(0)}</div>
					<div class="table-body-cell">{pitchTypeMetrics.avg_speed.toFixed(1)}</div>
					<div class="table-body-cell">{pitchTypeMetrics.avg_pfx_x.toFixed(2)}</div>
					<div class="table-body-cell">{pitchTypeMetrics.avg_pfx_z.toFixed(2)}</div>
					<div class="table-body-cell">{pitchTypeMetrics.avg_px.toFixed(2)}</div>
					<div class="table-body-cell">{pitchTypeMetrics.avg_pz.toFixed(2)}</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	:global(#pfx-pitcher-stats) .resp-table {
		width: auto;
		margin: 0 auto;
	}

	:global(#pfx-pitcher-stats) .resp-table-caption {
		font-size: 1.5rem;
	}

	.icon {
		height: 8px;
		width: 8px;
	}

	@media screen and (min-width: 550px) {
		:global(#pfx-pitcher-stats) .resp-table {
			width: 90%;
		}
	}

	@media screen and (min-width: 768px) {
		:global(#pfx-pitcher-stats) .resp-table {
			width: 70%;
			max-width: 700px;
		}
	}

</style>
