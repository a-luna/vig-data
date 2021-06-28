<script lang="ts">
	import { getAllValidSeasons } from '$lib/api/season';
	import type { ApiResponse, MlbSeason } from '$lib/api/types';
	import Select from '$lib/components/Select/Select.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { SelectMenuOption } from '$lib/types';
	import { onMount } from 'svelte';

	export let width = '100%';
	let seasons: MlbSeason[];
	let currentSeason: number;
	let options: SelectMenuOption[] = [];
	let getAllSeasonsRequest: Promise<ApiResponse<MlbSeason[]>>;
	let getAllSeasonsResult: ApiResponse<MlbSeason[]>;
	let menuLabel = 'Select Season';
	let menuId = 'season';
	const placeHolderMenuOption = [{ text: '', value: 0, optionNumber: 1, active: false }];

	async function getAllMlbSeasons(): Promise<ApiResponse<MlbSeason[]>> {
		getAllSeasonsResult = await getAllValidSeasons();
		if (!getAllSeasonsResult.success) {
			return getAllSeasonsResult;
		}
		seasons = getAllSeasonsResult.value;
		allSeasons.changeMlbSeasons(seasons);
		currentSeason = $seasonStatFilter.season;
		menuLabel = `MLB ${currentSeason}`;
		return getAllSeasonsResult;
	}

	onMount(() => (getAllSeasonsRequest = getAllMlbSeasons()));

	$: if (currentSeason && currentSeason !== $seasonStatFilter.season) handleChanged(currentSeason);
	$: if (getAllSeasonsResult?.success) {
		options = seasons.map((s, i) => ({
			text: s.year.toString(),
			value: s.year,
			optionNumber: i + 1,
			active: $seasonStatFilter.season === s.year
		}));
	}

	function handleChanged(season: number) {
		currentSeason = season;
		menuLabel = `MLB ${currentSeason}`;
		seasonStatFilter.changeSeason(currentSeason);
	}
</script>

{#if getAllSeasonsRequest}
	{#await getAllSeasonsRequest}
		<Select {menuLabel} options={placeHolderMenuOption} />
	{:then _result}
		{#if getAllSeasonsResult.success}
			<Select {menuLabel} {options} {menuId} {width} on:changed={(event) => handleChanged(event.detail)} />
		{:else}
			<div class="error">Error: {getAllSeasonsResult.message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error.message}</div>
	{/await}
{:else}
	<Select {menuLabel} options={placeHolderMenuOption} />
{/if}
