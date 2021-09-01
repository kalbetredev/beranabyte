import React from "react";
import Link from "next/link";
import BlogSummary from "../types/BlogSummary";
import { formatDate } from "../utils/date-formatter";

interface BlogSummaryProps {
  blogSummary: BlogSummary;
}

const BlogItem: React.FC<BlogSummaryProps> = (props: BlogSummaryProps) => {
  const { slug, title, publishedDate, numberOfViews, summary }: BlogSummary =
    props.blogSummary;
  const formattedDate = formatDate(publishedDate);

  return (
    <div>
      <h3 className="text-lg font-medium">
        <Link href={slug}>
          <a className="hover:text-brand">{title}</a>
        </Link>
      </h3>
      <div className="text-xs text-gray-400 flex mb-3">
        <time dateTime={publishedDate.toDateString()} className="pr-4">
          {formattedDate}
        </time>
        <p>{numberOfViews}&nbsp;views</p>
      </div>
      <div className="mb-5">
        <p className="text-sm text-gray-400">{summary}</p>
      </div>
    </div>
  );
};

export default BlogItem;
