import { Params } from "next/dist/next-server/server/router";
import React from "react";
import BlogsPage from ".";
import { TOPICS_API_ENDPOINT } from "../../api/endpoints";
import { BlogCategory } from "../../common/enums/BlogCategory";
import axiosFetcher from "../../common/utils/fetcher";
import {
  convertSlugToText,
  convertToSlug,
} from "../../common/utils/slug-converter";

interface TopicBlogsPageProps {
  topic: string;
}

const TopicBlogsPage: React.FC<TopicBlogsPageProps> = (
  props: TopicBlogsPageProps
) => {
  return (
    <BlogsPage
      title={props.topic}
      category={BlogCategory.ANY}
      topic={convertSlugToText(props.topic)}
    />
  );
};

export async function getStaticPaths() {
  const data = await axiosFetcher(TOPICS_API_ENDPOINT);
  console.log(data.topics);
  const topics = data.topics;

  const paths = [];
  topics.map((topic) => {
    paths.push({
      params: {
        topic: convertToSlug(topic),
      },
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export function getStaticProps({ params }: { params: Params }) {
  return {
    props: {
      topic: params.topic,
    },
  };
}

export default TopicBlogsPage;
