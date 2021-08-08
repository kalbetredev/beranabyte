import { ThemeType } from "../../shared/theme/theme-type";

export interface ThemeState {
  themeType: ThemeType;
}

export const InitialState: ThemeState = {
  themeType: ThemeType.LIGHT,
};
