import React, { ReactNode } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  slug: string;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={`${
            active
              ? "bg-brand bg-opacity-50 text-white"
              : "text-gray-900 dark:text-white"
          } group rounded-md px-2 py-2`}
        >
          <Link href={props.slug}>
            <a className="flex items-center w-full text-sm cursor-default">
              <span className="w-5 h-5 mr-2 flex justify-center items-center">
                {props.icon}
              </span>
              {props.label}
            </a>
          </Link>
        </div>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
