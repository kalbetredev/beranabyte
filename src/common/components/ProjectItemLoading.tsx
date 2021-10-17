import React from "react";

const ProjectItemLoading: React.FC = () => {
  return (
    <div className="mb-10 animate-pulse shadow rounded-lg border separator">
      <div className="p-3 dark:bg-gray-700 dark:bg-opacity-50">
        <div className="h-3 w-1/2 mb-5 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="my-2">
          <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700 mt-3"></div>
          <div className="h-2 w-2/4 rounded bg-gray-200 dark:bg-gray-700 my-3"></div>
        </div>
      </div>

      <div className="flex flex-wrap shadow-inner bg-gray-100 dark:bg-gray-800 py-2 px-1 border-t border-b separator">
        <div className="w-16 h-16 rounded-2xl m-1 border bg-white dark:bg-gray-600 button-border flex justify-center items-center"></div>
        <div className="w-16 h-16 rounded-2xl m-1 border bg-white dark:bg-gray-600 button-border flex justify-center items-center"></div>
      </div>

      <div className="flex flex-wrap justify-end items-center dark:bg-gray-700 dark:bg-opacity-50">
        <div className="w-36 h-8 m-2 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="w-36 h-8 m-2 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default ProjectItemLoading;
