import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		target: '#svelte',
		prerender: {
			crawl: false,
			enabled: true,
			entries: ['*'],
			onError: 'continue'
		},
		vite: {
			ssr: {
				noExternal: []
			},
			optimizeDeps: {
				include: ['layercake', 'fuzzy']
			}
		}
	}
};

export default config;
