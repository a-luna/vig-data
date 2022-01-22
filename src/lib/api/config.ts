import { dev } from '$app/env';
import { apiSource } from '$lib/stores/singleValueStores';
import type { ApiSource } from '$lib/types';

const API_URL_ROOT_DEV = 'http://localhost:8000/api';
const API_URL_ROOT_PROD = 'https://vig-api.aaronluna.dev/api';
export const API_URL_ROOT = dev ? API_URL_ROOT_DEV : API_URL_ROOT_PROD;
export const API_VERSION = 'v1';

export function useMockApiData(): boolean {
	if (!dev) return false;
	let api: ApiSource;
	const unsubscribe = apiSource.subscribe((value) => (api = value));
	unsubscribe();
	return api === 'mock';
}
