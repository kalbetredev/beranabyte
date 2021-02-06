import FrontMatter from "../../types/front-matter";
import MDX from "../../types/mdx";

interface MDXRepository {
  getAllSlugs(type: string): string[];
  getBySlug(type: string, slug: string): Promise<MDX>;
  getAllFrontMatter(type: string): FrontMatter[];
}

export default MDXRepository;
