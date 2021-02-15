import FrontMatter from "../../types/FrontMatter";
import MDX from "../../types/MDX";
import MDXRepository from "./MDXRepository";
import fs, { readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import MDXComponents from "../../../../components/MDX/MDXComponents";
import renderToString from "next-mdx-remote/render-to-string";
import readingTime from "reading-time";
import { FEATURED } from "../../../../constants/strings";

const BLOG_ROOT_DIR = "shared/data/blog";
class LocalMDXRepositoryImpl implements MDXRepository {
  root = process.cwd();
  rootPath = path.join(this.root, BLOG_ROOT_DIR);

  getAllCategories(): string[] {
    const directories = readdirSync(this.rootPath, { withFileTypes: true })
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name);

    return directories;
  }

  getFeaturedBlogsFrontMatter(): FrontMatter[] {
    const categories = this.getAllCategories();
    if (categories.includes(FEATURED)) {
      return this.getFrontMattersByCategory(FEATURED);
    } else return [];
  }

  getAllSugs(): string[] {
    const categories = this.getAllCategories();
    const slugs: string[] = [];
    categories.forEach((category) => {
      this.getSlugsByCategory(category).forEach((slug) => slugs.push(slug));
    });
    return slugs;
  }

  getSlugsByCategory(category: string): string[] {
    const postPaths = fs.readdirSync(
      path.join(this.root, BLOG_ROOT_DIR, category)
    );
    const slugs = postPaths.map((postPath) => postPath.replace(/\.mdx/, ""));
    return slugs;
  }

  async getBySlug(category: string, slug: string): Promise<MDX> {
    const source = fs.readFileSync(
      path.join(this.root, BLOG_ROOT_DIR, category, `${slug}.mdx`),
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
          slug: slug || null,
          category: category,
          wordCount: content.split(/\s+/gu).length,
          readingTime: readingTime(content).minutes,
          title: data["title"],
          publishedAt: data["publishedAt"],
          summary: data["summary"],
          image: data["image"],
          uuid: data["uuid"],
        },
      });
    });
  }

  getFrontMattersByCategory(category: string): FrontMatter[] {
    const files = fs.readdirSync(path.join(this.root, BLOG_ROOT_DIR, category));
    return files.map((postSlug: string) => {
      const source = fs.readFileSync(
        path.join(this.root, BLOG_ROOT_DIR, category, postSlug),
        "utf8"
      );
      const { data } = matter(source);
      return {
        slug: postSlug.replace(".mdx", ""),
        category: category,
        title: data["title"],
        publishedAt: data["publishedAt"],
        summary: data["summary"],
        image: data["image"],
        uuid: data["uuid"],
      };
    });
  }

  getAllFrontMatter(type: string): FrontMatter[] {
    const categories = this.getAllCategories();
    const allFrontMatters: FrontMatter[] = [];
    categories.forEach((category) => {
      this.getFrontMattersByCategory(category).forEach((frontMatter) =>
        allFrontMatters.push(frontMatter)
      );
    });
    return allFrontMatters;
  }

  getAllBlogs(): [string, FrontMatter[]][] {
    const categories = this.getAllCategories();
    const blogsMap: Map<string, FrontMatter[]> = new Map();

    categories.forEach((category) => {
      const categoryFrontMatters = this.getFrontMattersByCategory(category);
      blogsMap.set(category, categoryFrontMatters);
    });

    return Array.from(blogsMap.entries());
  }
}

export default LocalMDXRepositoryImpl;
