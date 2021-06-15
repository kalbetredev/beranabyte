import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import AppBar from "./AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      minHeight: theme.mixins.toolbar.minHeight,
      [`${theme.breakpoints.up("xs")} and (orientation: portrait)`]: {
        minHeight: 80,
      },
    },
  })
);

const PageHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar />
      <div className={classes.toolbar} />
    </>
  );
};

export default PageHeader;
