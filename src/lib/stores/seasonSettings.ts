import { writable } from 'svelte/store';
import type { SeasonSettings, SeasonSettingsStore, League, SeasonContent } from '$lib/types';

function createSeasonSettingsStore(): SeasonSettingsStore {
	const { subscribe, update } = writable<SeasonSettings>({ league: 'both', show: 'standings' });

	return {
		subscribe,
		changeLeague: (league: League) => update((seasonSettings) => ({ ...seasonSettings, league: league })),
		changeContent: (show: SeasonContent) => update((seasonSettings) => ({ ...seasonSettings, show: show }))
	};
}

export const seasonSettings = createSeasonSettingsStore();
