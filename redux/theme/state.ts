import { ThemeType } from "../../themes/AppTheme";

export interface ThemeState {
  themeType: ThemeType;
}

export const InitialState: ThemeState = {
  themeType: ThemeType.LIGHT,
};
