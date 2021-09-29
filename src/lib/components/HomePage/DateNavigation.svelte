<script lang="ts">
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { mostRecentScrapedDate } from '$lib/stores/singleValueStores';
	import type { ThemeColor } from '$lib/types';
	import { format } from 'date-fns';
	import GoCalendar from 'svelte-icons/go/GoCalendar.svelte';
	import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
	import DatePickerModal from '../Scoreboard/DatePickerModal.svelte';

	export let minDate: Date;
	export let maxDate: Date;
	export let color: ThemeColor = 'secondary';
	let formatted: string = '';
	let prevFormatted: string = '';
	let nextFormatted: string = '';
	let datePickerModal: DatePickerModal;

	$: formatStr = $pageBreakPoints.isDefault || $pageBreakPoints.isSmall ? 'MMM do, yyyy' : 'EEE MMMM do, yyyy';
	$: if ($scoreboardDate) formatted = format($scoreboardDate, formatStr);
	$: previous = prevDay($scoreboardDate);
	$: prevDisabled = previous < minDate;
	$: prevFormatted = format(previous, 'MMM do');
	$: next = nextDay($scoreboardDate);
	$: nextDisabled = next > new Date(Math.min.apply(null, [maxDate, $mostRecentScrapedDate]));
	$: nextFormatted = format(next, 'MMM do');

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
</script>

<DatePickerModal bind:this={datePickerModal} {minDate} {maxDate} on:dateChanged />

<div class="flex flex-row items-center justify-center mt-3 mb-6 flex-nowrap">
	<button
		id="prev-date"
		type="button"
		class="btn btn-{color} p-1"
		disabled={prevDisabled}
		on:click={() => scoreboardDate.prevDay()}
	>
		<div class="flex flex-row justify-start leading-none flex-nowrap">
			<div class="w-6 h-6 my-auto mr-1.5 stroke-current stroke-2">
				<MdChevronLeft />
			</div>
			<span class="py-0.5 pr-2 text-sm sm:text-base">{prevFormatted}</span>
		</div>
	</button>
	<div class="flex flex-row flex-grow-0 my-auto text-sm leading-none text-center flex-nowrap sm:text-lg lg:text-xl">
		<span class="ml-4 mr-2">Scores, Standings & Stats for</span>
		<span class="mr-2 cursor-pointer current-date" on:click={() => datePickerModal.toggleModal()}>{formatted}</span>
		<div
			class="block w-4 h-3 mr-4 cursor-pointer stroke-current current-date sm:w-5 sm:h-5 sm:mt-0.5 md:w-6 md:h-6 md:mb-1"
			title="Change Date"
			on:click={() => datePickerModal.toggleModal()}
		>
			<GoCalendar />
		</div>
	</div>
	<button
		id="next-date"
		type="button"
		class="btn btn-{color} p-1"
		disabled={nextDisabled}
		on:click={() => scoreboardDate.nextDay()}
	>
		<div class="flex flex-row justify-end leading-none flex-nowrap">
			<span class="py-0.5 pl-2 text-sm sm:text-base">{nextFormatted}</span>
			<div class="w-6 h-6 my-auto ml-1.5 stroke-current stroke-2">
				<MdChevronRight />
			</div>
		</div>
	</button>
</div>

<style lang="postcss">
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
</style>
