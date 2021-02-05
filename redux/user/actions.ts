import {
  LOGOUT_USER,
  SignInPayload,
  SIGN_IN_USER,
  UserAccountActionTypes,
} from "./types";

export function logoutUser(): UserAccountActionTypes {
  return {
    type: LOGOUT_USER,
  };
}

export function signInAction(payload: SignInPayload): UserAccountActionTypes {
  return {
    type: SIGN_IN_USER,
    payload: payload,
  };
}
