import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { format } from "date-fns";
import FontSizes from "../constants/fontsizes";
import Blog from "../shared/lib/models/Blog";
import BlogViewCounter from "./MUI_BlogViewCounter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:last-child": {
        paddingBottom: 0,
      },
      background: theme.palette.background.default,
    },
    description: {
      fontSize: FontSizes.subtitle,
      color: theme.palette.text.secondary,
    },
    title: {
      display: "block",
      fontSize: FontSizes.header,
      lineHeight: FontSizes.header,
      color: theme.palette.text.primary,
      cursor: "pointer",
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
    },
    subheader: {
      fontSize: FontSizes.caption,
      color: theme.palette.text.secondary,
      paddingBottom: 5,
    },
  })
);

const contentStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(0),
      "&:last-child": {
        paddingBottom: 15,
      },
    },
  })
);

interface BlogSummaryCardProps {
  blog: Blog;
}

const BlogSummary = (props: BlogSummaryCardProps) => {
  const { blog } = props;
  const classes = useStyles();
  const contentClasses = contentStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardContent classes={contentClasses}>
        <Link href={`/blogs/${blog.category.toLowerCase()}/${blog._id}`}>
          <Typography className={classes.title} component="a">
            {blog.title}
          </Typography>
        </Link>

        <Typography className={classes.subheader}>
          {format(new Date(blog.publishedAt), "MMM d, yyyy")}
          {<BlogViewCounter blogId={blog._id} />}
        </Typography>

        <Typography className={classes.description}>{blog.summary}</Typography>
      </CardContent>
    </Card>
  );
};

export default BlogSummary;
