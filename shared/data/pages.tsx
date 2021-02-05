import Page from "../lib/model/Page";
import {
  JavaBrandIcon,
  JavaScriptBrandIcon,
  NextJsBrandIcon,
  PythonBrandIcon,
  ReactBrandIcon,
} from "../../icons";

const Pages: Page[] = [
  new Page("Home", "Home", "/", undefined),

  new Page("Blog", "JavaScript", "/blog/js", <JavaScriptBrandIcon />),
  new Page("Blog", "NextJS", "/blog/nextjs", <NextJsBrandIcon />),
  new Page("Blog", "React", "/blog/react", <ReactBrandIcon />),
  new Page("Blog", "Algorithms", "/blog/algorithms", undefined),
  new Page("Blog", "Python", "/blog/python", <PythonBrandIcon />),
  new Page("Blog", "Machine Learning", "/blog/ml", undefined),
  new Page("Blog", "Artificial Intelligence", "/blog/ai", undefined),
  new Page("Blog", "Web Dev", "/blog/web-dev", undefined),
  new Page("Blog", "Tech Things", "/blog/tech-things", undefined),
  new Page("Blog", "Java", "/blog/java", <JavaBrandIcon />),

  new Page("Projects", "Projects", "/projects", undefined),
];

export const SignInPage = new Page("About", "About", "/user/signin", undefined);
export const ProfilePage = new Page(
  "About",
  "About",
  "/user/profile",
  undefined
);
export const MyAccountPage = new Page(
  "About",
  "About",
  "/user/myaccount",
  undefined
);

export default Pages;
