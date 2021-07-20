<script lang="ts">
	import { scoreboardDate } from '$lib/stores/singleValueStores';
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';

	export let minDate: Date;
	export let maxDate: Date;
	export let value: Date;
	export let formatted: string;
	export let color: ThemeColor = 'secondary';
	const dispatch = createEventDispatcher();

	$: previous = prevDay(value);
	$: next = nextDay(value);

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

<div id="date-nav" class="mb-5 pos">
	<div class="btn-group">
		<button
			id="prev-date"
			type="button"
			class="btn btn-{color} p-1"
			disabled={previous < minDate}
			on:click={() => ($scoreboardDate = previous)}
		>
			<MdChevronLeft />
		</button>
		<button class="btn btn-{color} text-lg" on:click={() => dispatch('showDatePicker')}>
			{formatted}
		</button>
		<button
			id="next-date"
			type="button"
			class="btn btn-{color} p-1"
			disabled={next > maxDate}
			on:click={() => ($scoreboardDate = next)}
		>
			<MdChevronRight />
		</button>
	</div>
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
