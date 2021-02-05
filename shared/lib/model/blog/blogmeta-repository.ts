interface BlogMetaRepository {
  getBlogViewCountAsync(blogId: string): Promise<number>;
  updateBlogViewCount(blogId: string): Promise<void>;
}

export default BlogMetaRepository;
