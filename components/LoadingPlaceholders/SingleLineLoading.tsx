import { Box } from "@material-ui/core";
import LoadingPlaceholder from "./LoadingPlaceholder";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: 15,
    },
  })
);

const SingleLineLoading = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <LoadingPlaceholder />
    </Box>
  );
};

export default SingleLineLoading;
