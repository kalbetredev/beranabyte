import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bullet: {
      display: "inline-block",
      margin: "0 5px",
      transform: "scale(0.8)",
    },
  })
);

const Bullet = () => {
  const classes = useStyles();
  return <span className={classes.bullet}>•</span>;
};

export default Bullet;
