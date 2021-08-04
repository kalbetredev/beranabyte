import {
  Card,
  CardActions,
  CardContent,
  Typography,
  createStyles,
  makeStyles,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Theme } from "@material-ui/core/styles";
import { GitHub } from "@material-ui/icons";
import FontSizes from "../constants/fontsizes";
import Project from "../shared/lib/models/Project";
import Bullet from "./MUI_Bullet";

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
    },
    tagIcon: {
      height: "100%",
      paddingLeft: 8,
      flexGrow: 1,
    },
    button: {
      color: theme.palette.text.secondary,
      fontSize: FontSizes.subtitle,
      textTransform: "capitalize",
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
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
    tags: {
      fontSize: FontSizes.caption,
      display: "inline",
    },
    tagsContainer: {
      marginTop: 5,
    },
  })
);

const ProjectSummary = (props: ProjectSummaryProps) => {
  const classes = useStyles();
  const tags = props.project.tags.split(",");

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
            <Typography className={classes.title}>
              {props.project.title}
            </Typography>
            <Typography className={classes.summary} color="textSecondary">
              {props.project.summary}
            </Typography>
            <Box className={classes.tagsContainer}>
              {tags.map((tag, index) => (
                <Typography
                  key={index}
                  color="textSecondary"
                  className={classes.tags}
                >
                  {`#${tag}`}
                  {index < tags.length - 1 ? <Bullet /> : null}
                </Typography>
              ))}
            </Box>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              startIcon={<GitHub />}
              size="small"
              color="secondary"
              className={classes.button}
              component="a"
              href={props.project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Checkout On Github
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProjectSummary;
