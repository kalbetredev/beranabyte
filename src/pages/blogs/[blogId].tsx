import React from "react";
import Blog from "../../common/types/Blog";
import BlogMeta from "../../common/types/BlogMeta";
import axiosFetcher from "../../common/utils/fetcher";
import { BLOGS_API_ENDPOINT } from "../../api/endpoints";
import Page from "../../common/layouts/Page";
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
import TocItem from "../../common/types/TocItem";
import TableOfContents from "../../common/components/TableOfContents";
import {
  getRenderedHtml,
  getTableOfContent,
} from "../../common/utils/markdown";

interface BlogPageProps {
  blog: Blog;
  toc: TocItem[];
  readingTime: number;
}

const BlogPage: React.FC<BlogPageProps> = (props: BlogPageProps) => {
  const router = useRouter();
  const pubDate = format(new Date(props.blog.publishedOn), "MMM d, yyyy");
  const dot = <span className="h-1 w-1 rounded-full bg-gray-400 mx-2"></span>;

  return (
    <Page>
      <div className="mb-8 w-full flex flex-row-reverse">
        <div className="p-2 ml-2 w-[180px]">
          <TableOfContents tocItems={props.toc} />
        </div>
        <div className="flex-1">
          <h1 id="title" className="pt-16 text-5xl">
            {props.blog.title}
          </h1>
          <div className="flex text-gray-400 text-sm mt-4 justify-start items-center">
            <span>{pubDate}</span>
            {dot}
            <span>{props.readingTime} Min Read</span>
            {dot}
            <span>{props.blog.viewCount} views</span>
            {dot}
            <IconButton
              slug={generateFacebookShareLink(
                router.asPath.toString().split("#")[0]
              )}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              slug={generateLinkedInShareLink(
                router.asPath.toString().split("#")[0]
              )}
            >
              <LinkedInIcon />
            </IconButton>
          </div>
          <div>
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
        </div>
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

  const renderedBlog = getRenderedHtml(blog.content);
  const toc: TocItem[] = getTableOfContent(blog.content);
  const readingTimeInMin = readingTime(blog.content).minutes;

  blog.content = renderedBlog;
  return {
    props: {
      blog: blog,
      toc: toc,
      readingTime: readingTimeInMin,
    },
  };
}

export default BlogPage;
