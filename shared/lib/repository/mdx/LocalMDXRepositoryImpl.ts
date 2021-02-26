import FrontMatter, { FRONTMATTER_KEYS } from "../../types/FrontMatter";
import MDX from "../../types/MDX";
import MDXRepository from "./MDXRepository";
import fs, { readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import MDXComponents from "../../../../components/MDX/MDXComponents";
import renderToString from "next-mdx-remote/render-to-string";
import readingTime from "reading-time";
import { FEATURED } from "../../../../constants/strings";
import { BLOG_ROOT_DIR, SHARED_DATA_ROOT_DIR } from "./Directories";

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
    const blogs = this.getFeaturedBlogs();
    return blogs.map(({ category, slug }) =>
      this.getFrontMatter(category, slug)
    );
  }

  getProjectRelatedBlogsFrontMatter(): FrontMatter[] {
    const blogs = this.getProjectRelatedBlogs();
    return blogs.map(({ category, slug }) =>
      this.getFrontMatter(category, slug)
    );
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
          title: data[FRONTMATTER_KEYS.title],
          publishedAt: data[FRONTMATTER_KEYS.publishedAt],
          summary: data[FRONTMATTER_KEYS.summary],
          image: data[FRONTMATTER_KEYS.image],
          uuid: data[FRONTMATTER_KEYS.uuid],
        },
      });
    });
  }

  getFrontMattersByCategory(category: string): FrontMatter[] {
    const files = fs.readdirSync(path.join(this.root, BLOG_ROOT_DIR, category));
    return files.map((postSlug: string) =>
      this.getFrontMatter(category, postSlug.replace(".mdx", ""))
    );
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

    blogsMap.set(FEATURED, this.getFeaturedBlogsFrontMatter());

    return Array.from(blogsMap.entries());
  }

  getFrontMatter(category: string, slug: string): FrontMatter {
    const source = fs.readFileSync(
      path.join(this.root, BLOG_ROOT_DIR, category, `${slug}.mdx`),
      "utf8"
    );
    const { data } = matter(source);
    return {
      slug: slug.replace(".mdx", ""),
      category: category,
      title: data[FRONTMATTER_KEYS.title],
      publishedAt: data[FRONTMATTER_KEYS.publishedAt],
      summary: data[FRONTMATTER_KEYS.summary],
      image: data[FRONTMATTER_KEYS.image],
      uuid: data[FRONTMATTER_KEYS.uuid],
    };
  }

  getFeaturedBlogs(): { category: string; slug: string }[] {
    const featuredBlogsFile = fs.readFileSync(
      path.join(this.root, SHARED_DATA_ROOT_DIR, "FeaturedBlogs.json"),
      "utf-8"
    );
    const featuredBlogs: { category: string; slug: string }[] = JSON.parse(
      featuredBlogsFile
    );
    return featuredBlogs;
  }

  getProjectRelatedBlogs(): { category: string; slug: string }[] {
    const projectRelatedFile = fs.readFileSync(
      path.join(this.root, SHARED_DATA_ROOT_DIR, "ProjectRelatedBlogs.json"),
      "utf-8"
    );
    const projectRelatedBlogs: {
      category: string;
      slug: string;
    }[] = JSON.parse(projectRelatedFile);
    return projectRelatedBlogs;
  }
}

export default LocalMDXRepositoryImpl;
