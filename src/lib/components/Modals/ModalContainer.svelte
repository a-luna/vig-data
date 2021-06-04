<script lang="ts">
	import CloseModalButton from '$lib/components/Buttons/CloseModalButton.svelte';

	let hidden: boolean = false;

	export function toggleModal() {
		hidden = !hidden;
		document.querySelector('body').classList.toggle('modal-active');
	}

</script>

<div class="modal-wrapper" class:opacity-0={!hidden} class:pointer-events-none={!hidden}>
	<div class="modal-overlay" on:click={() => toggleModal()} />
	<div class="modal-container">
		<div class="modal-content">
			<div class="modal-heading">
				<slot name="heading" />
			</div>
			<slot name="content" />
		</div>
		<div class="modal-buttons">
			<button class="btn btn-secondary" on:click={() => toggleModal()}>Close</button>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(body.modal-active) {
		overflow-x: hidden;
		overflow-y: visible !important;
	}

	.modal-wrapper {
		@apply fixed w-full h-full top-0 left-0 flex items-center justify-center;
		transition: opacity 0.25s ease;
	}

	.modal-overlay {
		@apply absolute w-full h-full bg-gray-900 opacity-50;
	}

	.modal-container {
		@apply flex flex-col w-auto mx-auto rounded shadow-lg overflow-y-auto z-50 p-3;
		border: 1px solid var(--body-text-color);
		max-width: 70%;
		background-color: var(--page-bg-color);
	}

	.modal-heading {
		@apply flex flex-row justify-between items-start pb-1;
	}

	.modal-content {
		@apply text-left w-auto mb-3;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		border-radius: 4px;
	}

	.modal-buttons {
		@apply flex flex-row justify-end;
	}

	button {
		@apply text-base leading-normal py-1.5 px-3 m-0;
	}

</style>
