import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import {kitDocsPlugin} from '@svelteness/kit-docs/node'
import Icons from 'unplugin-icons/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		vite:{
			optimizeDeps: {
				exclude: ['@urql/svelte', '@urql/core'],
			  },

			  plugins: [
				  Icons({compiler: 'svelte'}),
				  kitDocsPlugin({
					  shiki: {
						  theme: 'material-ocean'
					  },
				  }),
			  ],
			
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
