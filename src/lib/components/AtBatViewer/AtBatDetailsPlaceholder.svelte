<script lang="ts">
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';

	$: totalWidth =
		$pageBreakPoints.width < 550
			? '280px'
			: $pageBreakPoints.width < 640
			? '276.42px'
			: $pageBreakPoints.width < 1024
			? '300px'
			: '350px';
	$: totalHeight =
		$pageBreakPoints.width < 550
			? '148px'
			: $pageBreakPoints.width < 640
			? '207.5px'
			: $pageBreakPoints.width < 1024
			? '260.75px'
			: '304px';
	$: detailsTopHeight =
		$pageBreakPoints.width < 550
			? '57px'
			: $pageBreakPoints.width < 640
			? '57px'
			: $pageBreakPoints.width < 1024
			? '60px'
			: '63px';
	$: pitchSeqHeight =
		$pageBreakPoints.width < 550
			? 'calc(27px + 2.5rem)'
			: $pageBreakPoints.width < 640
			? '121.5px'
			: $pageBreakPoints.width < 1024
			? '170.25px'
			: '208px';
	$: playDescHeight =
		$pageBreakPoints.width < 550
			? '23.5px'
			: $pageBreakPoints.width < 640
			? '23.5px'
			: $pageBreakPoints.width < 1024
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
