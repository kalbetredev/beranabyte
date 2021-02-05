import { Box, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinkGroup from "./LinkGroup";
import AboutAuthor from "./AboutAuthor";
import { Facebook, Telegram, Twitter, YouTube } from "@material-ui/icons";
import FontSizes from "../constants/fontsizes";
import FooterLinks from "../shared/data/footerlinks";
import { PageGroup } from "../shared/lib/model/PageGroup";

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
      fontSize: FontSizes.subtitle,
    },
    smallAvatar: {
      width: 50,
      height: 50,
    },
    userNameText: {
      fontSize: FontSizes.title,
    },
    aboutAuthor: {
      marginBottom: 32,
      [theme.breakpoints.up("sm")]: {
        paddingRight: 15,
        marginRight: 15,
        borderRight: `1px solid ${theme.palette.secondary.main}`,
      },
      [theme.breakpoints.down("xs")]: {
        paddingTop: 30,
        marginBottom: 30,
        borderTop: `1px solid ${theme.palette.secondary.main}`,
      },
    },
    mainContent: {
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column-reverse",
      },
    },
  })
);

const PageFooter: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Divider />
      <Container maxWidth="md">
        <Box component="footer" className={classes.footer}>
          <Grid container justify="space-between">
            <Grid item container className={classes.mainContent}>
              <Grid item xs={12} sm={6}>
                <Box className={classes.aboutAuthor}>
                  <AboutAuthor />
                  <IconButton>
                    <Telegram style={{ color: "#0088CC" }} />
                  </IconButton>
                  <IconButton>
                    <Facebook style={{ color: "#3B5998" }} />
                  </IconButton>
                  <IconButton>
                    <YouTube style={{ color: "#C4202B" }} />
                  </IconButton>
                  <IconButton>
                    <Twitter style={{ color: "#00ACEE" }} />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item container xs={12} sm={6}>
                {FooterLinks.map((group: PageGroup, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <LinkGroup pageGroup={group} />
                  </Grid>
                ))}
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
