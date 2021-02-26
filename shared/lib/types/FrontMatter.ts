interface FrontMatter {
  slug: string | null;
  category: string | null;
  wordCount?: number;
  readingTime?: number;
  title: string;
  publishedAt: string;
  summary?: string;
  image?: string;
  uuid: string;
}

export const FRONTMATTER_KEYS = {
  title: "title",
  publishedAt: "publishedAt",
  summary: "summary",
  image: "image",
  uuid: "uuid",
};

export default FrontMatter;
