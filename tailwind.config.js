/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Crafty Girls"', "cursive", "system-ui", "sans-serif"],
        crafty: ['"Crafty Girls"', "cursive"],
      },
    },
  },
  plugins: [],
};
