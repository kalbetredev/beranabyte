import React from "react";
import { NewspaperIcon, CodeIcon } from "@heroicons/react/solid";
import { BLOGS_PAGE_SLUG, PROJECTS_PAGE_SLUG } from "../constants/page-slugs";
import MenuItem from "./MenuItem";

const NavMenuItems = () => {
  return (
    <>
      <div className="px-1 py-1">
        <MenuItem
          icon={<NewspaperIcon className="w-5 h-5" aria-hidden="true" />}
          label="Blogs"
          slug={BLOGS_PAGE_SLUG}
        />
        <MenuItem
          icon={<CodeIcon className="w-5 h-5" aria-hidden="true" />}
          label="Projects"
          slug={PROJECTS_PAGE_SLUG}
        />
      </div>
    </>
  );
};

export default NavMenuItems;
