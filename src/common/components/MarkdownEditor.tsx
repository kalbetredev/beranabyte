import React, { useEffect, useRef, useState } from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { useFormContext } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";

interface MarkdownFormEditorProps {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  fromName?: string;
  id?: string;
}

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

const MarkdownFormEditor: React.FC<MarkdownFormEditorProps> = (
  props: MarkdownFormEditorProps
) => {
  const { placeholder, minLength, maxLength, disabled, fromName, id } = props;

  const [preview, setPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const textareaEl = useRef<HTMLTextAreaElement>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { ref, ...rest } = register("markdown");

  const handleOnInput = () => {
    if (textareaEl.current) {
      textareaEl.current.style.height = "auto";
      textareaEl.current.style.height = textareaEl.current.scrollHeight + "px";
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
    const markdown = textareaEl.current.value;
    setPreview(md.render(markdown));
  };

  const handleWrite = () => {
    setShowPreview(false);
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

  const activeBtn =
    "border-b-0 border-l border-r border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800";

  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-600 rounded-md">
      <div className="flex pt-2 w-full justify-end bg-gray-50 dark:bg-gray-700">
        <div className="flex flex-1 border-b dark:border-gray-600"></div>
        <input
          className={
            "text-xs uppercase rounded-t-lg h-7 w-20 text-gray-500 dark:text-gray-300 hover:text-brand dark:hover:text-brand " +
            (showPreview ? "border-b dark:border-gray-600" : activeBtn)
          }
          onClick={handleWrite}
          disabled={disabled}
          type="button"
          value="write"
        />
        <input
          className={
            "text-xs uppercase rounded-t-lg h-7 w-20 text-gray-500 dark:text-gray-300 hover:text-brand dark:hover:text-brand " +
            (showPreview ? activeBtn : "border-b dark:border-gray-600")
          }
          onClick={handlePreview}
          disabled={disabled}
          type="button"
          value="preview"
        />
        <div className="flex border-b w-6 dark:border-gray-600"></div>
      </div>
      <div className="flex-1 p-2 pt-3">
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
                form={fromName}
                id={id}
                placeholder={placeholder}
                {...rest}
                className={
                  "w-full min-h-[80px] max-h-60 block text-sm rounded-t-lg border-0 border-b dark:border-gray-600 focus:border-gray-300 border-dashed border-gray-300 ring-0 focus:ring-0 overflow-hidden " +
                  (disabled
                    ? "bg-gray-100 dark:bg-gray-700 "
                    : "bg-white dark:bg-gray-800")
                }
                maxLength={maxLength}
                minLength={minLength}
                ref={(e) => {
                  ref(e);
                  textareaEl.current = e;
                }}
                disabled={disabled}
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
        </div>
      </div>
    </div>
  );
};

MarkdownFormEditor.defaultProps = {
  disabled: false,
};

export default MarkdownFormEditor;
