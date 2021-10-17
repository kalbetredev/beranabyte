import axiosInstance from "./axiosInstance";

const axiosFetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export default axiosFetcher;
