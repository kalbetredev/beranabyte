import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import { LightGrey } from "../../constants/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "auto",
    },
    table: {
      marginBottom: "2em",
      marginTop: "2em",
      "& th": {
        paddingTop: 12,
        paddingBottom: 12,
      },
      "& td, th": {
        borderBottom: `1px solid ${LightGrey}`,
        padding: 8,
      },
    },
  })
);

export const Table = (props: any) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <table className={classes.table} {...props} />
    </Box>
  );
};
