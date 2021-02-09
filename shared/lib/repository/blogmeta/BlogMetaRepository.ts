import Comment from "../../model/Comment";

interface BlogMetaRepository {
  getBlogViewCount(blogId: string): Promise<number>;
  updateBlogViewCount(blogId: string);
  getMostViewedBlogs(count: number): Promise<string[]>;
  getBlogComments(blogId: string): Promise<Comment[]>;
  addBlogComment(blogId: string, comment: string): Promise<Comment[]>;
  addCommentReply(
    blogId: string,
    commentId: string,
    reply: string
  ): Promise<Comment[]>;
}

export default BlogMetaRepository;
