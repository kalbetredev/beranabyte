import { TOKEN_KEY } from "../../api/constants/constants";

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
