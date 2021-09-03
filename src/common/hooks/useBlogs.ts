import useSWR from "swr";
import { BLOGS_API_ENDPOINT } from "../../api/endpoints";
import { BlogCategory } from "../enums/BlogCategory";

const useBlogs = (category: BlogCategory, count: number) => {
  const apiEndPoint = `${BLOGS_API_ENDPOINT}/?category=${category}&count=${count}`;
  const { data, error } = useSWR(apiEndPoint);

  return {
    blogs: data ? data.blogs : data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useBlogs;
