import React from "react";
import { ExclamationIcon } from "@heroicons/react/outline";
import CommentListItem from "./CommentListItem";
import CommentListItemLoading from "./CommentListItemLoading";
import useComments from "../../hooks/useComments";

interface CommentListProps {
  blogId: string;
}

const CommentList: React.FC<CommentListProps> = (props: CommentListProps) => {
  const { isLoading, comments, isError } = useComments(props.blogId);

  if (isLoading)
    return (
      <>
        <CommentListItemLoading />
        <CommentListItemLoading />
        <CommentListItemLoading />
      </>
    );

  if (isError)
    return (
      <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
        <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
        Error loading comments
      </h3>
    );

  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentListItem key={comment._id} comment={comment} />
        ))
      ) : (
        <p className="text-xs">
          No Comments Yet. Be the first to share your thoughts ....
        </p>
      )}
    </>
  );
};

export default CommentList;
