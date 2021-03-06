import React from "react";
import useReply from "../../hooks/useReply";
import ReplyListItem from "./ReplyListItem";

interface ReplyListProps {
  commentId: string;
}

const ReplyList: React.FC<ReplyListProps> = (props: ReplyListProps) => {
  const { isLoading, replies, isError } = useReply(props.commentId);

  if (isLoading || isError) return null;

  return (
    <>
      {replies && replies.length > 0
        ? replies.map((reply) => (
            <ReplyListItem key={reply._id} reply={reply} />
          ))
        : null}
    </>
  );
};

export default ReplyList;
