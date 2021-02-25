import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import FontSizes from "../../constants/fontsizes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontSize: FontSizes.paragraph,
      lineHeight: "1.8em",
      marginBottom: 30,
    },
  })
);

const Paragraph = (props: any) => {
  const classes = useStyles();

  return <Typography className={classes.text}>{props.children}</Typography>;
};

export default Paragraph;
