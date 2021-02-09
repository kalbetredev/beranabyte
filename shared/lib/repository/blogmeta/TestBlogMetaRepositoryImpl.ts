import Comment from "../../model/Comment";
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

  getBlogComments(blogId: string): Promise<Comment[]> {
    const sampleComments: Comment[] = [
      {
        blogId: "",
        commentId: "",
        author: "Kalkidan Betre",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        date: new Date().toDateString(),
        replies: [
          {
            blogId: "",
            commentId: "",
            author: "Kalkidan Betre",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            date: new Date().toDateString(),
          },
          {
            blogId: "",
            commentId: "",
            author: "Kalkidan Betre",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            date: new Date().toDateString(),
          },
        ],
      },
    ];

    return new Promise((res, rej) => res(sampleComments));
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

export default TestBlogMetaRepositoryImpl;
