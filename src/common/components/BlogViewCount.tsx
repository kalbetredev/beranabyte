import React, { useEffect } from "react";
import useSWR from "swr";
import { BLOG_VIEW_COUNT } from "../../api/endpoints";
import axiosInstance from "../utils/axiosInstance";

interface BlogViewCountProps {
  blogId: string;
}

const BlogViewCount: React.FC<BlogViewCountProps> = (
  props: BlogViewCountProps
) => {
  const { data, error } = useSWR(BLOG_VIEW_COUNT(props.blogId));
  const isLoading: boolean = !error && !data;

  useEffect(() => {
    try {
      axiosInstance.patch(BLOG_VIEW_COUNT(props.blogId));
    } catch {}
  }, []);

  return (
    <>
      {isLoading || error ? null : (
        <>
          <span className="h-1 w-1 rounded-full bg-gray-400 mx-2"></span>
          <span className="mr-2">{data.viewCount} views</span>
        </>
      )}
    </>
  );
};

export default BlogViewCount;
