import React, { ReactNode } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";

interface LinkMenuItemProps {
  icon: ReactNode;
  label: string;
  slug?: string;
  renderAsButton?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<LinkMenuItemProps> = (props: LinkMenuItemProps) => {
  const Item = ({ children }) => {
    const classes =
      "w-full h-full px-2 py-2 flex items-center text-sm cursor-default";
    return props.renderAsButton ? (
      <button onClick={props.onClick} className={classes}>
        {children}
      </button>
    ) : (
      <Link href={props.slug}>
        <a className={classes}>{children}</a>
      </Link>
    );
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={`${
            active
              ? "bg-brand bg-opacity-50 text-white"
              : "text-gray-900 dark:text-white"
          } group rounded-md`}
        >
          <Item>
            <span className="w-5 h-5 mr-2 flex justify-center items-center">
              {props.icon}
            </span>
            {props.label}
          </Item>
        </div>
      )}
    </Menu.Item>
  );
};

MenuItem.defaultProps = {
  slug: "",
  renderAsButton: false,
  onClick: null,
};

export default MenuItem;
