import Head from "next/head";
import PageMeta from "../shared/lib/models/PageMeta";
import { useRouter } from "next/router";
import AppBar from "../components/AppBar";
import PageLink from "../constants/types/page_link";
import Footer from "../components/Footer";

interface PageContainerProps {
  meta: PageMeta;
  children?: React.ReactNode;
}

const PageContainer = (props: PageContainerProps) => {
  const { meta } = props;
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
