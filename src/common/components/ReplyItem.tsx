import React from "react";
import useUser from "../hooks/useUser";
import Reply from "../types/Reply";
import { format } from "date-fns";
import { ExclamationIcon } from "@heroicons/react/outline";
import CommentItemLoading from "./CommentItemLoading";
import UserAvatar from "./UserAvatar";

interface ReplyItemProps {
  reply: Reply;
}

const ReplyItem: React.FC<ReplyItemProps> = (props: ReplyItemProps) => {
  const { reply } = props;
  const { user, isLoading, error } = useUser(reply.authorId);
  const date = new Date(reply.date);
  const formattedDate = format(new Date(reply.date), "MMM d, yyyy");
  const dot = <span className="h-1 w-1 rounded-full bg-gray-400 mx-2"></span>;

  if (error)
    return (
      <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
        <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
        Error loading reply
      </h3>
    );

  if (isLoading) return <CommentItemLoading />;

  return (
    <div className="flex mb-3 pb-3">
      <div className="w-10">
        <UserAvatar userId={reply.authorId} size="small" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex text-[0.65em] text-gray-400 items-center">
          <p>{user.email}</p>
          {dot}
          <time dateTime={date.toDateString()} className="pr-4">
            {formattedDate}
          </time>
        </div>
        <article className="text-sm">{reply.text}</article>
      </div>
    </div>
  );
};

export default ReplyItem;
