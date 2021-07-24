import { getMostRecentScrapedDate } from '$lib/api/season';
import type { ScoreboardDateStore } from '$lib/types';
import { writable } from 'svelte/store';

function scoreboardDateStore(): ScoreboardDateStore {
	const { subscribe, set, update } = writable<Date>(null, (set) => {
		getMostRecentScrapedDate()
			.then(set)
			.catch((err) => {
				console.error('Failed to fetch most recent scraped date!', err);
			});
		return () => {
			//
		};
	});

	function getNextDay(date: Date): Date {
		const result = new Date(date);
		result.setDate(result.getDate() + 1);
		return result;
	}

	function getPrevDay(date: Date): Date {
		const result = new Date(date);
		result.setDate(result.getDate() - 1);
		return result;
	}

	return {
		subscribe,
		nextDay: () => update((gameDate) => getNextDay(gameDate)),
		prevDay: () => update((gameDate) => getPrevDay(gameDate)),
		changeDate: (date: Date) => set(date)
	};
}

export const scoreboardDate = scoreboardDateStore();
