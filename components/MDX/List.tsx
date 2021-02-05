import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BlurCircular } from "@material-ui/icons";
import React from "react";
import { LightGrey } from "../../constants/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ul: {
      padding: 0,
      listStyle: "none",
      width: "100%",
    },
    li: {
      margin: 5,
      marginLeft: 0,
    },
    liIcon: {
      margin: 5,
      color: LightGrey,
    },
  })
);

export const LI = (props: any) => {
  const classes = useStyles();
  return (
    <li className={classes.li}>
      <Grid container justify="flex-start">
        <Grid item>
          <BlurCircular fontSize="small" className={classes.liIcon} />
        </Grid>
        <Grid item xs container style={{ paddingTop: 6 }}>
          {props.children}
        </Grid>
      </Grid>
    </li>
  );
};

export const UL = (props: any) => {
  const classes = useStyles();
  return <ul className={classes.ul}>{props.children}</ul>;
};
