import {
  createStyles,
  Hidden,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import hydrate from "next-mdx-remote/hydrate";
import React from "react";
import { format } from "date-fns";
import Share from "@material-ui/icons/Share";
import Box from "@material-ui/core/Box";
import { parse } from "node-html-parser";
import TwoLevelTableOfContent, {
  HeaderLevelIdPair,
} from "../../../components/TwoLevelTableOfContent";
import BlogRepositoryImpl from "../../../shared/lib/repository/blog/BlogRepositoryImpl";
import Bullet from "../../../components/Bullet";
import BlogViewCounter from "../../../components/BlogViewCounter";
import MDXComponents from "../../../components/MDX/MDXComponents";
import FontSizes from "../../../constants/fontsizes";
import MDX from "../../../shared/lib/types/MDX";
import PageMeta from "../../../shared/lib/types/PageMeta";
import PageContainer from "../../../layouts/PageContainer";
import { Params } from "next/dist/next-server/server/router";
import BlogComments from "../../../components/BlogComments";

interface BlogProps {
  mdx: MDX;
  headers: HeaderLevelIdPair[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: FontSizes.h1,
      fontWeight: 700,
    },
    subheaderBox: {
      paddingBottom: "2em",
    },
    subheader: {
      fontSize: FontSizes.title,
      color: theme.palette.text.secondary,
      display: "inline-block",
    },
    iconButton: {
      marginLeft: theme.spacing(1),
      padding: 7.5,
      "&:focus": {
        outline: "none !important",
      },
    },
    mainContent: {
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "calc(100% - 175px)",
        paddingRight: 24,
      },
    },
  })
);

const Blog = (props: BlogProps) => {
  const content = hydrate(props.mdx.mdxSource, {
    components: MDXComponents,
  });
  const classes = useStyles();
  const meta: PageMeta = {
    title: props.mdx.fontMatter.title,
    description: "",
    date: new Date(props.mdx.fontMatter.publishedAt),
  };

  return (
    <PageContainer meta={meta}>
      <div style={{ display: "flex" }}>
        <Box className={classes.mainContent}>
          <Typography className={classes.title}>
            {props.mdx.fontMatter.title}
          </Typography>
          <Box className={classes.subheaderBox}>
            <Typography className={classes.subheader}>
              {format(
                new Date(props.mdx.fontMatter.publishedAt),
                "MMM d, yyyy"
              )}
              {<Bullet />} {props.mdx.fontMatter.readingTime?.toFixed(0)}
              Min Read
              {<Bullet />}{" "}
              <BlogViewCounter blogId={props.mdx.fontMatter.uuid} />
            </Typography>
            <IconButton className={classes.iconButton}>
              <Share fontSize="small" />
            </IconButton>
          </Box>
          {content}
          <BlogComments blogId={props.mdx.fontMatter.uuid} />
        </Box>
        {props.headers.length > 0 ? (
          <Hidden xsDown>
            <TwoLevelTableOfContent headers={props.headers} />
          </Hidden>
        ) : null}
      </div>
    </PageContainer>
  );
};

export async function getStaticPaths() {
  const repository = BlogRepositoryImpl.getInstance();
  const categories = repository.getAllBlogCategories();

  const paths = [];
  categories.map((category) => {
    const categorySlugs = repository.getSlugsByCategory(category);
    categorySlugs.map((slug) => {
      paths.push({
        params: {
          category: category,
          slug: slug,
        },
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: Params }) {
  const blog = await BlogRepositoryImpl.getInstance().getBlog(
    params.category,
    params.slug
  );

  const headers = getHeadersForTOC(blog.mdxSource.renderedOutput);

  return {
    props: {
      mdx: { mdxSource: blog.mdxSource, fontMatter: blog.fontMatter },
      headers: headers,
    },
  };
}

function getHeadersForTOC(renderedOutput: string): HeaderLevelIdPair[] {
  const root = parse(renderedOutput);
  const headers: HeaderLevelIdPair[] = root
    .querySelectorAll("span")
    .map((span) => {
      const headerMeta = span.getAttribute("id")?.split("%") ?? [];
      const level =
        headerMeta.length === 3 ? parseInt(headerMeta[0].replace("h", "")) : 0;
      return {
        level: level,
        id: level > 0 ? headerMeta[1] : "",
        label: level > 0 ? headerMeta[2] : "",
      };
    })
    .filter((value) => value.level > 0);

  return headers;
}

export default Blog;
