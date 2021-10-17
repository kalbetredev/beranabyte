import React from "react";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

interface CommentsProps {
  blogId: string;
}

const CommentsSection: React.FC<CommentsProps> = (props: CommentsProps) => {
  return (
    <div className="border-t separator mt-8 pt-4 group">
      <div className="mt-2">
        <CommentInput blogId={props.blogId} />
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

export default CommentsSection;
