<script lang="ts">
	import { getAllValidSeasons } from '$lib/api/season';
	import type { ApiResponse, MlbSeason } from '$lib/api/types';
	import { onMount } from 'svelte';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';

	export let selectedSeason: number;
	let success: boolean;
	let seasonOptions: { text: string; value: number }[] = [];
	let getAllSeasonsRequest: Promise<ApiResponse<MlbSeason[]>>;

	async function getAllMlbSeasons(): Promise<ApiResponse<MlbSeason[]>> {
		const result = await getAllValidSeasons();
		success = result.success;
		if (!success) {
			return result;
		}
		seasonOptions = [];
		result.value.map((s) => seasonOptions.push({ text: s.year.toString(), value: s.year }));
		selectedSeason = seasonOptions[seasonOptions.length - 1].value;
	}

	onMount(() => (getAllSeasonsRequest = getAllMlbSeasons()));

</script>

{#if getAllSeasonsRequest}
	{#await getAllSeasonsRequest}
		<div class="pending"><SyncLoader size="40" color="#5000e6" /></div>
	{:then result}
		{#if success}
			<label for="season-select" class="mr-2">Season:</label>
			<select class="mr-2" bind:value={selectedSeason}>
				{#each seasonOptions as year}
					<option value={year.value}>{year.text}</option>
				{/each}
			</select>
		{:else}
			<div class="error">Error: {result.message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error.message}</div>
	{/await}
{:else}
	<label for="season-select">Season:</label>
	<select class="placeholder" />
{/if}

<style lang="postcss">
	.placeholder {
		width: 68px;
	}

</style>
