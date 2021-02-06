import { NextApiRequest, NextApiResponse } from "next";
import BlogRepositoryImpl from "../../shared/lib/repository/blog/BlogRepositoryImpl";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const repository = BlogRepositoryImpl.getInstance();
  return res.status(200).json({
    categories: repository.getAllBlogCategories(),
  });
};
