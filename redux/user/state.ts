export interface UserAccountState {
  isAuthenticated: boolean;
  userName?: string;
  accountPictureUrl?: string;
}

export const InitialState: UserAccountState = {
  isAuthenticated: false,
  userName: undefined,
  accountPictureUrl: undefined,
};
