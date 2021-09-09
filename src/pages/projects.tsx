import React, { useState } from "react";
import BlogLinks from "../common/components/BlogLinks";
import ProjectCollection from "../common/components/ProjectCollection";
import SearchInput from "../common/components/SearchInput";
import useBlogs from "../common/hooks/useBlogs";
import useProjects from "../common/hooks/useProjects";
import Page from "../common/layouts/Page";
import Project from "../common/types/Project";

const ProjectsPage = () => {
  const blogData = useBlogs();
  const projects = useProjects();

  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<Project[]>([]);

  const onSearch = (search: string) => {
    if (search == "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const pattern = new RegExp(search, "i");
      setSearchResult(
        projects.projects
          ? projects.projects.filter(
              (project) =>
                project.title.search(pattern) >= 0 ||
                project.summary.search(pattern) >= 0
            )
          : []
      );
    }
  };

  return (
    <Page>
      <div className="mt-4 mb-8 w-full">
        <div className="w-full mt-14 mb-6 flex justify-end">
          <SearchInput
            placeholder="Search Projects"
            searchOnInput={true}
            onSearch={onSearch}
          />
        </div>
        <div className="flex flex-col md:flex-row md:mt-10">
          <div className="flex-1">
            {isSearching ? (
              <ProjectCollection
                title="Matching Projects"
                projects={searchResult}
                isLoading={projects.isLoading}
                isError={projects.isError || searchResult.length == 0}
                errorMessage={
                  projects.isError ? null : "No Matching Projects Found"
                }
              />
            ) : (
              <>
                <ProjectCollection
                  title="Open Source Projects"
                  projects={projects.openSource}
                  isLoading={projects.isLoading}
                  isError={projects.isError}
                />
                {projects.contributions.length > 0 ? (
                  <ProjectCollection
                    title="Contributions"
                    projects={projects.contributions}
                    isLoading={projects.isLoading}
                    isError={projects.isError}
                  />
                ) : null}
                {projects.private.length > 0 ? (
                  <ProjectCollection
                    title="Private Projects"
                    projects={projects.private}
                    isLoading={projects.isLoading}
                    isError={projects.isError}
                  />
                ) : null}
              </>
            )}
          </div>
          <div className="w-full md:ml-10 border-t border-gray-300 dark:border-gray-700 pt-8 mt-4 md:pt-0 md:mt-14 md:w-[280px] md:border-none">
            <BlogLinks
              title="Related Blogs"
              blogs={blogData.projectRelatedBlogs}
              isLoading={blogData.isLoading}
              isError={blogData.isError}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ProjectsPage;
