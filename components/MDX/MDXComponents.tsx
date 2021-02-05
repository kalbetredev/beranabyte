import Image from "next/image";
import CodeBlock from "./CodeBlock";
import { H2, H3, H4 } from "./HeaderBase";
import { LI, UL } from "./List";
import MDXLink from "./MDXLink";
import { Table } from "./Table";

const MDXComponents = {
  Image,
  a: MDXLink,
  h2: H2,
  h3: H3,
  h4: H4,
  code: CodeBlock,
  li: LI,
  ul: UL,
  table: Table,
};

export default MDXComponents;
