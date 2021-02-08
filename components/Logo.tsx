import { createStyles, makeStyles, Box, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logo: {
      width: 130,
    },
  })
);

const Logo = () => {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
    >
      <img className={classes.logo} src="/logos/beranabyte.svg" />
    </Box>
  );
};

export default Logo;
