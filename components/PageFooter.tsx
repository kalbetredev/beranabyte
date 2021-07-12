import { Box, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AboutAuthor from "./AboutAuthor";
import {
  Email,
  Facebook,
  GitHub,
  LinkedIn,
  Telegram,
} from "@material-ui/icons";
import FontSizes from "../constants/fontsizes";
import useSWR from "swr";
import { BIO_API_ROUTE } from "../shared/lib/api/constants";
import { Bio } from "../shared/lib/models/Bio";
import fetcher from "../shared/lib/utils/fetcher";
import CircularLoading from "./LoadingPlaceholders/CircularLoading";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 64,
      width: "100%",
    },
    footer: {
      padding: "48px 0",
    },
    copyText: {
      marginTop: 15,
      fontSize: FontSizes.subtitle,
    },
    aboutAuthor: {
      [theme.breakpoints.up("sm")]: {
        paddingRight: 15,
        borderRight: `1px solid ${theme.palette.secondary.main}`,
      },
    },
    linkHeader: {
      fontSize: FontSizes.subtitle,
    },
    linksContainer: {
      [theme.breakpoints.up("sm")]: {
        paddingLeft: 15,
      },
    },
  })
);

const PageFooter: React.FC = () => {
  const classes = useStyles();
  const { data } = useSWR(BIO_API_ROUTE, fetcher);
  const myBio: Bio | null = data?.bio ?? null;

  const getPlaceholders = () => {
    const placeHolders = [];
    for (let i = 0; i < 5; i++) {
      placeHolders.push(<CircularLoading size={48} key={i} />);
    }

    return placeHolders;
  };

  return (
    <Box className={classes.root}>
      <Divider />
      <Container maxWidth="md">
        <Box component="footer" className={classes.footer}>
          <Grid container justify="space-between">
            <Grid item container>
              <Grid item xs={12} sm={6} className={classes.aboutAuthor}>
                <AboutAuthor />
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={6}
                justify="flex-start"
                alignItems="center"
                className={classes.linksContainer}
              >
                {myBio ? (
                  <>
                    <IconButton
                      component="a"
                      href={myBio.gitHubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHub />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={myBio.linkedinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedIn style={{ color: "#0077B5" }} />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={myBio.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Telegram style={{ color: "#0088CC" }} />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={myBio.email}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Email style={{ color: "#EA4335" }} />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={myBio.facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook style={{ color: "#3B5998" }} />
                    </IconButton>
                  </>
                ) : (
                  getPlaceholders()
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} container justify="center">
              <Typography
                className={classes.copyText}
              >{`Copyright © ${new Date().getFullYear()} BeranaByte`}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default PageFooter;
