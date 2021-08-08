interface Blog {
  _id: string;
  title: string;
  category: string;
  isFeatured: boolean;
  publishedAt: string;
  summary: string;
  imageUrl: string;
  viewCount: number;
  mdx?: string;
}

export default Blog;
