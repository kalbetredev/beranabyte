import React from "react";
import Project from "../types/Project";
import ProjectItem from "./ProjectItem";

interface ProjectCollectionProps {
  title: string;
  projects: Project[];
}

const ProjectCollection: React.FC<ProjectCollectionProps> = (
  props: ProjectCollectionProps
) => {
  return (
    <div>
      <h2 className="uppercase py-3 mb-4 text-xl border-b border-gray-300 dark:border-gray-700">
        {props.title}
      </h2>
      {props.projects.map((project) => (
        <ProjectItem key={project.projectId} project={project} />
      ))}
    </div>
  );
};

export default ProjectCollection;
