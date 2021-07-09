<script lang="ts">
	import ModalContainer from '$lib/components/Modals/ModalContainer.svelte';
	import { gameDate } from '$lib/stores/singleValueStores';
	import { getStringFromDate } from '$lib/util';
	import DateFnsAdapter from '@date-io/date-fns';
	import { enUS } from 'date-fns/locale';
	import DatePicker from '../../../../node_modules/svelte-inclusive-datepicker/src/components/DatePicker.svelte';

	export let minDate: Date;
	export let maxDate: Date;
	export let value: Date;
	let modalContainer: ModalContainer;
	let selectedDate: Date = value;
	const dateAdapter = new DateFnsAdapter();

	$: dpValue = dateAdapter.date(value);
	$: dateChanged = getStringFromDate(selectedDate) !== getStringFromDate(value);

	export function toggleModal() {
		modalContainer.toggleModal();
	}

	function changeGameDate() {
		if (dateChanged) {
			$gameDate = selectedDate;
			modalContainer.toggleModal();
		}
	}
</script>

<ModalContainer bind:this={modalContainer}>
	<!-- <div slot="heading" class="modal-heading-flex">
		<span class="text-base font-bold">Change Date</span>
		<span class="text-base font-normal ml-2">&nbsp;</span>
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

	<div slot="buttons" class="buttons flex flex-row flex-nowrap justify-end">
		<button class="btn btn-secondary" disabled={!dateChanged} on:click={() => changeGameDate()}>Save</button>
		<button class="btn btn-secondary" on:click={() => modalContainer.toggleModal()}>Cancel</button>
	</div>
</ModalContainer>

<style lang="postcss">
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

	:global(#date-picker div[role='grid'] button:hover),
	:global(#date-picker div[role='grid'] button:focus),
	:global(#date-picker div[role='grid'] button:focus:hover) {
		color: var(--table-col-header-color);
		background-color: var(--pri-color-hov);
	}

	:global(#date-picker div[role='grid'] button:disabled),
	:global(#date-picker div[role='grid'] button:disabled:hover) {
		color: var(--sdb-disabled-date-color);
		background-color: var(--page-bg-color);
	}

	:global(#date-picker div[role='grid'] button.selected),
	:global(#date-picker div[role='grid'] button.selected:hover) {
		color: var(--body-text-color);
		background-color: var(--page-bg-color);
		border: 2px solid var(--pri-color);
	}

	.buttons button {
		width: 75px;
	}
</style>
