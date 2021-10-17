import React from "react";

const CommentListItemLoading = () => {
  return (
    <div className="flex mb-3 pb-3 animate-pulse">
      <div className="w-10">
        <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex text-[0.65em] h-1 w-1/3 mb-1 bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 w-full mb-1 bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 w-2/3 mb-1 bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default CommentListItemLoading;
