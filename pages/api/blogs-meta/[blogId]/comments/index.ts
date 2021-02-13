import { NextApiRequest, NextApiResponse } from "next";
import BlogRepositoryImpl from "../../../../../shared/lib/repository/blog/BlogRepositoryImpl";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const repository = BlogRepositoryImpl.getInstance();
  const {
    query: { blogId },
    body: { comment, idToken },
  } = req;

  if (req.method === "POST") {
    const newCommentId = await repository.addBlogComment(
      blogId as string,
      comment,
      idToken
    );

    if (newCommentId) {
      return res.status(200).json({
        commentId: newCommentId,
      });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json({
      comments: await repository.getBlogComments(blogId as string),
    });
  }
};
