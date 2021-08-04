import { makeStyles, Theme, Grid, createStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import LinkGroup from "../components/MUI_LinkGroup";
import ProjectCollection from "../components/MUI_ProjectCollection";
import PageContainer from "../layouts/MUI_PageContainer";
import PageMeta from "../shared/lib/models/PageMeta";
import { convertFrontMatterToPageGroup } from "../shared/lib/utils/mdx-helpers";
import Project from "../shared/lib/models/Project";
import Blog from "../shared/lib/models/Blog";
import useSWR from "swr";
import fetcher from "../shared/lib/utils/fetcher";
import {
  PROJECTS_API_ROUTE,
  PROJECTS_BLOGS_API_ROUTE,
} from "../shared/lib/api/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projects: {
      width: "100%",
      marginTop: 20,
      [theme.breakpoints.up("sm")]: {
        width: "calc(100% - 250px)",
      },
    },
    divider: {
      marginTop: 32,
      marginBottom: 32,
    },
    sidebar: {
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 250,
        paddingLeft: 30,
        marginTop: 20,
      },
    },
  })
);

const Projects = () => {
  const classes = useStyles();
  const { data: projectsData } = useSWR(PROJECTS_API_ROUTE, fetcher);
  const openSourceProjects: Project[] = projectsData?.projects ?? [];

  const { data: blogsData } = useSWR(PROJECTS_BLOGS_API_ROUTE, fetcher);
  const relatedBlogs: Blog[] = blogsData?.blogs ?? [];

  const meta: PageMeta = {
    title: "Projects",
    description:
      "Open source and private projects that I am currently working.",
    type: "blog",
    image: "/static/images/banner.png",
  };

  return (
    <PageContainer meta={meta}>
      <Grid container>
        <Grid item container xs={12}>
          <Grid item className={classes.projects}>
            <ProjectCollection
              title="Open Source"
              projects={openSourceProjects}
            />
          </Grid>
          <Grid item className={classes.sidebar}>
            <Hidden smUp>
              <Divider className={classes.divider} />
            </Hidden>
            <LinkGroup
              showOutline
              pageGroup={convertFrontMatterToPageGroup(
                "Related Blogs",
                relatedBlogs
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Projects;
