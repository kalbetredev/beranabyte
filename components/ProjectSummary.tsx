import {
  Card,
  CardActions,
  CardContent,
  Typography,
  createStyles,
  makeStyles,
  Button,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Theme } from "@material-ui/core/styles";
import { GitHub } from "@material-ui/icons";
import React from "react";
import FontSizes from "../constants/fontsizes";
import Project from "../shared/lib/types/Project";

interface ProjectSummaryProps {
  project: Project;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      "&:hover": {
        boxShadow: `0 1px 4px ${theme.palette.primary.light}, 0 1px 4px ${theme.palette.primary.light}`,
      },
    },
    content: {
      paddingBottom: 0,
    },
    title: {
      fontSize: FontSizes.header,
      overflow: "hidden",
    },
    summary: {
      fontSize: FontSizes.subtitle,
      minHeight: 35,
      overflow: "hidden",
    },
    tagIcon: {
      height: "100%",
      paddingLeft: 8,
      flexGrow: 1,
    },
    button: {
      marginLeft: "auto",
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.primary.main,
      },
      "&:focus": {
        outline: "none !important",
      },
    },
  })
);

const ProjectSummary = (props: ProjectSummaryProps) => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} gutterBottom>
          {props.project.title}
        </Typography>
        <Typography className={classes.summary} color="textSecondary">
          {props.project.summary}
        </Typography>
      </CardContent>
      <CardActions>
        {props.project.icon ? (
          <Box className={classes.tagIcon}>{props.project.icon}</Box>
        ) : null}
        <Button
          startIcon={<GitHub />}
          size="small"
          color="secondary"
          className={classes.button}
        >
          Github
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectSummary;
