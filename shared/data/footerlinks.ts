import Page from "../lib/model/Page";
import { PageGroup } from "../lib/model/PageGroup";

const FooterLinks: PageGroup[] = [
  {
    headerLabel: "BeranaByte",
    children: [
      new Page("", "About", "/about", undefined),
      new Page("", "Contact Me", "/about", undefined),
      new Page("", "CV", "/cv", undefined),
    ],
  },
  {
    headerLabel: "Resources",
    children: [new Page("", "Github", "https://www.github.com", undefined)],
  },
];

export default FooterLinks;
