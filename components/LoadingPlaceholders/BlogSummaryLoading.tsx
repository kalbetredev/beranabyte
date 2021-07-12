import { Box } from "@material-ui/core";
import LoadingPlaceholder from "./LoadingPlaceholder";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      margin: "3px 3px 10px 3px",
    },
    title: {
      width: "70%",
      height: 20,
      marginBottom: 5,
    },
    meta: {
      width: 200,
      height: 12,
      marginBottom: 8,
    },
    summary: {
      width: "100%",
      height: 15,
    },
  })
);

const BlogSummaryLoading = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <LoadingPlaceholder />
      </Box>
      <Box className={classes.meta}>
        <LoadingPlaceholder />
      </Box>
      <Box className={classes.summary}>
        <LoadingPlaceholder />
      </Box>
    </Box>
  );
};

export default BlogSummaryLoading;
