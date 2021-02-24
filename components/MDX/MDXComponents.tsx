import Image from "next/image";
import CodeBlock from "./CodeBlock";
import { H2, H3, H4 } from "./HeaderBase";
import { LI, OL, UL } from "./List";
import MDXLink from "./MDXLink";
import { Table } from "./Table";
import ImageCaption from "./ImageCaption";
import CenterContent from "./CenterContent";
import Paragraph from "./Paragraph";

const MDXComponents = {
  Image,
  ImageCaption,
  CenterContent,
  a: MDXLink,
  h2: H2,
  h3: H3,
  h4: H4,
  code: CodeBlock,
  li: LI,
  ol: OL,
  ul: UL,
  table: Table,
  p: Paragraph,
};

export default MDXComponents;
