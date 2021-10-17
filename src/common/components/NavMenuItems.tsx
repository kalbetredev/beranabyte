import React from "react";
import { NewspaperIcon, CodeIcon } from "@heroicons/react/solid";
import pageSlugs from "../constants/page-slugs";
import MenuItem from "./MenuItem";

const NavMenuItems = () => {
  return (
    <>
      <div className="px-1 py-1">
        <MenuItem
          icon={<NewspaperIcon className="w-5 h-5" aria-hidden="true" />}
          label="Blogs"
          slug={pageSlugs.blogsPage}
        />
        <MenuItem
          icon={<CodeIcon className="w-5 h-5" aria-hidden="true" />}
          label="Projects"
          slug={pageSlugs.projectsPage}
        />
      </div>
    </>
  );
};

export default NavMenuItems;
