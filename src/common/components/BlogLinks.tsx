import React from "react";
import { ExclamationIcon } from "@heroicons/react/outline";
import Link from "next/link";
import BlogMeta from "../types/BlogMeta";
import BlogLinksLoading from "./BlogLinksLoading";

interface BlogLinksProps {
  title: string;
  blogs: BlogMeta[];
  isLoading: boolean;
  isError: boolean;
}

const BlogLinks: React.FC<BlogLinksProps> = (props: BlogLinksProps) => {
  if (props.isLoading) return <BlogLinksLoading title={props.title} />;

  return (
    <div className="mb-6 border-l border-gray-400 rounded-2xl px-3 py-1">
      <div>
        <h2 className="text-lg mb-2">{props.title}</h2>
        {props.isError ? (
          <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
            <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
            Error loading {props.title}
          </h3>
        ) : (
          props.blogs.map((blog) => (
            <h3 key={blog._id} className="text-xs text-gray-400 mb-2">
              <Link href={"/blogs/" + blog._id}>
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
