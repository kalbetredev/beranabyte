import { createStyles, Grid, Grow, makeStyles, Theme } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import React from "react";
import FontSizes from "../constants/fontsizes";
import Project from "../shared/lib/types/Project";
import ProjectSummary from "./ProjectSummary";

interface ProjectSummaryProps {
  title: string;
  projects: Project[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    title: {
      fontSize: FontSizes.header,
      textTransform: "uppercase",
    },
  })
);

const ProjectCollection = (props: ProjectSummaryProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.title}>
          {props.title}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      {props.projects.map((project, index) => (
        <Grow in timeout={400 * index} key={index}>
          <Grid item xs={12}>
            <ProjectSummary project={project} />
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
};

export default ProjectCollection;
