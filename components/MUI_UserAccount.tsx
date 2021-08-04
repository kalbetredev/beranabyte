import {
  Box,
  Button,
  Typography,
  makeStyles,
  createStyles,
  Grid,
} from "@material-ui/core";
import Link from "next/link";
import { Theme } from "@material-ui/core/styles";
import { SignInPage } from "../shared/data/pages";
import FontSizes from "../constants/fontsizes";
import useAuth, { AuthProvider } from "../shared/lib/utils/useAuth";
import UserAvatar from "./MUI_UserAvatar";

interface UserAccountProps {
  alwaysShow?: boolean;
}

const textStyles = makeStyles({
  welcomeText: {
    fontSize: FontSizes.caption,
  },
  userNameText: {
    fontSize: FontSizes.title,
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
  })
);

const UserAccount: React.FC<UserAccountProps> = () => {
  const auth: AuthProvider = useAuth();
  const typographyClasses = textStyles();
  const classes = useStyles();

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <>
      {auth.user ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <UserAvatar userUid={auth.user?._id} size={"medium"} />
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
                  {auth.user?.username}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} container justify="flex-end">
            <Button
              disableTouchRipple
              size="small"
              variant="text"
              className={classes.signInButton}
              onClick={handleSignOut}
            >
              SignOut
            </Button>
          </Grid>
        </Grid>
      ) : (
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
      )}
    </>
  );
};

export default UserAccount;
