import { ThemeActionTypes, TOGGLE_DARK_MODE } from "./types";

export function toggleDarkMode(): ThemeActionTypes {
  return {
    type: TOGGLE_DARK_MODE,
  };
}
