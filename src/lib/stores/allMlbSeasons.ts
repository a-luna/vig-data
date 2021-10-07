import { derived } from 'svelte/store';
import { createLocalStorageValue } from './util';

export const allSeasons = createLocalStorageValue('all-seasons', []);

export const mostRecentSeason = derived(allSeasons, ($allSeasons) => {
	if ($allSeasons) {
		const sorted = $allSeasons.sort((a, b) => b.year - a.year);
		return sorted[0];
	}
	return null;
});
