import React from "react";
import MenuItem from "./MenuItem";
import { PencilAltIcon, LoginIcon } from "@heroicons/react/solid";
import { InformationCircleIcon, ChatIcon } from "@heroicons/react/outline";

const DefaultMenuItems = () => {
  return (
    <>
      <div className="px-1 py-1 ">
        <MenuItem
          icon={<PencilAltIcon className="w-5 h-5 mr-2" aria-hidden="true" />}
          label="Register"
        />
        <MenuItem
          icon={<LoginIcon className="w-5 h-5 mr-2" aria-hidden="true" />}
          label="Sign In"
        />
      </div>
      <div className="px-1 py-1">
        <MenuItem
          icon={
            <InformationCircleIcon
              className="w-5 h-5 mr-2"
              aria-hidden="true"
            />
          }
          label="About"
        />
        <MenuItem
          icon={<ChatIcon className="w-5 h-5 mr-2" aria-hidden="true" />}
          label="Contact Kalkidan B."
        />
      </div>
    </>
  );
};

export default DefaultMenuItems;
