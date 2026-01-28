export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				bricolage: ["var(--font-bricolage)", "sans-serif"],
			}
		},
	},
};