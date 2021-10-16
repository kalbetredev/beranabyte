import React, { useEffect, useRef, useState } from "react";
import Joi from "joi";
import SpinnerIcon from "../../icons/SpinnerIcon";
import FormErrorMessage from "./FormErrorMessage";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import UserAvatar from "./UserAvatar";
import useReply from "../hooks/useReply";

type ReplyForm = {
  text: string;
};

const replySchema = Joi.object({
  text: Joi.string().min(2).max(300).required(),
});

interface ReplyProps {
  commentId: string;
  onCancel: () => void;
}

const Reply: React.FC<ReplyProps> = (props: ReplyProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const textareaEl = useRef<HTMLTextAreaElement>(null);
  const { sendReply } = useReply(props.commentId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyForm>({
    resolver: joiResolver(replySchema),
  });

  const { ref, ...rest } = register("text");

  const handleOnInput = () => {
    if (textareaEl.current) {
      textareaEl.current.style.height = "auto";
      textareaEl.current.style.height = textareaEl.current.scrollHeight + "px";
    }
  };

  const onSubmit = ({ text }) => {
    setIsLoading(true);
    sendReply(props.commentId, text, (success: boolean) => {
      setIsLoading(false);
      if (success) {
        if (textareaEl && textareaEl.current) {
          textareaEl.current.value = "";
        }
        props.onCancel();
      }
    });
  };

  useEffect(() => {
    if (textareaEl && textareaEl.current) {
      textareaEl.current.addEventListener("input", handleOnInput);
    }
    return () => {
      if (textareaEl && textareaEl.current)
        textareaEl.current.removeEventListener("input", handleOnInput);
    };
  }, [textareaEl]);

  return (
    <div className="flex pt-4">
      <UserAvatar size="small" />
      <div className="flex-1 pl-2">
        <form onSubmit={handleSubmit(onSubmit)} name="replyForm">
          <div className="rounded-b-lg rounded-r-lg">
            <textarea
              form="replyForm"
              id="comment"
              placeholder="Your thought ..."
              {...rest}
              className={
                "w-full min-h-[40px] max-h-60 block text-sm rounded-lg border dark:border-gray-600 border-gray-300 focus:border-brand-light dark:focus:border-brand-dark ring-0 focus:ring-0 dark:focus:ring-0 overflow-hidden " +
                (isLoading
                  ? "bg-gray-100 dark:bg-gray-700 "
                  : "bg-white dark:bg-gray-800")
              }
              rows={1}
              ref={(e) => {
                ref(e);
                textareaEl.current = e;
              }}
              maxLength={300}
              disabled={isLoading}
            ></textarea>
            {errors.text ? (
              <div className="mt-3">
                <FormErrorMessage
                  message={errors.text.message.replace(/['"]+/g, "")}
                />
              </div>
            ) : null}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className={
                  "w-28 h-7 text-xs mb-1 mr-2 flex justify-center items-center py-0 my-0 " +
                  (isLoading ? "disabled-btn" : "primary-btn")
                }
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="m-1 w-4 h-4">
                    <SpinnerIcon />
                  </div>
                ) : null}
                reply
              </button>
              <button
                onClick={props.onCancel}
                disabled={isLoading}
                className={
                  "w-28 h-7 text-xs mb-1 flex justify-center items-center py-0 my-0 " +
                  (isLoading ? "disabled-btn" : "secondary-btn")
                }
              >
                cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reply;
