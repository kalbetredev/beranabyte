import Link from "next/link";
import React from "react";

interface SecondaryButtonProps {
  slug?: string;
  onClick?: () => void;
  label: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = (
  props: SecondaryButtonProps
) => {
  const className =
    "w-full flex my-2 justify-center py-2 px-4 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-700 focus:ring-brand-light cursor-default";

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
        <button onClick={props.onClick} className={className}>
          {props.label}
        </button>
      )}
    </>
  );
};

export default SecondaryButton;
