import useSWR from "swr";
import { PROJECTS_API_ENDPOINT } from "../../api/endpoints";
import { ProjectType } from "../enums/ProjectType";
import Project from "../types/Project";

const useProjects = () => {
  const { data, error } = useSWR(PROJECTS_API_ENDPOINT);

  const featuredProjects: Project[] = data
    ? data.projects.filter((project) => project.isFeatured == true)
    : [];

  const openSourceProjects: Project[] = data
    ? data.projects.filter((project) => project.type == ProjectType.OPEN_SOURCE)
    : [];

  const privateProjects: Project[] = data
    ? data.projects.filter((project) => project.type == ProjectType.PRIVATE)
    : [];

  const contributionProjects: Project[] = data
    ? data.projects.filter(
        (project) => project.type == ProjectType.CONTRIBUTION
      )
    : [];

  return {
    projects: data ? data.projects : data,
    featured: featuredProjects,
    openSource: openSourceProjects,
    private: privateProjects,
    contributions: contributionProjects,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProjects;
