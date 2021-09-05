import useSWR from "swr";
import { BLOGS_API_ENDPOINT } from "../../api/endpoints";
import { BlogCategory } from "../enums/BlogCategory";

const useBlogs = (
  count: number,
  category: BlogCategory,
  topic: string = ""
) => {
  const apiEndPoint = `${BLOGS_API_ENDPOINT}/?category=${category}&count=${count}&topic=${topic}`;
  const { data, error } = useSWR(apiEndPoint);

  return {
    blogs: data ? data.blogs : data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useBlogs;
