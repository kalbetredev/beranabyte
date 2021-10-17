import React from "react";
import Link from "next/link";

interface IconButtonProps {
  slug?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const className =
    "rounded-full w-9 h-9 hover:bg-gray-400 dark:hover:bg-gray-700 hover:bg-opacity-10 hover:text-brand flex justify-center items-center";

  return (
    <>
      {props.slug ? (
        <div className={className}>
          <Link href={props.slug}>
            <a
              className="w-full cursor-default flex justify-center items-center"
              target="_blank"
            >
              {props.children}
            </a>
          </Link>
        </div>
      ) : (
        <button className={className} onClick={props.onClick}>
          {props.children}
        </button>
      )}
    </>
  );
};

export default IconButton;
