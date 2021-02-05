import { combineReducers } from "redux";
import { ThemeReducer } from "./theme/reducers";
import { UserAccountReducer } from "./user/reducers";

const rootReducer = combineReducers({
  theme: ThemeReducer,
  userAccount: UserAccountReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
