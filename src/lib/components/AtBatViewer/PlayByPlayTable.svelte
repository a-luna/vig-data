<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { AtBatDetails, InningSummary } from '$lib/api/types';
	import FlexStrings from '$lib/components/Util/FlexStrings.svelte';
	import { scrollToTop } from '$lib/util';

	export let atBatMap: Record<string, AtBatDetails>;
	export let inningAtBatMap: Record<string, string[]> = {};
	export let playerTeamMap: Record<number, string>;
	export let inningSummaries: Record<string, InningSummary> = {};
	export let selectedAtBatId: string;
	const dispatch = createEventDispatcher();

	function formatPitchCount(atBat: AtBatDetails): string {
		return `${atBat.total_pitches} (${atBat.final_count_balls}-${atBat.final_count_strikes})`;
	}

	function formatAtBatResult(atBatResult: string): string[] {
		const split = atBatResult.split(';');
		return split.length > 1 ? split : [atBatResult];
	}

	function viewAtBat(atBatId: string) {
		selectedAtBatId = atBatId;
		dispatch('showAtBat', atBatId);
		scrollToTop();
	}
</script>

<div class="responsive">
	<table class="text-xs">
		<thead>
			<tr class="table-header">
				<th colspan="10">Play-By-Play</th>
			</tr>
			<tr class="col-header">
				<th>Inn</th>
				<th title="Score Before At Bat">Score</th>
				<th title="Number of Outs Before At Bat">Out</th>
				<th title="Runners On Base">RoB</th>
				<th>Pitches (Count)</th>
				<th title="Runs Scored/Outs Made This At Bat">Runs/Outs</th>
				<th title="Team Batting">@Bat</th>
				<th>Batter</th>
				<th>Pitcher</th>
				<th>Play Description</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(inningAtBatMap) as [inningId, atBatIds]}
				<tr>
					<th colspan="10" class="text-left bg-yellow-200 text-black">
						{inningSummaries[inningId].begin_inning_summary}
					</th>
				</tr>
				{#each atBatIds as atBatId}
					<tr class="cursor-pointer hover:bg-yellow-100" on:click={() => viewAtBat(atBatId)}>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>{atBatMap[atBatId].inning_label}</td>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>{atBatMap[atBatId].score}</td>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>{atBatMap[atBatId].outs_before_play}</td>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>{atBatMap[atBatId].runners_on_base}</td>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>{formatPitchCount(atBatMap[atBatId])}</td>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>{atBatMap[atBatId].runs_outs_result}</td>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>{playerTeamMap[atBatMap[atBatId].batter_id_mlb]}</td>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>{atBatMap[atBatId].batter_name}</td>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>{atBatMap[atBatId].pitcher_name}</td>
						<td class:bg-blue-300={selectedAtBatId === atBatId}>
							<FlexStrings stringArray={formatAtBatResult(atBatMap[atBatId].play_description)} />
						</td>
					</tr>
				{/each}
				<tr>
					<td colspan="10" class="inning-end italic text-right bg-gray-100">
						{inningSummaries[inningId].end_inning_summary}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	.inning-end {
		border-top: 1px solid var(--table-outer-border-color);
	}
</style>
