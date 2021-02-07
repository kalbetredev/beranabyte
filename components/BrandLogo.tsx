import { createStyles, makeStyles, Box, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logo: {
      padding: 3,
      width: 120,
    },
  })
);

const BrandLogo = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <img className={classes.logo} src="/logos/beranabyte.svg" />
    </Box>
  );
};

export default BrandLogo;
