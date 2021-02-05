import HydrateAction from "../common/types";

export const LOGOUT_USER = "LOGOUT_USER";
export const SIGN_IN_USER = "SIGN_IN_USER";

interface LogoutUserAction {
  type: typeof LOGOUT_USER;
  payload?: null;
}

interface SignInAction {
  type: typeof SIGN_IN_USER;
  payload: SignInPayload;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export type UserAccountActionTypes =
  | LogoutUserAction
  | SignInAction
  | HydrateAction;
