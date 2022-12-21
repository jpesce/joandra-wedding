const { fontFamily } = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        joanGreen: {
          500: "#0AED72"
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', ...fontFamily.serif],
        condensed: ['var(--font-condensed)', ...fontFamily.sans]
      },
  },
  plugins: [
  ],
};
