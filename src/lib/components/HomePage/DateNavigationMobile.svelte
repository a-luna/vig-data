<script lang="ts">
	import type { MlbSeason } from '$lib/api/types';
	import DatePickerModal from '$lib/components//Scoreboard/DatePickerModal.svelte';
	import SeasonSelector from '$lib/components/Util/Selectors/SeasonSelector.svelte';
	import { homePageDate, mostRecentScrapedDate } from '$lib/stores/dateStore';
	import { syncWidth } from '$lib/stores/elementWidth';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { ThemeColor } from '$lib/types';
	import { getNextDay, getPreviousDay } from '$lib/util/datetime';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';

	export let season: MlbSeason;
	export let color: ThemeColor = 'secondary';
	let formatted: string = '';
	let datePickerModal: DatePickerModal;
	let dateNavElement: HTMLElement;
	const dispatch = createEventDispatcher();

	$: if ($homePageDate) formatted = format($homePageDate, 'MMMM do, yyyy');
	$: previous = getPreviousDay($homePageDate);
	$: prevDisabled = previous < season.start;
	$: next = getNextDay($homePageDate);
	$: nextDisabled = next > new Date(Math.min.apply(null, [season.end, $mostRecentScrapedDate]));
	$: widthStore = syncWidth(dateNavElement);
	$: seasonMenuWidth = $pageBreakPoints.isDefault ? `${$widthStore}px` : 'auto';
</script>

<DatePickerModal
	bind:this={datePickerModal}
	bind:currentDate={$homePageDate}
	bind:minDate={season.start}
	bind:maxDate={season.end}
	on:dateChanged
/>

<div class="flex flex-col sm:flex-row items-center justify-center gap-2 flex-nowrap">
	<SeasonSelector
		bind:selectedSeason={season}
		width={seasonMenuWidth}
		on:changed={(e) => dispatch('seasonChanged', e.detail)}
	/>
	<div id="date-nav" class="pos" bind:this={dateNavElement}>
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
			<button
				class="btn btn-{color} leading-tight py-0"
				style="font-size: 1rem"
				on:click={() => datePickerModal.toggleModal()}
			>
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
	:global(#home .datepicker) {
		margin: 0;
	}

	#prev-date,
	#next-date {
		@apply p-1;
		width: 30px;
		max-height: 30px;
	}
</style>
