import React from "react";
import Blog from "../../common/types/Blog";
import BlogMeta from "../../common/types/BlogMeta";
import axiosFetcher from "../../common/utils/fetcher";
import { BLOGS_API_ENDPOINT } from "../../api/endpoints";
import Page from "../../common/layouts/Page";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { format } from "date-fns";
import "highlight.js/styles/atom-one-dark.css";
import readingTime from "reading-time";
import IconButton from "../../common/components/IconButton";
import { FacebookIcon, LinkedInIcon } from "../../icons";
import {
  generateFacebookShareLink,
  generateLinkedInShareLink,
} from "../../common/utils/shareLink";
import { useRouter } from "next/router";

interface BlogPageProps {
  blog: Blog;
  readingTime: number;
}

const BlogPage: React.FC<BlogPageProps> = (props: BlogPageProps) => {
  const router = useRouter();
  const pubDate = format(new Date(props.blog.publishedOn), "MMM d, yyyy");
  const dot = <span className="h-1 w-1 rounded-full bg-gray-400 mx-2"></span>;
  return (
    <Page>
      <div className="mt-20 mb-8 w-full scrollbar">
        <h1 className="text-5xl">{props.blog.title}</h1>
        <div className="flex text-gray-400 text-sm mt-4 justify-start items-center">
          <span>{pubDate}</span>
          {dot}
          <span>{props.readingTime} Min Read</span>
          {dot}
          <span>{props.blog.viewCount} views</span>
          {dot}
          <IconButton slug={generateFacebookShareLink(router.asPath)}>
            <FacebookIcon />
          </IconButton>
          <IconButton slug={generateLinkedInShareLink(router.asPath)}>
            <LinkedInIcon />
          </IconButton>
        </div>
        <div className="my-6">
          <img src={props.blog.imageUrl} alt={props.blog.title} />
        </div>
        {props.blog && (
          <article
            className="prose dark:prose-dark mt-4"
            dangerouslySetInnerHTML={{
              __html: props.blog.content,
            }}
          ></article>
        )}
      </div>
    </Page>
  );
};

export async function getStaticPaths() {
  const { blogs }: { blogs: BlogMeta[] } =
    (await axiosFetcher(BLOGS_API_ENDPOINT)) ?? [];

  const paths = [];
  blogs.map((blog) => {
    paths.push({
      params: {
        blogId: blog._id,
      },
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let { blog }: { blog: Blog } =
    (await axiosFetcher(`${BLOGS_API_ENDPOINT}/${params.blogId}`)) ?? null;

  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return "";
    },
  });

  const readingTimeInMin = readingTime(blog.content).minutes;
  blog.content = md.render(blog.content);

  return {
    props: {
      blog: blog,
      readingTime: readingTimeInMin,
    },
  };
}

export default BlogPage;
