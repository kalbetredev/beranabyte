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

const AuthContent = (props: AuthContentProps) => {
  const useFormMethods = useForm();
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
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

  const onSubmit = handleSubmit((data) =>
    isSignIn
      ? signIn(data["email"], data["pass"])
      : signUp(data["name"], data["email"], data["pass"])
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
      {!isSignIn ? (
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
      <Grid className={classes.gridRow} item xs={12}>
        <FormInput
          name="pass"
          label="Password"
          placeholder=""
          type="password"
          useFormMethods={useFormMethods}
        />
      </Grid>
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
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Grid>
      <Grid className={classes.gridRow} item xs={12}>
        <Button
          variant="outlined"
          size="small"
          className={classes.submitBtn}
          onClick={() => setIsSignIn(!isSignIn)}
          disabled={loading}
        >
          {isSignIn ? "Register" : "I have an Account"}
        </Button>
      </Grid>
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
