// tailwind.config.mjs
import tailwindTypography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				cyan: {
					970: 'rgb(3 22 29)',
					"site-theme": "#001814",
				},
				orange: {
					"site-theme": "#F4511E"
				}
			}
		},
		fontFamily: {
			sans: ["Fira Sans", ...defaultTheme.fontFamily.sans],
			mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
		},
	},
	plugins: [tailwindTypography],
	darkMode: ["selector"],
};
