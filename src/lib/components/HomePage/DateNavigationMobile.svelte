<script lang="ts">
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { mostRecentScrapedDate } from '$lib/stores/singleValueStores';
	import type { ThemeColor } from '$lib/types';
	import { format } from 'date-fns';
	import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
	import DatePickerModal from '../Scoreboard/DatePickerModal.svelte';

	export let minDate: Date;
	export let maxDate: Date;
	export let color: ThemeColor = 'secondary';
	let formatted: string = '';
	let datePickerModal: DatePickerModal;

	$: if ($scoreboardDate) formatted = format($scoreboardDate, 'MMMM do, yyyy');
	$: previous = prevDay($scoreboardDate);
	$: prevDisabled = previous < minDate;
	$: next = nextDay($scoreboardDate);
	$: nextDisabled = next > new Date(Math.min.apply(null, [maxDate, $mostRecentScrapedDate]));

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

<div id="date-nav" class="my-3 pos">
	<div class="btn-group btn-group-secondary">
		<button
			id="prev-date"
			type="button"
			class="btn btn-{color} p-1"
			disabled={prevDisabled}
			on:click={() => scoreboardDate.prevDay()}
		>
			<MdChevronLeft />
		</button>
		<button class="btn btn-{color} text-base leading-tight py-0" on:click={() => datePickerModal.toggleModal()}>
			{formatted}
		</button>
		<button
			id="next-date"
			type="button"
			class="btn btn-{color} p-1"
			disabled={nextDisabled}
			on:click={() => scoreboardDate.nextDay()}
		>
			<MdChevronRight />
		</button>
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
