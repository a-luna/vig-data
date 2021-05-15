<script lang="ts">
	import { contentShown } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';

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
		class="btn"
		class:btn-outline-primary={!boxShown}
		class:btn-primary={boxShown}
		on:click={() => changeVisibleContent('box')}>Boxscore</button
	>
	<button
		type="button"
		class="btn"
		class:btn-outline-primary={!pbpShown}
		class:btn-primary={pbpShown}
		on:click={() => changeVisibleContent('pbp')}>Play-By-Play</button
	>
	<button
		type="button"
		class="btn"
		class:btn-outline-primary={!chartsShown}
		class:btn-primary={chartsShown}
		on:click={() => changeVisibleContent('charts')}>Charts/Graphs</button
	>
</div>
