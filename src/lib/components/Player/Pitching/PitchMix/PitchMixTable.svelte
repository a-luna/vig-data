<script lang="ts">
	import type { PitchFxMetrics } from '$lib/api/types';
	import { getPitchTypeNameFromInt } from '$lib/util/gameData';
	import MdLens from 'svelte-icons/md/MdLens.svelte';

	export let pitchTypeMetrics: { [key: string]: PitchFxMetrics };
	export let playerSeason: 'career' | number;
	let metrics: PitchFxMetrics[];

	$: {
		metrics = Object.values(pitchTypeMetrics);
		metrics.sort((a, b) => b.percent - a.percent);
	}

	$: tableCaption = playerSeason === 'career' ? 'Career' : playerSeason;
</script>

<div class="resp-table-container">
	<div class="resp-table-wrapper">
		<div class="resp-table">
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
								<div class="my-auto mr-2 icon" style="color: var(--pitch-type-{pitchTypeMetrics.pitch_type})">
									<MdLens />
								</div>
								{getPitchTypeNameFromInt(pitchTypeMetrics.pitch_type_int)}
							</div>
						</div>
						<div class="text-right table-body-cell">{pitchTypeMetrics.total_pitches}</div>
						<div class="text-right table-body-cell">{(pitchTypeMetrics.percent * 100).toFixed(0)}</div>
						<div class="text-right table-body-cell">{pitchTypeMetrics.avg_speed.toFixed(1)}</div>
						<div class="text-right table-body-cell">{pitchTypeMetrics.avg_pfx_x.toFixed(2)}</div>
						<div class="text-right table-body-cell">{pitchTypeMetrics.avg_pfx_z.toFixed(2)}</div>
						<div class="text-right table-body-cell">{pitchTypeMetrics.avg_px.toFixed(2)}</div>
						<div class="text-right table-body-cell">{pitchTypeMetrics.avg_pz.toFixed(2)}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.icon {
		height: 8px;
		width: 8px;
	}
</style>
