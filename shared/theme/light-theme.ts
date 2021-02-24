import { createMuiTheme } from "@material-ui/core/styles";
import {
  BrandColor,
  LightBrandColor,
  ErrorColor,
  LightGrey,
  DarkGrey,
  White,
} from "../../constants/colors";

const LightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: BrandColor,
    },
    secondary: {
      main: LightGrey,
    },
    error: {
      main: ErrorColor,
    },
    background: {
      default: White,
    },
    text: {
      secondary: DarkGrey,
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
          backgroundColor: LightGrey,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: LightBrandColor,
        },
        "::-webkit-scrollbar-thumb": {
          "&:hover": {
            backgroundColor: BrandColor,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: `"Raleway", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default LightTheme;
