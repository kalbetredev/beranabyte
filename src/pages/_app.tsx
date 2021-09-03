import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ProvideAlert } from "../common/hooks/useAlert";
import { ProvideAuth } from "../modules/auth/hooks/useAuth";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { SWRConfig } from "swr";
import axiosFetcher from "../common/utils/fetcher";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SWRConfig value={{ fetcher: axiosFetcher }}>
        <ProvideAuth>
          <ThemeProvider attribute="class">
            <ProvideAlert>
              <Component {...pageProps} />
            </ProvideAlert>
          </ThemeProvider>
        </ProvideAuth>
      </SWRConfig>
    </>
  );
}

export default MyApp;
