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
    },
    description: {
      fontSize: FontSizes.subtitle,
      color: theme.palette.text.secondary,
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
          <Typography className={classes.description}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim,
            vero? At repellendus mollitia, iusto eum facilis recusandae neque
            pariatur itaque facere adipisci,
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutAuthor;
