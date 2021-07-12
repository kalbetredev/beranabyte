import {
  Avatar,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Grid,
} from "@material-ui/core";
import useSWR from "swr";
import FontSizes from "../constants/fontsizes";
import { BIO_API_ROUTE } from "../shared/lib/api/constants";
import { Bio } from "../shared/lib/models/Bio";
import fetcher from "../shared/lib/utils/fetcher";
import MultiLineLoading from "./LoadingPlaceholders/MultiLineLoading";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 350,
      marginBottom: 20,
    },
    avatarContainer: {
      width: 50,
    },
    content: {
      width: "calc(100% - 50px)",
      paddingLeft: 10,
    },
    smallAvatar: {
      width: 50,
      height: 50,
    },
    userNameText: {
      fontSize: FontSizes.footerGroupHeader,
      fontWeight: 700,
    },
    description: {
      fontSize: FontSizes.subtitle,
    },
  })
);

const AboutAuthor = () => {
  const classes = useStyles();
  const { data } = useSWR(BIO_API_ROUTE, fetcher);
  const myBio: Bio | null = data?.bio ?? null;

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.avatarContainer}>
        <Avatar
          className={classes.smallAvatar}
          src={"/static/images/kalbetre.jpg"}
        />
      </Grid>
      <Grid item container className={classes.content}>
        <Grid item xs={12}>
          <Typography className={classes.userNameText}>
            Kalkidan Betre
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.description}>
            {myBio ? myBio.summary : <MultiLineLoading />}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutAuthor;
