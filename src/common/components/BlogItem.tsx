import React from "react";
import Link from "next/link";
import BlogMeta from "../types/BlogMeta";
import { formatDate } from "../utils/date-formatter";

interface BlogSummaryProps {
  blog: BlogMeta;
}

const BlogItem: React.FC<BlogSummaryProps> = (props: BlogSummaryProps) => {
  const { _id, title, publishedOn, viewCount, summary }: BlogMeta = props.blog;
  const date = new Date(publishedOn);
  const formattedDate = formatDate(date);

  return (
    <div>
      <h3 className="text-lg font-medium">
        <Link href={_id}>
          <a className="hover:text-brand">{title}</a>
        </Link>
      </h3>
      <div className="text-xs text-gray-400 flex mb-3">
        <time dateTime={date.toDateString()} className="pr-4">
          {formattedDate}
        </time>
        <p>{viewCount}&nbsp;views</p>
      </div>
      <div className="mb-5">
        <p className="text-sm text-gray-400">{summary}</p>
      </div>
    </div>
  );
};

export default BlogItem;
