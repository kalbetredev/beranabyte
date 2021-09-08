import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  label: string;
  slug: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = (props: LinkButtonProps) => {
  return (
    <div className={"secondary-btn " + props.className}>
      <Link href={props.slug}>
        <a className="w-full text-sm text-center cursor-default">
          {props.label}
        </a>
      </Link>
    </div>
  );
};

LinkButton.defaultProps = {
  className: "",
};

export default LinkButton;
