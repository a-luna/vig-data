<script lang="ts">
	import type { MlbSeason } from '$lib/api/types';
	import SeasonSelector from '$lib/components/Util/Selectors/SeasonSelector.svelte';
	import { mostRecentScrapedDate, scoreboardDate } from '$lib/stores/dateStore';
	import { syncWidth } from '$lib/stores/elementWidth';
	import type { ThemeColor } from '$lib/types';
	import { getNextDay, getPreviousDay } from '$lib/util/datetime';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';

	export let season: MlbSeason;
	export let color: ThemeColor = 'secondary';
	let formatted: string = '';
	let minDate: Date = new Date(2021, 3, 1);
	let maxDate: Date = new Date(2021, 9, 3);
	let dateNavElement: HTMLElement;
	const dispatch = createEventDispatcher();

	$: if ($scoreboardDate) formatted = format($scoreboardDate, 'P');
	$: if (season) minDate = season.start;
	$: if (season) maxDate = season.end;
	$: previous = getPreviousDay($scoreboardDate);
	$: prevDisabled = previous < minDate;
	$: next = getNextDay($scoreboardDate);
	$: nextDisabled = next > new Date(Math.min.apply(null, [maxDate, $mostRecentScrapedDate]));
	$: widthStore = syncWidth(dateNavElement);
	$: seasonMenuWidth = $pageWidth.isDefault ? `${$widthStore}px` : 'auto';
</script>

<div class="flex flex-col justify-center gap-2 mb-5 sm:flex-row flex-nowrap">
	<SeasonSelector
		selectedSeason={season}
		width={seasonMenuWidth}
		on:changed={(e) => dispatch('seasonChanged', e.detail)}
	/>
	<div id="date-nav" class="font-medium pos" bind:this={dateNavElement}>
		<div class="btn-group btn-group-{color}">
			<button
				id="prev-date"
				type="button"
				class="btn btn-{color} p-1"
				disabled={prevDisabled}
				on:click={() => dispatch('dateChanged', previous)}
			>
				<MdChevronLeft />
			</button>
			<button type="button" class="btn btn-{color} text-lg" on:click={() => dispatch('showDatePicker')}>
				{formatted}
			</button>
			<button
				id="next-date"
				type="button"
				class="btn btn-{color} p-1"
				disabled={nextDisabled}
				on:click={() => dispatch('dateChanged', next)}
			>
				<MdChevronRight />
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(#scoreboard .datepicker) {
		margin: 0;
	}

	#prev-date,
	#next-date {
		@apply p-1;
		width: 35.75px;
		max-height: 35.75px;
	}

	/* @media screen and (min-width: 768px) {
		#prev-date,
		#next-date {
			width: 41px;
			max-height: 41px;
		}
	}

	@media screen and (min-width: 1024px) {
		#prev-date,
		#next-date {
			width: 44px;
			max-height: 44px;
		}
	} */
</style>
