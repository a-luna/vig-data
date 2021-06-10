import type { MlbSeason } from '$lib/api/types';
import type { AllMlbSeasons, AllMlbSeasonsStore } from '$lib/types';
import { writable } from 'svelte/store';

function createAllMlbSeasonsStore(): AllMlbSeasonsStore {
	const { subscribe, update } = writable<AllMlbSeasons>({ seasons: [] });

	return {
		subscribe,
		changeMlbSeasons: (seasons: MlbSeason[]) => update((allMlbSeasons) => ({ ...allMlbSeasons, seasons: seasons }))
	};
}

export const allSeasons = createAllMlbSeasonsStore();
