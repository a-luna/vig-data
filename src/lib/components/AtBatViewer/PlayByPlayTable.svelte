<script lang="ts">
	import type { AtBatDetails, InningSummary, PlayerSubEvent } from '$lib/api/types';
	import FlexStrings from '$lib/components/Util/FlexStrings.svelte';
	import { formatAtBatResult, scrollToTop } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let atBatMap: Record<string, AtBatDetails>;
	export let inningAtBatMap: Record<string, string[]> = {};
	export let playerTeamMap: Record<number, string>;
	export let inningSummaries: Record<string, InningSummary> = {};
	export let selectedAtBatId: string;
	const dispatch = createEventDispatcher();

	function formatPitchCount(atBat: AtBatDetails): string {
		return `${atBat.total_pitches} (${atBat.final_count_balls}-${atBat.final_count_strikes})`;
	}

	function getSubstitutions(atBat: AtBatDetails): string[] {
		const subEvents = atBat.pbp_events.filter((event) => event.event_type === 'SUBSTITUTION') as PlayerSubEvent[];
		return subEvents.length > 0 ? subEvents.map((e) => `(${e.sub_description})`) : [];
	}

	function viewAtBat(atBatId: string) {
		selectedAtBatId = atBatId;
		dispatch('showAtBat', atBatId);
		scrollToTop();
	}

</script>

<div id="play-by-play" class="mt-6">
	<div class="resp-table-caption">Play-By-Play</div>
	{#each Object.entries(inningAtBatMap) as [inningId, atBatIds], inningIndex}
		<div class="responsive" class:mt-0={inningIndex == 0} class:mt-1={inningIndex > 0}>
			<div class="resp-table">
				<div class="resp-table-body">
					<div class="resp-table-row">
						<div class="inning-begin">{inningSummaries[inningId].begin_inning_summary}</div>
					</div>
				</div>
			</div>
			<div class="resp-table">
				<div class="resp-table-header col-header">
					<div class="table-header-cell">Inn</div>
					<div class="table-header-cell" title="Score Before At Bat">Score</div>
					<div class="table-header-cell" title="Number of Outs Before At Bat">Out</div>
					<div class="table-header-cell" title="Runners On Base">RoB</div>
					<div class="table-header-cell">Pitches (Count)</div>
					<div class="table-header-cell" title="Runs Scored/Outs Made This At Bat">Runs/Outs</div>
					<div class="table-header-cell" title="Team Batting">@Bat</div>
					<div class="table-header-cell">Batter</div>
					<div class="table-header-cell">Pitcher</div>
					<div class="table-header-cell">Play Description</div>
				</div>
				<div class="resp-table-body">
					{#each atBatIds as atBatId}
						<div class="at-bat resp-table-row" on:click={() => viewAtBat(atBatId)}>
							<div class="table-body-cell" class:bg-blue-300={selectedAtBatId === atBatId}>
								{atBatMap[atBatId].inning_label}
							</div>
							<div class="table-body-cell" class:bg-blue-300={selectedAtBatId === atBatId}>
								{atBatMap[atBatId].score}
							</div>
							<div class="table-body-cell" class:bg-blue-300={selectedAtBatId === atBatId}>
								{atBatMap[atBatId].outs_before_play}
							</div>
							<div class="table-body-cell" class:bg-blue-300={selectedAtBatId === atBatId}>
								{atBatMap[atBatId].runners_on_base}
							</div>
							<div class="table-body-cell" class:bg-blue-300={selectedAtBatId === atBatId}>
								{formatPitchCount(atBatMap[atBatId])}
							</div>
							<div class="table-body-cell" class:bg-blue-300={selectedAtBatId === atBatId}>
								{atBatMap[atBatId].runs_outs_result}
							</div>
							<div class="table-body-cell" class:bg-blue-300={selectedAtBatId === atBatId}>
								{playerTeamMap[atBatMap[atBatId].batter_id_mlb]}
							</div>
							<div class="table-body-cell" class:bg-blue-300={selectedAtBatId === atBatId}>
								{atBatMap[atBatId].batter_name}
							</div>
							<div class="table-body-cell" class:bg-blue-300={selectedAtBatId === atBatId}>
								{atBatMap[atBatId].pitcher_name}
							</div>
							<div class="table-body-cell hide-on-mobile" class:bg-blue-300={selectedAtBatId === atBatId}>
								<FlexStrings stringArray={formatAtBatResult(atBatMap[atBatId].play_description)} />
							</div>
							<div class="table-body-cell show-on-mobile" class:bg-blue-300={selectedAtBatId === atBatId}>
								{atBatMap[atBatId].pfx_des}
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="resp-table">
				<div class="resp-table-body">
					<div class="resp-table-row">
						<div class="inning-end">{inningSummaries[inningId].end_inning_summary}</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.inning-begin,
	.inning-end {
		font-weight: 700;
		border-top: none;
		border-bottom: none;
	}

	.inning-end {
		color: var(--table-col-header-color);
		background-color: var(--table-col-header-bg-color);
		border: none;
	}

	.show-on-mobile,
	.hide-on-mobile {
		border-right: 1px solid var(--table-outer-border-color);
	}

	.resp-table-row:last-child .show-on-mobile,
	.resp-table-row:last-child .hide-on-mobile {
		border-bottom-right-radius: 4px;
	}

</style>
