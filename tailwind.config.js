/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screen: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				"primary-500": "#877EFF",
				"primary-600": "#5D5FEF",
				"secondary-500": "#FFB620",
				"off-white": "#D0DFFF",
				red: "#FF5A5A",
				"dark-1": "#000000",
				"dark-2": "#09090A",
				"dark-3": "#101012",
				"dark-4": "#1F1F22",
				"light-1": "#FFFFFF",
				"light-2": "#EFEFEF",
				"light-3": "#7878A3",
				"light-4": "#5C5C7B",
			},
			screen: {
				xs: "480px",
			},
			width: {
				420: "420px",
				465: "465px",
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
