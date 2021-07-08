import axiosInstance from "./axiosInstance";
import {
  AUTH_REGISTER_API_ROUTE,
  AUTH_LOGIN_API_ROUTE,
  CURRENT_USER_API_ROUTE,
} from "../api/constants";
import { deleteToken, getToken, setToken } from "./token";
import User from "../models/User";

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const response = await axiosInstance.post(AUTH_REGISTER_API_ROUTE, {
    username: username,
    email: email,
    password: password,
  });

  return getUserFromResponse(response);
};

export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await axiosInstance.post(AUTH_LOGIN_API_ROUTE, {
    email: email,
    password: password,
  });

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
      .get(CURRENT_USER_API_ROUTE, config)
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
