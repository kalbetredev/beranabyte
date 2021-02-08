class Comment {
  constructor(
    public author: string,
    public text: string,
    public date: Date,
    public replies?: Comment[]
  ) {}
}

export default Comment;
