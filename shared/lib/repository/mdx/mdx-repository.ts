import FrontMatter from "../../model/mdx/front-matter";
import MDX from "../../model/mdx/mdx";

interface MDXRepository {
  getAllSlugs(type: string): string[];
  getBySlug(type: string, slug: string): Promise<MDX>;
  getAllFrontMatter(type: string): FrontMatter[];
}

export default MDXRepository;
