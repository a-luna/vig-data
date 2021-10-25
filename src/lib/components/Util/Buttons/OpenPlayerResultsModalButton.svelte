<script lang="ts">
	import IoIosBaseball from 'svelte-icons/io/IoIosBaseball.svelte';

</script>

<button title="View Stat Table for Player" on:click>
	<IoIosBaseball />
</button>

<style lang="postcss">
	button {
		color: var(--player-results-modal-button-color);
		margin: auto 0;
		width: 16px;
		height: 16px;
	}

	button:hover {
		color: var(--player-results-modal-button-color-hov);
	}

</style>
