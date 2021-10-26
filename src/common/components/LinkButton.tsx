import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  label: string;
  slug: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = (props: LinkButtonProps) => {
  return (
    <Link href={props.slug}>
      <a
        className={
          "secondary-btn w-full text-sm text-center cursor-default " +
          props.className
        }
      >
        {props.label}
      </a>
    </Link>
  );
};

LinkButton.defaultProps = {
  className: "",
};

export default LinkButton;
