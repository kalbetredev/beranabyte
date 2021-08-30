import React from "react";
import {
  InformationCircleIcon,
  ChatIcon,
  UserIcon,
  LogoutIcon,
  CodeIcon,
} from "@heroicons/react/solid";
import { BookmarkAltIcon, NewspaperIcon } from "@heroicons/react/outline";
import MenuItem from "./MenuItem";

const LoggedInMenuItems = () => {
  return (
    <>
      <div className="px-1 py-1 sm:hidden">
        <MenuItem
          icon={<NewspaperIcon className="w-5 h-5" aria-hidden="true" />}
          label="Blogs"
        />
        <MenuItem
          icon={<CodeIcon className="w-5 h-5" aria-hidden="true" />}
          label="Projects"
        />
      </div>
      <div className="px-1 py-1 ">
        <MenuItem
          icon={<UserIcon className="w-5 h-5" aria-hidden="true" />}
          label="Account Settings"
        />
        <MenuItem
          icon={<BookmarkAltIcon className="w-5 h-5" aria-hidden="true" />}
          label="Bookmarked"
        />
      </div>
      <div className="px-1 py-1 ">
        <MenuItem
          icon={<LogoutIcon className="w-5 h-5" aria-hidden="true" />}
          label="Log Out"
        />
      </div>
      <div className="px-1 py-1">
        <MenuItem
          icon={
            <InformationCircleIcon className="w-5 h-5" aria-hidden="true" />
          }
          label="About"
        />
        <MenuItem
          icon={<ChatIcon className="w-5 h-5" aria-hidden="true" />}
          label="Contact Kalkidan B."
        />
      </div>
    </>
  );
};

export default LoggedInMenuItems;
