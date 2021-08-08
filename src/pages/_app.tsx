import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ProvideAlert } from "../common/hooks/useAlert";
import { ProvideAuth } from "../modules/auth/hooks/useAuth";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

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
      <ProvideAuth>
        <ThemeProvider attribute="class">
          <ProvideAlert>
            <Component {...pageProps} />
          </ProvideAlert>
        </ThemeProvider>
      </ProvideAuth>
    </>
  );
}

export default MyApp;
