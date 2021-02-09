import { createStyles, makeStyles, Box, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: 130,
    },
  })
);

const Logo = () => {
  const classes = useStyles();
  return (
    <Box>
      <img className={classes.logo} src="/logos/beranabyte.svg" />
    </Box>
  );
};

export default Logo;
