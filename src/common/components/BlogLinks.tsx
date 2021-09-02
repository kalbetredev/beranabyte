import Link from "next/link";
import React from "react";
import BlogSummary from "../types/BlogSummary";

interface BlogLinksProps {
  title: string;
  blogs: BlogSummary[];
}

const BlogLinks: React.FC<BlogLinksProps> = (props: BlogLinksProps) => {
  return (
    <div className="mb-6 border-l border-gray-400 rounded-2xl px-3 py-1">
      <div>
        <h2 className="text-lg mb-2">{props.title}</h2>
        {props.blogs.map((blog) => (
          <h3 key={blog.slug} className="text-xs text-gray-400 mb-2">
            <Link href={blog.slug}>
              <a className="hover:text-brand">{blog.title}</a>
            </Link>
          </h3>
        ))}
      </div>
    </div>
  );
};

export default BlogLinks;
