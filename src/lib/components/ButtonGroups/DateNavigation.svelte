<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getStringFromDate } from '$lib/util';
	import DatePicker from '../../../../node_modules/svelte-calendar/src/Components/Datepicker.svelte';
	import Icon, { ChevronLeft, ChevronRight } from 'svelte-hero-icons';

	export let start: Date;
	export let end: Date;
	export let date: string;
	export let selected: Date;
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
		date = getStringFromDate(prevDay(selected));
		dispatch('dateChanged', date);
	}

	function gotoNextDay() {
		date = getStringFromDate(nextDay(selected));
		dispatch('dateChanged', date);
	}

	$: if (dateChosen) {
		date = getStringFromDate(selected);
		dispatch('dateChanged', date);
		dateChosen = false;
	}
</script>

<div class="btn-group">
	<button id="prev-date" type="button" class="btn btn-primary" on:click={gotoPrevDay}>
		<Icon src={ChevronLeft} solid size="24px" />
	</button>
	<DatePicker {start} {end} bind:format bind:formattedSelected bind:dateChosen bind:selected>
		<button id="date-picker" class="btn btn-primary">
			{formattedSelected}
		</button>
	</DatePicker>
	<button id="next-date" type="button" class="btn btn-primary" on:click={gotoNextDay}>
		<Icon src={ChevronRight} solid size="24px" />
	</button>
</div>

<style lang="postcss">
	:global(#scoreboard .datepicker) {
		margin: 0;
	}

	#date-picker {
		@apply m-0 p-2 rounded-none;
	}

	#prev-date,
	#next-date {
		@apply p-1;
	}
</style>
