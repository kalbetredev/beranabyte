import { Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Params } from "next/dist/next-server/server/router";
import React from "react";
import BlogCollection from "../../../components/BlogCollection";
import SearchInput from "../../../components/SearchInput";
import PageContainer from "../../../layouts/PageContainer";
import BlogRepositoryImpl from "../../../shared/lib/repository/blog/BlogRepositoryImpl";
import FrontMatter from "../../../shared/lib/types/FrontMatter";
import PageMeta from "../../../shared/lib/types/PageMeta";

interface BlogCategoryProps {
  category: string;
  categoryFrontMatters: FrontMatter[];
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

const BlogCategory = (props: BlogCategoryProps) => {
  const classes = useStyles();
  const meta: PageMeta = {
    title: props.category,
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
            <BlogCollection
              category={props.category}
              posts={props.categoryFrontMatters}
            />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export async function getStaticPaths() {
  const repository = BlogRepositoryImpl.getInstance();
  const categories = repository.getAllBlogCategories();

  return {
    paths: categories.map((category) => ({
      params: {
        category: category,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: Params }) {
  const categoryFrontMatters = BlogRepositoryImpl.getInstance().getFrontMattersByCategory(
    params.category
  );

  return {
    props: {
      category: params.category,
      categoryFrontMatters: categoryFrontMatters,
    },
  };
}

export default BlogCategory;
