import { useEffect } from "react";
import AppTheme from "../shared/theme/app-theme";
import { ThemeType } from "../shared/theme/theme-type";
import { ThemeProvider } from "@material-ui/core/styles";
import "../shared/styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Material-UI Fix Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  const theme = AppTheme(ThemeType.DARK);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
