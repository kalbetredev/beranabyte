import {
  AppBar as MuiAppBar,
  Container,
  Toolbar,
  Hidden,
  IconButton,
  useTheme,
  Tooltip,
  Menu,
} from "@material-ui/core";
import React, { Dispatch, useState } from "react";
import Drawer from "./Drawer";
import PagesNavigator from "./PageNavigator";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ElevationScroll from "./ElevationScroll";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle, Brightness3, WbSunny } from "@material-ui/icons";
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
import Box from "@material-ui/core/Box";
import UserAvatar from "./UserAvatar";
import useAuth from "../shared/lib/utils/useAuth";
import UserAccount from "./UserAccount";
import Link from "next/link";

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
    accountButton: {
      padding: 5,
      "&:focus": {
        outline: "none !important",
      },
    },
    themeSwitchButton: {
      backgroundColor: "rgba(0, 0, 0, 0.03)",
      padding: 5,
      "&:focus": {
        outline: "none !important",
      },
    },
    userAvatar: {
      paddingRight: theme.spacing(1),
    },
    menu: {
      "& ul": {
        borderTop: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 4,
      },
    },
    menuItem: {
      padding: theme.spacing(1),
      "&:focus": {
        outline: "none !important",
      },
    },
    toolbar: {
      minHeight: 0,
    },
  })
);

const AppBar = () => {
  const auth = useAuth();
  const appBarClasses = useAppBarStyles();
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDarkThemeDispatch = useDispatch<Dispatch<ThemeActionTypes>>();
  const toggleDarkTheme = () => toggleDarkThemeDispatch(toggleDarkMode());
  const isLightTheme = theme.palette.type === "light";

  const { data } = useSWR(`/api/blogs-meta/categories`, fetcher);
  const categories = data?.categories;
  const pages = categories
    ? [HomePage, ...pagesFromCategories(categories), ProjectsPage]
    : [HomePage, ProjectsPage];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <ElevationScroll>
        <MuiAppBar classes={appBarClasses} position="fixed">
          <Container maxWidth="md">
            <Toolbar disableGutters className={classes.toolbar}>
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
              <Box display="flex" style={{ flexGrow: 1 }} />
              <Hidden only="xs">
                <PagesNavigator pages={pages} />
              </Hidden>

              {auth.user ? (
                <Box className={classes.userAvatar}>
                  <UserAvatar userUid={auth.user?.uid} onClick={handleClick} />
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    className={classes.menu}
                  >
                    <Box className={classes.menuItem}>
                      <UserAccount alwaysShow />
                    </Box>
                  </Menu>
                </Box>
              ) : (
                <Link href="/account">
                  <IconButton size="medium" className={classes.accountButton}>
                    <AccountCircle />
                  </IconButton>
                </Link>
              )}
              <Tooltip
                title={
                  isLightTheme
                    ? "Switch to Dark Theme"
                    : "Switch to Light Theme"
                }
              >
                <IconButton
                  className={classes.themeSwitchButton}
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
