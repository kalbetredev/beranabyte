import { Params } from "next/dist/next-server/server/router";
import React from "react";
import BlogsContainer from "../../../components/BlogsContainer";
import PageContainer from "../../../layouts/PageContainer";
import BlogRepositoryImpl from "../../../shared/lib/repository/blog/BlogRepositoryImpl";
import FrontMatter from "../../../shared/lib/types/FrontMatter";
import PageMeta from "../../../shared/lib/types/PageMeta";
import {
  capitalize,
  removeNonAlphaNumeric,
} from "../../../shared/lib/utils/text-transform";

interface BlogCategoryProps {
  category: string;
  blogsMap: [string, FrontMatter[]][];
  mostViewedBlogPages: FrontMatter[];
  latestBlogPages: FrontMatter[];
}

const BlogCategory = (props: BlogCategoryProps) => {
  const meta: PageMeta = {
    title: capitalize(removeNonAlphaNumeric(props.category)),
    description: "",
  };

  return (
    <PageContainer meta={meta}>
      <BlogsContainer
        category={props.category}
        blogsMap={new Map(props.blogsMap)}
        mostViewedBlogPages={props.mostViewedBlogPages}
        latestBlogPages={props.latestBlogPages}
      />
    </PageContainer>
  );
};

export async function getStaticPaths() {
  const repository = BlogRepositoryImpl.getInstance();
  const categories = repository.getAllBlogCategories();

  return {
    paths: categories.map((category) => ({
      params: {
        category: category,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: Params }) {
  const blogRepository = BlogRepositoryImpl.getInstance();
  const mostViewedBlogPages = await blogRepository.getMostViewedBlogsFrontMatter(
    5
  );
  const latestBlogPages = blogRepository.getLatestBlogsFrontMatter(5);

  return {
    props: {
      category: params.category,
      blogsMap: blogRepository.getAllBlogs(),
      mostViewedBlogPages: mostViewedBlogPages,
      latestBlogPages: latestBlogPages,
    },
  };
}

export default BlogCategory;
