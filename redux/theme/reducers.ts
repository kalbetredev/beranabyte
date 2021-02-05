import { HYDRATE } from "next-redux-wrapper";
import { ThemeType } from "../../themes/AppTheme";
import { InitialState, ThemeState } from "./state";
import { ThemeActionTypes, TOGGLE_DARK_MODE } from "./types";

export function ThemeReducer(
  state = InitialState,
  action: ThemeActionTypes
): ThemeState {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE");
      console.log("state");
      console.log(state);
      console.log("payload");
      console.log(action.payload);
      return state;
    case TOGGLE_DARK_MODE: {
      const newThemeType =
        state.themeType === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
      return {
        themeType: newThemeType,
      };
    }
    default:
      return state;
  }
}
