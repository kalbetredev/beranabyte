import { ExclamationIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { BlogCategory } from "../enums/BlogCategory";
import useBlogs from "../hooks/useBlogs";
import BlogLinksLoading from "./BlogLinksLoading";

interface BlogLinksProps {
  title: string;
  category: BlogCategory;
  count: number;
}

const BlogLinks: React.FC<BlogLinksProps> = (props: BlogLinksProps) => {
  const { blogs, isLoading, isError } = useBlogs(props.category, props.count);

  if (isLoading) return <BlogLinksLoading title={props.title} />;

  return (
    <div className="mb-6 border-l border-gray-400 rounded-2xl px-3 py-1">
      <div>
        <h2 className="text-lg mb-2">{props.title}</h2>
        {isError ? (
          <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
            <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
            Error loading {props.title}
          </h3>
        ) : (
          blogs.map((blog) => (
            <h3 key={blog._id} className="text-xs text-gray-400 mb-2">
              <Link href={blog._id}>
                <a className="hover:text-brand">{blog.title}</a>
              </Link>
            </h3>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogLinks;
