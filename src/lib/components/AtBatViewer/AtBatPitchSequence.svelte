<script lang="ts">
	import type { AtBatDetails, AtBatPitchDescription } from '$lib/api/types';
	import FlexStrings from '$lib/components/Util/FlexStrings.svelte';
	import { PITCH_SPEED_TYPE_REGEX } from '$lib/regex';
	import { formatAtBatResult, getPitchTypeAbbrevFromName } from '$lib/util';
	import FaRocket from 'svelte-icons/fa/FaRocket.svelte';
	import MdBlock from 'svelte-icons/md/MdBlock.svelte';
	import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte';

	export let selectedAtBat: AtBatDetails;
	export let pitchSequence: AtBatPitchDescription[];
	let anyPitchBlocked: boolean;
	let anyPitchOutOfBoundary: boolean;
	let anyPitchBarreled: boolean;

	$: if (pitchSequence) anyPitchBlocked = pitchSequence.some((p) => p.blocked_by_c);
	$: if (pitchSequence) anyPitchOutOfBoundary = pitchSequence.some((p) => p.out_of_boundary);
	$: if (pitchSequence) anyPitchBarreled = pitchSequence.some((p) => p.barreled);

	function formatRunsOutsResult(runs_outs_result: string): string {
		const runs_count = runs_outs_result.replace(/[^R]/g, '').length;
		return runs_count === 0 ? '' : runs_count === 1 ? `${runs_count} Run Scored` : `${runs_count} Runs Scored`;
	}

	function getPitchSpeed(pitch_description: string): string {
		if (pitch_description.length > 0) {
			const match = PITCH_SPEED_TYPE_REGEX.exec(pitch_description);
			if (match) {
				return match.groups.pitch_speed;
			}
		}
	}

	function getPitchType(pitch_description: string): string {
		if (pitch_description.length > 0) {
			const match = PITCH_SPEED_TYPE_REGEX.exec(pitch_description);
			if (match) {
				return match.groups.pitch_type;
			}
		}
	}
</script>

{#if pitchSequence !== undefined}
	<div class="at-bat-pitch-sequence responsive-vert">
		<table class="m-0 w-min">
			<tbody>
				{#each pitchSequence as { number, description, type, blocked_by_c, out_of_boundary, barreled, non_pitch_event }}
					<tr>
						{#if non_pitch_event}
							<td colspan="4" class="text-xs italic non-pitch-event">
								{description}
							</td>
						{:else}
							<td class="pitch-number">{number}</td>
							<td class="pitch-description" data-pitch-type={getPitchTypeAbbrevFromName(getPitchType(type))}>
								<div class="flex flex-row justify-start flex-nowrap">
									<span class="ml-1">
										{description}
									</span>
									{#if blocked_by_c}
										<div class="ml-1 icon">
											<MdBlock />
										</div>
									{/if}
									{#if out_of_boundary}
										<div class="ml-1 icon">
											<MdErrorOutline />
										</div>
									{/if}
									{#if barreled}
										<div class="ml-1 icon">
											<FaRocket />
										</div>
									{/if}
								</div>
							</td>
							<td class="pitch-speed" data-pitch-type={getPitchTypeAbbrevFromName(getPitchType(type))}>
								{getPitchSpeed(type)}
							</td>
							<td class="pitch-type" data-pitch-type={getPitchTypeAbbrevFromName(getPitchType(type))}>
								{getPitchType(type)}
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{#if anyPitchBlocked}
		<div class="flex flex-row items-baseline justify-start gap-1 p-3 legend flex-nowrap">
			<div class="icon-small">
				<MdBlock />
			</div>
			<span class="text-xs italic">Pitch was blocked by catcher</span>
		</div>
	{/if}
	{#if anyPitchOutOfBoundary}
		<div class="flex flex-row items-baseline justify-start gap-1 p-3 legend flex-nowrap">
			<div class="icon-small">
				<MdErrorOutline />
			</div>
			<span class="text-xs italic">Pitch location is beyond the boundaries of this graph</span>
		</div>
	{/if}
	{#if anyPitchBarreled}
		<div class="flex flex-row items-baseline justify-start gap-1 p-3 legend flex-nowrap">
			<div class="icon-small">
				<FaRocket />
			</div>
			<span class="text-xs italic">
				Batted ball is classified as a <a href="https://www.mlb.com/glossary/statcast/barrel" target="_blank">barrel</a>
			</span>
		</div>
	{/if}
	<div class="text-sm text-center play_description py-0.5">
		<FlexStrings
			stringArray={formatAtBatResult(selectedAtBat.play_description)}
			runsScored={formatRunsOutsResult(selectedAtBat.runs_outs_result)}
		/>
	</div>
{/if}

<style lang="postcss">
	table tbody tr {
		background-color: var(--ploc-chart-bg-color);
	}
	table tbody tr td {
		background-color: var(--ploc-chart-bg-color);
		border-color: var(--ploc-chart-bg-color);
		line-height: 1.3;
		border: none;
		padding: 3px 5px;
	}

	.at-bat-pitch-sequence {
		@apply flex flex-col flex-nowrap justify-between flex-grow px-2;
		background-color: var(--ploc-chart-bg-color);
		height: min-content;
		border-right: 1px solid var(--pseq-outer-border-color);
		border-left: 1px solid var(--pseq-outer-border-color);
	}

	.icon {
		color: var(--sec-color);
		width: 14px;
		height: 14px;
		margin: auto 0 auto 3px;
	}

	.icon-small {
		color: var(--sec-color);
		width: 12px;
		height: 12px;
		margin: 0 2px;
	}

	:global(.at-bat-result) {
		font-weight: 700;
	}

	.pitch-description,
	.non-pitch-event {
		padding: 3px 5px 3px 0;
	}

	.non-pitch-event {
		color: var(--body-text-color);
		white-space: normal;
	}

	.pitch-number {
		font-weight: 500;
		color: var(--ploc-pitch-num-color);
	}

	.legend {
		font-weight: var(--pseq-legend-font-weight);
		background-color: var(--pseq-legend-bg-color);
		color: var(--pseq-legend-text-color);
		border-right: 1px solid var(--pseq-outer-border-color);
		border-left: 1px solid var(--pseq-outer-border-color);
		padding: 3px 2px;
		line-height: 1;
	}

	.legend a {
		color: var(--pri-color);
	}

	.play_description {
		color: var(--body-text-color);
		background-color: var(--pseq-bottom-bg-color);
		border: 1px solid var(--pseq-outer-border-color);
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}
</style>
