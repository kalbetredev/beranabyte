import { NextApiRequest, NextApiResponse } from "next";
import BlogRepositoryImpl from "../../../shared/lib/repository/blog/BlogRepositoryImpl";

//TODO: update comments and replies for a blog
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const repository = BlogRepositoryImpl.getInstance();
  const {
    query: { blogId },
  } = req;

  return res.status(200).json({
    comments: await repository.getBlogComments(blogId as string),
  });
};
