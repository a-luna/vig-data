<script>
	import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
	import { createEventDispatcher } from 'svelte/internal';
	import { playerMap } from './player_search';

	export let name = '';
	export let query = '';
	export let playerNames = Object.keys(playerMap);
	export let classList = '';
	export let placeholder = '';
	export let minSearchLength = 2;
	export let maxItems = 10;
	export let fromStart = false;
	export let required = false;
	export let disabled = false;
	export let isOpen = false;
	export let all_results = [];
	export let results = [];
	const dispatch = createEventDispatcher();
	let arrowCounter = 0;
	let list;
	let input;

	function sanitize(s) {
		return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
	}

	function onChange(event) {
		if (query.length >= minSearchLength) {
			filterResults();
			isOpen = true;
		} else if (isOpen) {
			results = [];
			all_results = [];
			isOpen = false;
		}
	}

	function filterResults() {
		all_results = playerNames
			.filter((name) => {
				return fromStart
					? name.toUpperCase().startsWith(query.toUpperCase())
					: name.toUpperCase().includes(query.toUpperCase());
			})
			.map((name) => {
				return {
					key: name,
					value: playerMap[name],
					label: query.trim() === '' ? name : name.replace(RegExp(sanitize(query.trim()), 'i'), '<span>$&</span>')
				};
			});

		results = all_results.length <= maxItems ? all_results : all_results.slice(0, maxItems);
		results = [{ key: '', value: 999999, label: `Search for "${query}"` }, ...results];
		const height = results.length > maxItems ? maxItems : results.length;
		list.style.height = `${(height + 1) * 2}rem`;
	}

	function onKeyDown(event) {
		if (event.keyCode === 40 && arrowCounter < results.length) {
			// ArrowDown
			arrowCounter = arrowCounter + 1;
		} else if (event.keyCode === 38 && arrowCounter > 0) {
			// ArrowUp
			arrowCounter = arrowCounter - 1;
		} else if (event.keyCode === 13) {
			// Enter
			event.preventDefault();
			handleUserSelection(arrowCounter);
		} else if (event.keyCode === 27) {
			// Escape
			event.preventDefault();
			close();
		}
	}

	function handleUserSelection(index = -1) {
		if (index === -1 || index >= results.length) {
			close();
			return;
		}
		if (index === 0) {
			const mlbIds = all_results.map((r) => r.value);
			dispatch('showSearchResults', mlbIds);
			query = '';
		} else {
			dispatch('showPlayerPage', results[index].value);
			query = '';
		}
		close();
	}

	function close() {
		isOpen = false;
		arrowCounter = -1;
		input.blur();
	}
</script>

<svelte:window on:click={() => close()} />

<form method="GET" class="w-full mt-1 sm:mt-0 sm:ml-4">
	<div class="relative w-full" on:click={(event) => event.stopPropagation()}>
		<span class="absolute py-0 pl-1 search-icon">
			<button type="submit" class="p-0 focus:outline-none focus:shadow-outline">
				<FaSearch />
			</button>
		</span>
		<input
			type="text"
			class={classList}
			{name}
			{placeholder}
			{required}
			{disabled}
			autocomplete={name}
			bind:this={input}
			bind:value={query}
			on:input={(e) => onChange(e)}
			on:keydown={(e) => onKeyDown(e)}
			on:focus
			on:blur
		/>
		<ul class="autocomplete-results{!isOpen ? ' hide-results' : ''}" bind:this={list}>
			{#each results as result, i}
				<li on:click={() => handleUserSelection(i)} class="autocomplete-result{i === arrowCounter ? ' is-active' : ''}">
					{@html result.label}
				</li>
			{/each}
		</ul>
	</div>
</form>

<style lang="postcss">
	.search-icon {
		color: var(--search-icon-color);
		top: 0.45rem;
		left: 0.3rem;
		width: 1.3rem;
		height: 1.3rem;
	}

	input {
		background-color: var(--search-bg-color);
		color: var(--search-text-color);
	}

	input:focus {
		background-color: var(--search-bg-color-focus);
		color: var(--search-text-color-focus);
		outline: 2px solid var(--search-focus-outline-color);
		offset: 0;
	}

	.hide-results {
		display: none;
	}

	.autocomplete-results {
		padding: 0;
		margin: 0;
		border: 1px solid #dbdbdb;
		height: 6rem;
		overflow: auto;
		width: 100%;

		background-color: white;
		box-shadow: 2px 2px 24px rgba(0, 0, 0, 0.1);
		position: absolute;
		z-index: 100;
	}

	.autocomplete-result {
		color: #7a7a7a;
		list-style: none;
		text-align: left;
		height: 2rem;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
	}

	.autocomplete-result > :global(span) {
		background-color: none;
		color: #242424;
		font-weight: bold;
	}

	.autocomplete-result.is-active,
	.autocomplete-result:hover {
		background-color: #dbdbdb;
	}
</style>
