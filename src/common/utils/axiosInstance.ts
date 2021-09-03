import axios from "axios";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export default instance;
