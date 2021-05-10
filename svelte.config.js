import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
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
				noExternal: []
			},
			optimizeDeps: {
				include: ['layercake']
			}
		}
	}
};

export default config;
