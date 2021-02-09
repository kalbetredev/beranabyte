import BlogMetaRepository from "./BlogMetaRepository";
import firebaseAdmin from "../../utils/firebase-admin";
import Comment from "../../model/Comment";

const firebaseDb = firebaseAdmin.firestore();
const VIEW_COLLECTION = firebaseDb.collection("views");
const VIEW_COUNT_FILED = "viewCount";

class FirebaseBlogMetaRepositoryImpl implements BlogMetaRepository {
  async getBlogViewCount(blogId: string): Promise<number> {
    const blogRef = VIEW_COLLECTION.doc(blogId);
    const blog = await blogRef.get();

    if (blog.exists) {
      let count = (await blog.get(VIEW_COUNT_FILED)) as number;
      return count;
    } else {
      blogRef.set({
        viewCount: 1,
      });
      return 1;
    }
  }

  async updateBlogViewCount(blogId: string) {
    let viewCount = await this.getBlogViewCount(blogId);
    const blogRef = VIEW_COLLECTION.doc(blogId);
    blogRef.set({
      viewCount: ++viewCount,
    });
  }

  async getMostViewedBlogs(count: number): Promise<string[]> {
    const blogs = await VIEW_COLLECTION.get();

    const blogsWithCount: { id: string; viewCount: number }[] = [];
    await blogs.docs.forEach((doc) => {
      blogsWithCount.push({
        id: doc.id,
        viewCount: doc.get(VIEW_COUNT_FILED),
      });
    });

    blogsWithCount.sort((a, b) => b.viewCount - a.viewCount);

    if (blogsWithCount.length < count) {
      return blogsWithCount.map((blog) => blog.id);
    }

    return blogsWithCount.map((blog) => blog.id).slice(0, count);
  }

  getBlogComments(blogId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }

  addBlogComment(blogId: string, comment: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  addCommentReply(
    blogId: string,
    commentId: string,
    reply: string
  ): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
}

export default FirebaseBlogMetaRepositoryImpl;
