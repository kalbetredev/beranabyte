import BlogMetaRepository from "../types/blogmeta-repository";
import FirebaseBlogMetaRepositoryImpl from "./blog/firebase-blogmeta-repository";
import FrontMatter from "../types/front-matter";
import LocalMDXRepositoryImpl from "./mdx/local-mdx-repository";
import MDX from "../types/mdx";

interface BlogRepository {
  getMostViewedBlogsFrontMatter(count: number): Promise<FrontMatter[]>;
  getLatestBlogsFrontMatter(count: number): FrontMatter[];
  getBlogBySlug(slug: string): Promise<MDX>;
  getBlogsFrontMatter(): FrontMatter[];
}

class BlogRepositoryImpl implements BlogRepository, BlogMetaRepository {
  private static instance: BlogRepositoryImpl;
  private mdxRepository: LocalMDXRepositoryImpl;
  private blogMetaRepository: FirebaseBlogMetaRepositoryImpl;
  private MDX_TYPE = "blog";

  private constructor() {
    this.mdxRepository = new LocalMDXRepositoryImpl();
    this.blogMetaRepository = new FirebaseBlogMetaRepositoryImpl();
  }

  public static getInstance(): BlogRepositoryImpl {
    if (!BlogRepositoryImpl.instance) {
      BlogRepositoryImpl.instance = new BlogRepositoryImpl();
    }
    return BlogRepositoryImpl.instance;
  }

  getAllSlugs(type: string): string[] {
    return this.mdxRepository.getAllSlugs(type);
  }

  getBlogBySlug(slug: string): Promise<MDX> {
    return this.mdxRepository.getBySlug(this.MDX_TYPE, slug);
  }

  getBlogsFrontMatter(): FrontMatter[] {
    return this.mdxRepository.getAllFrontMatter(this.MDX_TYPE);
  }

  async getMostViewedBlogsFrontMatter(count: number): Promise<FrontMatter[]> {
    const mostViewedBlogIds = await this.getMostViewedBlogs(count);

    const mostViewedBlogs: FrontMatter[] = [];
    const blogsFrontMatter = this.getBlogsFrontMatter();
    mostViewedBlogIds.forEach((blogId) => {
      const blogFrontMatter = blogsFrontMatter.find(
        (matter) => matter.uuid === blogId
      );
      if (blogFrontMatter) mostViewedBlogs.push(blogFrontMatter);
    });

    return mostViewedBlogs;
  }

  private async getMostViewedBlogs(count: number): Promise<string[]> {
    return this.blogMetaRepository.getMostViewedBlogs(count);
  }

  getLatestBlogsFrontMatter(count: number): FrontMatter[] {
    const blogsFrontMatter = this.getBlogsFrontMatter();

    const sortedBlogs = blogsFrontMatter
      .slice(
        0,
        count > blogsFrontMatter.length ? blogsFrontMatter.length : count
      )
      .map((frontMatter) => {
        return {
          uuid: frontMatter.uuid,
          publishedAt: new Date(frontMatter.publishedAt),
        };
      })
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    const latestBlogsFrontMatter: FrontMatter[] = [];
    sortedBlogs.forEach((blogId) => {
      const blogFrontMatter = blogsFrontMatter.find(
        (matter) => matter.uuid === blogId.uuid
      );
      if (blogFrontMatter) latestBlogsFrontMatter.push(blogFrontMatter);
    });

    return latestBlogsFrontMatter;
  }

  getBlogViewCount(blogId: string): Promise<number> {
    return this.blogMetaRepository.getBlogViewCount(blogId);
  }

  updateBlogViewCount(blogId: string) {
    this.blogMetaRepository.updateBlogViewCount(blogId);
  }
}

export default BlogRepositoryImpl;
