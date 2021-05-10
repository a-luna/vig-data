<script lang="ts">
	import MdClose from 'svelte-icons/md/MdClose.svelte';
</script>

<button class="text-black  hover:text-gray-900 z-50" title="Close" on:click>
	<MdClose />
</button>

<style lang="postcss">
	button {
		margin: auto 0;
		width: 20px;
		height: 20px;
	}
</style>
