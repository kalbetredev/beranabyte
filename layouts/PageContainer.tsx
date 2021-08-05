import Head from "next/head";
import PageMeta from "../shared/lib/models/PageMeta";
import { useRouter } from "next/router";
import { useState } from "react";
import AppBar from "../components/AppBar";
import Theme from "../constants/types/theme";
import PageLink from "../constants/types/page_link";

interface PageContainerProps {
  meta: PageMeta;
  children?: React.ReactNode;
}

const PageContainer = (props: PageContainerProps) => {
  const { meta } = props;
  const router = useRouter();

  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const switchTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    });
  };

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
      <div className={`${theme === Theme.DARK ? "dark" : ""}`}>
        <AppBar switchTheme={switchTheme} theme={theme} pageLinks={pageLinks} />
        <main className="flex justify-center dark:bg-dark dark:text-white">
          <div className="flex-1 max-w-[960px] px-3 sm:px-6">
            {props.children}
          </div>
        </main>
      </div>
    </>
  );
};

export default PageContainer;
