import React from "react";
interface BlogLinksLoadingProps {
  title: string;
}

const BlogLinksLoading: React.FC<BlogLinksLoadingProps> = (
  props: BlogLinksLoadingProps
) => {
  return (
    <div className="mb-6 border-l border-gray-400 rounded-2xl px-3 py-1">
      <h2 className="text-lg mb-2">{props.title}</h2>
      <div className="animate-pulse">
        <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 w-4/5 rounded bg-gray-200 dark:bg-gray-700 mt-3"></div>
        <div className="h-2 w-2/4 rounded bg-gray-200 dark:bg-gray-700 my-3"></div>
      </div>
    </div>
  );
};

export default BlogLinksLoading;
