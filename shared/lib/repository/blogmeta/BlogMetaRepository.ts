import Comment from "../../model/Comment";

interface BlogMetaRepository {
  getBlogViewCount(blogId: string): Promise<number>;
  updateBlogViewCount(blogId: string);
  getMostViewedBlogs(count: number): Promise<string[]>;
  getBlogComments(blogId: string): Promise<Comment[]>;
  addBlogComment(
    blogId: string,
    comment: string,
    userIdToken: string
  ): Promise<string | null>;
  addCommentReply(
    blogId: string,
    commentId: string,
    reply: string,
    userIdToken: string
  ): Promise<string | null>;
  getUserName(userId: string): Promise<string>;
}

export default BlogMetaRepository;
