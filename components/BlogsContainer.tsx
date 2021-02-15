import {
  Grid,
  Hidden,
  Divider,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import FrontMatter from "../shared/lib/types/FrontMatter";
import { convertFrontMatterToPageGroup } from "../shared/lib/utils/mdx-helpers";
import BlogCollection from "./BlogCollection";
import LinkGroup from "./LinkGroup";
import SearchInput from "./SearchInput";

interface BlogContainerProps {
  category: string;
  blogsMap: Map<string, FrontMatter[]>;
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

const BlogsContainer = (props: BlogContainerProps) => {
  const classes = useStyles();
  const { category, blogsMap, mostViewedBlogPages, latestBlogPages } = props;
  const [title, setTitle] = useState(category);
  const [blogs, setBlogs] = useState(blogsMap.get(category));
  const [isSearching, setIsSearching] = useState(false);
  const allBlogFrontMatters = Array.from(blogsMap.values()).flat();

  const onSearchValueChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchKey = e.target.value;
    if (searchKey.length > 0) {
      setIsSearching(true);
      setTitle(searchKey);
      setBlogs(
        allBlogFrontMatters.filter(
          (frontMatter) =>
            frontMatter.title.toLowerCase().includes(searchKey.toLowerCase()) ||
            frontMatter.summary.toLowerCase().includes(searchKey.toLowerCase())
        )
      );
    } else {
      onSearchCleared();
    }
  };

  const onSearchCleared = () => {
    setIsSearching(false);
    setTitle(category);
    setBlogs(blogsMap.get(category));
  };

  return (
    <Grid container>
      <Grid container justify="flex-end">
        <Grid item xs={12} sm={4}>
          <SearchInput
            onChange={onSearchValueChanged}
            onSearchCleared={onSearchCleared}
          />
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Grid item className={classes.blogs}>
          <BlogCollection
            title={title}
            blogs={blogs}
            isSearching={isSearching}
          />
        </Grid>
        <Grid item className={classes.sidebar}>
          <Hidden smUp>
            <Divider className={classes.divider} />
          </Hidden>
          <LinkGroup
            showOutline
            pageGroup={convertFrontMatterToPageGroup(
              "Most Viewed",
              mostViewedBlogPages
            )}
          />
          <LinkGroup
            showOutline
            pageGroup={convertFrontMatterToPageGroup("Latest", latestBlogPages)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogsContainer;
