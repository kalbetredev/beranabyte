import axiosInstance from "../../common/utils/axiosInstance";
import { deleteToken, getToken, setToken } from "../../common/utils/token";
import User from "./models/User";
import {
  AUTH_REGISTER_API_ENDPOINT,
  AUTH_LOGIN_API_ENDPOINT,
  CURRENT_USER_API_ENDPOINT,
} from "../../api/endpoints";
import { throwError } from "../../common/utils/error";

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await axiosInstance
    .post(AUTH_REGISTER_API_ENDPOINT, {
      email: email,
      password: password,
    })
    .catch((error) => throwError(error));

  return getUserFromResponse(response);
};

export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await axiosInstance
    .post(AUTH_LOGIN_API_ENDPOINT, {
      email: email,
      password: password,
    })
    .catch((error) => throwError(error));

  return getUserFromResponse(response);
};

export const signOut = async (): Promise<void> => {
  deleteToken();
};

export const getCurrentUser = async (): Promise<User> => {
  const token = getToken();

  if (token) {
    let config = {
      headers: {
        "x-auth-token": token,
      },
    };

    const user = await axiosInstance
      .get(CURRENT_USER_API_ENDPOINT, config)
      .then((response) => {
        return getUserFromResponse(response);
      })
      .catch((error) => {
        return null;
      });

    return user;
  }
};

const getUserFromResponse = (response): User => {
  const { success, token } = response.data;
  if (success) {
    const user: User = response.data.user;
    if (token) setToken(token);
    return user;
  }
  return null;
};
