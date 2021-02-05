import { createStyles, makeStyles, Typography, Theme } from "@material-ui/core";
import FontSizes from "../constants/fontsizes";

interface AppBarTitleProps {
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleText: {
      fontSize: FontSizes.title,
      flexGrow: 1,
      color: theme.palette.primary.main,
    },
  })
);

const AppBarTitle: React.FC<AppBarTitleProps> = (props: AppBarTitleProps) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.titleText}>{props.title}</Typography>
    </>
  );
};

export default AppBarTitle;
