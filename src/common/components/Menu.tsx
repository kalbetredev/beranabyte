import React, { Fragment, ReactNode } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { MoreIcon } from "../../icons";

interface MenuItemsProps {
  children?: ReactNode;
}

const Menu: React.FC<MenuItemsProps> = (props: MenuItemsProps) => {
  return (
    <HeadlessMenu as="div" className="relative inline-block text-left">
      <div>
        <HeadlessMenu.Button className="rounded-full w-9 h-9 p-[6px] hover:bg-gray-400 hover:bg-opacity-10 hover:text-brand">
          <MoreIcon />
        </HeadlessMenu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {props.children}
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};

export default Menu;
