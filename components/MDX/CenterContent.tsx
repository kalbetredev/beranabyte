import { Grid } from "@material-ui/core";
import React from "react";

interface CenterContentProps {
  children?: React.ReactNode;
}

const CenterContent = (props: CenterContentProps) => {
  return (
    <Grid container>
      <Grid item xs={12} container justify="center" alignItems="center">
        {props.children}
      </Grid>
    </Grid>
  );
};

export default CenterContent;
