import format from "number-format.js";
import useSWR from "swr";
import { BLOG_API_ROUTE } from "../shared/lib/api/constants";
import fetcher from "../shared/lib/utils/fetcher";
import Bullet from "./MUI_Bullet";

interface PageViewCounterProps {
  blogId: string;
}

const BlogViewCounter = (props: PageViewCounterProps) => {
  const { data } = useSWR(BLOG_API_ROUTE(props.blogId, true), fetcher);
  const viewCount = data?.blog.viewCount;

  return (
    <>
      <Bullet />
      <span>
        {viewCount
          ? `${format("#,###.", viewCount)} ${
              viewCount == 1 ? "view" : "views"
            }`
          : ""}
      </span>
    </>
  );
};

export default BlogViewCounter;
