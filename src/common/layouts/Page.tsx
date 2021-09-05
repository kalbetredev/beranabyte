import Head from "next/head";
import PageMeta from "../types/PageMeta";
import { useRouter } from "next/router";
import AppBar from "../components/AppBar";
import PageLink from "../types/PageLink";
import Footer from "../components/Footer";

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

  const pageLinks: PageLink[] = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    { label: "Projects", href: "/projects" },
  ];

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
        <AppBar pageLinks={pageLinks} />
        <main className="flex justify-center">
          <div className="flex flex-1 max-w-[960px] px-3 sm:px-6">
            {props.children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PageContainer;
