/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			sm: { min: "350px", max: "640px" },
			// => @media (min-width: 640px and max-width: 767px) { ... }

			md: { min: "640px", max: "1023px" },
			// => @media (min-width: 768px and max-width: 1023px) { ... }

			lg: { min: "1024px", max: "1279px" },
			// => @media (min-width: 1024px and max-width: 1279px) { ... }

			xl: { min: "1290px", max: "1535px" },
			// => @media (min-width: 1280px and max-width: 1535px) { ... }

			"2xl": { min: "1536px" },
		},
		extend: {
			colors: {
				"primary-color": "#444444",
				"text-color-white": "#fff",
				"text-color-gray": "#444",
				"background-color": "#604949",
				"text-color-active": "#d32e1d",
				"background-color-active": "#d32e1d",
				"text-color-title": "#01b22a",
				"text-color-error": "red",
			},
		},
	},
	plugins: [],
};
