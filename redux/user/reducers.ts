import { HYDRATE } from "next-redux-wrapper";
import { InitialState, UserAccountState } from "./state";
import { LOGOUT_USER, SIGN_IN_USER, UserAccountActionTypes } from "./types";

export function UserAccountReducer(
  state = InitialState,
  action: UserAccountActionTypes
): UserAccountState {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE");
      console.log("state");
      console.log(state);
      console.log("payload");
      console.log(action.payload);
      return state;
    case LOGOUT_USER:
      //TODO : Implement Real Authentication
      const unAuthState: UserAccountState = {
        isAuthenticated: false,
        userName: undefined,
        accountPictureUrl: undefined,
      };
      return unAuthState;
    case SIGN_IN_USER:
      //TODO : Implement Real Authentication
      const authState: UserAccountState = {
        isAuthenticated: true,
        userName: "Helina Tessema",
        accountPictureUrl: "/images/helina.png",
      };
      return authState;
    default:
      return state;
  }
}
