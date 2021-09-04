import React from "react";

const TopicsLoading = () => {
  return (
    <div className="mb-6 border-l border-gray-400 rounded-2xl px-3 py-1">
      <div>
        <h2 className="text-lg mb-2">Topics</h2>
        <div className="flex animate-pulse flex-wrap gap-2 mb-2 text-xs text-gray-400">
          <div className="w-20 h-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="w-28 h-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="w-16 h-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default TopicsLoading;
