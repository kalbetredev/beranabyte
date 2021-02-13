import { NextApiRequest, NextApiResponse } from "next";
import BlogRepositoryImpl from "../../../shared/lib/repository/blog/BlogRepositoryImpl";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const repository = BlogRepositoryImpl.getInstance();
  const {
    query: { userId },
  } = req;

  return res.status(200).json({
    username: await repository.getUserName(userId as string),
  });
};
