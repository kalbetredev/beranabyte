import React from "react";
import PageContainer from "../layouts/PageContainer";
import FrontMatter from "../shared/lib/types/FrontMatter";
import BlogRepositoryImpl from "../shared/lib/repository/blog/BlogRepositoryImpl";
import PageMeta from "../shared/lib/types/PageMeta";
import { FEATURED } from "../constants/strings";
import BlogsContainer from "../components/BlogsContainer";
interface IndexPageProps {
  blogsMap: [string, FrontMatter[]][];
  mostViewedBlogPages: FrontMatter[];
  latestBlogPages: FrontMatter[];
}

const Index = (props: IndexPageProps) => {
  const meta: PageMeta = {
    title: "BeranaByte",
    description: "",
  };

  return (
    <PageContainer meta={meta}>
      <BlogsContainer
        category={FEATURED}
        blogsMap={new Map(props.blogsMap)}
        mostViewedBlogPages={props.mostViewedBlogPages}
        latestBlogPages={props.latestBlogPages}
      />
    </PageContainer>
  );
};

export async function getStaticProps() {
  const blogRepository = BlogRepositoryImpl.getInstance();
  const mostViewedBlogPages = await blogRepository.getMostViewedBlogsFrontMatter(
    5
  );
  const latestBlogPages = blogRepository.getLatestBlogsFrontMatter(5);

  return {
    props: {
      blogsMap: blogRepository.getAllBlogs(),
      mostViewedBlogPages: mostViewedBlogPages,
      latestBlogPages: latestBlogPages,
    },
  };
}

export default Index;
