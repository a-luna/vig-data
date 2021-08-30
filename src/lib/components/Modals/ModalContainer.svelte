<script lang="ts">
	export let hidden: boolean = false;
	export let bgColor: string = null;

	$: backgroundColorRule = getBgColor();

	function getBgColor() {
		return bgColor !== null ? `background-color: ${bgColor}` : 'background-color: var(--page-bg-color)';
	}

	export function toggleModal() {
		hidden = !hidden;
		document.querySelector('body').classList.toggle('modal-active');
	}
</script>

<div class="modal-wrapper" class:opacity-0={!hidden} class:pointer-events-none={!hidden}>
	<div class="modal-overlay" on:click={() => toggleModal()} />
	<div id="modal" class="modal-container" style={backgroundColorRule}>
		<div class="modal-content">
			<div class="modal-heading tracking-wide mb-0.5">
				<slot name="heading" />
			</div>
			<slot name="content" {backgroundColorRule} />
		</div>
		<slot name="buttons">
			<button class="btn btn-secondary" on:click={() => toggleModal()}>Close</button>
		</slot>
	</div>
</div>

<style lang="postcss">
	:global(body.modal-active) {
		overflow-x: hidden;
		overflow-y: visible !important;
	}

	:global(.modal-wrapper) {
		@apply fixed w-full h-full top-0 left-0 flex items-center justify-center z-10;
		transition: opacity 0.4s ease;
	}

	:global(.modal-overlay) {
		@apply absolute w-full h-full bg-gray-900 opacity-50;
	}

	:global(.modal-container) {
		@apply flex flex-col items-end w-auto mx-auto rounded shadow-lg overflow-y-auto z-50 p-3;
		border: 1px solid var(--body-text-color);
		max-width: 90%;
	}

	:global(.modal-heading) {
		@apply flex flex-row justify-between items-start pb-1;
	}

	:global(.modal-content) {
		@apply text-left w-full mx-auto mb-3;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		border-radius: 4px;
		background-color: inherit;
	}

	#modal button {
		@apply text-base leading-tight py-1.5 px-4 m-0;
	}
</style>
