import React from "react";
import BlogLinks from "../common/components/BlogLinks";
import ProjectCollection from "../common/components/ProjectCollection";
import SearchInput from "../common/components/SearchInput";
import { BlogCategory } from "../common/enums/BlogCategory";
import { ProjectType } from "../common/enums/ProjectType";
import Page from "../common/layouts/Page";

const Projects = () => {
  const onSearch = (search: string) => {
    console.log(search);
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
            <ProjectCollection
              title="Open Source Projects"
              type={ProjectType.OPEN_SOURCE}
              count={3}
            />
          </div>
          <div className="w-full md:ml-10 border-t border-gray-300 dark:border-gray-700 pt-8 mt-4 md:pt-0 md:mt-14 md:w-[280px] md:border-none">
            <BlogLinks
              title="Related Blogs"
              category={BlogCategory.PROJECT_RELATED}
              count={3}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Projects;
