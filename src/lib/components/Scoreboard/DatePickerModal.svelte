<script lang="ts">
	import ModalContainer from '$lib/components/Util/ModalContainer.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { getStringFromDate } from '$lib/util/datetime';
	import DateFnsAdapter from '@date-io/date-fns';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import enUS from '../../../../node_modules/date-fns/locale/en-US/index';
	import DatePicker from '../../../../node_modules/svelte-inclusive-datepicker/src/components/DatePicker.svelte';

	export let minDate: Date;
	export let maxDate: Date;
	let modalContainer: ModalContainer;
	let selectedDate: Date;
	const dateAdapter = new DateFnsAdapter();
	let dpValue: Date;
	let dateChanged: boolean = false;
	let mounted: boolean = false;
	const dispatch = createEventDispatcher();

	$: if (mounted) dpValue = dateAdapter.date($scoreboardDate);
	$: if (mounted) dateChanged = getStringFromDate(selectedDate) !== getStringFromDate($scoreboardDate);

	onMount(async () => {
		await tick();
		mounted = true;
		selectedDate = $scoreboardDate;
	});

	export function toggleModal() {
		modalContainer.toggleModal();
	}

	function changeDate() {
		if (dateChanged) {
			scoreboardDate.changeDate(selectedDate);
			modalContainer.toggleModal();
			dispatch('dateChanged', selectedDate);
		}
	}
	// import { enUS } from 'date-fns/locale';
	// import enUS from '../../../../node_modules/date-fns/locale/en-US/index';
</script>

<ModalContainer bind:this={modalContainer} bgColor={'var(--sdp-bg-color)'}>
	<!-- <div slot="heading" class="modal-heading-flex">
		<span class="text-base font-bold">Change Date</span>
		<span class="ml-2 text-base font-normal">&nbsp;</span>
	</div> -->

	<div slot="content" id="date-picker" class="responsive">
		<DatePicker
			{dateAdapter}
			locale={enUS}
			bind:minDate
			bind:maxDate
			bind:value={dpValue}
			on:selectDay={(e) => (selectedDate = e.detail)}
		/>
	</div>

	<div slot="buttons" class="flex flex-row justify-end buttons flex-nowrap">
		<button class="btn btn-secondary" disabled={!dateChanged} on:click={() => changeDate()}>Save</button>
		<button class="btn btn-secondary" on:click={() => modalContainer.toggleModal()}>Cancel</button>
	</div>
</ModalContainer>

<style lang="postcss">
	#date-picker {
		--day-size: 32px;
		--font-size: 0.85rem;
	}

	#date-picker :global(.datepicker-header) {
		background-color: var(--table-col-header-bg-color);
		color: var(--table-col-header-color);
		height: var(--day-size);
		padding: 0;
	}

	#date-picker :global(.datepicker-header button) {
		background-color: var(--table-col-header-bg-color);
		color: var(--table-col-header-color);
	}

	#date-picker :global(.day) {
		font-size: var(--font-size);
		background-color: var(--sdp-current-month);
	}

	#date-picker :global(.day),
	#date-picker :global(.weekday-label) {
		margin: 0 2px;
	}

	#date-picker :global(.day),
	#date-picker :global(.weekday-label),
	#date-picker :global(.month-switcher) {
		height: var(--day-size);
		width: var(--day-size);
	}

	:global(#date-picker .date-picker) {
		border: 1px solid var(--table-col-header-bg-color);
		border-radius: 4px;
		width: auto;
		min-width: 260px;
		min-height: 296px;
	}

	:global(#date-picker .year-picker) {
		height: 226px;
	}

	:global(#date-picker .datepicker-header) {
		background-color: var(--sdp-header-bg-color);
		padding: 4px;
	}

	:global(#date-picker .datepicker-header button) {
		background-color: var(--sdp-header-bg-color);
	}

	:global(#date-picker button) {
		color: var(--body-text-color);
		background-color: var(--page-bg-color);
		border: 2px solid transparent;
		box-shadow: none;
	}

	#date-picker :global(.weekdays),
	#date-picker :global(div[role='grid']) {
		padding: 0 3px;
	}

	#date-picker :global(div[role='grid']) {
		height: auto;
	}

	:global(#date-picker div[role='grid'] button:hover),
	:global(#date-picker div[role='grid'] button:focus),
	:global(#date-picker div[role='grid'] button:focus:hover) {
		color: var(--table-col-header-color);
		background-color: var(--pri-color-hov);
	}

	:global(#date-picker div[role='grid'] button:disabled),
	:global(#date-picker div[role='grid'] button:disabled:hover) {
		color: var(--sdb-disabled-date-color);
		background-color: var(--sdp-current-month);
	}

	:global(#date-picker div[role='grid'] button.selected),
	:global(#date-picker div[role='grid'] button.selected:hover) {
		color: var(--body-text-color);
		background-color: var(--sdp-current-month);
		border: 2px solid var(--pri-color);
	}

	.buttons button {
		width: 75px;
	}

	@media screen and (min-width: 450px) {
		#date-picker {
			--day-size: 36px;
			--font-size: 1rem;
		}

		:global(#date-picker .date-picker) {
			min-width: 288px;
			min-height: 324px;
		}

		:global(#date-picker .year-picker) {
			height: 246px;
		}
	}
</style>
