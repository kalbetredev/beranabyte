import {
  createStyles,
  Hidden,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { format } from "date-fns";
import Box from "@material-ui/core/Box";
import TwoLevelTableOfContent, {
  HeaderLevelIdPair,
} from "../../../components/TwoLevelTableOfContent";
import Bullet from "../../../components/Bullet";
import MDXComponents from "../../../components/MDX/MDXComponents";
import FontSizes from "../../../constants/fontsizes";
import PageMeta from "../../../shared/lib/models/PageMeta";
import PageContainer from "../../../layouts/PageContainer";
import { Params } from "next/dist/next-server/server/router";
import BlogComments from "../../../components/BlogComments";
import { Facebook, LinkedIn } from "@material-ui/icons";
import {
  generateFacebookShareLink,
  generateLinkedInShareLink,
} from "../../../shared/lib/utils/shareLink";
import { useRouter } from "next/router";
import {
  getAllBlogSummaries,
  getBlogById,
  updateBlogViewCount,
} from "../../../shared/lib/api/beranabtyeApi";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import readingTime from "reading-time";
import Blog from "../../../shared/lib/models/Blog";
import BlogViewCounter from "../../../components/BlogViewCounter";

interface BlogProps {
  mdxSource: MDXRemoteSerializeResult;
  blog: Blog;
  meta: any;
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

const BlogPage = (props: BlogProps) => {
  const { mdxSource, blog, meta, headers } = props;
  const classes = useStyles();
  const pageMeta: PageMeta = {
    title: blog.title,
    description: blog.summary,
    date: new Date(blog.publishedAt),
    type: "blog",
    image: blog.imageUrl,
  };
  const router = useRouter();

  useEffect(() => {
    updateBlogViewCount(blog._id);
  }, [blog._id]);

  return (
    <PageContainer meta={pageMeta}>
      <div style={{ display: "flex" }}>
        <Box className={classes.mainContent}>
          <Typography className={classes.title}>{blog.title}</Typography>
          <Box className={classes.subheaderBox}>
            <Typography className={classes.subheader}>
              {format(new Date(blog.publishedAt), "MMM d, yyyy")}
              {<Bullet />} {meta.readingTime?.toFixed(0)}
              Min Read
              {<BlogViewCounter blogId={blog._id} />}
            </Typography>
            <IconButton
              className={classes.iconButton}
              component="a"
              href={generateFacebookShareLink(router.asPath)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </IconButton>
            <IconButton
              className={classes.iconButton}
              component="a"
              href={generateLinkedInShareLink(router.asPath)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </IconButton>
          </Box>
          <MDXRemote {...mdxSource} components={MDXComponents} />
          <BlogComments blogId={blog._id} />
        </Box>
        {headers.length > 0 ? (
          <Hidden xsDown>
            <TwoLevelTableOfContent headers={headers} />
          </Hidden>
        ) : null}
      </div>
    </PageContainer>
  );
};

export async function getStaticPaths() {
  const blogs = await getAllBlogSummaries();

  const paths = [];
  blogs.map((blog) => {
    paths.push({
      params: {
        category: blog.category.toLowerCase(),
        slug: blog._id,
      },
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: Params }) {
  const blog = await getBlogById(params.slug, false);
  const renderedBlog = await renderBlog(blog);
  const headers = getHeadersForTOC(renderedBlog.mdxSource.compiledSource);

  return {
    props: {
      ...renderedBlog,
      blog: blog,
      headers: headers,
    },
  };
}

function getHeadersForTOC(renderedOutput: string): HeaderLevelIdPair[] {
  let regex = /mdx\("h([0-9])+",e\(\{\},\{id:"([^"]*)"\}\),"([^"]*)"\)/gi;
  const matches = Array.from(renderedOutput.matchAll(regex));

  const headers: HeaderLevelIdPair[] = matches.map((match) => {
    return {
      level: parseInt(match[1]),
      id: match[2],
      label: JSON.parse(`"${match[3]}"`),
    };
  });
  return headers;
}

const renderBlog = async (blog: Blog) => {
  const mdxSource = await serialize(blog.mdx, {
    mdxOptions: {
      remarkPlugins: [
        require("remark-autolink-headings"),
        require("remark-slug"),
      ],
      rehypePlugins: [],
    },
  });

  return new Promise<any>((resolve, reject) => {
    resolve({
      mdxSource: mdxSource,
      meta: {
        wordCount: blog.mdx.split(/\s+/gu).length,
        readingTime: readingTime(blog.mdx).minutes,
      },
    });
  });
};

export default BlogPage;
