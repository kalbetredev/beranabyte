import React from "react";
import {
  InformationCircleIcon,
  ChatIcon,
  UserIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import { BookmarkAltIcon } from "@heroicons/react/outline";
import MenuItem from "./MenuItem";
import {
  ABOUT_PAGE_SLUG,
  CONTACT_PAGE_SLUG,
  ACC_SETTINGS_PAGE_SLUG,
  BOOKMARKED_PAGE_SLUG,
  LOGOUT_PAGE_SLUG,
} from "../constants/page-slugs";

const LoggedInMenuItems = () => {
  return (
    <>
      <div className="px-1 py-1 ">
        <MenuItem
          icon={<UserIcon className="w-5 h-5" aria-hidden="true" />}
          label="Account Settings"
          slug={ACC_SETTINGS_PAGE_SLUG}
        />
        <MenuItem
          icon={<BookmarkAltIcon className="w-5 h-5" aria-hidden="true" />}
          label="Bookmarked"
          slug={BOOKMARKED_PAGE_SLUG}
        />
      </div>
      <div className="px-1 py-1 ">
        <MenuItem
          icon={<LogoutIcon className="w-5 h-5" aria-hidden="true" />}
          label="Log Out"
          slug={LOGOUT_PAGE_SLUG}
        />
      </div>
      <div className="px-1 py-1">
        <MenuItem
          icon={
            <InformationCircleIcon className="w-5 h-5" aria-hidden="true" />
          }
          label="About"
          slug={ABOUT_PAGE_SLUG}
        />
        <MenuItem
          icon={<ChatIcon className="w-5 h-5" aria-hidden="true" />}
          label="Contact Kalkidan B."
          slug={CONTACT_PAGE_SLUG}
        />
      </div>
    </>
  );
};

export default LoggedInMenuItems;
