import { ExclamationIcon } from "@heroicons/react/outline";
import React from "react";
import Project from "../types/Project";
import ProjectItem from "./ProjectItem";
import ProjectItemLoading from "./ProjectItemLoading";

interface ProjectCollectionProps {
  title: string;
  hideTitleDivider?: boolean;
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

const ProjectCollection: React.FC<ProjectCollectionProps> = (
  props: ProjectCollectionProps
) => {
  const borderStyle = props.hideTitleDivider ? "" : "border-b separator";

  if (props.isLoading)
    return (
      <div>
        <h2 className={`uppercase py-3 mb-4 text-xl ` + borderStyle}>
          {props.title}
        </h2>
        <ProjectItemLoading />
        <ProjectItemLoading />
      </div>
    );

  return (
    <div>
      <h2 className={`uppercase py-3 mb-4 text-xl ` + borderStyle}>
        {props.title}
      </h2>
      {props.isError ? (
        <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
          <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
          {props.errorMessage
            ? props.errorMessage
            : `Error loading ${props.title})`}
        </h3>
      ) : (
        props.projects.map((project: Project) => (
          <ProjectItem key={project._id} project={project} />
        ))
      )}
    </div>
  );
};

ProjectCollection.defaultProps = {
  hideTitleDivider: false,
};

export default ProjectCollection;
