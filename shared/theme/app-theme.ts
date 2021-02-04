import LightTheme from "./light-theme";
import DarkTheme from "./dark-theme";
import { Theme } from "@material-ui/core/styles";
import { ThemeType } from "./theme-type";

const AppTheme = (themeType: ThemeType = ThemeType.LIGHT): Theme => {
  return themeType === ThemeType.DARK ? DarkTheme : LightTheme;
};

export default AppTheme;
