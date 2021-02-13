import { NextApiRequest, NextApiResponse } from "next";
import BlogRepositoryImpl from "../../../../../shared/lib/repository/blog/BlogRepositoryImpl";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const repository = BlogRepositoryImpl.getInstance();
  const {
    query: { blogId, commentId },
    body: { reply, idToken },
  } = req;

  if (req.method === "POST") {
    const newReplyId = await repository.addCommentReply(
      blogId as string,
      commentId as string,
      reply,
      idToken
    );

    if (newReplyId) {
      return res.status(200).json({
        commentId: newReplyId,
      });
    }
  }
};
