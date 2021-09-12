import React, { useEffect, useState } from "react";
import IconButton from "./IconButton";
import Logo from "./Logo";
import AppBarPageLinks from "./AppBarPageLinks";
import { useTheme } from "next-themes";
import Theme from "../enums/Theme";
import Menu from "./Menu";
import AppBarMenuItems from "./AppBarMenuItems";
import useAuth, { AuthProvider } from "../../modules/auth/hooks/useAuth";
import NavMenuItems from "./NavMenuItems";
import { SunIcon, UserCircleIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";

const AppBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const auth: AuthProvider = useAuth();

  useEffect(() => setMounted(true), []);

  const switchTheme = () => {
    theme === Theme.DARK ? setTheme(Theme.LIGHT) : setTheme(Theme.DARK);
  };

  return (
    <>
      <header className="fixed w-full z-50 top-0 border-b-[1px] shadow-sm flex justify-center items-center bg-white dark:bg-dark dark:border-gray-700">
        <nav className="h-12 flex justify-between items-center flex-grow max-w-[960px] px-3 sm:px-6">
          <div className="flex justify-start items-center">
            <Logo />
          </div>
          <div className="flex justify-center items-center">
            <div className="hidden sm:visible sm:flex border-r-2 pr-2 mr-2">
              <AppBarPageLinks />
            </div>
            {auth.user && <UserCircleIcon className="h-6 w-6" />}
            <IconButton onClick={switchTheme}>
              {mounted &&
                (theme === Theme.LIGHT ? (
                  <MoonIcon className="h-6 w-6" />
                ) : (
                  <SunIcon className="h-6 w-6" />
                ))}
            </IconButton>
            <Menu className="hidden sm:block">
              <AppBarMenuItems />
            </Menu>
            <Menu className="sm:hidden">
              <>
                <NavMenuItems />
                <AppBarMenuItems />
              </>
            </Menu>
          </div>
        </nav>
      </header>
      <div id="top-anchor" className="h-12"></div>
    </>
  );
};

export default AppBar;
