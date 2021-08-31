import Link from "next/link";
import React from "react";

interface FormSubmitButtonProps {
  slug?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  label: string;
}

const PrimaryButton: React.FC<FormSubmitButtonProps> = (
  props: FormSubmitButtonProps
) => {
  const className =
    "w-full flex my-2 justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-brand hover:bg-brand-light outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-700 focus:ring-brand-light cursor-default";

  return (
    <>
      {props.slug ? (
        <div className={className}>
          <Link href={props.slug}>
            <a className="w-full text-sm text-center cursor-default">
              {props.label}
            </a>
          </Link>
        </div>
      ) : (
        <button
          type={props.type || "button"}
          onClick={props.onClick}
          className={className}
        >
          {props.label}
        </button>
      )}
    </>
  );
};

export default PrimaryButton;
