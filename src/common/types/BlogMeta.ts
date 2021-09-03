interface BlogMeta {
  _id: string;
  authorId: string;
  title: string;
  topic: string;
  isFeatured: boolean;
  isPublished: boolean;
  publishedOn: string;
  lastModifiedOn: string;
  summary: string;
  imageUrl: string;
  viewCount: Number;
}

export default BlogMeta;
