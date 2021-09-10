import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";
import BlogCollection from "../../common/components/BlogCollection";
import BlogLinks from "../../common/components/BlogLinks";
import SearchInput from "../../common/components/SearchInput";
import Topics from "../../common/components/Topics";
import { FEATURED } from "../../common/constants/labels";
import useBlogs from "../../common/hooks/useBlogs";
import Page from "../../common/layouts/Page";
import BlogMeta from "../../common/types/BlogMeta";
import {
  convertSlugToText,
  convertToSlug,
} from "../../common/utils/slug-converter";

interface BlogsPageProps {
  topic?: string;
}

const BlogsPage: React.FC<BlogsPageProps> = (props: BlogsPageProps) => {
  const blogs = useBlogs();
  const router: NextRouter = useRouter();
  const { topic } = router.query;

  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentTopicBlogs, setCurrentTopicBlogs] = useState<BlogMeta[]>([]);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<BlogMeta[]>([]);

  const onSearch = (search: string) => {
    if (search == "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const pattern = new RegExp(search, "i");
      setSearchResult(
        blogs.blogs
          ? blogs.blogs.filter(
              (blog) =>
                blog.title.search(pattern) >= 0 ||
                blog.summary.search(pattern) >= 0
            )
          : []
      );
    }
  };

  const onTopicChange = (topic: string) => {
    setCurrentTopic(topic);

    let path =
      topic == FEATURED ? "blogs" : `blogs?topic=${convertToSlug(topic)}`;
    router.push(path, undefined, { shallow: true });

    if (topic == FEATURED) setCurrentTopicBlogs(blogs.featuredBlogs);
    else
      setCurrentTopicBlogs(
        blogs.blogs.filter(
          (blog) => blog.topic.toLowerCase() == topic.toLowerCase()
        )
      );
  };

  if (currentTopic == null && blogs.blogs) {
    if (topic) onTopicChange(convertSlugToText(topic.toString()));
    else onTopicChange(FEATURED);
  }

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
            {isSearching ? (
              <BlogCollection
                title="Matching Blogs"
                blogs={searchResult}
                isLoading={blogs.isLoading}
                isError={blogs.isError || searchResult.length == 0}
                errorMessage={blogs.isError ? null : "No Matching Blogs Found"}
              />
            ) : (
              <BlogCollection
                title={currentTopic}
                blogs={currentTopicBlogs}
                isLoading={blogs.isLoading}
                isError={blogs.isError}
              />
            )}
          </div>
          <div className="w-full border-t border-gray-300 dark:border-gray-700 md:pl-10 pt-8 mt-4 md:pt-0 md:mt-14 md:w-[280px] md:border-none">
            <Topics
              showActiveTopic={!isSearching}
              onTopicClick={onTopicChange}
            />
            <BlogLinks
              title="Most Viewed"
              blogs={blogs.mostViewedBlogs}
              isLoading={blogs.isLoading}
              isError={blogs.isError}
            />
            <BlogLinks
              title="Latest"
              blogs={blogs.latestBlogs}
              isLoading={blogs.isLoading}
              isError={blogs.isError}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BlogsPage;
