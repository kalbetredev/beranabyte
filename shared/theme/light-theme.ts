import { createMuiTheme } from "@material-ui/core/styles";
import {
  BrandColor,
  LightBrandColor,
  ErrorColor,
  LightGrey,
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
});

export default LightTheme;
