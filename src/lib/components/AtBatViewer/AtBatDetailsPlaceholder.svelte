<script lang="ts">
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';

	$: totalWidth =
		$pageWidth.current < 550
			? '280px'
			: $pageWidth.current < 640
			? '276.42px'
			: $pageWidth.current < 1024
			? '300px'
			: '350px';
	$: totalHeight =
		$pageWidth.current < 550
			? '148px'
			: $pageWidth.current < 640
			? '207.5px'
			: $pageWidth.current < 1024
			? '260.75px'
			: '304px';
	$: detailsTopHeight =
		$pageWidth.current < 550 ? '57px' : $pageWidth.current < 640 ? '57px' : $pageWidth.current < 1024 ? '60px' : '63px';
	$: pitchSeqHeight =
		$pageWidth.current < 550
			? 'calc(27px + 2.5rem)'
			: $pageWidth.current < 640
			? '121.5px'
			: $pageWidth.current < 1024
			? '170.25px'
			: '208px';
	$: playDescHeight =
		$pageWidth.current < 550
			? '23.5px'
			: $pageWidth.current < 640
			? '23.5px'
			: $pageWidth.current < 1024
			? '24.75px'
			: '27px';
</script>

<div class="flex flex-col" style="height: {totalHeight}; width: {totalWidth}">
	<div class="at-bat-details-top py-0.5">
		<div class="at-bat-matchup" style="height: {detailsTopHeight}" />
		<div class="at-bat-context" style="height: {detailsTopHeight}" />
	</div>
	<div class="flex-grow-0 at-bat-details">
		<div class="at-bat-pitch-sequence responsive-vert" style="height: {pitchSeqHeight}">
			<Spinner />
		</div>
		<div class="text-sm text-center play_description py-0.5" style="height: {playDescHeight}" />
	</div>
</div>

<style lang="postcss">
	.at-bat-details-top {
		flex: 0;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;

		color: var(--body-text-color);
		background-color: var(--pseq-top-bg-color);

		border-left: none;
		border-right: none;
		border: 1px solid var(--pseq-outer-border-color);
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}

	.at-bat-matchup,
	.at-bat-context {
		flex: 0;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;

		padding: 3px 5px;
		line-height: 1.4;
	}

	.at-bat-pitch-sequence {
		@apply flex flex-col flex-nowrap justify-between flex-grow px-2;
		background-color: var(--ploc-chart-bg-color);
		border-right: 1px solid var(--pseq-outer-border-color);
		border-left: 1px solid var(--pseq-outer-border-color);
	}

	.play_description {
		color: var(--body-text-color);
		background-color: var(--pseq-bottom-bg-color);
		border: 1px solid var(--pseq-outer-border-color);
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}
</style>
