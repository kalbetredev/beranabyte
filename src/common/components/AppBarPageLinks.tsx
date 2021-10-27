import Link from "next/link";
import { useRouter } from "next/router";
import pageSlugs from "../constants/page-slugs";

const AppBarPageLinks: React.FC = () => {
  const router = useRouter();

  const mainPages = [
    { slug: "/", label: "home" },
    { slug: pageSlugs.blogsPage, label: "blogs" },
    { slug: pageSlugs.projectsPage, label: "projects" },
  ];

  return (
    <div className="flex">
      {mainPages.map((page) => (
        <div
          key={page.slug}
          className="relative w-20 h-6 hover:bg-gray-400 hover:bg-opacity-10 hover:text-brand cursor-pointer"
        >
          <Link href={page.slug}>
            <a className="text-xs text-center uppercase w-full h-full flex justify-center items-center">
              {page.label}
            </a>
          </Link>
          <div
            className={
              "absolute -bottom-3 w-20 h-1 rounded-t-full" +
              (page.slug == router.asPath.split("?")[0]
                ? " bg-brand-light dark:bg-brand-dark"
                : "")
            }
          ></div>
        </div>
      ))}
    </div>
  );
};

export default AppBarPageLinks;
