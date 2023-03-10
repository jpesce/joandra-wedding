import localFont from "@next/font/local";

const serif = localFont({
  src: [
    {
      path: "../fonts/serif-regular.woff2",
      style: "normal",
    },
    {
      path: "../fonts/serif-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

const condensed = localFont({
  src: [
    {
      path: "../fonts/condensed.woff2",
      style: "normal",
    },
  ],
  variable: "--font-condensed",
  display: "swap",
});

export { serif, condensed };
