import BlogMetaRepository from "./BlogMetaRepository";

class TestBlogMetaRepositoryImpl implements BlogMetaRepository {
  getBlogViewCount(blogId: string): Promise<number> {
    return new Promise((res, rej) => res(1));
  }
  updateBlogViewCount(blogId: string) {
    console.log("Updated View Count");
  }
  getMostViewedBlogs(count: number): Promise<string[]> {
    return new Promise((res, rej) =>
      res(["ADFEIAD858EADFEFA", "ADFxxEIwAD858EADFEFA"])
    );
  }
}

export default TestBlogMetaRepositoryImpl;
