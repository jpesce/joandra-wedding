const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        joanGreen: {
          500: "#0AED72",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", ...fontFamily.serif],
        condensed: ["var(--font-condensed)", ...fontFamily.sans],
      },
      keyframes: {
        wiggle: {
          "0%, 50%": { transform: "rotate(0)" },
          "25%": { transform: "rotate(-4deg)" },
          "75%": { transform: "rotate(4deg)" },
        },
        enter: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out 2",
        "fade-in": "enter 4s ease-in-out 1",
      },
    },
  },
  plugins: [
    // Add selection variant from ::selection pseudo-element
    plugin(({ addVariant, e }) => {
      addVariant("selection", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`selection${separator}${className}`)} ::selection`;
        });
      });
    }),
  ],
};
