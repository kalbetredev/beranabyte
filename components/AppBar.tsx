import SCREEN_TOGGLE from "../constants/types/screen_toggle";
import {
  DarkThemeIcon,
  LightThemeIcon,
  MenuIcon,
  MoreIcon,
  UserIcon,
} from "../icons";
import IconButton from "./IconButton";
import Logo from "./Logo";
import AppBarLink from "./AppBarLink";
import PageLink from "../constants/types/page_link";
import { useTheme } from "next-themes";
import Theme from "../constants/types/theme";

interface AppBarProps {
  pageLinks: PageLink[];
}

const AppBar: React.FC<AppBarProps> = (props: AppBarProps) => {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    theme === Theme.DARK ? setTheme(Theme.LIGHT) : setTheme(Theme.DARK);
  };

  return (
    <header className="sticky top-0 border-b-[1px] shadow-sm flex justify-center items-center bg-white dark:bg-dark dark:border-gray-700">
      <nav className="h-12 flex justify-between items-center flex-grow max-w-[960px] px-3 sm:px-6">
        <div className="flex justify-start items-center">
          <IconButton screenToggle={SCREEN_TOGGLE.MOBILE}>
            <MenuIcon />
          </IconButton>
          <Logo />
        </div>
        <div className="flex justify-center items-center">
          <div className="hidden sm:visible sm:flex border-r-2 pr-2 mr-2">
            {props.pageLinks.map((link) => (
              <AppBarLink key={link.label} pageLink={link} />
            ))}
          </div>
          <UserIcon />
          <IconButton onClick={switchTheme}>
            {theme === Theme.LIGHT ? <DarkThemeIcon /> : <LightThemeIcon />}
          </IconButton>
          <IconButton screenToggle={SCREEN_TOGGLE.DESKTOP}>
            <MoreIcon />
          </IconButton>
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
