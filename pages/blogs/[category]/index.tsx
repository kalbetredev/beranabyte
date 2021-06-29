import { Params } from "next/dist/next-server/server/router";
import BlogsContainer from "../../../components/BlogsContainer";
import PageContainer from "../../../layouts/PageContainer";
import { getCategories } from "../../../shared/lib/api/beranabtyeApi";
import PageMeta from "../../../shared/lib/models/PageMeta";
import {
  capitalize,
  removeNonAlphaNumeric,
} from "../../../shared/lib/utils/text-transform";

interface BlogCategoryProps {
  category: string;
}

const BlogCategory = (props: BlogCategoryProps) => {
  const meta: PageMeta = {
    title: capitalize(removeNonAlphaNumeric(props.category)),
    description: `Collection of blogs on ${props.category}`,
    type: "blog",
    image: "/static/images/banner.png",
  };

  return (
    <PageContainer meta={meta}>
      <BlogsContainer category={props.category} />
    </PageContainer>
  );
};

export async function getStaticPaths() {
  const categories = await getCategories();

  return {
    paths: categories.map((category) => ({
      params: {
        category: category.toLowerCase(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: Params }) {
  return {
    props: {
      category: params.category,
    },
  };
}

export default BlogCategory;
