import React, { useEffect } from "react";
import AppTheme from "../shared/theme/app-theme";
import { ThemeProvider } from "@material-ui/core/styles";
import "../shared/styles/globals.css";
import { RootState } from "../redux/rootReducer";
import { useSelector } from "react-redux";
import MDXComponents from "../components/MDX/MDXComponents";
import { MDXProvider } from "@mdx-js/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { wrapper } from "../redux/store";
import Head from "next/head";
import { AppProps } from "next/app";
import { ProviderAlert } from "../shared/lib/utils/useAlert";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const themeType = useSelector((state: RootState) => state.theme.themeType);
  const theme = AppTheme(themeType);

  useEffect(() => {
    // Material-UI SSR Fix Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <MDXProvider components={MDXComponents}>
          <CssBaseline />
          <ProviderAlert>
            <Component {...pageProps} />
          </ProviderAlert>
        </MDXProvider>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
