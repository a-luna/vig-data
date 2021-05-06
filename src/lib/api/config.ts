import { dev } from '$app/env';

export const API_URL_ROOT = dev ? 'http://localhost:8000/api' : 'https://vig-api.aaronluna.dev/api';
export const API_VERSION = 'v1';
