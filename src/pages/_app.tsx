import { useEffect } from "react";

import type { AppProps } from "next/app";
import type { AppType } from "next/dist/shared/lib/utils";

import { polyfill as smoothScrollPolyfill } from "smoothscroll-polyfill";

import "../styles/globals.css";
import { serif, condensed } from "./_localFonts";

const App: AppType = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    smoothScrollPolyfill();
  }, []);

  return (
    <div className={`${serif.variable} ${condensed.variable}`}>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
