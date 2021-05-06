<script lang="ts">
	import type { AtBatDetails, AtBatPitchDescription } from '$lib/api/types';
	import { PITCH_SEQ_NUMS_REGEX, PITCH_SPEED_TYPE_REGEX } from '$lib/regex';

	export let at_bat: AtBatDetails;
	let pitch_sequence: AtBatPitchDescription[];
	let at_bat_result: string;

	function formatPitchDescription(pitch_des: string[]): AtBatPitchDescription {
		if (pitch_des.length > 0) {
			const match = PITCH_SEQ_NUMS_REGEX.exec(pitch_des[0]);
			if (match) {
				const pitch_number = match.groups.num;
				if (pitch_des.length == 3) {
					return {
						pitch_number: pitch_number,
						description: pitch_des[1],
						pitch_type: pitch_des[2]
					};
				}
				if (pitch_des.length == 2) {
					return {
						pitch_number: pitch_number,
						description: pitch_des[1],
						pitch_type: ''
					};
				}
			}
		}
		return {
			pitch_number: '',
			description: '',
			pitch_type: ''
		};
	}

	function formatRunsOutsResult(runs_outs_result: string): string {
		const outs_count = runs_outs_result.replace(/[^O]/g, '').length;
		const runs_count = runs_outs_result.replace(/[^R]/g, '').length;
		if (outs_count > 0 || runs_count > 0) {
			const outs = outs_count == 0 ? undefined : outs_count == 1 ? `${outs_count} Out` : `${outs_count} Outs`;
			const runs =
				runs_count == 0 ? undefined : runs_count == 1 ? `${runs_count} Run Scored` : `${runs_count} Runs Scored`;
			let results = [];
			if (outs) {
				results.push(outs);
			}
			if (runs) {
				results.push(runs);
			}
			return results.length > 1 ? results.join(', ') : results[0];
		}
		return 'No Outs, No Runs Scored';
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
		pitch_sequence = at_bat.pitch_sequence_description
			.filter((p) => p[0].startsWith('Pitch'))
			.map((p) => formatPitchDescription(p));

		const result = formatRunsOutsResult(at_bat.runs_outs_result);
		if (!result) {
			at_bat_result = at_bat.play_description;
		}
		at_bat_result = `${at_bat.play_description} (${result})`;
	}
</script>

{#if pitch_sequence !== undefined}
	<div class="at-bat-details-bottom">
		<div class="at-bat-pitch-sequence">
			<table class="m-0">
				<tbody>
					{#each pitch_sequence as { pitch_number, description, pitch_type }}
						<tr>
							<td class="pitch-description">
								<span class="pitch-number font-bold">{pitch_number}</span>
								{description}
							</td>
							<td class="pitch-speed">{getPitchSpeed(pitch_type)}</td>
							<td class="pitch-type">{getPitchType(pitch_type)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<span class="font-bold text-center">{at_bat_result}</span>
		</div>
	</div>
{/if}

<style lang="postcss">
	table tbody tr td {
		background-color: var(--page-bg-color);
		border: none;
	}

	.pitch-description {
		padding: 3px 5px 3px 0;
	}

	.pitch-number {
		margin: 0 2px 0 0;
	}
</style>
