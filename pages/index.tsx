import PageContainer from "../layouts/PageContainer";
import PageMeta from "../shared/lib/models/PageMeta";
import { FEATURED } from "../constants/strings";
import BlogsContainer from "../components/BlogsContainer";

const Index = () => {
  const meta: PageMeta = {
    title: "BeranaByte",
    description:
      "Blog / portfolio website where you can find blogs and projects on most recent technologies on software development and other tech things.",
    type: "website",
    image: "/static/images/banner.png",
  };

  return (
    <PageContainer meta={meta}>
      <BlogsContainer category={FEATURED} />
    </PageContainer>
  );
};

export default Index;
