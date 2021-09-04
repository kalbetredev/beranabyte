import React from "react";
import BlogCollection from "../common/components/BlogCollection";
import BlogLinks from "../common/components/BlogLinks";
import SearchInput from "../common/components/SearchInput";
import Topics from "../common/components/Topics";
import { BlogCategory } from "../common/enums/BlogCategory";
import Page from "../common/layouts/Page";

const Blogs = () => {
  const onSearch = (search: string) => {
    console.log(search);
  };

  return (
    <Page>
      <div className="mt-4 mb-8 w-full">
        <div className="w-full mt-14 mb-6 flex justify-end">
          <SearchInput
            placeholder="Search Blogs"
            searchOnInput={true}
            onSearch={onSearch}
          />
        </div>
        <div className="flex flex-col md:flex-row md:mt-10">
          <div className="flex-1">
            <BlogCollection
              title="featured"
              category={BlogCategory.FEATURED}
              count={5}
            />
          </div>
          <div className="w-full border-t border-gray-300 dark:border-gray-700 md:pl-10 pt-8 mt-4 md:pt-0 md:mt-14 md:w-[280px] md:border-none">
            <Topics />
            <BlogLinks
              title="Most Viewed"
              category={BlogCategory.MOST_VIEWED}
              count={5}
            />
            <BlogLinks
              title="Latest"
              category={BlogCategory.LATEST}
              count={5}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Blogs;
