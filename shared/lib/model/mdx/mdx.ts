import { MdxRemote } from "next-mdx-remote/types";
import FrontMatter from "./front-matter";

interface MDX {
  mdxSource: MdxRemote.Source;
  fontMatter: FrontMatter;
}

export default MDX;
