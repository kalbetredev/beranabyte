import { CubeIcon } from "@heroicons/react/solid";
import React from "react";
import { GitHubIcon } from "../../icons";
import Project from "../types/Project";
import BrandLogo from "./BrandLogo";

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = (props: ProjectItemProps) => {
  const { title, liveDemoLink, githubLink, summary, techStack } = props.project;

  return (
    <div className="mb-10 shadow rounded-lg border dark:border-gray-700">
      <div className="p-3 dark:bg-gray-700 dark:bg-opacity-50">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="my-2">
          <p className="text-sm text-gray-400">{summary}</p>
        </div>
      </div>

      <div className="flex flex-wrap shadow-inner bg-gray-100 dark:bg-gray-800 py-2 px-1 border-t border-b dark:border-gray-700">
        {techStack.map((stack, index) => (
          <div
            key={index}
            className="w-16 h-16 rounded-2xl m-1 border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-600 flex justify-center items-center"
          >
            <BrandLogo label={stack} />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-end items-center dark:bg-gray-700 dark:bg-opacity-50">
        {liveDemoLink != "" ? (
          <a
            href={liveDemoLink}
            target="_blank"
            className="w-36 h-8 text-sm m-2 flex justify-center items-center border hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 border-gray-200 rounded-md py-1 px-2"
          >
            <span className="w-4 h-4">
              <CubeIcon />
            </span>
            <span className="ml-2 text-xs">Live Demo</span>
          </a>
        ) : null}

        <a
          href={githubLink}
          target="_blank"
          className="w-36 h-8 text-sm m-2 flex justify-center items-center border hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 border-gray-200 rounded-md py-1 px-2"
        >
          <GitHubIcon size="small" />
          <span className="ml-2 text-xs">Open On Github</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectItem;
