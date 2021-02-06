import FrontMatter from "../types/FrontMatter";
import Page from "../model/Page";
import { PageGroup } from "../model/PageGroup";

export function convertFrontMatterToPageGroup(
  label: string,
  pagesFrontMatter: FrontMatter[]
): PageGroup {
  const pages = pagesFrontMatter.map(
    (frontMatter) =>
      new Page(
        "",
        frontMatter.title,
        `/blog/${frontMatter.category}/${frontMatter.slug}` ?? ""
      )
  );

  return {
    headerLabel: label,
    children: pages,
  };
}
