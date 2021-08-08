import { Box } from "@material-ui/core";
import LoadingPlaceholder from "./LoadingPlaceholder";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

interface CircularLoadingProps {
  size: number;
}

const useStyles = (size: number) =>
  makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: size,
        height: size,
        marginLeft: 2.5,
      },
    })
  );

const CircularLoading = (props: CircularLoadingProps) => {
  const classes = useStyles(props.size)();

  return (
    <Box className={classes.root}>
      <LoadingPlaceholder borderRadius={props.size} />
    </Box>
  );
};

export default CircularLoading;
