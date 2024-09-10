import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"tv-color-bar":
					"linear-gradient(to right, white calc(100% / 7), yellow calc(100% / 7) calc(100% / 7 * 2), aqua calc(100% / 7 * 2) calc(100% / 7 * 3), lime calc(100% / 7 * 3) calc(100% / 7 * 4), fuchsia calc(100% / 7 * 4) calc(100% / 7 * 5), red calc(100% / 7 * 5) calc(100% / 7 * 6), blue calc(100% / 7 * 6) 100%)",
			},
		},
	},
	plugins: [],
};
export default config;
