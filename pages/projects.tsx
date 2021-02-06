import { makeStyles, Theme, Grid, createStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import LinkGroup from "../components/LinkGroup";
import ProjectCollection from "../components/ProjectCollection";
import PageContainer from "../layouts/PageContainer";
import { OpenSourceProjects } from "../shared/data/projects";
import FrontMatter from "../shared/lib/types/front-matter";
import PageMeta from "../shared/lib/types/page-meta";
import { convertFrontMatterToPageGroup } from "../shared/lib/utils/mdx-helpers";

interface ProjectsProps {
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
              projects={OpenSourceProjects}
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
  //TODO: get this data from repository

  // Sample
  const projectRelatedBlogs = [
    {
      slug: "2019",
      title: "2019 Year in Review",
      publishedAt: "2019-12-26",
      uuid: "ADFEIAD858EADFEFA",
    },
    {
      slug: "backend",
      title: "Which Back End Should I Use As A Front-End Developer?",
      publishedAt: "2020-08-09",
      uuid: "ADFEIwAD858EADFEFA",
    },
    {
      slug: "test",
      title: "Test Blog",
      publishedAt: "2020-08-09",
      uuid: "ADFxxEIwAD858EADFEFA",
    },
  ];

  return {
    props: {
      relatedBlogs: projectRelatedBlogs,
    },
  };
}

export default Projects;
