import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import AppBar from "./AppBar";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     toolbar: theme.mixins.toolbar,
//   })
// );

const PageHeader: React.FC = () => {
  // const classes = useStyles();

  return (
    <>
      <AppBar />
      <Toolbar />
      {/* <div className={classes.toolbar} /> */}
    </>
  );
};

export default PageHeader;
