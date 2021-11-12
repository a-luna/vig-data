<script lang="ts">
	import type { MlbSeason } from '$lib/api/types';
	import SeasonSelector from '$lib/components/Util/Selectors/SeasonSelector.svelte';
	import { homePageDate, mostRecentScrapedDate } from '$lib/stores/dateStore';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { ThemeColor } from '$lib/types';
	import { getNextDay, getPreviousDay } from '$lib/util/datetime';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import GoCalendar from 'svelte-icons/go/GoCalendar.svelte';
	import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
	import DatePickerModal from '../Scoreboard/DatePickerModal.svelte';

	export let season: MlbSeason;
	export let color: ThemeColor = 'secondary';
	let formatted: string = '';
	let prevFormatted: string = '';
	let nextFormatted: string = '';
	let datePickerModal: DatePickerModal;
	const dispatch = createEventDispatcher();

	$: formatStr = $pageBreakPoints.width < 840 ? 'MMM do, yyyy' : 'MMMM do, yyyy';
	$: if ($homePageDate) formatted = format($homePageDate, formatStr);
	$: previous = getPreviousDay($homePageDate);
	$: prevDisabled = previous < season.start;
	$: prevFormatted = $pageBreakPoints.width < 840 ? format(previous, 'MMM d') : format(previous, 'MMM do');
	$: next = getNextDay($homePageDate);
	$: nextDisabled = next > new Date(Math.min.apply(null, [season.end, $mostRecentScrapedDate]));
	$: nextFormatted = $pageBreakPoints.width < 840 ? format(next, 'MMM d') : format(next, 'MMM do');
</script>

<DatePickerModal
	bind:this={datePickerModal}
	bind:currentDate={$homePageDate}
	bind:minDate={season.start}
	bind:maxDate={season.end}
	on:dateChanged
/>

<div id="home-nav" class="flex flex-row justify-between mx-auto mb-6">
	<div class="flex flex-row justify-start flex-initial my-auto">
		<SeasonSelector bind:selectedSeason={season} on:changed={(e) => dispatch('seasonChanged', e.detail)} />
	</div>
	<div class="flex flex-row items-center flex-grow-0 my-auto text-center flex-nowrap">
		<span class="ml-1 mr-2 leading-none">Scores & Stats for</span>
		<span class="mr-2 leading-none cursor-pointer current-date" on:click={() => datePickerModal.toggleModal()}
			>{formatted}</span
		>
		<div
			class="block w-4 h-3 mr-1 cursor-pointer stroke-current current-date sm:w-5 sm:h-5 sm:mt-0.5 md:w-6 md:h-6 md:mb-1"
			title="Change Date"
			on:click={() => datePickerModal.toggleModal()}
		>
			<GoCalendar />
		</div>
	</div>
	<div class="gap-1 btn-group btn-group-{color}">
		<button
			id="prev-date"
			type="button"
			class="btn btn-{color} p-1"
			disabled={prevDisabled}
			on:click={() => dispatch('dateChanged', previous)}
		>
			<div class="flex flex-row justify-start leading-none flex-nowrap">
				<div class="w-6 h-6 my-auto mr-0.5 md:mr-1.5 stroke-current stroke-2">
					<MdChevronLeft />
				</div>
				<span class="py-0.5 pr-1 md:pr-2 text-base">{prevFormatted}</span>
			</div>
		</button>
		<button
			id="next-date"
			type="button"
			class="btn btn-{color} p-1"
			disabled={nextDisabled}
			on:click={() => dispatch('dateChanged', next)}
		>
			<div class="flex flex-row justify-end leading-none flex-nowrap">
				<span class="py-0.5 pr-1 md:pl-2 text-base">{nextFormatted}</span>
				<div class="w-6 h-6 my-auto ml-0.5 md:ml-1.5 stroke-current stroke-2">
					<MdChevronRight />
				</div>
			</div>
		</button>
	</div>
</div>

<style lang="postcss">
	#home-nav {
		max-width: 607px;
	}

	.current-date {
		color: var(--sec-color);
	}

	@media screen and (min-width: 640px) {
		#home-nav {
			font-size: 1.25rem;
		}
	}

	@media screen and (min-width: 768px) {
		#home-nav {
			font-size: 1.125rem;
		}
	}

	@media screen and (min-width: 840px) {
		#home-nav {
			font-size: 1.25rem;
			max-width: 813px;
		}
	}

	@media screen and (min-width: 1024px) {
		#home-nav {
			max-width: 956px;
		}
	}
</style>
