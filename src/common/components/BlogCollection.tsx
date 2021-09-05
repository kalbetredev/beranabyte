import { ExclamationIcon } from "@heroicons/react/outline";
import React from "react";
import { BlogCategory } from "../enums/BlogCategory";
import useBlogs from "../hooks/useBlogs";
import BlogItem from "./BlogItem";
import BlogItemLoading from "./BlogItemLoading";

interface BlogCollectionProps {
  title: string;
  count: number;
  category: BlogCategory;
  topic?: string;
}

const BlogCollection: React.FC<BlogCollectionProps> = (
  props: BlogCollectionProps
) => {
  const { blogs, isLoading, isError } = useBlogs(
    props.count,
    props.category,
    props.topic
  );

  if (isLoading)
    return (
      <div>
        <h2 className="uppercase py-3 mb-4 text-xl border-b border-gray-300 dark:border-gray-700">
          {props.title}
        </h2>
        <BlogItemLoading />
        <BlogItemLoading />
        <BlogItemLoading />
      </div>
    );

  return (
    <div>
      <h2 className="uppercase py-3 mb-4 text-xl border-b border-gray-300 dark:border-gray-700">
        {props.title}
      </h2>
      {isError ? (
        <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
          <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
          Error loading {props.title} blogs
        </h3>
      ) : (
        blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)
      )}
    </div>
  );
};

BlogCollection.defaultProps = {
  topic: "",
};

export default BlogCollection;
