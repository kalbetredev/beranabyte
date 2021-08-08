import { createStyles, Grid, Grow, makeStyles, Theme } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FontSizes from "../constants/fontsizes";
import Project from "../shared/lib/models/Project";
import ProjectSummaryLoading from "./LoadingPlaceholders/ProjectSummaryLoading";
import ProjectSummary from "./MUI_ProjectSummary";

interface ProjectSummaryProps {
  title: string;
  projects: Project[];
  placeHolderCount?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    title: {
      fontSize: FontSizes.header,
      textTransform: "uppercase",
      fontWeight: 700,
    },
  })
);

const ProjectCollection = (props: ProjectSummaryProps) => {
  const classes = useStyles();

  const getPlaceholders = () => {
    const count = props.placeHolderCount ?? 3;
    const placeHolders = [];
    for (let i = 0; i < count; i++) {
      placeHolders.push(
        <Grow in timeout={400 * i} key={i}>
          <Grid item key={i} xs={12}>
            <ProjectSummaryLoading />
          </Grid>
        </Grow>
      );
    }

    return placeHolders;
  };

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

      {props.projects.length == 0
        ? getPlaceholders()
        : props.projects.map((project, index) => (
            <Grow in timeout={400 * index} key={index}>
              <Grid item xs={12}>
                <ProjectSummary index={index + 1} project={project} />
              </Grid>
            </Grow>
          ))}
    </Grid>
  );
};

export default ProjectCollection;
