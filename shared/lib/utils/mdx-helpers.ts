import FrontMatter from "../model/mdx/front-matter";
import Page from "../model/Page";
import { PageGroup } from "../model/PageGroup";

export function convertFrontMatterToPageGroup(
  label: string,
  pagesFrontMatter: FrontMatter[]
): PageGroup {
  const pages = pagesFrontMatter.map(
    (frontMatter) =>
      new Page("", frontMatter.title, `/blog/${frontMatter.slug}` ?? "")
  );

  return {
    headerLabel: label,
    children: pages,
  };
}
