import Blog from "../models/Blog";
import axiosInstance from "../utils/axiosInstance";
import {
  BLOGS_POPULAR_API_ROUTE,
  BLOGS_LATEST_API_ROUTE,
  BLOGS_FEATURED_API_ROUTE,
  BLOGS_API_ROUTE,
  BLOG_CATEGORIES_API_ROUTE,
  BLOG_API_ROUTE,
  COMMENTS_API_ROUTE,
  REPLIES_API_ROUTE,
  BLOG_IMAGES,
} from "./constants";
import axiosFetcher from "../utils/fetcher";
import { getToken } from "../utils/token";
import { AxiosRequestConfig } from "axios";

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

export const uploadImage = async (file: any, blogId: string) => {
  try {
    const token = getToken();

    if (token) {
      let config: AxiosRequestConfig = {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("image", file);
      const response = await axiosInstance.post(
        BLOG_IMAGES(blogId),
        formData,
        config
      );
      if (response.status === 200) return response.data.image;
      else return null;
    }
  } catch (error) {
    return null;
  }
};

export const deleteImage = async (fileName: string, blogId: string) => {
  try {
    const token = getToken();

    if (token) {
      let config = {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axiosInstance.delete(
        `${BLOG_IMAGES(blogId)}/${fileName}`,
        config
      );
      if (response.status === 200) return response.data.success;
      else return null;
    }
  } catch (error) {
    return null;
  }
};

export const createBlog = async (
  title: string,
  category: string
): Promise<Blog | null> => {
  try {
    const token = getToken();

    if (token) {
      let config = {
        headers: {
          "x-auth-token": token,
        },
      };

      const response = await axiosInstance.post(
        BLOGS_API_ROUTE,
        {
          title: title,
          category: category,
        },
        config
      );
      if (response.status === 200) return response.data.blog;
      else return null;
    }
  } catch (error) {
    return null;
  }
};

export const saveBlog = async (blog: Blog) => {
  try {
    const token = getToken();

    if (token) {
      let config = {
        headers: {
          "x-auth-token": token,
        },
      };

      const response = await axiosInstance.patch(
        `${BLOGS_API_ROUTE}/${blog._id}/save`,
        {
          ...blog,
        },
        config
      );
      if (response.status === 200) return response.data.success;
      else return false;
    }
  } catch (error) {
    return false;
  }
};
