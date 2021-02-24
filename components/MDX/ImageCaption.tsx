import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import FontSizes from "../../constants/fontsizes";

interface ImageCaptionProps {
  caption: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    caption: {
      fontSize: FontSizes.imageCaption,
      color: theme.palette.text.secondary,
      marginTop: 5,
      marginBottom: 40,
    },
  })
);

const ImageCaption = (props: ImageCaptionProps) => {
  const classes = useStyles();
  return <Typography className={classes.caption}>{props.caption}</Typography>;
};

export default ImageCaption;
