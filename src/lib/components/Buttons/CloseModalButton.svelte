<script lang="ts">
	import MdClose from 'svelte-icons/md/MdClose.svelte';

</script>

<button class="z-50" title="Close" on:click>
	<MdClose />
</button>

<style lang="postcss">
	button {
		color: var(--nav-button-text-color);
		margin: auto 0;
		width: 20px;
		height: 20px;
	}

	button:hover {
		color: var(--nav-button-text-color-hov);
	}

</style>
