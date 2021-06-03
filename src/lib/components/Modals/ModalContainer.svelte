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
		<div class="modal-title-bar">
			<CloseModalButton on:click={() => toggleModal()} />
		</div>
		<div class="modal-content">
			<div class="modal-heading">
				<slot name="heading" />
			</div>
			<slot name="content" />
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
		@apply flex flex-col border-black border-solid border-t border-r border-b border-l w-auto mx-auto rounded shadow-lg overflow-y-auto z-50;
		max-width: 70%;
		background-color: var(--page-bg-color);
	}

	.modal-title-bar {
		@apply flex flex-row justify-end p-1;
		background-color: var(--modal-title-bar-bg-color);
	}

	.modal-heading {
		@apply flex flex-row justify-between items-start pb-1;
	}

	.modal-content {
		@apply pt-2 pb-3 px-3 text-left w-auto;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		border-radius: 4px;
	}

</style>
