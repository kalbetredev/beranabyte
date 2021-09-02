import React from "react";
import BlogSummary from "../types/BlogSummary";
import BlogItem from "./BlogItem";

interface BlogCollectionProps {
  title: string;
  blogs: BlogSummary[];
}

const BlogCollection: React.FC<BlogCollectionProps> = (
  props: BlogCollectionProps
) => {
  return (
    <div>
      <h2 className="uppercase py-3 mb-4 text-xl border-b border-gray-300 dark:border-gray-700">
        {props.title}
      </h2>
      {props.blogs.map((blog) => (
        <BlogItem key={blog.slug} blogSummary={blog} />
      ))}
    </div>
  );
};

export default BlogCollection;
