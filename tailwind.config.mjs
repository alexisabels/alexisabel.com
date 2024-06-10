/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				'light-gradient': "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(217,216,255,0.9), rgba(255,255,255,0.9)",
				'dark-gradient': "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.9), rgba(255,255,255,0))"
			}
		},
	},
	plugins: [],
}
