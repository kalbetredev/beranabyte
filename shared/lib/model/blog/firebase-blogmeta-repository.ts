import BlogMetaRepository from "./blogmeta-repository";

class FirebaseBlogMetaRepositoryImpl implements BlogMetaRepository {
  getBlogViewCountAsync(blogId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(10);
    });
  }

  updateBlogViewCount(blogId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`view count for ${blogId} updated`);
      resolve();
    });
  }
}

export default FirebaseBlogMetaRepositoryImpl;
