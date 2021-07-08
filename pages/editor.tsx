import PageContainer from "../layouts/PageContainer";
import PageMeta from "../shared/lib/models/PageMeta";
import BlogEditor from "../components/BlogEditor";
import Blog from "../shared/lib/models/Blog";
import { useState } from "react";
import CreateBlog from "../components/CreateBlog";

const Editor = () => {
  const meta: PageMeta = {
    title: "BeranaByte",
    description:
      "Blog / portfolio website where you can find blogs and projects on most recent technologies on software development and other tech things.",
    type: "website",
    image: "/static/images/banner.png",
  };

  const [blog, setBlog] = useState<Blog | null>(null);

  const onCreate = (blog: Blog) => {
    setBlog(blog);
  };

  return (
    <PageContainer meta={meta}>
      {blog ? (
        <BlogEditor blog={blog} />
      ) : (
        <CreateBlog onCreateCallback={onCreate} />
      )}
    </PageContainer>
  );
};

export default Editor;
