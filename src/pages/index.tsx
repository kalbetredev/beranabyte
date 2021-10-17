import React from "react";
import Link from "next/link";
import BlogLinks from "../common/components/BlogLinks";
import ProjectCollection from "../common/components/ProjectCollection";
import SubscriptionForm from "../common/components/SubscriptionForm";
import Page from "../common/layouts/Page";
import QuickMessageFrom from "../common/components/QuickMessageFrom";
import useBlogs from "../common/hooks/useBlogs";
import useProjects from "../common/hooks/useProjects";
import pageSlugs from "../common/constants/page-slugs";

const IndexPage: React.FC = () => {
  const blogData = useBlogs();
  const projects = useProjects();

  return (
    <Page>
      <div className="mb-8 w-full">
        <div className="w-full mb-8">
          <h1 className="text-4xl sm:text-6xl mt-3 font-medium">Welcome</h1>
          <div className="max-w-xl text-sm text-gray-400">
            <h2 className="mt-5">
              I'm Kalkidan B. and you have landed on{" "}
              <span className="text-brand font-bold">BeranaByte.</span> You will
              find here my personal blogs and projects. I'm a developer and I
              built this site to share what I have learned through building
              various projects and researching popular tech stacks.
            </h2>
            <p className="mt-4">
              Feel free to leave me a message, a comment or a request!.
            </p>
            <p className="mt-4">
              You can also register to comment on blogs and receive email
              notifications when I publish new articles
            </p>
          </div>
        </div>
        <div className="border-t w-full separator mt-10 pt-10">
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 md:pr-2">
              <BlogLinks
                title="Most Viewed"
                blogs={blogData.mostViewedBlogs}
                isLoading={blogData.isLoading}
                isError={blogData.isError}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <BlogLinks
                title="Latest"
                blogs={blogData.latestBlogs}
                isLoading={blogData.isLoading}
                isError={blogData.isError}
              />
            </div>
          </div>
        </div>
        <div className="border-t w-full separator mt-6">
          <div className="flex flex-col md:flex-row md:mt-8">
            <div className="flex-1">
              <ProjectCollection
                title="Featured Projects"
                projects={projects.openSource}
                isLoading={projects.isLoading}
                isError={projects.isError}
                hideTitleDivider
              />
            </div>
            <div className="w-full md:ml-10 border-t separator pt-8 mt-4 md:pt-0 md:mt-14 md:w-[280px] md:border-none">
              <BlogLinks
                title="Related Blogs"
                blogs={blogData.projectRelatedBlogs}
                isLoading={blogData.isLoading}
                isError={blogData.isError}
              />
            </div>
          </div>
        </div>
        <div className="border-t w-full separator mt-8 pt-10">
          <div className="flex flex-col md:flex-row mt-1">
            <div className="flex-1">
              <SubscriptionForm />
            </div>
            <div className="w-full md:ml-10 mt-4 md:mt-0 md:w-[280px] hidden md:block">
              <h2 className="text-xl mb-1 mt-3 md:mt-0">Your Can Also ...</h2>
              <p className="text-sm text-gray-400 dark:text-gray-300">
                <Link href={pageSlugs.signUpPage()}>
                  <a className="font-bold text-brand hover:text-brand-light">
                    Sign Up
                  </a>
                </Link>{" "}
                to be a member which will allow you to comment on blogs besides
                being subscribed to the mailing list for updates!
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-10">
            <div className="flex-1">
              <QuickMessageFrom />
            </div>
            <div className="w-full md:ml-10 mt-4 md:mt-0 md:w-[280px] hidden md:block"></div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default IndexPage;
