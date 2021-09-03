import React from "react";

const BlogItemLoading: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="text-xs text-gray-400 flex mt-2 mb-5">
        <div className="h-2 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 w-20 rounded bg-gray-200 dark:bg-gray-700 ml-3"></div>
      </div>
      <div className="mb-10">
        <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700 mt-3"></div>
        <div className="h-2 w-2/4 rounded bg-gray-200 dark:bg-gray-700 my-3"></div>
      </div>
    </div>
  );
};

export default BlogItemLoading;
