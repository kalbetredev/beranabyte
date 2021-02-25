import {
  Avatar,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Grid,
} from "@material-ui/core";
import React from "react";
import FontSizes from "../constants/fontsizes";
import { mySummary } from "../shared/data/extras/mysummary";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 350,
      marginBottom: 20,
    },
    avatarContainer: {
      width: 50,
    },
    content: {
      width: "calc(100% - 50px)",
      paddingLeft: 10,
    },
    smallAvatar: {
      width: 50,
      height: 50,
    },
    userNameText: {
      fontSize: FontSizes.footerGroupHeader,
      fontWeight: 700,
    },
    description: {
      fontSize: FontSizes.subtitle,
    },
  })
);

const AboutAuthor = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.avatarContainer}>
        <Avatar
          className={classes.smallAvatar}
          src={"/static/images/kalbetre.jpg"}
        />
      </Grid>
      <Grid item container className={classes.content}>
        <Grid item xs={12}>
          <Typography className={classes.userNameText}>
            Kalkidan Betre
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.description}>{mySummary}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutAuthor;
