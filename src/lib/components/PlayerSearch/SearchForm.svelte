<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let query: string;
	const dispatch = createEventDispatcher();
</script>

<form on:submit|preventDefault={() => dispatch('searchRequest', query)}>
	<input id="query" name="query" type="text" bind:value={query} />
	<button class="btn btn-primary">Search</button>
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		margin: 0 0 10px;
	}

	input {
		flex: 1 0;
	}

	.btn {
		margin: 0 0 0 10px;
	}
</style>
