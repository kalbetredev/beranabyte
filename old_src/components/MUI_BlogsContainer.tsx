import {
  Grid,
  Hidden,
  Divider,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import useSWR from "swr";
import { FEATURED } from "../constants/strings";
import Blog from "../../src/api/models/Blog";
import {
  BLOGS_API_ROUTE,
  BLOGS_FEATURED_API_ROUTE,
  BLOGS_LATEST_API_ROUTE,
  BLOGS_POPULAR_API_ROUTE,
} from "../shared/lib/api/constants";
import fetcher from "../shared/lib/utils/fetcher";
import { convertFrontMatterToPageGroup } from "../shared/lib/utils/mdx-helpers";
import BlogCollection from "./MUI_BlogCollection";
import LinkGroup from "./MUI_LinkGroup";
import SearchInput from "./MUI_SearchInput";

interface BlogContainerProps {
  category: string;
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
  const { category } = props;

  const BLOG_ROUTE =
    category === FEATURED
      ? BLOGS_FEATURED_API_ROUTE
      : `${BLOGS_API_ROUTE}?category=${category}`;

  const { data: popularBlogs } = useSWR(BLOGS_POPULAR_API_ROUTE, fetcher);
  const { data: latestBlogs } = useSWR(BLOGS_LATEST_API_ROUTE, fetcher);
  const { data: blogsInCategory } = useSWR(BLOG_ROUTE, fetcher);
  const { data: allBlogs } = useSWR(BLOGS_API_ROUTE, fetcher);

  const mostViewedBlogPages: Blog[] = popularBlogs?.blogs ?? [];
  const latestBlogPages: Blog[] = latestBlogs?.blogs ?? [];
  const blogs: Blog[] = blogsInCategory?.blogs ?? [];
  const blogSummaries: Blog[] = allBlogs?.blogs ?? [];

  const [title, setTitle] = useState(category);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const onSearchValueChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchKey = e.target.value;
    if (searchKey.length > 0) {
      setIsSearching(true);
      setTitle(searchKey);
      setSearchResult(
        blogSummaries?.filter(
          (blog: Blog) =>
            blog.title.toLowerCase().includes(searchKey.toLowerCase()) ||
            blog.summary.toLowerCase().includes(searchKey.toLowerCase())
        )
      );
    } else {
      onSearchCleared();
    }
  };

  const onSearchCleared = () => {
    setIsSearching(false);
    setTitle(category);
    setSearchResult([]);
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
            blogs={isSearching ? searchResult : blogs}
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
