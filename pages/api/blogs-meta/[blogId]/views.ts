import { NextApiRequest, NextApiResponse } from "next";
import BlogRepositoryImpl from "../../../../shared/lib/repository/blog/BlogRepositoryImpl";

type Response = {
  total: number;
};

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const repository = BlogRepositoryImpl.getInstance();
  const {
    query: { blogId },
  } = req;

  if (req.method === "POST") {
    await repository.updateBlogViewCount(blogId as string);
    return res.status(200).json({
      total: await getTotalViewCount(blogId as string),
    });
  }

  if (req.method === "GET") {
    return res.status(200).json({
      total: await getTotalViewCount(blogId as string),
    });
  }
};

async function getTotalViewCount(blogId: string): Promise<number> {
  const repository = BlogRepositoryImpl.getInstance();
  const totalViewCount = await repository.getBlogViewCount(blogId as string);
  return totalViewCount;
}
