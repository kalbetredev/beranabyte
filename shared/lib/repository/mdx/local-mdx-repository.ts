import FrontMatter from "../../types/front-matter";
import MDX from "../../types/mdx";
import MDXRepository from "./mdx-repository";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MDXComponents from "../../../../components/MDX/MDXComponents";
import renderToString from "next-mdx-remote/render-to-string";
import readingTime from "reading-time";

const BLOG_ROOT_DIR = "shared/data";
class LocalMDXRepositoryImpl implements MDXRepository {
  root = process.cwd();

  getAllSlugs(type: string): string[] {
    const postPaths = fs.readdirSync(path.join(this.root, BLOG_ROOT_DIR, type));
    const slugs = postPaths.map((postPath) => postPath.replace(/\.mdx/, ""));
    return slugs;
  }

  async getBySlug(type: string, slug: string): Promise<MDX> {
    const source = slug
      ? fs.readFileSync(
          path.join(this.root, BLOG_ROOT_DIR, type, `${slug}.mdx`),
          "utf8"
        )
      : fs.readFileSync(
          path.join(this.root, BLOG_ROOT_DIR, `${type}.mdx`),
          "utf8"
        );

    const { data, content } = matter(source);
    const mdxSource = await renderToString(content, {
      components: MDXComponents,
      mdxOptions: {
        remarkPlugins: [
          require("remark-autolink-headings"),
          require("remark-slug"),
        ],
        rehypePlugins: [],
      },
    });

    return new Promise<MDX>((resolve, reject) => {
      resolve({
        mdxSource: mdxSource,
        fontMatter: {
          wordCount: content.split(/\s+/gu).length,
          readingTime: readingTime(content).minutes,
          slug: slug || null,
          title: data["title"],
          publishedAt: data["publishedAt"],
          summary: data["summary"],
          image: data["image"],
          uuid: data["uuid"],
        },
      });
    });
  }

  getAllFrontMatter(type: string): FrontMatter[] {
    const files = fs.readdirSync(path.join(this.root, BLOG_ROOT_DIR, type));

    return files.map((postSlug: string) => {
      const source = fs.readFileSync(
        path.join(this.root, BLOG_ROOT_DIR, type, postSlug),
        "utf8"
      );
      const { data } = matter(source);
      return {
        slug: postSlug.replace(".mdx", ""),
        title: data["title"],
        publishedAt: data["publishedAt"],
        summary: data["summary"],
        image: data["image"],
        uuid: data["uuid"],
      };
    });
  }
}

export default LocalMDXRepositoryImpl;
