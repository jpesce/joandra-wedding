/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        joanGreen: {
          50: "#E7F9EF",
          550: "#00D070",
          600: "#00BB65",
        },
        white: "#FFFFFF",
        black: "#000000",
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
        "fade-in": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        "fade-in-up": {
          from: {
            opacity: 0,
            transform: "translate3d(0, 1.5rem, 0)",
          },
          to: {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out 2",
        "fade-in": "fade-in 4s ease-in-out 1",
        "fade-in-up": "fade-in-up 0.25s ease-in-out 1",
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
