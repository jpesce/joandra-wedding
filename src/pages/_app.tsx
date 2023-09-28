import "smoothscroll-polyfill";

import type { AppProps } from "next/app";
import type { AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";
import { serif, condensed } from "../fonts/localFonts";

const App: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${serif.variable} ${condensed.variable}`}>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
