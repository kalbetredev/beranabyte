import { combineReducers } from "redux";
import { ThemeReducer } from "./theme/reducers";

const rootReducer = combineReducers({
  theme: ThemeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
