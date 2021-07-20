<script lang="ts">
	import { getAllValidSeasons } from '$lib/api/season';
	import type { ApiResponse, MlbSeason } from '$lib/api/types';
	import Select from '$lib/components/Select/Select.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import type { SelectMenuOption } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	export let width = 'auto';
	export let currentSeason: number = 0;
	let seasons: MlbSeason[];
	let options: SelectMenuOption[] = [];
	let getAllSeasonsRequest: Promise<ApiResponse<MlbSeason[]>>;
	let getAllSeasonsResult: ApiResponse<MlbSeason[]>;
	let menuLabel = 'Select Season';
	let menuId = 'season';
	const placeHolderMenuOption = [{ text: '', value: 0, optionNumber: 1, active: false }];
	const dispatch = createEventDispatcher();

	$: menuLabel = currentSeason > 0 ? `MLB ${currentSeason}` : 'Select Season';

	async function getAllMlbSeasons(): Promise<ApiResponse<MlbSeason[]>> {
		getAllSeasonsResult = await getAllValidSeasons();
		if (!getAllSeasonsResult.success) {
			return getAllSeasonsResult;
		}
		seasons = getAllSeasonsResult.value;
		allSeasons.changeMlbSeasons(seasons);
		return getAllSeasonsResult;
	}

	onMount(() => (getAllSeasonsRequest = getAllMlbSeasons()));

	$: if (getAllSeasonsResult?.success) {
		options = seasons.map((s, i) => ({
			text: s.year.toString(),
			value: s.year,
			optionNumber: i + 1,
			active: currentSeason === s.year
		}));
	}

	function handleChanged(selectedSeason: number) {
		currentSeason = selectedSeason;
		dispatch('changed', selectedSeason);
	}
</script>

{#if getAllSeasonsRequest}
	{#await getAllSeasonsRequest}
		<Select {menuLabel} options={placeHolderMenuOption} />
	{:then _result}
		{#if getAllSeasonsResult.success}
			<Select {menuLabel} {options} {menuId} {width} on:changed={(e) => handleChanged(e.detail)} />
		{:else}
			<div class="error">Error: {getAllSeasonsResult.message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error.message}</div>
	{/await}
{:else}
	<Select {menuLabel} options={placeHolderMenuOption} />
{/if}
