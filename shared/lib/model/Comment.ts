class Comment {
  constructor(
    public blogId: string,
    public commentId: string,
    public author: string,
    public text: string,
    public date: string,
    public replies?: Comment[]
  ) {}
}

export default Comment;
