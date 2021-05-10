<script lang="ts">
	import type { AtBatDetails, AtBatPitchDescription } from '$lib/api/types';
	import { PITCH_SEQ_NUMS_REGEX, PITCH_SPEED_TYPE_REGEX } from '$lib/regex';
	import { formatAtBatResult, getPitchTypeAbbrevFromName } from '$lib/util';
	import FlexStrings from '$lib/components/Util/FlexStrings.svelte';
	import MdInfo from 'svelte-icons/md/MdInfo.svelte';

	export let at_bat: AtBatDetails;
	let pitch_sequence: AtBatPitchDescription[];
	let anyPitchBlocked: boolean;

	const pitchBlocked = (pitchDescription) =>
		pitchDescription.includes('pitch was blocked by catcher');

	function formatPitchDescription(pitch_des: string[]): AtBatPitchDescription {
		let atBatPitchDescription: AtBatPitchDescription = {
			pitch_number: '',
			description: '',
			pitch_type: '',
			blocked_by_c: false,
			non_pitch_event: false
		};
		if (pitch_des.length === 3) {
			const match = PITCH_SEQ_NUMS_REGEX.exec(pitch_des[0]);
			const pitch_number = match ? match.groups.num : '';
			atBatPitchDescription.pitch_number = pitch_number;
			atBatPitchDescription.description = pitch_des[1];
			atBatPitchDescription.pitch_type = pitch_des[2];
			atBatPitchDescription.non_pitch_event = pitch_number === '';

			if (pitchBlocked(atBatPitchDescription.description)) {
				atBatPitchDescription.description = atBatPitchDescription.description.split('\n')[0];
				atBatPitchDescription.blocked_by_c = true;
				anyPitchBlocked = true;
			}
		}
		return atBatPitchDescription;
	}

	function formatRunsOutsResult(runs_outs_result: string): string {
		const runs_count = runs_outs_result.replace(/[^R]/g, '').length;
		return runs_count === 0
			? ''
			: runs_count === 1
			? `${runs_count} Run Scored`
			: `${runs_count} Runs Scored`;
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

	$: if (at_bat) {
		anyPitchBlocked = false;
		pitch_sequence = at_bat.pitch_sequence_description.map((p) => formatPitchDescription(p));
		pitch_sequence = pitch_sequence.slice(0, -1);
		console.log(`anyPitchBlocked=${anyPitchBlocked}`);
	}
</script>

{#if pitch_sequence !== undefined}
	<div class="at-bat-pitch-sequence responsive-vert">
		<table class="m-0 w-min">
			<tbody>
				{#each pitch_sequence as { pitch_number, description, pitch_type, blocked_by_c, non_pitch_event }}
					<tr>
						{#if non_pitch_event}
							<td colspan="3" class="non-pitch-event text-xs italic text-gray-600">
								{description}
							</td>
						{:else}
							<td class="pitch-description">
								<div class="flex flex-row flex-nowrap justify-start">
									<span class="pitch-number font-bold">{pitch_number}</span>
									<span class="ml-1">{description}</span>
									{#if blocked_by_c}
										<div class="icon ml-1">
											<MdInfo />
										</div>
									{/if}
								</div>
							</td>
							<td
								class="pitch-speed"
								data-pitch-type={getPitchTypeAbbrevFromName(getPitchType(pitch_type))}
							>
								{getPitchSpeed(pitch_type)}
							</td>
							<td
								class="pitch-type"
								data-pitch-type={getPitchTypeAbbrevFromName(getPitchType(pitch_type))}
							>
								{getPitchType(pitch_type)}
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{#if anyPitchBlocked}
		<div class="legend flex flex-row flex-nowrap justify-start items-baseline p-1">
			<div class="icon-small">
				<MdInfo />
			</div>
			<span class="text-xs italic">Pitch was blocked by catcher</span>
		</div>
	{/if}
	<div class="play_description text-center text-sm bg-yellow-100">
		<FlexStrings
			stringArray={formatAtBatResult(at_bat.play_description)}
			runsScored={formatRunsOutsResult(at_bat.runs_outs_result)}
		/>
	</div>
{/if}

<style lang="postcss">
	table tbody tr td {
		line-height: 1.2;
		background-color: var(--page-bg-color);
		border: none;
	}

	.at-bat-pitch-sequence {
		@apply flex flex-col flex-nowrap justify-between;
		height: min-content;
		border-left: 1px solid var(--table-col-header-bottom-border);
		border-right: 1px solid var(--table-col-header-bottom-border);
		border-top: none;
		border-bottom: none;
	}

	.icon {
		color: var(--link-color);
		width: 16px;
		height: 16px;
	}

	.icon-small {
		color: var(--link-color);
		width: 14px;
		height: 14px;
	}

	:global(.at-bat-result) {
		font-weight: 700;
	}

	.pitch-description,
	.non-pitch-event {
		padding: 3px 5px 3px 0;
	}

	.pitch-number {
		margin: 0 2px 0 0;
	}

	.legend {
		background-color: var(--table-col-header-bg-color);
		border-left: 1px solid var(--table-col-header-bottom-border);
		border-right: 1px solid var(--table-col-header-bottom-border);
		border-top: 1px solid var(--table-col-header-bottom-border);
		border-bottom: none;
	}

	.play_description {
		border-left: 1px solid var(--table-col-header-bottom-border);
		border-right: 1px solid var(--table-col-header-bottom-border);
		border-top: 1px solid var(--table-col-header-bottom-border);
		border-bottom: 1px solid var(--table-col-header-bottom-border);
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}
</style>
