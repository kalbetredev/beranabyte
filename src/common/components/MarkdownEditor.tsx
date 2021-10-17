import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SpinnerIcon from "../../icons/SpinnerIcon";
import FormErrorMessage from "./FormErrorMessage";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

interface MarkdownEditorProps {
  placeHolder?: string;
  submitButtonLabel: string;
  isLoading?: boolean;
  callback: (markdown: string, clearContent?: () => void) => void;
  markdownSchema?: Joi.ObjectSchema<any>;
}

type MarkdownForm = {
  markdown: string;
};

const defaultMarkdownSchema = Joi.object({
  markdown: Joi.string().min(10).required(),
});

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return "";
  },
});

const MarkdownEditor: React.FC<MarkdownEditorProps> = (
  props: MarkdownEditorProps
) => {
  const {
    placeHolder,
    submitButtonLabel,
    isLoading,
    callback,
    markdownSchema,
  } = props;
  const [preview, setPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const textareaEl = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<MarkdownForm>({
    resolver: joiResolver(
      markdownSchema ? markdownSchema : defaultMarkdownSchema
    ),
  });

  const handlePreview = () => {
    setShowPreview(true);
    const markdown = getValues("markdown");
    setPreview(md.render(markdown));
  };

  const handleWrite = () => {
    setShowPreview(false);
  };

  const handleOnInput = () => {
    if (textareaEl.current) {
      textareaEl.current.style.height = "auto";
      textareaEl.current.style.height = textareaEl.current.scrollHeight + "px";
    }
  };

  const onSubmit = ({ markdown }) => {
    callback(markdown, () => {
      if (textareaEl && textareaEl.current) {
        textareaEl.current.value = "";
      }
    });
  };

  const activeBtn =
    "border-b-0 border-l border-r border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800";

  const { ref, ...rest } = register("markdown");

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
    <div className="flex flex-col border border-gray-200 dark:border-gray-600 rounded-md ml-2">
      <div className="flex pt-2 w-full justify-end bg-gray-50 dark:bg-gray-700">
        <div className="flex flex-1 border-b dark:border-gray-600"></div>
        <button
          className={
            "text-xs uppercase rounded-t-lg h-7 w-20 text-gray-500 dark:text-gray-300 hover:text-brand dark:hover:text-brand " +
            (showPreview ? "border-b dark:border-gray-600" : activeBtn)
          }
          onClick={handleWrite}
          disabled={isLoading}
        >
          write
        </button>
        <button
          className={
            "text-xs uppercase rounded-t-lg h-7 w-20 text-gray-500 dark:text-gray-300 hover:text-brand dark:hover:text-brand " +
            (showPreview ? activeBtn : "border-b dark:border-gray-600")
          }
          onClick={handlePreview}
          disabled={isLoading}
        >
          preview
        </button>
        <div className="flex border-b w-6 dark:border-gray-600"></div>
      </div>
      <div className="flex-1 p-2 pt-3">
        <form onSubmit={handleSubmit(onSubmit)} name="commentForm">
          <div className={showPreview ? "block" : "hidden"}>
            <article
              className="prose prose-sm break-words dark:prose-dark p-2"
              dangerouslySetInnerHTML={{ __html: preview }}
            ></article>
          </div>
          <div className="rounded-b-lg rounded-r-lg">
            <div className={showPreview ? "hidden" : "block"}>
              <div className="border dark:border-gray-600 rounded-lg focus-within:border-brand-light dark:focus-within:border-brand-dark">
                <textarea
                  form="commentForm"
                  id="comment"
                  placeholder={placeHolder}
                  {...rest}
                  className={
                    "w-full min-h-[80px] max-h-60 block text-sm rounded-t-lg border-0 border-b dark:border-gray-600 focus:border-gray-300 border-dashed border-gray-300 ring-0 focus:ring-0 overflow-hidden " +
                    (isLoading
                      ? "bg-gray-100 dark:bg-gray-700 "
                      : "bg-white dark:bg-gray-800")
                  }
                  maxLength={1000}
                  ref={(e) => {
                    ref(e);
                    textareaEl.current = e;
                  }}
                  disabled={isLoading}
                ></textarea>
                <div className="text-xs text-gray-400 dark:text-gray-300 px-2 pt-1 pb-1 text-right rounded-b-lg bg-gray-100 dark:bg-gray-700 bg-opacity-40">
                  Styling with markdown is supported
                </div>
              </div>
            </div>
            {errors.markdown ? (
              <div className="mt-3">
                <FormErrorMessage
                  message={errors.markdown.message.replace(/['"]+/g, "")}
                />
              </div>
            ) : null}
            <div className="flex flex-col items-end pt-2">
              <button
                type="submit"
                className={
                  "w-28 h-7 text-xs mb-1 flex justify-center items-center py-0 my-0 " +
                  (isLoading ? "disabled-btn" : "primary-btn")
                }
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="m-1 w-4 h-4">
                    <SpinnerIcon />
                  </div>
                ) : null}
                {submitButtonLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

MarkdownEditor.defaultProps = {
  isLoading: false,
};

export default MarkdownEditor;
