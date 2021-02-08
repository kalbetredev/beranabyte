import {
  AppBar as MuiAppBar,
  Container,
  Toolbar,
  Hidden,
  IconButton,
  useTheme,
  Tooltip,
} from "@material-ui/core";
import React, { Dispatch, useState } from "react";
import Drawer from "./Drawer";
import PagesNavigator from "./PageNavigator";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ElevationScroll from "./ElevationScroll";
import MenuIcon from "@material-ui/icons/Menu";
import { Brightness3, WbSunny } from "@material-ui/icons";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { ThemeActionTypes } from "../redux/theme/types";
import { toggleDarkMode } from "../redux/theme/actions";
import useSWR from "swr";
import fetcher from "../shared/lib/utils/fetcher";
import {
  HomePage,
  ProjectsPage,
  pagesFromCategories,
} from "../shared/data/pages";

const useAppBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
    },
  })
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      "&:focus": {
        outline: "none !important",
      },
    },
    themeSwitchBtn: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      padding: 5,
      "&:focus": {
        outline: "none !important",
      },
    },
  })
);

const AppBar = () => {
  const appBarClasses = useAppBarStyles();
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDarkThemeDispatch = useDispatch<Dispatch<ThemeActionTypes>>();
  const toggleDarkTheme = () => toggleDarkThemeDispatch(toggleDarkMode());
  const isLightTheme = theme.palette.type === "light";

  const { data } = useSWR(`/api/blog-categories`, fetcher);
  const categories = data?.categories;
  const pages = categories
    ? [HomePage, ...pagesFromCategories(categories), ProjectsPage]
    : [HomePage, ProjectsPage];

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div className={classes.root}>
      <ElevationScroll>
        <MuiAppBar classes={appBarClasses} position="fixed">
          <Container maxWidth="md">
            <Toolbar disableGutters variant="dense">
              <Hidden smUp>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                  pages={pages}
                />
              </Hidden>
              <Logo />
              <Hidden only="xs">
                <PagesNavigator pages={pages} />
              </Hidden>
              <Tooltip
                title={
                  isLightTheme
                    ? "Switch to Dark Theme"
                    : "Switch to Light Theme"
                }
              >
                <IconButton
                  className={classes.themeSwitchBtn}
                  size="medium"
                  onClick={toggleDarkTheme}
                >
                  {isLightTheme ? (
                    <Brightness3 fontSize="small" />
                  ) : (
                    <WbSunny fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Container>
        </MuiAppBar>
      </ElevationScroll>
    </div>
  );
};

export default AppBar;
