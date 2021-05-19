<script lang="ts">
	import { contentShown } from '$lib/stores';
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'indigo';
	const dispatch = createEventDispatcher();

	$: pbpShown = $contentShown === 'pbp';
	$: boxShown = $contentShown === 'box';
	$: chartsShown = $contentShown === 'charts';

	function changeVisibleContent(showContent: 'pbp' | 'box' | 'charts') {
		$contentShown = showContent;
		dispatch('showGameContent', showContent);
	}

</script>

<div class="btn-group mb-5">
	<button
		type="button"
		class={boxShown ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => changeVisibleContent('box')}>Boxscore</button
	>
	<button
		type="button"
		class={pbpShown ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => changeVisibleContent('pbp')}>Play-By-Play</button
	>
	<button
		type="button"
		class={chartsShown ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => changeVisibleContent('charts')}>Charts/Graphs</button
	>
</div>
