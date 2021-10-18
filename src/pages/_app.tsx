import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ProvideAuth } from "../modules/auth/hooks/useAuth";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { SWRConfig } from "swr";
import axiosFetcher from "../common/utils/fetcher";
import { ProvideAlert } from "../common/hooks/useAlert";
import { ProvideModal } from "../common/hooks/useModal";

function BeranabyteApp(props: AppProps) {
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
          <ProvideModal>
            <ProvideAlert>
              <ThemeProvider attribute="class">
                <Component {...pageProps} />
              </ThemeProvider>
            </ProvideAlert>
          </ProvideModal>
        </ProvideAuth>
      </SWRConfig>
    </>
  );
}

export default BeranabyteApp;
