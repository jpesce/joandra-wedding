import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";
import localFont from "@next/font/local";
const serif = localFont({
  src: [
    {
      path: '../fonts/serif-regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/serif-italic.woff',
      weight: '400',
      style: 'italic'
    },
  ],
  variable: '--font-serif'
});
const condensed = localFont({
  src: [
    {
      path: '../fonts/condensed.woff2',
      weight: '400',
      style: 'normal'
    },
  ],
  variable: '--font-condensed'
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${serif.variable} ${condensed.variable}`}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
