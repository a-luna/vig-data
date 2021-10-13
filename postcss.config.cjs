const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss')

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
	plugins: [
		// Some plugins, like postcss-nested, need to run before Tailwind

		tailwindcss,

		// But others, like autoprefixer, need to run after

		autoprefixer,

		!dev &&
      purgecss({
        content: ['./**/*.html', './**/*.svelte'],
        defaultExtractor: content => {
            const regExp = new RegExp(/[A-Za-z0-9-_:/]+/g);

            const matchedTokens = [];

            let match = regExp.exec(content);
            // To make sure that you do not lose any tailwind classes used in class directive.
            // https://github.com/tailwindcss/discuss/issues/254#issuecomment-517918397
            while (match) {
                if (match[0].startsWith('class:')) {
                    matchedTokens.push(match[0].substring(6));
                } else {
                    matchedTokens.push(match[0]);
                }

                match = regExp.exec(content);
            }

            return matchedTokens;
        },
    }),
	]
};
