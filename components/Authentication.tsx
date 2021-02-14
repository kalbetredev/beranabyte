import {
  Box,
  Dialog,
  DialogContent,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import { createStyles } from "@material-ui/core/styles";
import useAuth from "../shared/lib/utils/useAuth";
import useDisclosure from "../shared/lib/utils/useDisclosure";
import useAlert from "../shared/lib/utils/useAlert";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormInput from "./FormInput";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import FontSizes from "../constants/fontsizes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 18,
      maxWidth: 350,
      position: "relative",
    },
    gridRow: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    submitBtn: {
      width: "100%",
    },
    textBtn: {
      fontSize: FontSizes.subtitle,
      textTransform: "capitalize",
      "&:hover": {
        color: theme.palette.primary.main,
        background: theme.palette.background.paper,
      },
    },
    loadingWrapper: {
      margin: 0,
      position: "relative",
      width: "100%",
      padding: 0,
    },
    buttonProgress: {
      color: theme.palette.primary.main,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    closeBtn: {
      padding: 5,
      position: "absolute",
      top: -10,
      right: -10,
    },
  })
);

interface AuthContentProps {
  redirectToHome?: boolean;
  showCloseBtn?: boolean;
  onClose?: () => void;
}

enum ContentType {
  SIGN_IN,
  SIGN_UP,
  PASSWORD_RESET,
}

const AuthContent = (props: AuthContentProps) => {
  const useFormMethods = useForm();
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState(ContentType.SIGN_IN);
  const { handleSubmit } = useFormMethods;

  const classes = useStyles();
  const auth = useAuth();
  const alert = useAlert();
  const router = useRouter();

  const signUp = (userName, email, pass) => {
    setLoading(true);
    auth
      .signUp(userName, email, pass)
      .then(() => {
        alert({
          severity: "success",
          message: "Your account has been created.",
          duration: 3000,
        });
        props.redirectToHome && router.push("/");
        props.onClose && props.onClose();
        setLoading(false);
      })
      .catch((error) => {
        alert({
          severity: "error",
          message: error.message,
          duration: 3000,
        });
        setLoading(false);
      });
  };

  const signIn = (email, pass) => {
    setLoading(true);
    auth
      .signIn(email, pass)
      .then(() => {
        alert({
          severity: "success",
          message: "Welcome Back!",
          duration: 3000,
        });
        if (props.redirectToHome) router.push("/");
        setLoading(false);
        props.onClose && props.onClose();
      })
      .catch((error) => {
        alert({
          severity: "error",
          message: error.message,
          duration: 6000,
        });
        setLoading(false);
      });
  };

  const sendPasswordResetLink = (email) => {
    setLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert({
          severity: "success",
          message: "Password Reset Link Sent",
          duration: 3000,
        });
        if (props.redirectToHome) router.push("/");
        setLoading(false);
        props.onClose && props.onClose();
      })
      .catch((error) => {
        alert({
          severity: "error",
          message: error.message,
          duration: 6000,
        });
        setLoading(false);
      });
  };

  const getSubmitBtnName = (): string => {
    return contentType === ContentType.SIGN_IN
      ? "Sign In"
      : contentType === ContentType.SIGN_UP
      ? "Sign Up"
      : "Send Password Reset Link";
  };

  const onSubmit = handleSubmit((data) =>
    contentType === ContentType.SIGN_IN
      ? signIn(data["email"], data["pass"])
      : contentType === ContentType.SIGN_UP
      ? signUp(data["name"], data["email"], data["pass"])
      : sendPasswordResetLink(data["email"])
  );

  return (
    <Grid
      component="form"
      onSubmit={onSubmit}
      container
      className={classes.root}
    >
      <Grid item xs={12} container>
        <Box
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Logo />
          {props.showCloseBtn ? (
            <IconButton
              size="medium"
              className={classes.closeBtn}
              onClick={props.onClose}
            >
              <Close fontSize="small" />
            </IconButton>
          ) : null}
        </Box>
      </Grid>

      {contentType === ContentType.SIGN_UP ? (
        <Grid className={classes.gridRow} item xs={12}>
          <FormInput
            name="name"
            label="User Name"
            placeholder=""
            type="name"
            useFormMethods={useFormMethods}
          />
        </Grid>
      ) : null}

      <Grid className={classes.gridRow} item xs={12}>
        <FormInput
          name="email"
          label="Email Address"
          placeholder=""
          type="email"
          useFormMethods={useFormMethods}
        />
      </Grid>

      {contentType !== ContentType.PASSWORD_RESET ? (
        <Grid className={classes.gridRow} item xs={12}>
          <FormInput
            name="pass"
            label="Password"
            placeholder=""
            type="password"
            useFormMethods={useFormMethods}
          />
        </Grid>
      ) : null}

      <Grid className={classes.gridRow} item xs={12}>
        <div className={classes.loadingWrapper}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="small"
            className={classes.submitBtn}
            disabled={loading}
          >
            {getSubmitBtnName()}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Grid>

      {contentType !== ContentType.PASSWORD_RESET ? (
        <Grid className={classes.gridRow} item xs={12}>
          <Button
            variant="outlined"
            size="small"
            className={classes.submitBtn}
            onClick={() =>
              setContentType(
                contentType === ContentType.SIGN_IN
                  ? ContentType.SIGN_UP
                  : ContentType.SIGN_IN
              )
            }
            disabled={loading}
          >
            {contentType === ContentType.SIGN_IN
              ? "Register"
              : "I have an Account"}
          </Button>
        </Grid>
      ) : null}

      {contentType !== ContentType.SIGN_UP ? (
        <Grid item xs={12} container justify="flex-end">
          <Button
            variant="text"
            size="small"
            className={classes.textBtn}
            onClick={() =>
              setContentType(
                contentType === ContentType.PASSWORD_RESET
                  ? ContentType.SIGN_IN
                  : ContentType.PASSWORD_RESET
              )
            }
          >
            {contentType !== ContentType.PASSWORD_RESET
              ? "I Forgot My Password"
              : "Sign In"}
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
};

export const AuthDialog = ({ isOpen, onClose, redirectToHome }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={`Authentication Dialog`}
    >
      <DialogContent style={{ padding: 0 }}>
        <AuthContent
          redirectToHome={redirectToHome}
          showCloseBtn={true}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export const withAuthDialog = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AuthDialog isOpen={isOpen} onClose={onClose} redirectToHome={false} />
      <Component openAuthDialog={onOpen} {...props} />
    </>
  );
};

export const withSignInRedirectAuthDialog = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AuthDialog isOpen={isOpen} onClose={onClose} redirectToHome={true} />
      <Component onSignIn={onOpen} {...props} />
    </>
  );
};

const FullScreenAuthentication = () => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Paper variant="outlined" style={{ marginTop: 24 }}>
          <AuthContent redirectToHome={true} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FullScreenAuthentication;
