/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'light-bg': 'hsl(0, 0%, 98%)',
				'dark-bg': 'hsl(207, 26%, 17%)',

				'dark-el': 'hsl(209, 23%, 22%)',
				'light-input': 'hsl(0, 0%, 52%)',

				'light-text': 'hsl(200, 15%, 8%)',
				'dark-text': 'hsl(0, 0%, 100%)'
			}
		},
		fontFamily: {
			sans: 'Nunito Sans Variable'
		}
	},
	plugins: []
};
