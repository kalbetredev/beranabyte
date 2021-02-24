import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import FontSizes from "../../constants/fontsizes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listRoot: {
      padding: 0,
      paddingLeft: 25,
      margin: 0,
    },
    li: {
      marginBottom: 20,
      "&::marker": {
        fontSize: FontSizes.paragraph,
      },
    },
    text: {
      fontSize: FontSizes.paragraph,
      lineHeight: "1.8em",
    },
  })
);

export const LI = (props: any) => {
  const classes = useStyles();
  return (
    <li className={classes.li}>
      <Typography className={classes.text}>{props.children}</Typography>
    </li>
  );
};

export const UL = (props: any) => {
  const classes = useStyles();
  return <ul className={classes.listRoot}>{props.children}</ul>;
};

export const OL = (props: any) => {
  const classes = useStyles();
  return <ol className={classes.listRoot}>{props.children}</ol>;
};
