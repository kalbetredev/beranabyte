import { createStyles, makeStyles, Box, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoContainer: {
      display: "flex",
      justifyContent: "center",
    },
    logo: {
      width: 100,
    },
  })
);

const Logo = () => {
  const classes = useStyles();
  return (
    <Box className={classes.logoContainer}>
      <img className={classes.logo} src="/logos/beranabyte.svg" />
    </Box>
  );
};

export default Logo;
