import {
  Card,
  CardActions,
  CardContent,
  createStyles,
  makeStyles,
  Grid,
  Box,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import React from "react";
import CircularLoading from "./CircularLoading";
import LoadingPlaceholder from "./LoadingPlaceholder";

interface ProjectSummaryProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 30,
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.background.default}`,
    },
    content: {
      padding: 0,
    },
    avatarCol: {
      width: 30,
      borderRight: `1px solid ${theme.palette.secondary.main}`,
    },
    contentCol: {
      paddingLeft: 5,
      width: "calc(100% - 30px)",
    },
    actions: {
      padding: 0,
      paddingTop: 15,
    },
    title: {
      width: "70%",
      height: 18,
      marginBottom: 5,
    },
    summary: {
      width: "100%",
      height: 15,
      marginBottom: 12,
    },
    tags: {
      width: 150,
      height: 12,
    },
    btnLabel: {
      width: 100,
      height: 12,
    },
  })
);

const ProjectSummaryLoading = (props: ProjectSummaryProps) => {
  const classes = useStyles();

  return (
    <Card variant="elevation" elevation={0} className={classes.root}>
      <Grid container>
        <Grid item className={classes.avatarCol}>
          <CircularLoading size={25} />
        </Grid>
        <Grid item className={classes.contentCol}>
          <CardContent className={classes.content}>
            <Box className={classes.title}>
              <LoadingPlaceholder />
            </Box>
            <Box className={classes.summary}>
              <LoadingPlaceholder />
            </Box>
            <Box className={classes.tags}>
              <LoadingPlaceholder />
            </Box>
          </CardContent>
          <CardActions className={classes.actions}>
            <CircularLoading size={20} />
            <Box className={classes.btnLabel}>
              <LoadingPlaceholder />
            </Box>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProjectSummaryLoading;
