import React from "react";
import MenuItem from "./MenuItem";
import {
  PencilAltIcon,
  LoginIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { InformationCircleIcon, ChatIcon } from "@heroicons/react/outline";
import pageSlugs from "../constants/page-slugs";
import useAuth, { AuthProvider } from "../../modules/auth/hooks/useAuth";
import { useRouter } from "next/router";

const AppBarMenuItems = () => {
  const auth: AuthProvider = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
  };

  const getSignUpPageSlug = () => {
    if (router.pathname == "/signup") return router.asPath;
    if (router.query["continue_to"] != null)
      return pageSlugs.signUpPageSlug(router.query["continue_to"].toString());
    else return pageSlugs.signUpPageSlug(router.asPath);
  };

  const getSignInPageSlug = () => {
    if (router.pathname == "/signin") return router.asPath;
    if (router.query["continue_to"] != null)
      return pageSlugs.signInPageSlug(router.query["continue_to"].toString());
    else return pageSlugs.signInPageSlug(router.asPath);
  };

  return (
    <>
      {auth.user ? (
        <div className="px-1 py-1 ">
          <MenuItem
            icon={<UserIcon className="w-5 h-5" aria-hidden="true" />}
            label="Account Settings"
            slug={pageSlugs.accountSettingsPage}
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
            label="Sign Up"
            slug={getSignUpPageSlug()}
          />
          <MenuItem
            icon={<LoginIcon className="w-5 h-5" aria-hidden="true" />}
            label="Sign In"
            slug={getSignInPageSlug()}
          />
        </div>
      )}

      <div className="px-1 py-1">
        <MenuItem
          icon={
            <InformationCircleIcon className="w-5 h-5" aria-hidden="true" />
          }
          label="About"
          slug={pageSlugs.aboutPage}
        />
        <MenuItem
          icon={<ChatIcon className="w-5 h-5" aria-hidden="true" />}
          label="Contact Kalkidan B."
          slug={pageSlugs.contactPage}
        />
      </div>
    </>
  );
};

export default AppBarMenuItems;
