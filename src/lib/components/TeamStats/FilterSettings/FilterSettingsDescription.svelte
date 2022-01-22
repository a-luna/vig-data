<script lang="ts">
	import { DEF_POS_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import type { TeamStatFilter } from '$lib/types';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';

	export let settings: TeamStatFilter;
	export let showFilters: boolean = false;
	export let loading: boolean = false;

	$: league = settings.league === 'both' ? 'AL & NL' : settings.league.toUpperCase();
	$: splitTitle = settings.statType === 'bat' ? getBatStatSplitTitle() : 'Split';
	$: splitSetting = settings.statType === 'bat' ? getBatStatSplitSetting() : getPitchStatSplitSetting();

	function getBatStatSplitTitle(): string {
		if (settings.batStatSplit === 'all') {
			return 'Split';
		}
		if (settings.batStatSplit === 'starters') {
			return 'Split';
		}
		if (settings.batStatSplit === 'subs') {
			return 'Split';
		}
		if (settings.batStatSplit === 'batorder') {
			return `Bat Order`;
		}
		if (settings.batStatSplit === 'defpos') {
			return `Def. Position`;
		}
	}

	function getBatStatSplitSetting(): string {
		if (settings.batStatSplit === 'all') {
			return 'All At Bats';
		}
		if (settings.batStatSplit === 'starters') {
			return 'Starting Lineup';
		}
		if (settings.batStatSplit === 'subs') {
			return 'Bench/Subs';
		}
		if (settings.batStatSplit === 'batorder') {
			return settings.batOrder.sort((a, b) => a - b).join(', ');
		}
		if (settings.batStatSplit === 'defpos') {
			const defPosAbbrevs = settings.defPosition.sort((a, b) => a - b).map((def) => DEF_POS_NUM_TO_ABBREV_MAP[def]);
			return defPosAbbrevs.join(', ');
		}
	}

	function getPitchStatSplitSetting(): string {
		if (settings.pitchStatSplit === 'all') {
			return 'All Pitch Appearances';
		}
		if (settings.pitchStatSplit === 'sp') {
			return 'SP Only';
		}
		if (settings.pitchStatSplit === 'rp') {
			return 'RP Only';
		}
	}

	function handleClick() {
		if (!loading) {
			showFilters = !showFilters;
		}
	}
</script>

<div
	class:disabled={loading}
	class:change-settings={!loading}
	class="flex flex-row flex-wrap items-center justify-start w-full text-sm leading-none tracking-wider cursor-pointer"
>
	<div
		class="block w-4 h-4 my-auto ml-1 cursor-pointer stroke-current stroke-2"
		title="Change Settings"
		on:click={() => handleClick()}
	>
		<MdSettings />
	</div>
	<div class="flex flex-row flex-nowrap items-end justify-start mt-1 mb-0.5" on:click={() => handleClick()}>
		<strong class="filter-label ml-1.5 mr-1">Year</strong><span class="filter-value">{settings.season},</span>
	</div>
	<div class="flex flex-row flex-nowrap items-end justify-start mt-1 mb-0.5" on:click={() => handleClick()}>
		<strong class="ml-2 mr-1 filter-label">League</strong><span class="filter-value">{league},</span>
	</div>
	<div class="flex flex-row flex-nowrap items-end justify-start mt-1 mb-0.5" on:click={() => handleClick()}>
		<strong class="ml-2 mr-1 filter-label">{splitTitle}</strong><span class="filter-value">{splitSetting}</span>
	</div>
</div>

<style lang="postcss">
	.change-settings {
		color: var(--sec-color);
	}

	.disabled,
	.disabled .filter-label,
	.disabled .filter-value {
		cursor: default;
		color: var(--team-stat-filter-query-sent);
	}

	.filter-label {
		font-weight: 700;
		color: var(--sec-color);
	}

	.filter-value {
		font-weight: 400;
		color: var(--sec-color);
	}
</style>
