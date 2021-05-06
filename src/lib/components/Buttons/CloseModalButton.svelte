<script lang="ts">
	import Icon, { X } from 'svelte-hero-icons';
</script>

<button class="text-black  hover:text-gray-900 z-50" title="Close" on:click>
	<Icon src={X} size="20px" />
</button>

<style lang="postcss">
	button {
		margin: auto 0;
	}
</style>
