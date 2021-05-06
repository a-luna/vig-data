import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			defaults: {
				style: 'postcss'
			},
			postcss: true
		})
	],

	kit: {
		adapter: node(),
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: {}
			},
			optimizeDeps: {
				include: ['svelte-calendar', 'svelte-hero-icons', 'svelte-loading-spinners']
			}
		}
	}
};

export default config;
