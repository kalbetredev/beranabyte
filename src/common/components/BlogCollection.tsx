import { ExclamationIcon } from "@heroicons/react/outline";
import React from "react";
import BlogMeta from "../types/BlogMeta";
import BlogItem from "./BlogItem";
import BlogItemLoading from "./BlogItemLoading";

interface BlogCollectionProps {
  title: string;
  blogs: BlogMeta[];
  isLoading: boolean;
  isError: boolean;
}

const BlogCollection: React.FC<BlogCollectionProps> = (
  props: BlogCollectionProps
) => {
  if (props.isLoading)
    return (
      <div className="w-full">
        <h2 className="uppercase py-3 mb-4 text-xl border-b border-gray-300 dark:border-gray-700">
          {props.title}
        </h2>
        <BlogItemLoading />
        <BlogItemLoading />
        <BlogItemLoading />
      </div>
    );

  return (
    <div className="w-full">
      <h2 className="uppercase py-3 mb-4 text-xl border-b border-gray-300 dark:border-gray-700">
        {props.title}
      </h2>
      {props.isError ? (
        <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
          <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
          Error loading {props.title} blogs
        </h3>
      ) : (
        props.blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)
      )}
    </div>
  );
};

export default BlogCollection;
