import Blog from "../models/Blog";
import Page from "../models/Page";
import { PageGroup } from "../models/PageGroup";

export function convertFrontMatterToPageGroup(
  label: string,
  blogs: Blog[]
): PageGroup {
  const pages = blogs.map(
    (blog: Blog) =>
      new Page(
        "",
        blog.title,
        `/blogs/${blog.category.toLowerCase()}/${blog._id}` ?? ""
      )
  );

  return {
    headerLabel: label,
    children: pages,
  };
}
