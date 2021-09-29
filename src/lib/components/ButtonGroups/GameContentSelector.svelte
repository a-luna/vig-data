<script lang="ts">
	import { gameContentShown } from '$lib/stores/singleValueStores';
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	const dispatch = createEventDispatcher();

	$: pbpShown = $gameContentShown === 'pbp';
	$: boxShown = $gameContentShown === 'box';
	$: chartsShown = $gameContentShown === 'charts';

	function changeContent(showContent: 'pbp' | 'box' | 'charts') {
		$gameContentShown = showContent;
		dispatch('changed', showContent);
	}
</script>

<div class="btn-group btn-group-secondary mb-5">
	<button type="button" class={`btn btn-${color}`} class:active={boxShown} on:click={() => changeContent('box')}
		>Boxscore</button
	>
	<button type="button" class={`btn btn-${color}`} class:active={pbpShown} on:click={() => changeContent('pbp')}
		>Play-By-Play</button
	>
	<button type="button" class={`btn btn-${color}`} class:active={chartsShown} on:click={() => changeContent('charts')}
		>Charts/Graphs</button
	>
</div>
