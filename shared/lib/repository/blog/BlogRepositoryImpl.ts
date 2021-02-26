import BlogMetaRepository from "../blogmeta/BlogMetaRepository";
import FirebaseBlogMetaRepositoryImpl from "../blogmeta/FirebaseBlogMetaRepositoryImpl";
import FrontMatter from "../../types/FrontMatter";
import LocalMDXRepositoryImpl from "../mdx/LocalMDXRepositoryImpl";
import MDX from "../../types/MDX";
import BlogRepository from "./BlogRepository";
import MDXRepository from "../mdx/MDXRepository";
import TestBlogMetaRepositoryImpl from "../blogmeta/TestBlogMetaRepositoryImpl";
import Comment from "../../model/Comment";
import MDXUuidChecker from "../mdx/MDXUuidChecker";

class BlogRepositoryImpl implements BlogRepository, BlogMetaRepository {
  private static instance: BlogRepositoryImpl;
  private mdxUuidChecker: MDXUuidChecker;
  private mdxRepository: MDXRepository;
  private blogMetaRepository: BlogMetaRepository;
  private MDX_TYPE = "blog";

  private constructor() {
    this.mdxUuidChecker = new MDXUuidChecker();
    this.mdxRepository = new LocalMDXRepositoryImpl();
    this.blogMetaRepository = this.isRemote()
      ? new FirebaseBlogMetaRepositoryImpl()
      : new TestBlogMetaRepositoryImpl();
    this.runUuidGenerator();
  }

  isRemote() {
    return process.env.BLOG_META_DB && process.env.BLOG_META_DB == "remote";
  }

  async runUuidGenerator() {
    if (this.isRemote()) await this.mdxUuidChecker.run();
  }

  public static getInstance(): BlogRepositoryImpl {
    if (!BlogRepositoryImpl.instance) {
      BlogRepositoryImpl.instance = new BlogRepositoryImpl();
    }
    return BlogRepositoryImpl.instance;
  }

  getAllBlogCategories(): string[] {
    return this.mdxRepository.getAllCategories();
  }

  getAllSlugs(type: string): string[] {
    return this.mdxRepository.getAllSugs();
  }

  getBlogBySlug(slug: string): Promise<MDX> {
    return this.mdxRepository.getBySlug(this.MDX_TYPE, slug);
  }

  getAllBlogsFrontMatter(): FrontMatter[] {
    return this.mdxRepository.getAllFrontMatter(this.MDX_TYPE);
  }

  async getMostViewedBlogsFrontMatter(count: number): Promise<FrontMatter[]> {
    const mostViewedBlogIds = await this.getMostViewedBlogs(count);

    const mostViewedBlogs: FrontMatter[] = [];
    const blogsFrontMatter = this.getAllBlogsFrontMatter();
    mostViewedBlogIds.forEach((blogId) => {
      const blogFrontMatter = blogsFrontMatter.find(
        (matter) => matter.uuid === blogId
      );
      if (blogFrontMatter) mostViewedBlogs.push(blogFrontMatter);
    });

    return mostViewedBlogs;
  }

  async getMostViewedBlogs(count: number): Promise<string[]> {
    return this.blogMetaRepository.getMostViewedBlogs(count);
  }

  getLatestBlogsFrontMatter(count: number): FrontMatter[] {
    const blogsFrontMatter = this.getAllBlogsFrontMatter();

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

  getFrontMattersByCategory(category: string): FrontMatter[] {
    return this.mdxRepository.getFrontMattersByCategory(category);
  }

  getBlog(category: string, slug: string): Promise<MDX> {
    return this.mdxRepository.getBySlug(category, slug);
  }

  getSlugsByCategory(category: string): string[] {
    return this.mdxRepository.getSlugsByCategory(category);
  }

  getBlogComments(blogId: string): Promise<Comment[]> {
    return this.blogMetaRepository.getBlogComments(blogId);
  }

  addBlogComment(
    blogId: string,
    comment: string,
    userIdToken: string
  ): Promise<string | null> {
    return this.blogMetaRepository.addBlogComment(blogId, comment, userIdToken);
  }

  addCommentReply(
    blogId: string,
    commentId: string,
    reply: string,
    userIdToken: string
  ): Promise<string | null> {
    return this.blogMetaRepository.addCommentReply(
      blogId,
      commentId,
      reply,
      userIdToken
    );
  }

  getUserName(userId: string): Promise<string> {
    return this.blogMetaRepository.getUserName(userId);
  }

  getAllBlogs(): [string, FrontMatter[]][] {
    return this.mdxRepository.getAllBlogs();
  }

  getProjectRelatedBlogs(): FrontMatter[] {
    return this.mdxRepository.getProjectRelatedBlogsFrontMatter();
  }
}

export default BlogRepositoryImpl;
