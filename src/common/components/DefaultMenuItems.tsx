import React from "react";
import MenuItem from "./MenuItem";
import { PencilAltIcon, LoginIcon, CodeIcon } from "@heroicons/react/solid";
import { NewspaperIcon } from "@heroicons/react/outline";
import { InformationCircleIcon, ChatIcon } from "@heroicons/react/outline";

const DefaultMenuItems = () => {
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
          icon={<PencilAltIcon className="w-5 h-5" aria-hidden="true" />}
          label="Register"
        />
        <MenuItem
          icon={<LoginIcon className="w-5 h-5" aria-hidden="true" />}
          label="Sign In"
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

export default DefaultMenuItems;
