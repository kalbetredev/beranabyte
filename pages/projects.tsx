import { makeStyles, Theme, Grid, createStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import LinkGroup from "../components/LinkGroup";
import ProjectCollection from "../components/ProjectCollection";
import PageContainer from "../layouts/PageContainer";
import PageMeta from "../shared/lib/types/PageMeta";
import { convertFrontMatterToPageGroup } from "../shared/lib/utils/mdx-helpers";
import fs from "fs";
import path from "path";
import Project from "../shared/lib/types/Project";
import FrontMatter from "../shared/lib/types/FrontMatter";
import BlogRepositoryImpl from "../shared/lib/repository/blog/BlogRepositoryImpl";

interface ProjectsProps {
  openSourceProjects: Project[];
  relatedBlogs: FrontMatter[];
}

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

const Projects = (props: ProjectsProps) => {
  const classes = useStyles();
  const meta: PageMeta = {
    title: "Projects",
    description: "",
  };

  return (
    <PageContainer meta={meta}>
      <Grid container>
        <Grid item container xs={12}>
          <Grid item className={classes.projects}>
            <ProjectCollection
              title="Open Source"
              projects={props.openSourceProjects}
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
                props.relatedBlogs
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export async function getStaticProps() {
  const root = process.cwd();
  const projectsJSONFile = path.join(
    root,
    "shared/data/projects",
    "opensource.json"
  );
  const data = fs.readFileSync(projectsJSONFile, "utf-8");
  const openSourceProjects = JSON.parse(data);

  const relatedBlogsFrontMatters = BlogRepositoryImpl.getInstance().getFrontMattersByCategory(
    "project-related"
  );

  return {
    props: {
      openSourceProjects: openSourceProjects,
      relatedBlogs: relatedBlogsFrontMatters,
    },
  };
}

export default Projects;
