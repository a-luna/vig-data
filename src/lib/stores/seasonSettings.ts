import type { SeasonSettings, SeasonSettingsStore, League, SeasonContent } from '$lib/types';
import { writable } from 'svelte/store';

function createSeasonSettingsStore(): SeasonSettingsStore {
	const { subscribe, update } = writable<SeasonSettings>({ league: 'both', show: 'scoreboard' });

	return {
		subscribe,
		changeLeague: (league: League) =>
			update((seasonSettings) => ({ ...seasonSettings, league: league })),
		changeContent: (show: SeasonContent) =>
			update((seasonSettings) => ({ ...seasonSettings, show: show }))
	};
}

export const seasonSettings = createSeasonSettingsStore();
