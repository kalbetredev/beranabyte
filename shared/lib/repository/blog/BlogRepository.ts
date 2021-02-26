import FrontMatter from "../../types/FrontMatter";
import MDX from "../../types/MDX";

interface BlogRepository {
  getMostViewedBlogsFrontMatter(count: number): Promise<FrontMatter[]>;
  getLatestBlogsFrontMatter(count: number): FrontMatter[];
  getBlogBySlug(slug: string): Promise<MDX>;
  getBlog(category: string, slug: string): Promise<MDX>;
  getAllBlogsFrontMatter(): FrontMatter[];
  getAllBlogCategories(): string[];
  getFrontMattersByCategory(category: string): FrontMatter[];
  getSlugsByCategory(category: string): string[];
  getAllBlogs(): [string, FrontMatter[]][];
  getProjectRelatedBlogs(): FrontMatter[];
}

export default BlogRepository;
