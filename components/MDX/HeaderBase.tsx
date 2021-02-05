import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { InsertLink } from "@material-ui/icons";
import React, { useState } from "react";
import { LightGrey } from "../../constants/colors";
import FontSizes from "../../constants/fontsizes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    h2: {
      fontSize: FontSizes.h2,
      fontWeight: 700,
      marginTop: "2em",
      marginBottom: "1em",
    },
    h3: {
      fontSize: FontSizes.h3,
      fontWeight: 700,
      marginTop: "1.5em",
      marginBottom: "0.6em",
    },
    h4: {
      fontSize: FontSizes.h4,
      fontWeight: 700,
      marginTop: "1.2em",
      marginBottom: "0.4em",
    },
    anchorIcon: {
      position: "absolute",
      color: LightGrey,
      top: 0,
      left: -20,
    },
    anchor: {
      position: "absolute",
      top: -100,
    },
  })
);

type HeaderType = "h2" | "h3" | "h4";

const HeaderBase = (type: HeaderType) => (props: any) => {
  const classes = useStyles();
  const [showAnchor, setShowAnchor] = useState(false);

  const className =
    type == "h2" ? classes.h2 : type == "h3" ? classes.h3 : classes.h4;

  return (
    <Box
      className={classes.root}
      onMouseEnter={() => setShowAnchor(true)}
      onMouseLeave={() => setShowAnchor(false)}
    >
      {props.id ? (
        <>
          <span id={`${type}%${props.id}%${props.children}`} />
          <span id={props.id} className={classes.anchor} />
        </>
      ) : null}
      <Typography className={className} component={type}>
        {props.children}
      </Typography>
      {showAnchor && props.id ? (
        <InsertLink className={classes.anchorIcon} fontSize="small" />
      ) : null}
      <span></span>
    </Box>
  );
};

export const H2 = HeaderBase("h2");
export const H3 = HeaderBase("h3");
export const H4 = HeaderBase("h4");
