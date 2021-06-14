import FrontMatter from "../../types/FrontMatter";
import MDX from "../../types/mdx";

interface MDXRepository {
  getAllCategories(): string[];
  getFeaturedBlogsFrontMatter(): FrontMatter[];
  getProjectRelatedBlogsFrontMatter(): FrontMatter[];
  getAllSugs(): string[];
  getSlugsByCategory(category: string): string[];
  getBySlug(category: string, slug: string): Promise<MDX>;
  getFrontMattersByCategory(category: string): FrontMatter[];
  getAllFrontMatter(type: string): FrontMatter[];
  getAllBlogs(): [string, FrontMatter[]][];
}

export default MDXRepository;
