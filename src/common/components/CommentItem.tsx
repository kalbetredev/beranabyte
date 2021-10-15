import React from "react";
import useUser from "../hooks/useUser";
import Comment from "../types/Comment";
import UserAvatar from "./UserAvatar";
import { format } from "date-fns";
import { ExclamationIcon } from "@heroicons/react/outline";
import CommentItemLoading from "./CommentItemLoading";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = (props: CommentItemProps) => {
  const { comment } = props;
  const { user, isLoading, error } = useUser(comment.authorId);
  const date = new Date(comment.date);
  const formattedDate = format(new Date(comment.date), "MMM d, yyyy");
  const dot = <span className="h-1 w-1 rounded-full bg-gray-400 mx-2"></span>;

  if (error)
    return (
      <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
        <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
        Error loading comment
      </h3>
    );

  if (isLoading) return <CommentItemLoading />;

  return (
    <div className="flex mb-3 pb-3">
      <div className="w-10">
        <UserAvatar userId={comment.authorId} size="small" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex text-[0.65em] text-gray-400 items-center">
          <p>{user.email}</p>
          {dot}
          <time dateTime={date.toDateString()} className="pr-4">
            {formattedDate}
          </time>
        </div>
        <article
          className="prose prose-sm sm:prose md:prose-md break-words dark:prose-dark"
          dangerouslySetInnerHTML={{
            __html: comment.content,
          }}
        ></article>
      </div>
    </div>
  );
};

export default CommentItem;
