import React from "react";
import Comment from "../types/Comment";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = (props: CommentItemProps) => {
  return <div>{props.comment.text}</div>;
};

export default CommentItem;
