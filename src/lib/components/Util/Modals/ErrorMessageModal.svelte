<script lang="ts">
	import ModalContainer from '$lib/components/Util/ModalContainer.svelte';

	export let error: string = '';
	let modalContainer: ModalContainer;

	$: if (error) modalContainer.toggleModal();

	export function toggleModal(message: string) {
		error = message;
		modalContainer.toggleModal();
	}
</script>

<ModalContainer bind:this={modalContainer}>
	<div slot="heading">Error!</div>
	<div slot="content" class="responsive">
		{error}
	</div>
</ModalContainer>

<style lang="postcss">
	/* your styles go here */
</style>
