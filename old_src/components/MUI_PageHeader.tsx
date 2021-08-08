import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "./MUI_AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      height: 65,
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
