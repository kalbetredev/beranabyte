import SCREEN_TOGGLE from "../constants/types/screen_toggle";
import Theme from "../constants/types/theme";
import {
  DarkThemeIcon,
  LightThemeIcon,
  MenuIcon,
  MoreIcon,
  UserIcon,
} from "../icons";
import IconButton from "./IconButton";
import LogoLink from "./LogoLink";
import AppBarLink from "./AppBarLink";

interface AppBarProps {
  theme: Theme;
  switchTheme: () => void;
}

const AppBar: React.FC<AppBarProps> = (props: AppBarProps) => {
  return (
    <nav className="sticky top-0 border-b-[1px] shadow-sm flex flex-grow justify-center items-center bg-light dark:bg-dark dark:text-white dark:border-gray-700">
      <div className="h-12 flex justify-between items-center flex-1 max-w-[960px] px-3 sm:px-6">
        <div className="flex justify-start items-center">
          <IconButton screenToggle={SCREEN_TOGGLE.MOBILE}>
            <MenuIcon />
          </IconButton>
          <LogoLink />
        </div>
        <div className="flex justify-center items-center">
          <div className="hidden sm:visible sm:flex border-r-2 pr-2 mr-2">
            {["Home", "Blogs", "Projects"].map((item) => (
              <AppBarLink key={item} href="/" label={item} />
            ))}
          </div>
          <UserIcon />
          <IconButton onClick={props.switchTheme}>
            {props.theme === Theme.LIGHT ? (
              <DarkThemeIcon />
            ) : (
              <LightThemeIcon />
            )}
          </IconButton>
          <IconButton screenToggle={SCREEN_TOGGLE.DESKTOP}>
            <MoreIcon />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
