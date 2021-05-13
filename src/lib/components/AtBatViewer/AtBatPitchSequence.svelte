<script lang="ts">
	import type { AtBatDetails, AtBatPitchDescription } from '$lib/api/types';
	import { PITCH_SEQ_NUMS_REGEX, PITCH_SPEED_TYPE_REGEX } from '$lib/regex';
	import { formatAtBatResult, getPitchTypeAbbrevFromName } from '$lib/util';
	import FlexStrings from '$lib/components/Util/FlexStrings.svelte';
	import MdInfo from 'svelte-icons/md/MdInfo.svelte';

	export let at_bat: AtBatDetails;
	let pitch_sequence: AtBatPitchDescription[];
	let anyPitchBlocked: boolean;

	const pitchBlocked = (pitch) => pitch.description.includes('pitch was blocked by catcher');

	function formatPitchDescription(pitch_des: string[]): AtBatPitchDescription {
		let pitch: AtBatPitchDescription = {
			number: '',
			description: '',
			type: '',
			blocked_by_c: false,
			non_pitch_event: false
		};
		if (pitch_des.length === 3) {
			const match = PITCH_SEQ_NUMS_REGEX.exec(pitch_des[0]);
			pitch.number = match ? match.groups.num : '';
			pitch.description = pitch_des[1];
			pitch.type = pitch_des[2];
			pitch.non_pitch_event = pitch.number === '';

			if (pitchBlocked(pitch)) {
				pitch.description = pitch.description.split('\n')[0];
				pitch.blocked_by_c = true;
				anyPitchBlocked = true;
			}
		}
		return pitch;
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
	}
</script>

{#if pitch_sequence !== undefined}
	<div class="at-bat-pitch-sequence responsive-vert">
		<table class="m-0 w-min">
			<tbody>
				{#each pitch_sequence as { number, description, type, blocked_by_c, non_pitch_event }}
					<tr>
						{#if non_pitch_event}
							<td colspan="3" class="non-pitch-event text-xs italic text-gray-700">
								{description}
							</td>
						{:else}
							<td
								class="pitch-description"
								data-pitch-type={getPitchTypeAbbrevFromName(getPitchType(type))}
							>
								<div class="flex flex-row flex-nowrap justify-start">
									<span class="pitch-number font-bold rounded-full">
										{number}
									</span>
									<span class="ml-1">
										{description}
									</span>
									{#if blocked_by_c}
										<div class="icon ml-1">
											<MdInfo />
										</div>
									{/if}
								</div>
							</td>
							<td
								class="pitch-speed"
								data-pitch-type={getPitchTypeAbbrevFromName(getPitchType(type))}
							>
								{getPitchSpeed(type)}
							</td>
							<td
								class="pitch-type"
								data-pitch-type={getPitchTypeAbbrevFromName(getPitchType(type))}
							>
								{getPitchType(type)}
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{#if anyPitchBlocked}
		<div class="legend flex flex-row flex-nowrap justify-start items-baseline p-3">
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
		line-height: 1.3;
		background-color: var(--page-bg-color);
		border: none;
		padding: 3px 5px;
	}

	/* table tbody tr td span {
		background-color: var(--page-bg-color);
	} */

	.at-bat-pitch-sequence {
		@apply flex flex-col flex-nowrap justify-between flex-grow px-2;
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
		color: var(--black4);
	}

	.legend {
		background-color: var(--table-col-header-bg-color);
		border-left: 1px solid var(--table-col-header-bottom-border);
		border-right: 1px solid var(--table-col-header-bottom-border);
		border-top: 1px solid var(--table-col-header-bottom-border);
		border-bottom: none;
		padding: 1px;
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
