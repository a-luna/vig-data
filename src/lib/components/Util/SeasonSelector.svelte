<script lang="ts">
	import { getAllValidSeasons } from '$lib/api/season';
	import type { ApiResponse, MlbSeason } from '$lib/api/types';
	import { onMount } from 'svelte';
	import Select from '$lib/components/Select/Select.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import { selectedSeason } from '$lib/stores/singleValueStores';

	export let width = '100%';
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
		allSeasons.changeMlbSeasons(getAllSeasonsResult.value);
		currentSeason = $selectedSeason;
		menuLabel = `MLB ${currentSeason}`;
		return getAllSeasonsResult;
	}

	onMount(() => (getAllSeasonsRequest = getAllMlbSeasons()));

	$: if (currentSeason && currentSeason !== $selectedSeason) handleChanged(currentSeason);
	$: if (getAllSeasonsResult?.success) {
		options = $allSeasons.seasons.map((s, i) => ({
			text: s.year.toString(),
			value: s.year,
			optionNumber: i + 1,
			active: $selectedSeason === s.year
		}));
	}

	function handleChanged(season) {
		currentSeason = season;
		menuLabel = `MLB ${currentSeason}`;
		$selectedSeason = currentSeason;
	}

</script>

{#if getAllSeasonsRequest}
	{#await getAllSeasonsRequest}
		<Select {menuLabel} options={placeHolderMenuOption} />
	{:then _result}
		{#if getAllSeasonsResult.success}
			<Select
				{menuLabel}
				{options}
				{menuId}
				{width}
				on:changed={(event) => handleChanged(event.detail)}
			/>
		{:else}
			<div class="error">Error: {getAllSeasonsResult.message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error.message}</div>
	{/await}
{:else}
	<Select {menuLabel} options={placeHolderMenuOption} />
{/if}
