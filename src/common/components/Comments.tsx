import React, { useState } from "react";
import useComments from "../hooks/useComments";
import UserAvatar from "./UserAvatar";
import MarkdownEditor from "./MarkdownEditor";
import Joi from "joi";
import CommentList from "./CommentList";

interface CommentsProps {
  blogId: string;
}

const commentMarkdownSchema = Joi.object({
  markdown: Joi.string().min(10).max(1000).required(),
});

const Comments: React.FC<CommentsProps> = (props: CommentsProps) => {
  const [isSending, setIsSending] = useState(false);
  const { sendComment } = useComments(props.blogId);

  const addComment = (comment, clearContent: () => void) => {
    setIsSending(true);
    sendComment(props.blogId, comment, (success: boolean) => {
      setIsSending(false);
      if (success) clearContent();
    });
  };

  return (
    <div className="border-t separator mt-8 pt-4 group">
      <div className="flex mt-2">
        <UserAvatar />
        <div className="relative flex-1">
          <div className="w-3 inline-block absolute z-50 top-3 -left-1">
            <div className="h-3 bg-gray-50 dark:bg-gray-700 border border-r-0 border-b-0 border-gray-200 dark:border-gray-600 -rotate-45 transform origin-top-right"></div>
          </div>
          <MarkdownEditor
            placeHolder="Your Comment..."
            submitButtonLabel="Comment"
            isLoading={isSending}
            callback={addComment}
            markdownSchema={commentMarkdownSchema}
          />
        </div>
      </div>
      <div className="border-t separator mt-6 pt-4">
        <h3 className="font-medium">Comments</h3>
        <div className="mt-4">
          <CommentList blogId={props.blogId} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
