import axios from "axios";
import { API_BASE_URL } from "../../api/constants/constants";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export default instance;
