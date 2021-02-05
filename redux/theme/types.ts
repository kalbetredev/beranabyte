import HydrateAction from "../common/types";

export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

interface ToggleDarkModeAction {
  type: typeof TOGGLE_DARK_MODE;
  payload?: null;
}

export type ThemeActionTypes = ToggleDarkModeAction | HydrateAction;
