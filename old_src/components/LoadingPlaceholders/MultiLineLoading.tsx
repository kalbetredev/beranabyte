import { Box } from "@material-ui/core";
import LoadingPlaceholder from "./LoadingPlaceholder";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingTop: 5,
    },
    longLine: {
      width: "100%",
      height: 12,
      marginBottom: 6,
    },
    shortLine: {
      width: "70%",
      height: 12,
    },
  })
);

const MultiLineLoading = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.longLine}>
        <LoadingPlaceholder />
      </Box>
      <Box className={classes.longLine}>
        <LoadingPlaceholder />
      </Box>
      <Box className={classes.shortLine}>
        <LoadingPlaceholder />
      </Box>
    </Box>
  );
};

export default MultiLineLoading;
