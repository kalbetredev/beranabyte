import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Badge,
  Typography,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import { Error as ErrorIcon } from "@material-ui/icons";

interface PageErrorProps {
  errorMessage: string;
  statusCode: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 50,
      marginBottom: 300,
    },
    errorIcon: {
      color: theme.palette.error.main,
    },
    errorCode: {
      fontSize: "5em",
    },
    errorMessage: {
      maxWidth: 400,
      color: theme.palette.text.secondary,
      fontSize: "0.85em",
    },
    homeBtn: {
      margin: 20,
    },
  })
);

const PageError = (props: PageErrorProps) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Badge badgeContent={<ErrorIcon className={classes.errorIcon} />}>
          <Typography className={classes.errorCode}>
            {props.statusCode}
          </Typography>
        </Badge>
      </Grid>
      <Grid item>
        <Typography className={classes.errorMessage}>
          {props.errorMessage}
        </Typography>
      </Grid>
      <Grid item>
        <Link href="/" passHref>
          <Button
            component="a"
            variant="outlined"
            size="small"
            className={classes.homeBtn}
          >
            Take Me Home
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default PageError;
