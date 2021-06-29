import Page from "../lib/models/Page";
import {
  JavaBrandIcon,
  JavaScriptBrandIcon,
  NextJsBrandIcon,
  PythonBrandIcon,
  ReactBrandIcon,
} from "../../icons";
import { FEATURED } from "../../constants/strings";

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
        new Page("Blog", category, `/blogs/${category.toLowerCase()}`)
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

const KnownPages: { label: string; icon?: JSX.Element }[] = [
  {
    label: "JavaScript",
    icon: <JavaScriptBrandIcon />,
  },
  {
    label: "NextJS",
    icon: <NextJsBrandIcon />,
  },
  {
    label: "React",
    icon: <ReactBrandIcon />,
  },
  {
    label: "Python",
    icon: <PythonBrandIcon />,
  },
  {
    label: "Java",
    icon: <JavaBrandIcon />,
  },
];
