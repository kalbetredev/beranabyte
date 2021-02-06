import { MdxRemote } from "next-mdx-remote/types";
import FrontMatter from "./FrontMatter";

interface MDX {
  mdxSource: MdxRemote.Source;
  fontMatter: FrontMatter;
}

export default MDX;
