import Head from "next/head";
import PageMeta from "../types/PageMeta";
import { useRouter } from "next/router";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import ScrollTop from "../components/ScrollTop";

interface PageContainerProps {
  meta?: PageMeta;
  children?: React.ReactNode;
}

const PageContainer = (props: PageContainerProps) => {
  const meta = props.meta ?? {
    title: "BeranaByte",
    description:
      "Blog / portfolio website where you can find blogs and projects on most recent technologies on software development and other tech things.",
    type: "website",
    image: "/static/images/banner.png",
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        {meta.date && (
          <meta
            property="article:published_time"
            content={meta.date.toDateString()}
          />
        )}
        <meta
          property="og:url"
          content={`https://www.beranabyte.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="BeranaByte" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta
          property="og:image"
          content={`https://www.beranabyte.com${meta.image}`}
        />
      </Head>
      <div>
        <AppBar />
        <main className="mx-auto">
          <div className="max-w-[960px] px-3 sm:px-6 mx-auto">
            {props.children}
          </div>
        </main>
        <Footer />
        <ScrollTop />
      </div>
    </>
  );
};

export default PageContainer;
