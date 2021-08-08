import Blog from "./models/Blog";
import axiosInstance from "../common/utils/axiosInstance";
import {
  BLOGS_POPULAR_API_ROUTE,
  BLOGS_LATEST_API_ROUTE,
  BLOGS_FEATURED_API_ROUTE,
  BLOGS_API_ROUTE,
  BLOG_CATEGORIES_API_ROUTE,
  BLOG_API_ROUTE,
  COMMENTS_API_ROUTE,
  REPLIES_API_ROUTE,
} from "./constants";
import axiosFetcher from "../common/utils/fetcher";
import { getToken } from "../common/utils/token";

export const getAllBlogSummaries = async (): Promise<Blog[]> => {
  const { blogs } = await axiosFetcher(BLOGS_API_ROUTE);
  return blogs ?? [];
};

export const getPopularBlogs = async (): Promise<Blog[]> => {
  const { blogs } = await axiosFetcher(BLOGS_POPULAR_API_ROUTE);
  return blogs ?? [];
};

export const getFeaturedBlogs = async (): Promise<Blog[]> => {
  const { blogs } = await axiosFetcher(BLOGS_FEATURED_API_ROUTE);
  return blogs ?? [];
};

export const getLatestBlogs = async (): Promise<Blog[]> => {
  const { blogs } = await axiosFetcher(BLOGS_LATEST_API_ROUTE);
  return blogs ?? [];
};

export const getBlogsByCategory = async (category: string): Promise<Blog[]> => {
  const { blogs } = await axiosFetcher(
    `${BLOGS_API_ROUTE}?category=${category}`
  );
  return blogs ?? [];
};

export const getCategories = async (): Promise<string[]> => {
  const { categories } = await axiosFetcher(BLOG_CATEGORIES_API_ROUTE);
  return categories ?? [];
};

export const getBlogById = async (
  blogId: string,
  onlySummary: boolean
): Promise<Blog> => {
  const { blog } = await axiosFetcher(BLOG_API_ROUTE(blogId, onlySummary));
  return blog;
};

export const updateBlogViewCount = async (blogId: string) =>
  axiosInstance.patch(BLOG_API_ROUTE(blogId, true));

export const sendComment = async (blogId: string, text: string) => {
  const token = getToken();

  if (token) {
    let config = {
      headers: {
        "x-auth-token": token,
      },
    };

    const comment = await axiosInstance
      .post(
        COMMENTS_API_ROUTE(blogId),
        {
          text: text,
        },
        config
      )
      .then((response: any) => {
        return response.comment;
      })
      .catch((error) => {
        return null;
      });

    return comment;
  }
};

export const sendReply = async (commentId: string, text: string) => {
  const token = getToken();

  if (token) {
    let config = {
      headers: {
        "x-auth-token": token,
      },
    };

    const reply = await axiosInstance
      .post(
        REPLIES_API_ROUTE(commentId),
        {
          text: text,
        },
        config
      )
      .then((response: any) => {
        return response.reply;
      })
      .catch((error) => {
        return null;
      });

    return reply;
  }
};
