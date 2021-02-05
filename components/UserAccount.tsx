import {
  Avatar,
  Box,
  Button,
  Typography,
  Hidden,
  makeStyles,
  createStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Link from "next/link";
import { Theme } from "@material-ui/core/styles";
import { useState } from "react";
import { ProfilePage, MyAccountPage, SignInPage } from "../shared/data/pages";
import Router from "next/router";
import FontSizes from "../constants/fontsizes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { logoutUser } from "../redux/user/actions";

interface UserAccountProps {
  alwaysShow?: boolean;
}

const textStyles = makeStyles({
  welcomeText: {
    fontSize: FontSizes.caption,
  },
  userNameText: {
    fontSize: FontSizes.subtitle,
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signInButton: {
      fontSize: FontSizes.smallButton,
      border: "1px solid",
      borderRadius: 50,
      "&:hover": {
        background: theme.palette.primary.main,
      },
    },
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  })
);

const UserAccount: React.FC<UserAccountProps> = (props: UserAccountProps) => {
  const userAccountState = useSelector((state: RootState) => state.userAccount);
  const dispatch = useDispatch();

  const typographyClasses = textStyles();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logoutUser());
    if (userAccountState.isAuthenticated) Router.replace("/");
  };

  return (
    <>
      {userAccountState.isAuthenticated ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Avatar
            className={classes.smallAvatar}
            src={userAccountState.accountPictureUrl}
            onClick={handleClick}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link href={ProfilePage.href} passHref>
              <MenuItem dense onClick={handleClose}>
                Profile
              </MenuItem>
            </Link>
            <Link href={MyAccountPage.href} passHref>
              <MenuItem dense onClick={handleClose}>
                My account
              </MenuItem>
            </Link>
            <MenuItem dense onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
          <Hidden smDown={props.alwaysShow ? false : true}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
                padding: 5,
              }}
            >
              <Typography className={typographyClasses.welcomeText}>
                Welcome
              </Typography>
              <Typography className={typographyClasses.userNameText}>
                {userAccountState.userName}
              </Typography>
            </Box>
          </Hidden>
        </Box>
      ) : (
        <Hidden xsDown={props.alwaysShow ? false : true}>
          <Link href={SignInPage.href} passHref>
            <Button
              disableTouchRipple
              size="small"
              variant="text"
              className={classes.signInButton}
            >
              SignIn
            </Button>
          </Link>
        </Hidden>
      )}
    </>
  );
};

export default UserAccount;
