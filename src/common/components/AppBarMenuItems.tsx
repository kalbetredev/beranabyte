import React from "react";
import MenuItem from "./MenuItem";
import {
  PencilAltIcon,
  LoginIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { InformationCircleIcon, ChatIcon } from "@heroicons/react/outline";
import {
  ABOUT_PAGE_SLUG,
  ACC_SETTINGS_PAGE_SLUG,
  CONTACT_PAGE_SLUG,
  REGISTER_PAGE_SLUG,
  SIGNIN_PAGE_SLUG,
} from "../constants/page-slugs";
import useAuth, { AuthProvider } from "../../modules/auth/hooks/useAuth";

const AppBarMenuItems = () => {
  const auth: AuthProvider = useAuth();

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <>
      {auth.user ? (
        <div className="px-1 py-1 ">
          <MenuItem
            icon={<UserIcon className="w-5 h-5" aria-hidden="true" />}
            label="Account Settings"
            slug={ACC_SETTINGS_PAGE_SLUG}
          />
          <MenuItem
            icon={<LogoutIcon className="w-5 h-5" aria-hidden="true" />}
            label="Sign Out"
            renderAsButton
            onClick={handleSignOut}
          />
        </div>
      ) : (
        <div className="px-1 py-1 ">
          <MenuItem
            icon={<PencilAltIcon className="w-5 h-5" aria-hidden="true" />}
            label="Register"
            slug={REGISTER_PAGE_SLUG}
          />
          <MenuItem
            icon={<LoginIcon className="w-5 h-5" aria-hidden="true" />}
            label="Sign In"
            slug={SIGNIN_PAGE_SLUG}
          />
        </div>
      )}

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

export default AppBarMenuItems;
