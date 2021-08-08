import Page from "../lib/models/Page";
// import {
//   JavaBrandIcon,
//   JavaScriptBrandIcon,
//   NextJsBrandIcon,
//   PythonBrandIcon,
//   ReactBrandIcon,
// } from "../../src/common/icons";
import { FEATURED } from "../../constants/strings";
import { GitHubIcon } from "../../../src/icons";

export const HomePage = new Page("Home", "Home", "/", undefined);
export const ProjectsPage = new Page(
  "Projects",
  "Projects",
  "/projects",
  undefined
);

export const SignInPage = new Page("", "Sign In", "/account", undefined);

export function pagesFromCategories(categories: string[]): Page[] {
  const pages: Page[] = [];
  categories
    .filter((category) => category !== FEATURED)
    .forEach((category) => {
      pages.push(
        new Page("Blogs", category, `/blogs/${category.toLowerCase()}`)
      );
    });

  return batchFormatPages(pages);
}

export function batchFormatPages(pages: Page[]): Page[] {
  return pages.map((page) => formatPage(page));
}

export function formatPage(page: Page): Page {
  KnownPages.forEach((knownPage) => {
    if (knownPage.label.toLowerCase() === page.label.toLowerCase()) {
      page.label = knownPage.label;
      page.icon = knownPage.icon;
      return page;
    }
  });

  return page;
}

//TODO: Replace Github icon with the respective brand icon
const KnownPages: { label: string; icon?: JSX.Element }[] = [
  {
    label: "JavaScript",
    icon: <GitHubIcon />,
  },
  {
    label: "NextJS",
    icon: <GitHubIcon />,
  },
  {
    label: "React",
    icon: <GitHubIcon />,
  },
  {
    label: "Python",
    icon: <GitHubIcon />,
  },
  {
    label: "Java",
    icon: <GitHubIcon />,
  },
];
