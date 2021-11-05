import type { MlbSeason } from '$lib/api/types';
import { derived, writable } from 'svelte/store';

export const allSeasons = writable<MlbSeason[]>([]);

export const mostRecentSeason = derived(allSeasons, ($allSeasons) => {
	if ($allSeasons) {
		const sorted = $allSeasons.sort((a, b) => b.year - a.year);
		return sorted[0];
	}
	return null;
});
