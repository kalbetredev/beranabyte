import {
  Typography,
  Divider,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Grow,
} from "@material-ui/core";
import React from "react";
import FontSizes from "../constants/fontsizes";
import FrontMatter from "../shared/lib/model/mdx/front-matter";
import BlogSummary from "./BlogSummary";

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

interface BlogCollectionProps {
  title: string;
  posts: FrontMatter[];
}

const BlogCollection = (props: BlogCollectionProps) => {
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

      {props.posts.map((post, index) => (
        <Grow in timeout={400 * index} key={index}>
          <Grid item key={index} xs={12}>
            <BlogSummary blogFrontMatter={post} />
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
};

export default BlogCollection;
