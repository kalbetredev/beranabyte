import format from "number-format.js";
import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../shared/lib/utils/fetcher";

interface PageViewCounterProps {
  blogId: string;
}

const BlogViewCounter = (props: PageViewCounterProps) => {
  const { data } = useSWR(`/api/blogs-meta/${props.blogId}/views`, fetcher);
  const views = data?.total;

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/blogs-meta/${props.blogId}/views`, {
        method: "POST",
      });

    registerView();
  }, [props.blogId]);

  return (
    <span>{views ? `${format("#,###.", views)} Views` : "Just Published"}</span>
  );
};

export default BlogViewCounter;
