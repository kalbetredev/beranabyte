import useSWR from "swr";
import { PROJECTS_API_ENDPOINT } from "../../api/endpoints";
import { ProjectType } from "../enums/ProjectType";

const useProjects = (
  type: ProjectType,
  count: number,
  isFeatured: boolean | null = null
) => {
  const apiEndPoint =
    `${PROJECTS_API_ENDPOINT}?type=${type}&count=${count}` +
    (isFeatured ? `&featured=${isFeatured}` : "");
  const { data, error } = useSWR(apiEndPoint);

  return {
    projects: data ? data.projects : data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProjects;
