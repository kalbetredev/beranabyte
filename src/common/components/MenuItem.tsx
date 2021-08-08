import React, { ReactNode } from "react";
import { Menu } from "@headlessui/react";

interface MenuItemProps {
  icon: ReactNode;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active
              ? "hover:bg-gray-400 hover:bg-opacity-10 hover:text-brand"
              : "text-gray-900 dark:text-white"
          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
        >
          {props.icon}
          {props.label}
        </button>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
