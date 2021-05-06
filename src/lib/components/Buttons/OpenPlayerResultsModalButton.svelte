<script lang="ts">
	import Icon, { PlusCircle } from 'svelte-hero-icons';
</script>

<button class="text-indigo-600 hover:text-indigo-700" title="View Stat Table for Player" on:click>
	<Icon src={PlusCircle} solid size="16px" />
</button>

<style lang="postcss">
	button {
		margin: auto 0;
	}
</style>
