<script lang="ts">
	import type { MlbSeason } from '$lib/api/types';
	import SeasonDropDown from '$lib/components/Util/SeasonDropDown.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { mostRecentScrapedDate } from '$lib/stores/singleValueStores';
	import type { ThemeColor } from '$lib/types';
	import { getDateFromString } from '$lib/util';
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

	$: minDate = getDateFromString(season.start_date).value;
	$: maxDate = getDateFromString(season.end_date).value;
	$: formatStr = $pageBreakPoints.isDefault || $pageBreakPoints.isSmall ? 'MMM do, yyyy' : 'EEE MMMM do, yyyy';
	$: if ($scoreboardDate) formatted = format($scoreboardDate, formatStr);
	$: previous = prevDay($scoreboardDate);
	$: prevDisabled = previous < minDate;
	$: prevFormatted = $pageBreakPoints.width < 840 ? format(previous, 'MMM do') : format(previous, 'MMMM do');
	$: next = nextDay($scoreboardDate);
	$: nextDisabled = next > new Date(Math.min.apply(null, [maxDate, $mostRecentScrapedDate]));
	$: nextFormatted = $pageBreakPoints.width < 840 ? format(next, 'MMM do') : format(next, 'MMMM do');

	function nextDay(date: Date): Date {
		var result = new Date(date);
		result.setDate(result.getDate() + 1);
		return result;
	}

	function prevDay(date: Date): Date {
		var result = new Date(date);
		result.setDate(result.getDate() - 1);
		return result;
	}

	function handleSeasonChanged(season_start_date: string) {
		scoreboardDate.changeDate(getDateFromString(season_start_date).value);
		dispatch('dateChanged');
	}
</script>

<DatePickerModal bind:this={datePickerModal} {minDate} {maxDate} on:dateChanged />

<div id="home-nav" class="flex flex-row justify-between mx-auto mb-6">
	<div class="flex flex-row flex-initial justify-start my-auto">
		<SeasonDropDown bind:selectedSeason={season} on:changed={(e) => handleSeasonChanged(e.detail)} />
	</div>
	<div class="flex flex-row justify-center my-auto flex-nowrap">
		<div class="flex flex-row flex-grow-0 items-center my-auto text-center flex-nowrap md:text-xl">
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
	</div>
	<div class="nav-buttons flex flex-row items-center">
		<button
			id="prev-date"
			type="button"
			class="btn btn-{color} p-1"
			disabled={prevDisabled}
			on:click={() => scoreboardDate.prevDay()}
		>
			<div class="flex flex-row justify-start leading-none flex-nowrap">
				<div class="w-5 h-5 md:w-6 md:h-6 my-auto mr-0.5 md:mr-1.5 stroke-current stroke-2">
					<MdChevronLeft />
				</div>
				<span class="py-0.5 pr-1 md:pr-2 text-xs sm:text-sm md:text-base">{prevFormatted}</span>
			</div>
		</button>
		<button
			id="next-date"
			type="button"
			class="btn btn-{color} p-1"
			disabled={nextDisabled}
			on:click={() => scoreboardDate.nextDay()}
		>
			<div class="flex flex-row justify-end leading-none flex-nowrap">
				<span class="py-0.5 pr-1 md:pl-2 text-xs sm:text-sm md:text-base">{nextFormatted}</span>
				<div class="w-5 h-5 md:w-6 md:h-6 my-auto ml-0.5 md:ml-1.5 stroke-current stroke-2">
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

	#prev-date {
		border-top-left-radius: 0.375rem;
		border-top-right-radius: 0;
		border-bottom-left-radius: 0.375rem;
		border-bottom-right-radius: 0;
	}

	#next-date {
		border-top-left-radius: 0;
		border-top-right-radius: 0.375rem;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0.375rem;
	}

	.current-date {
		color: var(--sec-color);
	}

	@media screen and (min-width: 768px) {
		#home-nav {
			font-size: 1.05rem;
		}
	}

	@media screen and (min-width: 840px) {
		#home-nav {
			max-width: 813px;
		}
	}

	@media screen and (min-width: 1024px) {
		#home-nav {
			max-width: 956px;
		}
	}
</style>
