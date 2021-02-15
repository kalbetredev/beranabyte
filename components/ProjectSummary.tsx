import {
  Card,
  CardActions,
  CardContent,
  Typography,
  createStyles,
  makeStyles,
  Button,
  Grid,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Theme } from "@material-ui/core/styles";
import { GitHub } from "@material-ui/icons";
import React from "react";
import FontSizes from "../constants/fontsizes";
import Project from "../shared/lib/types/Project";

interface ProjectSummaryProps {
  index: number;
  project: Project;
}

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
    title: {
      fontSize: FontSizes.header,
    },
    summary: {
      fontSize: FontSizes.subtitle,
      minHeight: 35,
    },
    tagIcon: {
      height: "100%",
      paddingLeft: 8,
      flexGrow: 1,
    },
    button: {
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.primary.main,
      },
      "&:focus": {
        outline: "none !important",
      },
    },
    avatar: {
      width: 25,
      height: 25,
    },
    avatarText: {
      fontSize: FontSizes.caption,
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
  })
);

const ProjectSummary = (props: ProjectSummaryProps) => {
  const classes = useStyles();

  return (
    <Card variant="elevation" elevation={0} className={classes.root}>
      <Grid container>
        <Grid item className={classes.avatarCol}>
          <Avatar className={classes.avatar}>
            <Typography className={classes.avatarText}>
              {props.index}
            </Typography>
          </Avatar>
        </Grid>
        <Grid item className={classes.contentCol}>
          <CardContent className={classes.content}>
            <Typography className={classes.title} gutterBottom>
              {props.project.title}
            </Typography>
            <Typography className={classes.summary} color="textSecondary">
              {props.project.summary}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              startIcon={<GitHub />}
              size="small"
              color="secondary"
              className={classes.button}
            >
              Github
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProjectSummary;
