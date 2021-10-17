import useSWR from "swr";
import { BLOGS_API_ENDPOINT } from "../../api/endpoints";
import BlogMeta from "../types/BlogMeta";

const useBlogs = () => {
  const { data, error } = useSWR(BLOGS_API_ENDPOINT);

  const featuredBlogs: BlogMeta[] = data
    ? data.blogs.filter((blog) => blog.isFeatured == true)
    : [];

  const latestBlogs: BlogMeta[] = data
    ? data.blogs
        .slice()
        .sort(
          (a, b) =>
            new Date(a.publishedOn).getTime() -
            new Date(b.publishedOn).getTime()
        )
        .slice(0, 5)
    : [];

  const mostViewedBlogs: BlogMeta[] = data
    ? data.blogs
        .slice()
        .sort((a, b) => a.viewCount - b.viewCount)
        .slice(0, 5)
    : [];

  const projectRelatedBlogs: BlogMeta[] = data
    ? data.blogs.filter((blog) => blog.linkedProjects.length > 0)
    : [];

  return {
    blogs: data ? data.blogs : data,
    featuredBlogs: featuredBlogs,
    latestBlogs: latestBlogs,
    mostViewedBlogs: mostViewedBlogs,
    projectRelatedBlogs: projectRelatedBlogs,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useBlogs;
