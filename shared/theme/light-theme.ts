import { createMuiTheme } from "@material-ui/core/styles";
import {
  BrandColor,
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
});

export default LightTheme;
