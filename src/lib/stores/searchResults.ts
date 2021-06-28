import type { PlayerSearchResult } from '$lib/api/types';
import type { SearchResults, SearchResultsStore } from '$lib/types';
import { writable } from 'svelte/store';

function createSearchResultsStore(): SearchResultsStore {
	const { subscribe, update } = writable<SearchResults>({ results: [] });

	return {
		subscribe,
		changeSearchResults: (results: PlayerSearchResult[]) =>
			update((searchResults) => ({ ...searchResults, results: results }))
	};
}

export const searchResults = createSearchResultsStore();
