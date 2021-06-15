import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "./AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      height: 56,
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
