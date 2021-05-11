import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';

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
		adapter: netlify(),
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
