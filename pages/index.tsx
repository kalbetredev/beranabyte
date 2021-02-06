import {
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Divider,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Head from "next/head";
import React from "react";
import BlogCollection from "../components/BlogCollection";
import LinkGroup from "../components/LinkGroup";
import SearchInput from "../components/SearchInput";
import PageContainer from "../layouts/PageContainer";
import FrontMatter from "../shared/lib/types/front-matter";
import BlogRepositoryImpl from "../shared/lib/repository/BlogRepository";
import PageMeta from "../shared/lib/types/page-meta";
import { convertFrontMatterToPageGroup } from "../shared/lib/utils/mdx-helpers";
interface IndexPageProps {
  blogsFrontMatter: FrontMatter[];
  mostViewedBlogPages: FrontMatter[];
  latestBlogPages: FrontMatter[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blogs: {
      width: "100%",
      marginTop: 20,
      [theme.breakpoints.up("sm")]: {
        width: "calc(100% - 200px)",
      },
    },
    divider: {
      marginTop: 32,
      marginBottom: 32,
    },
    sidebar: {
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 200,
        paddingLeft: 30,
        marginTop: 20,
      },
    },
  })
);

const Index = (props: IndexPageProps) => {
  const classes = useStyles();
  const meta: PageMeta = {
    title: "BeranaByte",
    description: "",
  };

  return (
    <PageContainer meta={meta}>
      <Grid container>
        <Grid container justify="flex-end">
          <Grid item xs={12} sm={4}>
            <SearchInput />
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item className={classes.blogs}>
            <BlogCollection title="Featured" posts={props.blogsFrontMatter} />
          </Grid>
          <Grid item className={classes.sidebar}>
            <Hidden smUp>
              <Divider className={classes.divider} />
            </Hidden>
            <LinkGroup
              showOutline
              pageGroup={convertFrontMatterToPageGroup(
                "Most Viewed",
                props.mostViewedBlogPages
              )}
            />
            <LinkGroup
              showOutline
              pageGroup={convertFrontMatterToPageGroup(
                "Latest",
                props.latestBlogPages
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export async function getStaticProps() {
  const blogRepository = BlogRepositoryImpl.getInstance();
  const blogsFrontMatter: FrontMatter[] = await blogRepository.getBlogsFrontMatter();
  const mostViewedBlogPages = await blogRepository.getMostViewedBlogsFrontMatter(
    5
  );
  const latestBlogPages = blogRepository.getLatestBlogsFrontMatter(5);

  return {
    props: {
      blogsFrontMatter: blogsFrontMatter,
      mostViewedBlogPages: mostViewedBlogPages,
      latestBlogPages: latestBlogPages,
    },
  };
}

export default Index;
