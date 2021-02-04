import { createMuiTheme } from "@material-ui/core/styles";
import {
  DarkGrey,
  DarkBackground,
  ErrorColor,
  BrandColor,
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
});

export default DarkTheme;
