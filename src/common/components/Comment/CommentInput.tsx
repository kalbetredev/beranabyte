import React, { useState } from "react";
import Joi from "joi";
import useComments from "../../hooks/useComments";
import MarkdownEditor from "../MarkdownEditor";
import UserAvatar from "../UserAvatar";

interface CommentInputProps {
  blogId: string;
}

const commentMarkdownSchema = Joi.object({
  markdown: Joi.string().min(10).max(1000).required(),
});

const CommentInput: React.FC<CommentInputProps> = (
  props: CommentInputProps
) => {
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
    <div className="flex">
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
  );
};

export default CommentInput;
