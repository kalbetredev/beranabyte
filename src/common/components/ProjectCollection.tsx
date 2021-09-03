import { ExclamationIcon } from "@heroicons/react/outline";
import React from "react";
import { ProjectType } from "../enums/ProjectType";
import useProjects from "../hooks/useProjects";
import Project from "../types/Project";
import ProjectItem from "./ProjectItem";
import ProjectItemLoading from "./ProjectItemLoading";

interface ProjectCollectionProps {
  title: string;
  hideTitleDivider?: boolean;
  featured?: boolean;
  type?: ProjectType;
  count: number;
}

const ProjectCollection: React.FC<ProjectCollectionProps> = (
  props: ProjectCollectionProps
) => {
  const { projects, isLoading, isError } = useProjects(
    props.type,
    props.count,
    props.featured
  );

  const borderStyle = props.hideTitleDivider
    ? ""
    : "border-b border-gray-300 dark:border-gray-700";

  if (isLoading)
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
      {isError ? (
        <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
          <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
          Error loading {props.title}
        </h3>
      ) : (
        projects.map((project: Project) => (
          <ProjectItem key={project._id} project={project} />
        ))
      )}
    </div>
  );
};

ProjectCollection.defaultProps = {
  hideTitleDivider: false,
  type: ProjectType.ANY,
};

export default ProjectCollection;
