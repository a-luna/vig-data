<script lang="ts">
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { ThemeColor } from '$lib/types';
	import { getStringFromDate } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
	import DatePicker from '../../../../node_modules/svelte-calendar/src/Components/Datepicker.svelte';

	export let start: Date;
	export let end: Date;
	export let selected: Date;
	export let color: ThemeColor = 'secondary';
	let format: string = '#{F} #{j}, #{Y}';
	let dateChosen: boolean;
	let formattedSelected: string;
	const dispatch = createEventDispatcher();

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

	function gotoPrevDay() {
		const prev = prevDay(selected);
		seasonStatFilter.changeGameDate(getStringFromDate(prev));
		dispatch('dateChanged', prev);
	}

	function gotoNextDay() {
		const next = nextDay(selected);
		seasonStatFilter.changeGameDate(getStringFromDate(next));
		dispatch('dateChanged', next);
	}

	$: if (dateChosen) {
		seasonStatFilter.changeGameDate(getStringFromDate(selected));
		dispatch('dateChanged', selected);
		dateChosen = false;
	}

</script>

<div class="btn-group">
	<button id="prev-date" type="button" class="btn btn-{color} p-1" on:click={gotoPrevDay}>
		<MdChevronLeft />
	</button>
	<DatePicker {start} {end} bind:format bind:formattedSelected bind:dateChosen bind:selected>
		<button id="date-picker" class="btn btn-{color} text-lg">
			{formattedSelected}
		</button>
	</DatePicker>
	<button id="next-date" type="button" class="btn btn-{color} p-1" on:click={gotoNextDay}>
		<MdChevronRight />
	</button>
</div>

<style lang="postcss">
	:global(#scoreboard .datepicker) {
		margin: 0;
	}

	#prev-date,
	#next-date {
		@apply p-1;
		width: 38px;
		max-height: 38px;
	}

	#date-picker {
		@apply m-0 p-2 rounded-none;
	}

	@media screen and (min-width: 768px) {
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
	}

</style>
