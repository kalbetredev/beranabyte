interface FrontMatter {
  slug: string | null;
  wordCount?: number;
  readingTime?: number;
  title: string;
  publishedAt: string;
  summary?: string;
  image?: string;
  uuid: string;
}

export default FrontMatter;
