<script lang="ts">
	import type { GameData, MlbSeason } from '$lib/api/types';
	import Linescore from '$lib/components/Linescore/Linescore.svelte';
	import PitcherResults from '$lib/components/Linescore/PitcherResults.svelte';
	import DateNavigation from '$lib/components/Scoreboard/DateNavigation.svelte';
	import DatePickerModal from '$lib/components/Scoreboard/DatePickerModal.svelte';
	import SeasonSelector from '$lib/components/Util/Selectors/SeasonSelector.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { scoreboardDate } from '$lib/stores/dateStore';
	import { createEventDispatcher } from 'svelte';

	export let season: MlbSeason;
	export let loading: boolean = true;
	export let games_for_date: GameData[] = [];
	let formatted: string;
	let minDate: Date = new Date(2021, 3, 1);
	let maxDate: Date = new Date(2021, 9, 3);
	let datePickerModal: DatePickerModal;
	const dispatch = createEventDispatcher();

	$: if ($scoreboardDate) formatted = $scoreboardDate.toDateString();
	$: if (season) minDate = season.start;
	$: if (season) maxDate = season.end;
</script>

<DatePickerModal bind:this={datePickerModal} currentDate={$scoreboardDate} {minDate} {maxDate} on:dateChanged />

<div id="scoreboard" class="scoreboard-wrapper">
	{#if loading}
		<Spinner />
	{:else}
		<div class="flex flex-row items-center justify-center gap-3 mb-5 flex-nowrap">
			<div class="flex flex-col flex-nowrap gap-2">
				<SeasonSelector
					selectedSeason={season}
					width={'100%'}
					on:changed={(e) => dispatch('seasonChanged', e.detail)}
				/>
				<DateNavigation
					{season}
					color={'secondary'}
					on:showDatePicker={() => datePickerModal.toggleModal()}
					on:dateChanged
				/>
			</div>
		</div>
		<h3 class="my-2 text-xl text-center sm:text-2xl">Games Played on {formatted}</h3>
		<div class="flex flex-row flex-wrap justify-center flex-grow-0 mx-auto my-0 text-sm scoreboard">
			{#each games_for_date as { linescore, pitcher_results, game_id }}
				<div class="self-start m-3 game">
					<Linescore {linescore} />
					<div class="flex flex-row justify-between game-footer flex-nowrap">
						<PitcherResults {...pitcher_results} />
						<div class="links flex flex-col flex-nowrap justify-start text-right mt-1.5 mr1.5">
							<a sveltekit:prefetch href="/game?id={game_id}&show=box">Boxscore</a>
							<a sveltekit:prefetch href="/game?id={game_id}&show=pbp">Play-By-Play</a>
							<a sveltekit:prefetch href="/game?id={game_id}&show=charts">Charts/Graphs</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.game {
		width: 295px;
	}

	#scoreboard :global(.resp-table) {
		width: 100%;
	}
</style>
