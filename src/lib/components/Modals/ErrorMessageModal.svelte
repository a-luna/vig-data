<script lang="ts">
	import ModalContainer from '$lib/components/Modals/ModalContainer.svelte';

	let error: string;
	let modalContainer: ModalContainer;

	export function toggleModal(message: string) {
		error = message;
		modalContainer.toggleModal();
	}
</script>

<ModalContainer bind:this={modalContainer}>
	<div slot="content" class="responsive">
		{error}
	</div>
</ModalContainer>

<style lang="postcss">
	/* your styles go here */
</style>
