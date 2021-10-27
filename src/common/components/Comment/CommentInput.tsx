import React, { useEffect, useState } from "react";
import Joi from "joi";
import useComments from "../../hooks/useComments";
import UserAvatar from "../UserAvatar";
import useAuth, { AuthProvider } from "../../../modules/auth/hooks/useAuth";
import useModal, { ModalProvider } from "../../hooks/useModal";
import SignInDialog from "../SignInDialog";
import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import SpinnerIcon from "../../../icons/SpinnerIcon";
import MarkdownFormEditor from "../MarkdownEditor";

interface CommentInputProps {
  blogId: string;
}

type MarkdownForm = {
  markdown: string;
};

const markdownSchema = Joi.object({
  markdown: Joi.string().min(10).required(),
});

const CommentInput: React.FC<CommentInputProps> = (
  props: CommentInputProps
) => {
  const [isSending, setIsSending] = useState(false);
  const [submittedComment, setSubmittedComment] = useState(null);
  const { sendComment } = useComments(props.blogId);
  const auth: AuthProvider = useAuth();
  const modal: ModalProvider = useModal();

  const methods = useForm<MarkdownForm>({
    resolver: joiResolver(markdownSchema),
    defaultValues: { markdown: "" },
  });

  const onSubmit = ({ markdown }) => {
    setIsSending(true);

    const send = () =>
      sendComment(props.blogId, markdown, (success: boolean) => {
        setIsSending(false);
        if (success) setSubmittedComment(markdown);
      });

    const handleModalClose = () => {
      modal.closeModal();
      setIsSending(false);
    };

    if (auth.user) send();
    else {
      modal.addOnCloseHandler(handleModalClose);
      modal.openModal(
        <SignInDialog onSuccess={() => send()} onClose={handleModalClose} />
      );
    }
  };

  useEffect(() => {
    if (submittedComment) methods.reset();
  }, [submittedComment]);

  return (
    <div className="flex">
      <UserAvatar />
      <div className="relative flex-1">
        <div className="w-3 inline-block absolute z-50 top-3 -left-1">
          <div className="h-3 bg-gray-50 dark:bg-gray-700 border border-r-0 border-b-0 border-gray-200 dark:border-gray-600 -rotate-45 transform origin-top-right"></div>
        </div>
        <div className="ml-2">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} name="commentForm">
              <MarkdownFormEditor
                placeholder="Your Comment ...."
                fromName="commentForm"
                disabled={isSending}
              />
              <div className="flex flex-col items-end pt-2">
                <button
                  type="submit"
                  className={
                    "w-28 h-7 text-xs mb-1 flex justify-center items-center py-0 my-0 " +
                    (isSending ? "disabled-btn" : "primary-btn")
                  }
                  disabled={isSending}
                >
                  {isSending ? (
                    <div className="m-1 w-4 h-4">
                      <SpinnerIcon />
                    </div>
                  ) : null}
                  comment
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
