import { createMuiTheme } from "@material-ui/core/styles";
import {
  DarkGrey,
  DarkBackground,
  ErrorColor,
  BrandColor,
  LightBrandColor,
} from "../../constants/colors";

const DarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: BrandColor,
    },
    secondary: {
      main: DarkGrey,
    },
    error: {
      main: ErrorColor,
    },
    background: {
      default: DarkBackground,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          "scrollbar-width": "thin",
        },
        "*::-webkit-scrollbar": {
          width: "5px",
          height: "5px",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: DarkGrey,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: BrandColor,
        },
        "::-webkit-scrollbar-thumb": {
          "&:hover": {
            backgroundColor: LightBrandColor,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: `"Raleway", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default DarkTheme;
