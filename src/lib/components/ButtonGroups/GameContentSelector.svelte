<script lang="ts">
	import { contentShown } from '$lib/stores';

	$: pbpShown = $contentShown === 'pbp';
	$: boxShown = $contentShown === 'box';
	$: chartsShown = $contentShown === 'charts';
</script>

<div class="btn-group mb-5">
	<button
		type="button"
		class="btn"
		class:btn-outline-primary={!boxShown}
		class:btn-primary={boxShown}
		on:click={() => ($contentShown = 'box')}>Boxscore</button
	>
	<button
		type="button"
		class="btn"
		class:btn-outline-primary={!pbpShown}
		class:btn-primary={pbpShown}
		on:click={() => ($contentShown = 'pbp')}>Play-By-Play</button
	>
	<button
		type="button"
		class="btn"
		class:btn-outline-primary={!chartsShown}
		class:btn-primary={chartsShown}
		on:click={() => ($contentShown = 'charts')}>Charts/Graphs</button
	>
</div>
