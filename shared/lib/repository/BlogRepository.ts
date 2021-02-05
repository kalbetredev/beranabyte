import BlogMetaRepository from "../model/blog/blogmeta-repository";
import FirebaseBlogMetaRepositoryImpl from "../model/blog/firebase-blogmeta-repository";
import FrontMatter from "../model/mdx/front-matter";
import LocalMDXRepositoryImpl from "./mdx/local-mdx-repository";
import MDX from "../model/mdx/mdx";

interface BlogRepository {
  getMostViewedBlogsFrontMatter(count: number): FrontMatter[];
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

  getMostViewedBlogsFrontMatter(count: number): FrontMatter[] {
    const blogsFrontMatter = this.mdxRepository.getAllFrontMatter(
      this.MDX_TYPE
    );

    //TODO: Access Firebase to get view count for each of the blogs
    //TODO: Take the 5 of the most viewed blogs

    // Sample
    const mostViewedBlogs = [
      {
        slug: "2019",
        title: "2019 Year in Review",
        publishedAt: "2019-12-26",
        uuid: "ADFEIAD858EADFEFA",
      },
      {
        slug: "backend",
        title: "Which Back End Should I Use As A Front-End Developer?",
        publishedAt: "2020-08-09",
        uuid: "ADFEIwAD858EADFEFA",
      },
      {
        slug: "test",
        title: "Test Blog",
        publishedAt: "2020-08-09",
        uuid: "ADFxxEIwAD858EADFEFA",
      },
    ];

    return mostViewedBlogs;
  }

  getLatestBlogsFrontMatter(count: number): FrontMatter[] {
    const blogsFrontMatter = this.mdxRepository.getAllFrontMatter(
      this.MDX_TYPE
    );

    const blogs = blogsFrontMatter.map((frontMatter) => {
      return {
        publishedAt: new Date(frontMatter.publishedAt),
        uuid: frontMatter.uuid,
      };
    });

    //TODO: Implement Sorting
    blogs.sort((a, b) => {
      if (a.publishedAt < b.publishedAt) return 1;
      else if (a.publishedAt > b.publishedAt) return -1;
      else return 0;
    });

    return blogsFrontMatter.filter(
      (frontMatter) =>
        blogs.filter((blog) => blog.uuid === frontMatter.uuid).length === 1
    );
  }

  getBlogViewCountAsync(blogId: string): Promise<number> {
    return this.blogMetaRepository.getBlogViewCountAsync(blogId);
  }

  updateBlogViewCount(blogId: string): Promise<void> {
    return this.blogMetaRepository.updateBlogViewCount(blogId);
  }
}

export default BlogRepositoryImpl;
