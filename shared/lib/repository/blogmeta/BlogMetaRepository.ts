interface BlogMetaRepository {
  getBlogViewCount(blogId: string): Promise<number>;
  updateBlogViewCount(blogId: string);
  getMostViewedBlogs(count: number): Promise<string[]>;
}

export default BlogMetaRepository;
