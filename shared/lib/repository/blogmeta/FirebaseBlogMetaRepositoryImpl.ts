import BlogMetaRepository from "./BlogMetaRepository";
import {
  FirebaseAdminAuth,
  ServerTimestamp,
  UsersCollection,
  BlogMetaCollection,
} from "../../utils/firebase-admin";
import Comment from "../../model/Comment";

const COMMENTS_COLLECTION_NAME = "comments";
const REPLIES_COLLECTION_NAME = "replies";
const VIEW_COUNT_FILED = "viewCount";

class FirebaseBlogMetaRepositoryImpl implements BlogMetaRepository {
  async getBlogViewCount(blogId: string): Promise<number> {
    const blogRef = BlogMetaCollection.doc(blogId);
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
    const blogRef = BlogMetaCollection.doc(blogId);
    blogRef.set({
      viewCount: ++viewCount,
    });
  }

  async getMostViewedBlogs(count: number): Promise<string[]> {
    const blogs = await BlogMetaCollection.get();

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

  async getBlogComments(blogId: string): Promise<Comment[]> {
    const comments: Comment[] = [];
    const blogComments = BlogMetaCollection.doc(blogId).collection(
      COMMENTS_COLLECTION_NAME
    );

    const blogCommentSnapshot = await blogComments
      .orderBy("timestamp", "asc")
      .get();
    const commentIds: string[] = [];
    blogCommentSnapshot.docs.forEach((doc) => commentIds.push(doc.id));

    const commentRepliesSnapshots = new Map();

    for (let commentId of commentIds) {
      const repliesSnapshot = await BlogMetaCollection.doc(blogId)
        .collection(COMMENTS_COLLECTION_NAME)
        .doc(commentId)
        .collection(REPLIES_COLLECTION_NAME)
        .orderBy("timestamp", "asc")
        .get();

      commentRepliesSnapshots[commentId] = repliesSnapshot;
    }

    blogCommentSnapshot.forEach((commentDoc) => {
      const commentId = commentDoc.id;
      const commentUserUid = commentDoc.data()["userUid"];
      const commentText = commentDoc.data()["comment"];
      const commentTimestamp = commentDoc.data()["timestamp"];
      const commentReplies: Comment[] = [];

      commentRepliesSnapshots[commentId]?.forEach((replyDoc) => {
        const replyId = replyDoc.id;
        const replyUserUid = replyDoc.data()["userUid"];
        const reply = replyDoc.data()["reply"];
        const replyTimestamp = replyDoc.data()["timestamp"];

        const commentReply = new Comment(
          blogId,
          commentId,
          replyUserUid,
          reply,
          replyTimestamp.toDate()
        );
        commentReplies.push(commentReply);
      });

      const comment = new Comment(
        blogId,
        commentId,
        commentUserUid,
        commentText,
        commentTimestamp.toDate(),
        commentReplies
      );
      comments.push(comment);
    });

    return comments;
  }

  addBlogComment(
    blogId: string,
    comment: string,
    userIdToken: string
  ): Promise<string | null> {
    return FirebaseAdminAuth.verifyIdToken(userIdToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        const newCommentRef = BlogMetaCollection.doc(blogId)
          .collection(COMMENTS_COLLECTION_NAME)
          .doc();

        const newCommentDoc = {
          commentId: newCommentRef.id,
          userUid: uid,
          comment: comment,
          timestamp: ServerTimestamp,
        };

        return newCommentRef
          .set(newCommentDoc)
          .then(() => newCommentRef.id)
          .catch((error) => {
            console.log(error);
            return null;
          });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  addCommentReply(
    blogId: string,
    commentId: string,
    reply: string,
    userIdToken: string
  ): Promise<string | null> {
    return FirebaseAdminAuth.verifyIdToken(userIdToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        const newReplyRef = BlogMetaCollection.doc(blogId)
          .collection(COMMENTS_COLLECTION_NAME)
          .doc(commentId)
          .collection(REPLIES_COLLECTION_NAME)
          .doc();

        const newReplyDoc = {
          replyId: newReplyRef.id,
          userUid: uid,
          reply: reply,
          timestamp: ServerTimestamp,
        };

        return newReplyRef
          .set(newReplyDoc)
          .then(() => newReplyRef.id)
          .catch((error) => {
            console.log(error);
            return null;
          });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  async getUserName(userId: string): Promise<string> {
    const userRef = UsersCollection.doc(userId);
    const user = await userRef.get();
    if (user.exists) {
      return user.data()["userName"];
    }
    return "NOT FOUND";
  }
}

export default FirebaseBlogMetaRepositoryImpl;
