import React from "react";
import Blog from "../../common/types/Blog";
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
import BlogViewCount from "../../common/components/BlogViewCount";
import CommentsSection from "../../common/components/Comment/CommentsSection";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

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
      <div className="mb-8 w-full md:flex md:flex-row-reverse md:justify-between">
        <div className="p-2 w-[170px] hidden md:block">
          <TableOfContents tocItems={props.toc} />
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <h1 id="title" className="pt-16 text-5xl">
            {props.blog.title}
          </h1>
          <div className="flex flex-wrap text-gray-400 text-sm mt-4 justify-start items-center">
            <span>{pubDate}</span>
            {dot}
            <span>{props.readingTime} Min Read</span>
            <BlogViewCount blogId={props.blog._id} />
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
            <img
              className="w-full rounded-md shadow-lg object-cover"
              src={props.blog.imageUrl}
              alt={props.blog.title}
            />
          </div>
          {props.blog && (
            <article
              className="prose prose-sm sm:prose md:prose-md break-words dark:prose-dark"
              dangerouslySetInnerHTML={{
                __html: props.blog.content,
              }}
            ></article>
          )}
          <CommentsSection blogId={props.blog._id} />
        </div>
      </div>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const { params } = context;
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
};

export default BlogPage;
